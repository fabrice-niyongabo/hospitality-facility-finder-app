export const SET_CURRENT_USER_FNAME = "SET_CURRENT_USER_FNAME";
export const SET_CURRENT_USER_LNAME = "SET_CURRENT_USER_LNAME";
export const SET_CURRENT_USER_ID = "SET_CURRENT_USER_ID";
export const SET_CURRENT_USER_USERNAME = "SET_CURRENT_USER_USERNAME";
export const SET_CURRENT_USER_PHONE = "SET_CURRENT_USER_PHONE";
export const SET_CURRENT_USER_EMAIL = "SET_CURRENT_USER_EMAIL";
export const SET_CURRENT_USER_IMAGE = "SET_CURRENT_USER_IMAGE";
export const SET_CURRENT_USER_DESCRIPTION = "SET_CURRENT_USER_DESCRIPTION";
export const SET_CURRENT_USER_WORK = "SET_CURRENT_USER_WORK";
export const RESET_CURRENT_USER = "RESET_CURRENT_USER";

export const setCurrentUserFname = (fname) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER_FNAME,
    payload: fname,
  });
};

export const setCurrentUserLname = (lname) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER_LNAME,
    payload: lname,
  });
};

export const setCurrentUserId = (id) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER_ID,
    payload: id,
  });
};

export const setCurrentUserUsername = (username) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER_USERNAME,
    payload: username,
  });
};

export const setCurrentUserPhone = (phone) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER_PHONE,
    payload: phone,
  });
};

export const setCurrentUserEmail = (email) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER_EMAIL,
    payload: email,
  });
};

export const setCurrentUserImage = (image) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER_IMAGE,
    payload: image,
  });
};

export const setCurrentUserDescription = (description) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER_DESCRIPTION,
    payload: description,
  });
};

export const setCurrentUserWork = (work) => (dispatch) => {
  dispatch({
    type: setCurrentUserWork,
    payload: work,
  });
};

export const resetCurrentUser = () => ({ type: RESET_CURRENT_USER });
