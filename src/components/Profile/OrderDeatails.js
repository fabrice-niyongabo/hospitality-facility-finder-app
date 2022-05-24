import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { useSelector } from "react-redux";
import { errorHandler } from "../../helpers";
import { Spinner } from "react-bootstrap";
function OrderDetails({ showModal, setShowModal, orderId, setOrderId }) {
  const { token } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  useEffect(() => {
    fetchData();
  }, [showModal]);

  const fetchData = () => {
    setIsLoading(true);
    setResults([]);
    if (orderId !== null) {
      Axios.get(
        process.env.REACT_APP_BACKEND_URL +
          "/profile/orderDetails/" +
          orderId +
          "/?token=" +
          token
      )
        .then((res) => {
          setIsLoading(false);
          setResults(res.data.result);
        })
        .catch((error) => {
          setIsLoading(false);
          errorHandler(error);
        });
    }
  };
  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => {
          setOrderId(null);
          setShowModal(false);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Order details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading && (
            <div className="text-center">
              <Spinner animation="border" size="lg" />
            </div>
          )}
          {results.map((item, i) => (
            <div className="card mb-3">
              <div className="card-body">
                <div className="row ">
                  <div className="col-3">
                    <img
                      src={
                        process.env.REACT_APP_BACKEND_FILE_URL + item.menuImage
                      }
                      className="w-100"
                      style={{ borderRadius: 10 }}
                    />
                  </div>
                  <div className="col">
                    <h3 style={{ fontSize: 18 }} className="quicksand-font">
                      {item.menuName}
                    </h3>
                    <p className="p-0 m-0 roboto-font">
                      {item.menuDescription}
                    </p>
                    <p className="p-0 m-0 roboto-font">
                      Quantity: {item.quantity}
                    </p>
                    <p className="p-0 m-0 roboto-font">Price: {item.price}</p>
                    <p className="p-0 m-0 roboto-font">
                      Total: {item.price * item.quantity} RWF
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default OrderDetails;
