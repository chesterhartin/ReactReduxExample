import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }]; // cloning state and course from action passed in using the spread operators
    case types.UPDATE_COURSE_SUCCESS:
      // cannot just modify the index and send the updated state. This could lead to mutation of the state which is not legal in redux context
      return state.map(course =>
        course.id === action.course.id ? action.course : course
      ); // don't need a return within the map as it is implicitly inferred to be a return as there is no curly brace ands is a single expression and also we're using a concise arrow syntax here.
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter(course => course.id !== action.course.id);
    // filter method doesn;t mutate the list and returns a new array
    // we just return the courses by omitting the course we tried to delete.
    default:
      return state;
  }
}
