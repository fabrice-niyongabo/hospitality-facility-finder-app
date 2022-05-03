import Axios from "axios";
import { handleAuthError } from "../helpers";
export const SET_FACILITY = "SET_FACILITY";
export const RESET_FACILITY = "RESET_FACILITY";

export const setFacility = (facility) => (dispatch) => {
  dispatch({
    type: SET_FACILITY,
    payload: facility,
  });
};

export const resetFacility = () => (dispatch) => {
  dispatch({
    type: RESET_FACILITY,
  });
};

export const fetchFacility = () => (dispatch, getState) => {
  const { token } = getState().user;
  Axios.get(
    process.env.REACT_APP_BACKEND_URL + "/facility/detail/?token=" + token
  )
    .then((res) => {
      console.log(res.data);
      dispatch(setFacility(res.data.result[0]));
    })
    .catch((error) => {
      console.log(error);
      handleAuthError(error);
    });
};
