import { combineReducers } from "redux";
import user from "./user";
import facility from "./facility";
import cart from "./cart";

const rootReducer = combineReducers({
  user,
  cart,
  facility,
});

export default rootReducer;
