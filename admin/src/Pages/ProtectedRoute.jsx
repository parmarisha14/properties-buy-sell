import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/check", {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    } catch (err) {
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
