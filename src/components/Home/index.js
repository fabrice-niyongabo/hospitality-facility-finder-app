import React, { useEffect, useRef } from "react";
import Header from "../Header";

import "../../styles/home.scss";
import Facilities from "./Facilities";
import Footer from "../Footer";
import { useDispatch } from "react-redux";
import { fetchCart } from "../../actions/cart";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  return (
    <div>
      <Header />
      <div className="welcome-main-container">
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6">
              <div className="welcome-container">
                <h2>
                  Online Hospitality facility finder system a right place.
                </h2>
                <p>
                  In case you want to access the near by hospitality facilities
                  services this is the right place for you.
                </p>
                <h3>Want nearby facilities on the map? click below</h3>
                <div className="text-center">
                  <Link to="/map">
                    <button>View on map</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <img
                style={{ width: "100%" }}
                src={require("../../assets/features.png")}
                alt="features"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <hr />
        <div className="nearest-facilities-list-tab mb-4">
          <h2>Nearest facilities list</h2>
          {/* <div>
            <h2>need taxi to destination click here</h2>
            <button>Book car</button>
          </div> */}
        </div>
      </div>
      <Facilities />
      <div className="container mt-5 pt-5 mb-5">
        <div className="about-main-container">
          <h2>About HFfinder</h2>
          <p>
            This is system that links the tourists and hospitality facilities
            owners. This is done in such way that people can view the nearby
            their location Hospitality facilities and be able to access their
            services aswell as pay on the system.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
