import { combineReducers } from "redux";
import user from "./user";
import facility from "./facility";

const rootReducer = combineReducers({
  user,
  facility,
});

export default rootReducer;
