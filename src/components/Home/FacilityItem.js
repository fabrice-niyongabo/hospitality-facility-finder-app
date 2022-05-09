import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FiImage } from "react-icons/fi";
import { Link } from "react-router-dom";
function FacilityItem({ facility }) {
  return (
    <div className="col-md-4">
      <div className="facility-container">
        <Link to={"/" + facility._id}>
          {facility.image.trim() === "" ? (
            <FiImage color="#f46a06" size={300} />
          ) : (
            <LazyLoadImage
              alt={facility.name}
              effect="blur"
              src={process.env.REACT_APP_BACKEND_FILE_URL + facility.image}
              className="img"
            />
          )}
        </Link>
        <div className="title-container">
          <Link to={"/" + facility._id}>
            <div>
              <h3>{facility.name}</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FacilityItem;
