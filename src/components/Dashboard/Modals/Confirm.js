import React from "react";
import { Button, Modal } from "react-bootstrap";

function Confirm({ showConfirm, setShowConfirm, callBack }) {
  return (
    <Modal
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showConfirm}
      onHide={() => setShowConfirm(false)}
    >
      <Modal.Body>
        <h4 className="text-dark">Confirm</h4>
        <p>Do you want to perform this process?</p>
        <div className="text-end">
          <Button onClick={() => setShowConfirm(false)} variant="secondary">
            Not sure
          </Button>
          &nbsp; &nbsp;
          <Button
            onClick={() => {
              callBack();
              setShowConfirm(false);
            }}
          >
            Yeah, sure!
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Confirm;
