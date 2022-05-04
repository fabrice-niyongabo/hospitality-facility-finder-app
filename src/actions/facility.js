import Axios from "axios";
import { handleAuthError } from "../helpers";
export const SET_FACILITY = "SET_FACILITY";
export const RESET_FACILITY = "RESET_FACILITY";
export const SET_LOADING_ROOMS = "SET_LOADING_ROOMS";
export const SET_ROOMS = "SET_ROOMS";

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

export const setRooms = (rooms) => (dispatch) => {
  dispatch({
    type: SET_ROOMS,
    payload: rooms,
  });
};

export const setLoadingRooms = (value) => (dispatch) => {
  dispatch({
    type: SET_LOADING_ROOMS,
    payload: value,
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

export const fetchRooms = () => (dispatch, getState) => {
  const { token } = getState().user;
  dispatch(setLoadingRooms(true));
  Axios.get(process.env.REACT_APP_BACKEND_URL + "/rooms/all/?token=" + token)
    .then((res) => {
      dispatch(setLoadingRooms(false));
      dispatch(setRooms(res.data.result));
    })
    .catch((error) => {
      dispatch(setLoadingRooms(false));
      console.log(error);
      handleAuthError(error);
    });
};
