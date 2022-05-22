import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetFacility } from "../../actions/facility";
import { resetUser } from "../../actions/user";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetUser());
    dispatch(resetFacility());
    navigate("/");
  }, []);
  return null;
}

export default Logout;
