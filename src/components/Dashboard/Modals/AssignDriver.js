import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { errorHandler, toastMessage } from "../../../helpers";
import { useSelector } from "react-redux";
function AssignDriver({
  tx,
  setTx,
  showModal,
  setShowModal,
  setShowLoader,
  loadData,
}) {
  const { token } = useSelector((state) => state.user);
  const [driverId, setDriverId] = useState("");
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    if (tx._id) {
      setShowLoader(true);
      setDriverId(tx.driverId);
      Axios.get(
        process.env.REACT_APP_BACKEND_URL + "/drivers/find2/?token=" + token
      )
        .then((res) => {
          setShowLoader(false);
          setDrivers(res.data.result);
        })
        .catch((error) => {
          errorHandler(error);
          setShowLoader(false);
        });
    }
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    Axios.post(process.env.REACT_APP_BACKEND_URL + "/transport/update/", {
      driverId: driverId,
      id: tx._id,
      token,
    })
      .then((res) => {
        setTx({});
        setShowModal(false);
        toastMessage("success", res.data.msg);
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

          setShowModal(false);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Driver</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group my-2">
              <label>Driver ID</label>
              <select
                className="form-select"
                onChange={(e) => setDriverId(e.target.value)}
                value={driverId}
                required
              >
                <option value=""></option>
                {drivers
                  .filter((item) => item.language === tx.driverLanguage)
                  .map((item, i) => (
                    <option key={i} value={item?.driverId}>
                      {item?.name}
                    </option>
                  ))}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
export default AssignDriver;
