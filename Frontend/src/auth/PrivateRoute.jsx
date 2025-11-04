import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
// import Loader from "../components/Loader"; // optional spinner

const PrivateRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) return <h1>Loading....</h1>;
  if (!admin) return <Navigate to="/dnp/admin/login" replace />;

  return children;
};

export default PrivateRoute;
