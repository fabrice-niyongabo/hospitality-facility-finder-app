import React from "react";
import FacilityItem from "./FacilityItem";

const facilities = [
  { title: "Galaxy Hotel", image: "1.jpg" },
  { title: "BWOK Restaurant", image: "2.jpg" },
  { title: "Mille colline hotel", image: "3.jpg" },
  { title: "Indabo cafe", image: "4.jpg" },
  { title: "Soya asian restaurant", image: "5.jpg" },
  { title: "The hut cafe", image: "6.jpg" },
];

function FacilitiesList() {
  return (
    <div>
      <div className="row">
        {facilities.map((facility, index) => (
          <FacilityItem facility={facility} key={index} />
        ))}
      </div>
    </div>
  );
}

export default FacilitiesList;
