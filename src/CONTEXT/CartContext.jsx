import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  // ✅ Always get fresh token
  const getToken = () => localStorage.getItem("token");

  // ✅ Auth check
  const checkAuth = () => {
    const token = getToken();

    if (!token) {
      alert("You must be logged in");
      navigate("/login");
      return null;
    }

    return token;
  };

  // ✅ Fetch cart
  const fetchCart = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await axios.get(
        "https://vfhome-backend2-3.onrender.com/api/auth/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCartItems(res.data.cart || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Add to cart
  const addToCart = async (productId) => {
    const token = checkAuth();
    if (!token) return;

    try {
      await axios.post(
        "https://vfhome-backend2-3.onrender.com/api/auth/cart",
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Remove from cart
  const removeFromCart = async (id) => {
  const token = checkAuth();
  if (!token) return;

  console.log("Removing:", id); // DEBUG
  if (!id) {
    console.error("No productId received");
    return;
  }
  try {
    const res = await axios.delete(
      `https://vfhome-backend2-3.onrender.com/api/auth/cart/remove/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log("Response:", res.data);

    fetchCart();
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};

  // ✅ Clear cart
  const clearCart = async () => {
    const token = checkAuth();
    if (!token) return;

    try {
      await axios.delete(
        "https://vfhome-backend2-3.onrender.com/api/auth/cart/clear",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCartItems([]);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Total price
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.productId.price * item.quantity,
    0
  );

  // ✅ Load cart on app start
  useEffect(() => {
    const token = getToken();
    if (token) fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount: cartItems.length,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;