import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import {
  errorHandler,
  handleAuthError,
  toastMessage,
  uploadImage,
} from "../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { setRooms } from "../../../actions/facility";
function AddRestaurantItem({
  showModal,
  setShowModal,
  setShowLoader,
  itemsList,
  setItemsList,
}) {
  const { token, role } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    setName("");
    setQuantity();
    setPrice();
    setDescription("");
    setCategory("");
    setImage(null);
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    uploadImage(image)
      .then((res) => {
        const { fileName } = res.data;
        Axios.post(
          process.env.REACT_APP_BACKEND_URL + "/restaurant/item/add/",
          {
            name,
            quantity,
            price,
            description,
            category,
            image: fileName,
            token,
          }
        )
          .then((response) => {
            setShowLoader(false);
            setShowModal(false);
            toastMessage("success", "Item has been added successful");
            setItemsList([...itemsList, response.data.menu]);
          })
          .catch((error) => {
            setShowLoader(false);
            errorHandler(error);
          });
      })
      .catch((error) => {
        setShowLoader(false);
        if (error.msg) {
          toastMessage("error", error.msg);
        } else {
          toastMessage("error", error.message);
        }
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
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group my-2">
              <label>Item name</label>
              <input
                type="text"
                placeholder="Item name"
                className="form-control"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group my-2">
              <label>Item quantity</label>
              <input
                type="number"
                placeholder="Quantity"
                className="form-control"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="form-group my-2">
              <label>Item price (RWF)</label>
              <input
                type="number"
                placeholder="Price"
                className="form-control"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group my-2">
              <label>Item description</label>
              <textarea
                placeholder="Description"
                className="form-control"
                required
                onChange={(e) => setDescription(e.target.value)}
              >
                {description}
              </textarea>
            </div>
            <div className="form-group my-2">
              <label>Item category</label>
              <select
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">choose category</option>
                {role === "restaurant" ? (
                  <option value="Main dishes">Main dishes</option>
                ) : (
                  <option value="Coffee">Coffee</option>
                )}
                <option value="Drinks">Drinks</option>
                <option value="Snaks">Snaks</option>
              </select>
            </div>
            <div className="form-group my-2">
              <span>Item image</span>
              <input
                type="file"
                className="form-control"
                required
                onChange={(t) => setImage(t.target.files[0])}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Save Item
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default AddRestaurantItem;
