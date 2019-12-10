import * as types from "./actionTypes";
import * as authorsApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

// authors thunk
export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginApiCall()); // this sets the flag for the spinner to look out for
    return authorsApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
