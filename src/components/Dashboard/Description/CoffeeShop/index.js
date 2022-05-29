import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAuthError,
  toastMessage,
  uploadImage,
  useLoadBasicData,
} from "../../../../helpers";
import Axios from "axios";
import "../../../../styles/description.scss";
import { setuserCompanyName } from "../../../../actions/user";
import { Link } from "react-router-dom";
function CoffeeShop({ user, setShowLoader }) {
  const dispatch = useDispatch();
  const loadBasics = useLoadBasicData();
  const facility = useSelector((state) => state.facility).details;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [stars, setStars] = useState("");
  const [averagePrice, setAveragePrice] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setShowLoader(true);
    Axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/facility/detail/?token=" +
        user.token
    )
      .then((res) => {
        setName(res.data.result[0].name);
        setDescription(res.data.result[0].description);
        setAddress(res.data.result[0].address);
        setStars(res.data.result[0].stars);
        setAveragePrice(res.data.result[0].averagePrice);
        dispatch(setuserCompanyName(res.data.result[0].name));
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
        handleAuthError(error);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (image != null) {
      uploadImage(image)
        .then((res) => {
          const { fileName } = res.data;
          Axios.post(
            process.env.REACT_APP_BACKEND_URL + "/facility/updateFacility/",
            {
              name,
              description,
              address,
              stars,
              averagePrice,
              image: fileName,
              token: user.token,
            }
          )
            .then((res) => {
              console.log(res.data.result);
              setIsSubmitting(false);
              dispatch(setuserCompanyName(name));
              toastMessage("success", "Description updated successfull");
            })
            .catch((error) => {
              setIsSubmitting(false);
              handleAuthError(error);
              console.log(error);
              if (error.response.data.msg) {
                setMessage(error.response.msg);
                toastMessage("error", error.response.data.msg);
              } else {
                setMessage(error.message);
                toastMessage("error", error.message);
              }
            });
        })
        .catch((error) => {
          setIsSubmitting(false);
          toastMessage("error", error.message);
        });
    } else {
      Axios.post(
        process.env.REACT_APP_BACKEND_URL + "/facility/updateFacility/",
        {
          name,
          description,
          address,
          stars,
          averagePrice,
          image: "",
          token: user.token,
        }
      )
        .then((res) => {
          setIsSubmitting(false);
          dispatch(setuserCompanyName(name));
          toastMessage("success", "Description updated successfull");
        })
        .catch((error) => {
          setIsSubmitting(false);
          handleAuthError(error);
          console.log(error);
          if (error.response.msg) {
            setMessage(error.response.msg);
            toastMessage("error", error.response.msg);
          } else {
            setMessage(error.message);
            toastMessage("error", error.message);
          }
        });
    }
  };
  return (
    <>
      <div className="contents-header">
        <div className="title">
          <FaHome color="black" size={30} />
          <Link to="/">
            <span>Back To Home Page</span>
          </Link>
        </div>
        <div className="company">{user.companyName}</div>
      </div>
      <form onSubmit={onSubmit}>
        <div className="main-contents-container" style={{ padding: "1rem" }}>
          <div className="info-container">
            <div className="header">Restaurant information</div>
          </div>
          <div className="info-container mt-4">
            <div className="info-contents">
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Restaurant Name"
                  value={name}
                  disabled={isSubmitting}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <textarea
                className="form-control"
                placeholder="Description"
                required
                disabled={isSubmitting}
                onChange={(t) => setDescription(t.target.value)}
                defaultValue={description}
              />
              <div className="row">
                <div className="col-md-6">
                  <label>Restaurant address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(t) => setAddress(t.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label>Average price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={averagePrice}
                    disabled={isSubmitting}
                    onChange={(t) => setAveragePrice(t.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Restaurant stars</label>
                  <select
                    className="form-control"
                    value={stars}
                    onChange={(t) => setStars(t.target.value)}
                    required
                  >
                    <option value={stars}>{stars} stars</option>
                    <option value="0">0 stars</option>
                    <option value="1">1 stars</option>
                    <option value="2">2 stars</option>
                    <option value="3">3 stars</option>
                    <option value="4">4 stars</option>
                    <option value="5">5 stars</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label>Restaurant image (optional)</label>
                  <input
                    type="file"
                    onChange={(t) => setImage(t.target.files[0])}
                    disabled={isSubmitting}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="info-container mt-4 p-3">
            <div className="text-end">
              <span className="text-danger">{message}</span>
              <button className="btn" disabled={isSubmitting}>
                {isSubmitting ? "Saving changes..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default CoffeeShop;
