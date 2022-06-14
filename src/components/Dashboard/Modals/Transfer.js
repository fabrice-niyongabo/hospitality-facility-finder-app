import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { errorHandler, toastMessage } from "../../../helpers";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
  }, [showModal]);

  const handleTransfer = () => {
    setShowLoader(true);
    fetch("https://api.flutterwave.com/v3/transfers", {
      method: "post",
      headers: new Headers({
        Authorization: "Bearer" + process.env.REACT_APP_SECRET_KEY,
        "Content-Type": "application/json",
      }),
      body: {
        account_bank: "MPS",
        account_number: 250 + "" + owner.phone,
        amount: 50,
        narration: "New RWF momo transfer",
        currency: "RWF",
        reference: "new-rwf-momo-transfer",
        beneficiary_name: "Flutterwave Developers",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setShowLoader(false);
        console.log(data);
      })
      .catch((error) => {
        // console.log(error);
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
              <p className="p-0 m-0">Address: {tx?.facility[0]?.address}</p>
              <p className="p-0 m-0">Phone: 0{owner.phone}</p>
              <div className="border p-2">
                <p className="p-0 m-0">
                  Paid amount: {tx?.facility[0]?.totalAmount}
                </p>
                <p className="p-0 m-0">
                  Incame: {(tx?.totalAmount * 7) / 100} RWF
                </p>
                <p className="p-0 m-0">
                  Amount to be transfered: {(tx?.totalAmount * 93) / 100} RWF
                </p>
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
