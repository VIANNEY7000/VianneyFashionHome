import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

const API = import.meta.env.VITE_PRODUCT_API || "https://vfhome-backend2-3.onrender.com";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const navigate = useNavigate();
  const isFetchingRef = useRef(false);

  const getToken = () => localStorage.getItem("token");
  const buildHeaders = (token) => ({
    Authorization: `Bearer ${token}`,
  });

  const redirectToLogin = (message) => {
    if (message) {
      alert(message);
    }
    navigate("/login");
  };

  const checkAuth = () => {
    const token = getToken();

    if (!token) {
      redirectToLogin("You must be logged in");
      return null;
    }

    return token;
  };

  const fetchCart = async ({ silent = false } = {}) => {
    const token = getToken();
    if (!token) {
      setCartItems([]);
      setCartLoaded(true);
      return;
    }

    if (isFetchingRef.current && silent) return;

    try {
      isFetchingRef.current = true;
      const res = await axios.get(`${API}/api/auth/cart`, {
        headers: buildHeaders(token),
      });

      setCartItems(res.data.cart || []);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setCartItems([]);
      }
    } finally {
      isFetchingRef.current = false;
      setCartLoaded(true);
    }
  };

  const addToCart = async (product) => {
    const token = getToken();

    if (!token) {
      redirectToLogin("You must be logged in");
      return;
    }

    const productId = typeof product === "string" ? product : product?._id;
    if (!productId) return;

    const existingItem = cartItems.find((item) => {
      const pid = item.productId?._id || item.productId;
      return pid === productId;
    });

    if (existingItem) {
      return;
    }

    if (product && typeof product !== "string") {
      setCartItems((prev) => [
        ...prev,
        {
          productId: product,
          quantity: 1,
        },
      ]);
    }

    try {
      const res = await axios.post(
        `${API}/api/auth/cart`,
        { productId, quantity: 1 },
        {
          headers: buildHeaders(token),
        }
      );

      if (res.data.cart) {
        await fetchCart({ silent: true });
      }
    } catch (err) {
      if (product && typeof product !== "string") {
        setCartItems((prev) =>
          prev.filter((item) => {
            const pid = item.productId?._id || item.productId;
            return pid !== productId;
          })
        );
      }

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        redirectToLogin("Session expired. Please log in again.");
        return;
      }

      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add item to cart.");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    const token = getToken();
    if (!token) return;
    if (quantity < 1) return;

    const previousItems = cartItems;
    setCartItems((prev) =>
      prev.map((item) => {
        const pid = item.productId?._id || item.productId;
        return pid === productId ? { ...item, quantity } : item;
      })
    );

    try {
      await axios.put(
        `${API}/api/auth/cart/update`,
        { productId, quantity },
        {
          headers: buildHeaders(token),
        }
      );
    } catch (err) {
      setCartItems(previousItems);
      console.error(err.response?.data || err.message);
    }
  };

  const removeFromCart = async (productId) => {
    const token = getToken();
    if (!token) return;

    const previousItems = cartItems;
    setCartItems((prev) =>
      prev.filter((item) => {
        const pid = item.productId?._id || item.productId;
        return pid !== productId;
      })
    );

    try {
      await axios.delete(`${API}/api/auth/cart/remove/${productId}`, {
        headers: buildHeaders(token),
      });
    } catch (err) {
      setCartItems(previousItems);
      console.error(err.response?.data || err.message);
    }
  };

  const clearCart = async () => {
    const token = checkAuth();
    if (!token) return;

    const previousItems = cartItems;
    setCartItems([]);

    try {
      await axios.delete(`${API}/api/auth/cart/clear`, {
        headers: buildHeaders(token),
      });
    } catch (err) {
      setCartItems(previousItems);
      console.error(err.response?.data || err.message);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const price = item?.productId?.price || 0;
    const quantity = item?.quantity || 0;
    return total + price * quantity;
  }, 0);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartLoaded,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        fetchCart,
        cartCount: cartItems.length,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
