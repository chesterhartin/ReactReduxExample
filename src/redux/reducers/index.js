import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";
// residing spot of thecombine reducers function will tell us if it;s a root reducer or not.
const rootReducer = combineReducers({
  //   courses: courses
  courses, // shorthand syntax since both the types macth LHS == RHS
  authors,
  apiCallsInProgress
});

export default rootReducer;
