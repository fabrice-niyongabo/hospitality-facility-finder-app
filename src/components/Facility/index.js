import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import PlaceHolder from "./PlaceHolder";
function Facility() {
  const { id } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [facility, setFacility] = useState(null);
  return (
    <>
      <Header />
      {isLoading ? <PlaceHolder /> : <></>}
    </>
  );
}

export default Facility;
