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
            Authorization: `Bearer ${token}`,
          }
        }
      );

      setCartItems(res.data.cart || []);
    } catch (err) {
        if (err.response?.status === 401) {
        localStorage.removeItem("token"); // clear bad token
        setCartItems([]);
      }
    }
  };

  

  // ✅ Add to cart
  const addToCart = async (productId) => {
  const token = getToken();

  if (!token) {
    alert("You must be logged in");
    window.location.href = "/login"; // force redirect
    return; // 🚨 STOP EXECUTION
  }
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
    console.error(err.response?.data || err.message);
    if (err.response?.status === 401) {
      localStorage.removeItem("token"); // clear the bad token
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
      return;
    }
    console.error(err.response?.data || err.message);
  }
};


// UPDATE QUANTITY
const updateQuantity = async (productId, quantity) => {
  const token = getToken();
  if (!token) return;

  try {
    await axios.put(
      "https://vfhome-backend2-3.onrender.com/api/auth/cart/update",
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchCart();
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};



  // ✅ Remove from cart
 const removeFromCart = async (productId) => {
  const token = getToken();
  if (!token) return;

  try {
    await axios.delete(
      `https://vfhome-backend2-3.onrender.com/api/auth/cart/remove/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

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
// Total price
const totalPrice = cartItems.reduce(
  (total, item) => {
    const price = item?.productId?.price || 0;
    const quantity = item?.quantity || 0;
    return total + price * quantity;
  },
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
        updateQuantity,
        cartCount: cartItems.length,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;