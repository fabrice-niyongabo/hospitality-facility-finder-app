import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Dashboard/Modals/Loader";
import Axios from "axios";
import { errorHandler } from "../../helpers";
import { useSelector } from "react-redux";
function Print() {
  const { token, fullName, email } = useSelector((state) => state.user);
  const [showLoader, setShowLoader] = useState(true);
  const params = useParams();
  const { id, status } = params;
  const [results, setResults] = useState([]);
  useEffect(() => {
    if (status === "customerTransportId") {
      Axios.get(
        process.env.REACT_APP_BACKEND_URL +
          "/transport/print/" +
          id +
          "?token=" +
          token
      )
        .then((res) => {
          setShowLoader(false);
          if (res.data.result?._id) {
            setResults([res.data.result]);
            setTimeout(() => {
              window.print();
            }, 500);
          }
        })
        .catch((error) => {
          errorHandler(error);
          setShowLoader(false);
        });
    }
  }, []);
  return (
    <div>
      <img src={require("../../assets/logo.png")} />
      {status === "customerTransportId" && (
        <div>
          <h1>DRIVER PAYMENT ID</h1>
          {results.length > 0 && (
            <>
              <p>
                <b>departureDate:</b> {results[0].departureDate}
              </p>
              <p>
                <b>departureTime:</b> {results[0].departureTime}
              </p>
              <p>
                <b>transactionId:</b> {results[0].transactionId}
              </p>
              <p>
                <b>driverLanguage:</b> {results[0].driverLanguage}
              </p>
              <p>
                <b>Payment ID:</b> {results[0].paymentId}
              </p>
              <p>
                <b>Amount to be paid:</b> {results[0].amountPaid}
              </p>
              <p>
                <b>Amount paid:</b> {results[0].amountPaid}
              </p>
              <p>
                <b>status:</b> {results[0].status}
              </p>
              <p>
                <b>Customer Name:</b> {fullName}
              </p>
              <p>
                <b>Customer Email:</b> {email}
              </p>
            </>
          )}
        </div>
      )}
      <Loader showLoader={showLoader} />
    </div>
  );
}

export default Print;
