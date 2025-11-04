import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login from cookies when page loads
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios.get("http://localhost:5000/api/auth/verify", { withCredentials: true })
        .then(res => setAdmin(res.data.admin))
        .catch(() => setAdmin(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
