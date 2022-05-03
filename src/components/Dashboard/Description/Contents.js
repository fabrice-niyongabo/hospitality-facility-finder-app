import React from "react";
import { useSelector } from "react-redux";
import Hotel from "./Hotel";
function Contents() {
  const user = useSelector((state) => state.user);
  if ((user.role = "hotel")) {
    return <Hotel user={user} />;
  } else {
    return null;
  }
}

export default Contents;
