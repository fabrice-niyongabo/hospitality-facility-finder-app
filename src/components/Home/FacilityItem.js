import React from "react";

const getImage = (name) => {
  switch (name) {
    case "1.jpg":
      return require("../../assets/hotels/1.jpg");
    case "2.jpg":
      return require("../../assets/hotels/2.jpg");
    case "3.jpg":
      return require("../../assets/hotels/3.jpg");
    case "4.jpg":
      return require("../../assets/hotels/4.jpg");
    case "5.jpg":
      return require("../../assets/hotels/5.jpg");
    case "6.jpg":
      return require("../../assets/hotels/6.jpg");
    default:
      return require("../../assets/hotels/1.jpg");
  }
};
function FacilityItem({ facility }) {
  return (
    <div className="col-md-4">
      <div className="facility-container">
        <img alt={facility.title} src={getImage(facility.image)} />
        <div className="title-container">
          <div>
            <h3>{facility.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilityItem;
