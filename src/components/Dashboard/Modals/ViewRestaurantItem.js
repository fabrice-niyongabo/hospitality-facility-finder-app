import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Axios from "axios";
import { errorHandler, toastMessage } from "../../../helpers";
import { useSelector } from "react-redux";
function ViewRestaurantItem({
  item,
  showPreview,
  setShowPreview,
  setShowLoader,
  setItemsList,
  itemsList,
}) {
  const { token, role } = useSelector((state) => state.user);
  const [editItem, setEditItem] = useState(false);
  const [name, setName] = useState(item.menuName);
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);
  const [category, setCategory] = useState(item.category);

  const handleSubmit = () => {
    if (
      name.trim() !== "" &&
      quantity != "" &&
      price != "" &&
      description.trim() !== "" &&
      category.trim() !== ""
    ) {
      setShowLoader(true);
      Axios.post(
        process.env.REACT_APP_BACKEND_URL + "/restaurant/item/update/",
        {
          name,
          quantity,
          price,
          description,
          category,
          token,
          id: item._id,
        }
      )
        .then((response) => {
          setShowLoader(false);
          setShowPreview(false);
          toastMessage("success", "Item has been updated successful");
          const rs = [];
          for (let i = 0; i < itemsList.length; i++) {
            if (itemsList[i]._id == item._id) {
              rs.push({
                ...itemsList[i],
                menuName: name,
                quantity,
                price,
                description,
                category,
              });
            } else {
              rs.push(itemsList[i]);
            }
          }
          setItemsList(rs);
        })
        .catch((error) => {
          setShowLoader(false);
          errorHandler(error);
        });
    }
  };

  useEffect(() => {
    setEditItem(false);
    setName(item.menuName);
    setQuantity(item.quantity);
    setPrice(item.price);
    setDescription(item.description);
    setCategory(item.category);
  }, [showPreview]);
  if (item !== null) {
    return (
      <div>
        <Modal
          show={showPreview}
          onHide={() => setShowPreview(false)}
          backdrop="static"
          size={editItem ? "sm" : "lg"}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {editItem ? "Edit Item" : "Item full details"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {!editItem && (
              <table style={{ width: "100%" }}>
                <tr>
                  <td style={{ width: "40%" }} valign="top">
                    <img
                      src={process.env.REACT_APP_BACKEND_FILE_URL + item.image}
                      style={{ width: "100%" }}
                    />
                  </td>
                  <td>
                    <div style={{ paddingLeft: 10 }}>
                      <table className="w-100">
                        <tr style={{ borderBottom: "1px solid #ccc" }}>
                          <td>Item Name</td>
                          <td>{item.menuName}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #ccc" }}>
                          <td>Price</td>
                          <td>{item.price} RWF</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #ccc" }}>
                          <td>Quantity</td>
                          <td>{item.quantity}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #ccc" }}>
                          <td>Category</td>
                          <td>{item.category}</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #ccc" }}>
                          <td colSpan={2}>
                            <p className="m-0 p-0 pb2">Description:</p>
                            {item.description}
                          </td>
                        </tr>
                      </table>
                      <div className="text-end mt-3">
                        <button
                          className="btn bg-orange text-white"
                          onClick={() => setEditItem(true)}
                          t
                        >
                          Edit Item
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            )}
            {editItem && (
              <div>
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
                  <label>Item category</label>
                  <select
                    className="form-control"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value={category}>{category}</option>
                    {role === "restaurant" ? (
                      <option value="Main dishes">Main dishes</option>
                    ) : (
                      <option value="Coffee">Coffee</option>
                    )}
                    <option value="Coffee">Coffee</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Snaks">Snaks</option>
                  </select>
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
              </div>
            )}
          </Modal.Body>
          {editItem && (
            <Modal.Footer>
              <Button
                type="submit"
                variant="primary"
                onClick={() => handleSubmit()}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      </div>
    );
  } else {
    return null;
  }
}

export default ViewRestaurantItem;
