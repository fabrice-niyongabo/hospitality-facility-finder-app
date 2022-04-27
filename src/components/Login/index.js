import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.scss";
function Login() {
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
          <form>
            <div className="form-group mb-3 mt-4">
              <span>Email address</span>
              <input
                type="text"
                placeholder="example@gmail.com"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <span>Password</span>
              <input
                type="password"
                placeholder="***************"
                className="form-control"
              />
            </div>
            <button className="mb-3">Login</button>
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
