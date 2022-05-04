import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetFacility } from "../../actions/facility";
import { resetUser } from "../../actions/user";

function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetUser());
    dispatch(resetFacility())
    window.location = "/";
  }, []);
  return null;
}

export default Logout;
