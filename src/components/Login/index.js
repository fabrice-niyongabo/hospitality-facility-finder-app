import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../../styles/login.scss";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setuserCompanyName,
  setUserEmail,
  setUserFullName,
  setUserPhone,
  setUserRole,
  setUserToken,
} from "../../actions/user";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirect, setRedirect] = useState("");

  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    if (!token || token.trim() === "") {
      const params = new URLSearchParams(window.location.search);
      const rdr = params.get("redirect");
      if (rdr) {
        setRedirect(rdr);
      }
    } else {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError("All fields are required");
    } else {
      setIsSubmitting(true);
      Axios.post(process.env.REACT_APP_BACKEND_URL + "/users/login", {
        email,
        password,
      })
        .then((res) => {
          dispatch(setUserFullName(res.data.fullName));
          dispatch(setUserPhone(res.data.phone));
          dispatch(setUserEmail(res.data.email));
          dispatch(setuserCompanyName(res.data.companyName));
          dispatch(setUserRole(res.data.role));
          dispatch(setUserToken(res.data.token));
          updateCart(res.data.token, res.data.role);
        })
        .catch((error) => {
          setIsSubmitting(false);
          setPassword("");
          if (error.response.data.msg) {
            setError(error.response.data.msg);
          } else {
            setError("Something went wrong. Try again later");
          }
        });
    }
  };

  const updateCart = async (token, role) => {
    await Axios.post(process.env.REACT_APP_BACKEND_URL + "/cart/giveCart", {
      token,
    });
    if (redirect !== "") {
      navigate(-1);
    } else {
      role === "user" ? navigate("/") : navigate("/dashboard");
    }
  };
  return (
    <div className="login-main-container">
      <div className="login-contents">
        <div className="text-center login-header">
          <h1>Login</h1>
          <p>
            Log into your account to be able to make operations on the system
          </p>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 mt-4">
              <span>Email address</span>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="form-control"
                name="email"
                required
                disabled={isSubmitting}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <span>Password</span>
              <input
                type="password"
                placeholder="***************"
                className="form-control"
                required
                disabled={isSubmitting}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error !== "" && (
              <div className="alert alert-danger mb-3">{error}</div>
            )}
            <button disabled={isSubmitting} type="submit" className="mb-3">
              {isSubmitting && <Spinner animation="border" size="sm" />} Login
            </button>
          </form>
          <div className="text-end mb-3">
            Don't have an account? <Link to="/signup">Register Now</Link>
          </div>
          <div className="text-center">
            <Link to="/">Go back to home page</Link>
          </div>
        </div>
      </div>
      <div className="footer">
        <img src={require("../../assets/wave.png")} alt="" />
      </div>
    </div>
  );
}

export default Login;
