import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./components/Home/Home";
import ShowProduct from "./components/Product/ShowProduct";
import ProductDetail from "./components/ProductDetails/ProductDetail";
import Login from "./components/UserLogin/Login";
import Register from "./components/UserRegister/Register";
import { ToastContainer } from "react-toastify";
import Cart from "./components/UserCart/Cart";
import UserProfile from "./components/UserProfile/UserProfile";
import UserAddress from "./components/Address/UserAddress";
import Checkout from "./components/Checkout/Checkout";

function App() {
  return (
    <Router>
      <ToastContainer />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/showProducts" element={<ShowProduct />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/showUserCart" element={<Cart />} />
          <Route path="/userAddress" element={<UserAddress/>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
