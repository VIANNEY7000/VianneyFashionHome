import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./PAGES/Login";
import Signup from "./PAGES/Signup";
import ForgotPassword from "./PAGES/ForgotPassword";
import ResetPassword from "./PAGES/ResetPassword";
import Home from "./PAGES/Home";
import Shop from "./COMPONENTS/Shop";
import AdminDashboard from "./PAGES/AdminDashboard";
import CustomerDashboard from "./PAGES/CustomerDashboard";
import ProductDetails from "./PAGES/ProductDetail";
import CartProvider from "./CONTEXT/CartContext";
import Cart from "./PAGES/Cart";
import Checkout from "./PAGES/Checkout";
import PaymentSuccess from "./PAGES/PaymentSuccess";
import Categories from "./PAGES/Categories";
import Customers from "./PAGES/Customers";
import AdminProducts from "./PAGES/AdminProducts";
import AdminLayout from "./PAGES/AdminLayout";
import AdminOrders from "./PAGES/AdminOrders";

// Customer pages
import CustomerLayout from "./PAGES/CustomerLayout";
import CustomerOrders from "./PAGES/CustomerOrders";
import CustomerWishlist from "./PAGES/CustomerWishlist";
import CustomerProfile from "./PAGES/CustomerProfile";
import Collection from "./PAGES/Collection";
import AboutUs from "./PAGES/AboutUs";
import ContactUs from "./PAGES/ContactUs";
import NewArrival from "./PAGES/NewArrival";

// Role-based private route
const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;

  if (role && role.toLowerCase() !== userRole.toLowerCase()) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/customer/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/collections" element={<Collection />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/new-arrivals" element={<NewArrival />} />


        {/* Protected Admin Layout */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="Admin">
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<Customers />} />
        </Route>

        {/* Protected Customer Layout */}
        <Route
          path="/customer"
          element={
            <PrivateRoute role="Customer">
              <CustomerLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="wishlist" element={<CustomerWishlist />} />
          <Route path="profile" element={<CustomerProfile />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;