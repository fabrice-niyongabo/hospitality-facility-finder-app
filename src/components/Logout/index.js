import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetUser } from "../../actions/user";

function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetUser());
    window.location = "/";
  }, []);
  return null;
}

export default Logout;
