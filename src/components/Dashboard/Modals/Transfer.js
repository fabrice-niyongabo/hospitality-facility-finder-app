import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { errorHandler, randomNumber, toastMessage } from "../../../helpers";
import { useSelector } from "react-redux";
import { percentage } from "../../../constansts";
function Transfer({
  tx,
  setTx,
  showModal,
  setShowModal,
  setShowLoader,
  loadData,
}) {
  const { token } = useSelector((state) => state.user);
  const [owner, setOwner] = useState({});
  const [refNumber, setRefNumber] = useState("");

  useEffect(() => {
    if (tx._id) {
      setShowLoader(true);
      Axios.post(process.env.REACT_APP_BACKEND_URL + "/users/userInfo/", {
        i: tx.facility[0].managerId,
        token,
      })
        .then((res) => {
          setShowLoader(false);
          setOwner(res.data.result[0]);
        })
        .catch((error) => {
          errorHandler(error);
          setShowLoader(false);
        });
    }
    setRefNumber(randomNumber());
  }, [showModal]);

  const handleTransfer = () => {
    setShowLoader(true);
    Axios.post(process.env.REACT_APP_BACKEND_URL + "/transfers/send/", {
      token,
      phone: "0" + owner.phone,
      names: tx?.facility[0]?.name,
      refNumber,
      amount: tx.totalAmount
        ? (tx.totalAmount * (100 - percentage)) / 100
        : (tx.amountPaid * (100 - percentage)) / 100,
      type: tx.transportationManagerId ? "transport" : tx?.facility[0]?.type,
      id: tx?._id,
    })
      .then((res) => {
        setShowLoader(false);
        toastMessage("success", res.data.msg);
        setShowModal(false);
        loadData();
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
  };
  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => {
          setTx({});
          setOwner({});
          setShowModal(false);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Transfer payment to facility owner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Facility details</h4>
          {tx.facility && (
            <>
              <p className="p-0 m-0">Facility Name: {tx?.facility[0]?.name}</p>
              <p className="p-0 m-0">Owner Name: {owner.fullName}</p>
              <p className="p-0 m-0">Address: {tx?.facility[0]?.address}</p>
              <p className="p-0 m-0">Phone: 0{owner.phone}</p>
              <div className="border p-2">
                {tx.totalAmount && (
                  <>
                    <p className="p-0 m-0">
                      Paid amount: {tx?.facility[0]?.totalAmount}
                    </p>
                    <p className="p-0 m-0">
                      Incame: {(tx?.totalAmount * percentage) / 100} RWF
                    </p>
                    <p className="p-0 m-0">
                      Amount to be transfered:{" "}
                      {(tx?.totalAmount * (100 - percentage)) / 100} RWF
                    </p>
                    <div className="form-group border p-2">
                      <label>Reference ID</label>
                      &nbsp; &nbsp;
                      <a href="#" onClick={() => setRefNumber(randomNumber())}>
                        Update REF ID
                      </a>
                      <input
                        type="text"
                        className="form-control"
                        value={refNumber}
                        disabled={true}
                      />
                    </div>
                  </>
                )}
                {tx.amountPaid && (
                  <>
                    <p className="p-0 m-0">
                      Paid amount: {tx?.facility[0]?.amountPaid}
                    </p>
                    <p className="p-0 m-0">
                      Incame: {(tx?.amountPaid * percentage) / 100} RWF
                    </p>
                    <p className="p-0 m-0">
                      Amount to be transfered:{" "}
                      {(tx?.amountPaid * (100 - percentage)) / 100} RWF
                    </p>
                    <div className="form-group border p-2">
                      <label>Reference ID</label>
                      &nbsp; &nbsp;
                      <a href="#" onClick={() => setRefNumber(randomNumber())}>
                        Update REF ID
                      </a>
                      <input
                        type="text"
                        className="form-control"
                        value={refNumber}
                        disabled={true}
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="primary"
            onClick={() => handleTransfer()}
          >
            Transfer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Transfer;
