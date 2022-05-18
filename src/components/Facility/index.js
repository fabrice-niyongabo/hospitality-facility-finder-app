import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import PlaceHolder from "./PlaceHolder";
import Axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { RiStarSFill } from "react-icons/ri";
import Hotel from "./Hotel";
import Restaurant from "./Restaurant";
function Facility() {
  const { id } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [facility, setFacility] = useState(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    Axios.post(process.env.REACT_APP_BACKEND_URL + "/facility/find/", { id })
      .then((res) => {
        setFacility(res.data.result[0]);
        console.log(res.data.result[0]);
        setisLoading(false);
      })
      .catch((error) => {});
  }, []);

  function handleResize() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWidth]);

  const displaStars = (stars) => {
    if (stars == 0) {
      return (
        <>
          <RiStarSFill size={20} color="#555555" />
          <RiStarSFill size={20} color="#555555" />
          <RiStarSFill size={20} color="#555555" />
          <RiStarSFill size={20} color="#555555" />
          <RiStarSFill size={20} color="#555555" />
        </>
      );
    } else if (stars == 1) {
      return (
        <>
          <RiStarSFill size={20} color="#f46a06" />
          <RiStarSFill size={20} color="#555555" />
          <RiStarSFill size={20} color="#555555" />
          <RiStarSFill size={20} color="#555555" />
          <RiStarSFill size={20} color="#555555" />
        </>
      );
    } else if (stars == 2) {
      return (
        <>
          <RiStarSFill size={20} color="#f46a06" />
          <RiStarSFill size={20} color="#f46a06" />
          <RiStarSFill size={20} color="#555555" />
          <RiStarSFill size={20} color="#555555" />
          <RiStarSFill size={20} color="#555555" />
        </>
      );
    } else if (stars == 3) {
      return (
        <>
          <RiStarSFill size={20} color="#f46a06" />
          <RiStarSFill size={20} color="#f46a06" />
          <RiStarSFill size={20} color="#f46a06" />
          <RiStarSFill size={20} color="#555555" />
          <RiStarSFill size={20} color="#555555" />
        </>
      );
    } else if (stars == 4) {
      <>
        <RiStarSFill size={20} color="#f46a06" />
        <RiStarSFill size={20} color="#f46a06" />
        <RiStarSFill size={20} color="#f46a06" />
        <RiStarSFill size={20} color="#f46a06" />
        <RiStarSFill size={20} color="#555555" />
      </>;
    } else if (stars == 5) {
      <>
        <RiStarSFill size={20} color="#f46a06" />
        <RiStarSFill size={20} color="#f46a06" />
        <RiStarSFill size={20} color="#f46a06" />
        <RiStarSFill size={20} color="#f46a06" />
        <RiStarSFill size={20} color="#f46a06" />
      </>;
    } else {
      return (
        <>
          <RiStarSFill size={20} color="#555555" />
          <RiStarSFill size={20} color="#555555" />
          <RiStarSFill size={20} color="#555555" />
          <RiStarSFill size={20} color="#555555" />
          <RiStarSFill size={20} color="#555555" />
        </>
      );
    }
  };
  return (
    <>
      <Header />
      {isLoading ? (
        <PlaceHolder />
      ) : (
        <>
          <div>
            <LazyLoadImage
              alt={facility.name}
              effect="blur"
              src={process.env.REACT_APP_BACKEND_FILE_URL + facility.image}
              style={{
                height: "100vh",
                width,
                borderEndStartRadius: 50,
                borderEndEndRadius: 50,
              }}
            />
          </div>
          <div
            style={{
              marginTop: "-150px",
              position: "relative",
            }}
          >
            <div style={{ padding: "0px 10rem" }}>
              <h2 className="text-white">
                Starting from {facility.averagePrice} RWF
              </h2>
              <div className="px-5">
                <div
                  className="bg-light-orange"
                  style={{
                    boxShadow: "0px 14px 48px rgba(0, 0, 0, 0.25)",
                    borderRadius: "20px",
                    padding: "2rem 5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3>{facility.name}</h3>
                    <div>{displaStars(facility.stars)} stars</div>
                  </div>
                  <div
                    style={{
                      marginTop: "1rem",
                      borderTop: "1px solid #f46a06",
                      margin: "0 2rem",
                      paddingTop: "1rem",
                    }}
                  >
                    <h2
                      className="text-orange quicksand-font"
                      style={{ textTransform: "capitalize" }}
                    >
                      {facility.type} Description
                    </h2>
                    <div className="p-3 roboto-font">
                      {facility.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* body */}
          {facility.type === "hotel" && <Hotel id={facility.managerId} />}
          {facility.type === "restaurant" && (
            <Restaurant id={facility.managerId} />
          )}
          {/* body */}
        </>
      )}
    </>
  );
}

export default Facility;
