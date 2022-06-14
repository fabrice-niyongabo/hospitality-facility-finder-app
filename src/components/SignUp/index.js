import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setuserCompanyName,
  setUserEmail,
  setUserFullName,
  setUserPhone,
  setUserRole,
  setUserToken,
} from "../../actions/user";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userObj = useSelector((state) => state.user);
  const [state, setState] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    createFacility: false,
    facilityName: "",
    facilityType: "",
    averagePrice: "",
    description: "",
  });
  const [error, setError] = useState({
    fullName: "",
    phone: "",
    email: "",
    submit: "",
    password: "",
    confirmPassword: "",
    facilityName: "",
    facilityType: "",
    averagePrice: "",
    description: "",
  });

  useEffect(() => {
    if (userObj.token.trim() !== "") {
      navigate("/");
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const validPhoneCode = ["8", "9", "2", "3"];

  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const facilityNameRef = useRef(null);
  const facilityTypeRef = useRef(null);
  const averagePriceRef = useRef(null);
  const descriptionRef = useRef(null);

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
    if (state.createFacility) {
      if (state.facilityName.trim() === "") {
        setError((prevState) => {
          return { ...prevState, facilityName: "This field can not be empty" };
        });
        facilityNameRef.current.classList.add("is-invalid");
        facilityNameRef.current.focus();
        return;
      } else {
        facilityNameRef.current.classList.remove("is-invalid");
        setError((prevState) => {
          return { ...prevState, facilityName: "" };
        });
      }
      if (state.averagePrice.trim() === "") {
        setError((prevState) => {
          return { ...prevState, averagePrice: "This field can not be empty" };
        });
        averagePriceRef.current.classList.add("is-invalid");
        averagePriceRef.current.focus();
        return;
      } else {
        averagePriceRef.current.classList.remove("is-invalid");
        setError((prevState) => {
          return { ...prevState, averagePrice: "" };
        });
      }
      if (state.facilityType.trim() === "") {
        setError((prevState) => {
          return { ...prevState, facilityType: "This field can not be empty" };
        });
        facilityTypeRef.current.classList.add("is-invalid");
        facilityTypeRef.current.focus();
        return;
      } else {
        facilityTypeRef.current.classList.remove("is-invalid");
        setError((prevState) => {
          return { ...prevState, facilityType: "" };
        });
      }
      if (state.description.trim() === "") {
        setError((prevState) => {
          return { ...prevState, description: "This field can not be empty" };
        });
        descriptionRef.current.classList.add("is-invalid");
        descriptionRef.current.focus();
        return;
      } else {
        descriptionRef.current.classList.remove("is-invalid");
        setError((prevState) => {
          return { ...prevState, description: "" };
        });
      }
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
        dispatch(setUserFullName(res.data.fullName));
        dispatch(setUserPhone(res.data.phone));
        dispatch(setUserEmail(res.data.email));
        dispatch(setuserCompanyName(res.data.companyName));
        dispatch(setUserRole(res.data.role));
        dispatch(setUserToken(res.data.token));
        navigate("/");
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
            <div className="form-group mb-3">
              <input
                type="checkbox"
                disabled={isSubmitting}
                onChange={(e) =>
                  setState((prevState) => {
                    return {
                      ...prevState,
                      createFacility: !prevState.createFacility,
                    };
                  })
                }
              />
              &nbsp;&nbsp;<small>Create facility</small>
            </div>
            {state.createFacility && (
              <>
                <div className="form-group mb-3">
                  <span>Facility Name</span>
                  <input
                    type="text"
                    placeholder="Enter facility name"
                    className="form-control"
                    ref={facilityNameRef}
                    onChange={(e) => {
                      setState((prevState) => {
                        return { ...prevState, facilityName: e.target.value };
                      });
                    }}
                    disabled={isSubmitting}
                  />
                  <span className="error">{error.facilityName}</span>
                </div>
                <div className="form-group mb-3">
                  <span>Average Price</span>
                  <input
                    type="number"
                    placeholder="Average price"
                    className="form-control"
                    ref={averagePriceRef}
                    onChange={(e) => {
                      setState((prevState) => {
                        return { ...prevState, averagePrice: e.target.value };
                      });
                    }}
                    disabled={isSubmitting}
                  />
                  <span className="error">{error.averagePrice}</span>
                </div>
                <div className="form-group mb-3">
                  <span>Facility Type</span>
                  <select
                    className="form-select"
                    ref={facilityTypeRef}
                    onChange={(e) => {
                      setState((prevState) => {
                        return { ...prevState, facilityType: e.target.value };
                      });
                    }}
                    disabled={isSubmitting}
                  >
                    <option value="">choose</option>
                    <option value="hotel">Hotel</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="coffeeshop">Coffee Shop</option>
                  </select>
                  <span className="error">{error.facilityType}</span>
                </div>
                <div className="form-group mb-3">
                  <span>Description</span>
                  <textarea
                    type="number"
                    placeholder="Describe your facility"
                    className="form-control"
                    ref={descriptionRef}
                    onChange={(e) => {
                      setState((prevState) => {
                        return { ...prevState, description: e.target.value };
                      });
                    }}
                    disabled={isSubmitting}
                  />
                  <span className="error">{error.description}</span>
                </div>
              </>
            )}
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
