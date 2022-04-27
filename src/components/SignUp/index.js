import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="login-main-container">
      <div className="login-contents">
        <div className="text-center login-header">
          <h1>Create account</h1>
          <p>
            Hello User, thank you for choosing this journey with us. Lets create
            account first
          </p>
        </div>
        <div className="form-container">
          <form>
            <div className="form-group mb-3 mt-4">
              <span>Full Names</span>
              <input
                type="text"
                placeholder="Your names"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3 mt-4">
              <span>Phone number</span>
              <div className="phone-container">
                <input
                  type="text"
                  className="form-control"
                  disabled
                  value="+250"
                />
                <input
                  type="number"
                  placeholder="7888888"
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group mb-3 mt-4">
              <span>Email address</span>
              <input
                type="email"
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
            <div className="form-group mb-3">
              <span>Confirm password</span>
              <input
                type="password"
                placeholder="***************"
                className="form-control"
              />
            </div>
            <button className="mb-3">SignUp</button>
          </form>
          <div className="text-end mb-3">
            Already have an account? <Link to="/login">Login Now</Link>
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

export default SignUp;
