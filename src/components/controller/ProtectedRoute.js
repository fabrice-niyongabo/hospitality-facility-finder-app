import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import { UserMainContext } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  //   const context = useContext(UserMainContext);

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    const token = await localStorage.getItem("token");
    // context.setToken(token);
    setToken(token);
    setLoading(false);
  };

  useEffect(() => {
    getToken();
  }, [loading]);

  return !loading && (token != null ? children : <Navigate to="/login" />);
};

export default ProtectedRoute;
