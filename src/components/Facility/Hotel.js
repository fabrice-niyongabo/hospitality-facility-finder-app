import { Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Axios from "axios";
function Hotel({ id }) {
  const [services, setServices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [servicesError, setServicesError] = useState("");
  const [roomsError, setRoomsError] = useState("");

  useEffect(() => {
    Axios.get(process.env.REACT_APP_BACKEND_URL + "/facility/services/" + id)
      .then((res) => {
        setIsLoadingServices(false);
        setServices(res.data.result);
      })
      .catch((error) => {
        setIsLoadingServices(false);
        setServicesError(error.message);
      });

    Axios.get(process.env.REACT_APP_BACKEND_URL + "/facility/rooms/" + id)
      .then((res) => {
        console.log(res.data);
        setIsLoadingRooms(false);
        setRooms(res.data.result);
      })
      .catch((error) => {
        setIsLoadingRooms(false);
        setRoomsError(error.message);
      });
  }, []);
  return (
    <>
      <div style={{ padding: "5rem" }} className="quicksand-font ">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #000",
            padding: "1rem",
          }}
          className="text-orange"
        >
          <h2>Services we offer</h2>
          <a
            href="/"
            className="text-orange"
            style={{ textDecoration: "none" }}
          >
            <div>
              <BiArrowBack size={30} /> Back to home
            </div>
          </a>
        </div>
        <div style={{ padding: "0px 5rem", marginTop: "3rem" }}>
          {isLoadingServices ? (
            <div className="row">
              <div className="col-md-6">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={150}
                  className="my-2"
                  style={{ borderRadius: 20 }}
                  animation="wave"
                />
              </div>
              <div className="col-md-6">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={150}
                  className="my-2"
                  style={{ borderRadius: 20 }}
                  animation="wave"
                />
              </div>
              <div className="col-md-6">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={150}
                  className="my-2"
                  style={{ borderRadius: 20 }}
                  animation="wave"
                />
              </div>
              <div className="col-md-6">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={150}
                  className="my-2"
                  style={{ borderRadius: 20 }}
                  animation="wave"
                />
              </div>
            </div>
          ) : (
            <>
              {services.length > 0 ? (
                <div className="row">
                  {services.map((item, i) => (
                    <div className="col-md-6 mb-3" key={i}>
                      <div
                        style={{
                          padding: "2rem",
                          borderRadius: 10,
                          border: "10px solid #f1e8d7",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {servicesError === "" ? (
                    <p>No services found</p>
                  ) : (
                    <p>{servicesError}</p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="text-center">
        <h1 className="quicksand-font text-orange">Explore our rooms</h1>
      </div>
      <div
        className="mt-5 m-3 p-4"
        style={{ borderRadius: 10, border: "15px solid #f1e8d7" }}
      >
        {isLoadingRooms ? (
          <>
            <div className="mb-5">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="70%"
                  height={25}
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width="20%"
                  height={25}
                  animation="wave"
                />
              </div>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={80}
                animation="wave"
                className="mt-3"
              />
            </div>
            <div className="mb-5">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="70%"
                  height={25}
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width="20%"
                  height={25}
                  animation="wave"
                />
              </div>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={80}
                animation="wave"
                className="mt-3"
              />
            </div>
            <div className="">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="70%"
                  height={25}
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width="20%"
                  height={25}
                  animation="wave"
                />
              </div>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={80}
                animation="wave"
                className="mt-3"
              />
            </div>
          </>
        ) : (
          <>
            {rooms.length > 0 ? (
              <>
                {rooms.map((item, i) => (
                  <div key={i}>
                    <div
                      style={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        display: "flex",
                      }}
                      className="quicksand-font mb-3"
                    >
                      <h2 style={{ textTransform: "capitalize" }}>
                        {item.type}
                      </h2>
                      <button
                        className="bg-orange text-white"
                        style={{
                          boxShadow: "0px 16px 12px rgba(0, 0, 0, 0.25)",
                          borderRadius: "20px",
                          padding: "0.7rem 2.5rem",
                          border: "none",
                          fontSize: "30px",
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                    <div
                      style={{
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        display: "flex",
                        border: "5px solid #f46a06",
                        borderRadius: 15,
                      }}
                      className="mb-5"
                    >
                      <div style={{ width: "50%" }}>
                        <LazyLoadImage
                          alt={item.roomNumber}
                          effect="blur"
                          src={
                            process.env.REACT_APP_BACKEND_FILE_URL + item.image
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                          }}
                        />
                      </div>
                      <div style={{ width: "100%", padding: "1rem" }}>
                        <h3 className="text-orange quicksand-font">
                          Room Description
                        </h3>
                        <div className="px-3 roboto-font mb-3">
                          {item.description}
                        </div>
                        <div
                          className="bg-light-orange"
                          style={{ borderRadius: 10, padding: "1rem" }}
                        >
                          <div
                            style={{
                              alignItems: "flex-center",
                              justifyContent: "space-between",
                              display: "flex",
                            }}
                            className="quicksand-font"
                          >
                            <h4>Room Price</h4>
                            <div>
                              <h4>{item.price}/RWF</h4>
                              <h4>{item.price}/USD</h4>
                            </div>
                          </div>
                          <div
                            style={{
                              alignItems: "flex-center",
                              justifyContent: "space-between",
                              display: "flex",
                            }}
                            className="quicksand-font"
                          >
                            <h4>Room Availability</h4>
                            <h4>-</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>{roomsError === "" ? "No rooms found" : <>{roomsError}</>}</>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Hotel;
