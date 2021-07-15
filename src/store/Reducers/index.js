import { combineReducers } from "redux";
import searchResults from "./searchResults";
import token from "./token";

export default combineReducers({
  searchResults,
  token,
});
