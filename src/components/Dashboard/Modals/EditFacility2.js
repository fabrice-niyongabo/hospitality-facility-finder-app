import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { errorHandler, toastMessage } from "../../../helpers";
import { useSelector } from "react-redux";
function EditFacility2({
  showModal,
  setShowModal,
  setShowLoader,
  facility,
  getCors,
  getData,
  users,
  fetchData,
}) {
  const { token } = useSelector((state) => state.user);
  const [applicant, setApplicant] = useState([]);
  useEffect(() => {
    if (showModal) {
      getCors();
      setApplicant(users.filter((item) => item._id === facility.managerId));
    }
  }, [showModal]);

  const handleApprove = () => {
    setShowLoader(true);
    Axios.post(process.env.REACT_APP_BACKEND_URL + "/facility/approve/", {
      token,
      f_id: facility._id,
      m_id: facility.managerId,
      f_t: facility.type,
      f_n: facility.name,
    })
      .then((res) => {
        setShowModal(false);
        toastMessage("success", res.data.msg);
        getData();
        fetchData();
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
  };
  const handleReject = () => {
    setShowLoader(true);
    Axios.post(process.env.REACT_APP_BACKEND_URL + "/facility/reject/", {
      token,
      f_id: facility._id,
    })
      .then((res) => {
        setShowModal(false);
        toastMessage("success", res.data.msg);
        getData();
        fetchData();
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
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Application for new facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group my-2">Name: {facility?.name}</div>
          <div className="form-group my-2">
            Average price: {facility?.averagePrice} RWF
          </div>
          <div className="form-group my-2">Facility Type: {facility?.type}</div>
          <div className="form-group my-2">
            Description: <p>{facility?.description}</p>
          </div>
          <div className="form-group my-2">
            <label>Applicant details</label>
            <p className="m-0 p-0">Name: {applicant[0]?.fullName}</p>
            <p className="m-0 p-0">Phone: {applicant[0]?.phone}</p>
            <p className="m-0 p-0">Email: {applicant[0]?.email}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="secondary" onClick={handleReject}>
            Reject
          </Button>
          <Button type="submit" variant="primary" onClick={handleApprove}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditFacility2;