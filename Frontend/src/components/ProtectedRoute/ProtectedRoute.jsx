// Frontend/src/components/ProtectedRoute/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import AppContext from "../../Context/AppContext";
import "./ProtectedRoute.css";

const ProtectedRoute = () => {
  const location = useLocation();

  // ✅ from AppContext (localStorage-based token)
  const { token, isLoading } = useContext(AppContext);
 console.log("ProtectedRoute token:", token);
  // ⏳ Loader while checking auth
  if (isLoading) {
    return (
      <div className="protected-loader">
        <ThreeDots
          height="60"
          width="60"
          radius="9"
          color="#2563eb"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
    );
  }

  // ❌ Not authenticated
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // ✅ Authenticated
  return <Outlet />;
};

export default ProtectedRoute;
