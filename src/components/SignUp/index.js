import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Axios from "axios";

function SignUp() {
  const [state, setState] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    fullName: "",
    phone: "",
    email: "",
    submit: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validPhoneCode = ["8", "9", "2", "3"];

  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.fullName.trim() === "") {
      setError((prevState) => {
        return { ...prevState, fullName: "Please enter your names" };
      });
      fullNameRef.current.classList.add("is-invalid");
      fullNameRef.current.focus();
      return;
    } else {
      fullNameRef.current.classList.remove("is-invalid");
      setError((prevState) => {
        return { ...prevState, fullName: "" };
      });
    }
    if (state.phone.trim() === "") {
      setError((prevState) => {
        return { ...prevState, phone: "Please enter your phone number" };
      });
      phoneRef.current.classList.add("is-invalid");
      phoneRef.current.focus();
      return;
    } else if (
      !validPhoneCode.includes(state.phone[1]) ||
      state.phone[0] !== "7" ||
      state.phone.length !== 9
    ) {
      setError((prevState) => {
        return {
          ...prevState,
          phone:
            "Invalid phone number. please provide a valid MTN or AIRTEL-TIGO phone number.",
        };
      });
      phoneRef.current.classList.add("is-invalid");
      phoneRef.current.focus();
      return;
    } else {
      phoneRef.current.classList.remove("is-invalid");
      setError((prevState) => {
        return { ...prevState, phone: "" };
      });
    }
    if (state.email.trim() === "") {
      setError((prevState) => {
        return { ...prevState, email: "Please enter your email address" };
      });
      emailRef.current.classList.add("is-invalid");
      emailRef.current.focus();
      return;
    } else {
      emailRef.current.classList.remove("is-invalid");
      setError((prevState) => {
        return { ...prevState, email: "" };
      });
    }
    if (state.password.trim() === "") {
      setError((prevState) => {
        return { ...prevState, password: "Please enter password" };
      });
      passwordRef.current.classList.add("is-invalid");
      passwordRef.current.focus();
      return;
    } else if (state.password.length <= 4) {
      setError((prevState) => {
        return {
          ...prevState,
          password: "Password must be more than 4 characters",
        };
      });
      passwordRef.current.classList.add("is-invalid");
      passwordRef.current.focus();
      return;
    } else {
      passwordRef.current.classList.remove("is-invalid");
      setError((prevState) => {
        return { ...prevState, password: "" };
      });
    }
    if (state.confirmPassword.trim() === "") {
      setError((prevState) => {
        return {
          ...prevState,
          confirmPassword: "Please confirm your password",
        };
      });
      confirmPasswordRef.current.classList.add("is-invalid");
      confirmPasswordRef.current.focus();
      return;
    } else if (state.confirmPassword !== state.password) {
      setError((prevState) => {
        return {
          ...prevState,
          confirmPassword: "Passwords do not match",
        };
      });
      confirmPasswordRef.current.classList.add("is-invalid");
      confirmPasswordRef.current.focus();
      return;
    } else {
      confirmPasswordRef.current.classList.remove("is-invalid");
      setError((prevState) => {
        return { ...prevState, confirmPassword: "" };
      });
    }
    setIsSubmitting(true);
    setError((prevState) => {
      return {
        ...prevState,
        submit: "",
      };
    });
    Axios.post(process.env.REACT_APP_BACKEND_URL + "/users/register/", state)
      .then((res) => {
        console.log("res", res);
        setState({
          fullName: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setIsSubmitting(false);
      })
      .catch((error) => {
        setIsSubmitting(false);
        if (error.response.data.msg) {
          setError((prevState) => {
            return {
              ...prevState,
              submit: error.response.data.msg,
            };
          });
        } else {
          setError((prevState) => {
            return {
              ...prevState,
              submit: "Something went wrong, Try again after sometime.",
            };
          });
        }
      });
  };
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
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 mt-4">
              <span>Full Names</span>
              <input
                type="text"
                placeholder="Your names"
                className="form-control"
                ref={fullNameRef}
                value={state.fullName}
                onChange={(e) => {
                  setState((prevState) => {
                    return { ...prevState, fullName: e.target.value };
                  });
                }}
                disabled={isSubmitting}
              />
              <span className="error">{error.fullName}</span>
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
                  ref={phoneRef}
                  onChange={(e) => {
                    setState((prevState) => {
                      return { ...prevState, phone: e.target.value };
                    });
                  }}
                  disabled={isSubmitting}
                />
              </div>
              <span className="error">{error.phone}</span>
            </div>
            <div className="form-group mb-3 mt-4">
              <span>Email address</span>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="form-control"
                ref={emailRef}
                onChange={(e) => {
                  setState((prevState) => {
                    return { ...prevState, email: e.target.value };
                  });
                }}
                disabled={isSubmitting}
              />
              <span className="error">{error.email}</span>
            </div>
            <div className="form-group mb-3">
              <span>Password</span>
              <input
                type="password"
                placeholder="***************"
                className="form-control"
                ref={passwordRef}
                onChange={(e) => {
                  setState((prevState) => {
                    return { ...prevState, password: e.target.value };
                  });
                }}
                disabled={isSubmitting}
              />
              <span className="error">{error.password}</span>
            </div>
            <div className="form-group mb-3">
              <span>Confirm password</span>
              <input
                type="password"
                placeholder="***************"
                className="form-control"
                ref={confirmPasswordRef}
                onChange={(e) => {
                  setState((prevState) => {
                    return { ...prevState, confirmPassword: e.target.value };
                  });
                }}
                disabled={isSubmitting}
              />
              <span className="error">{error.confirmPassword}</span>
            </div>
            {error.submit !== "" && (
              <div className="alert alert-danger mb-3">{error.submit}</div>
            )}
            <button disabled={isSubmitting} className="mb-3">
              {isSubmitting && (
                <span>
                  <Spinner animation="border" size="sm" />
                </span>
              )}{" "}
              SignUp
            </button>
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
