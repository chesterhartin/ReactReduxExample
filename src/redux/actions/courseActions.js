import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

// export function createCourse(course) {
//   //   return { type: "CREATE_COURSE", course: course };
//   return { type: types.CREATE_COURSE, course }; // shorthand syntax
//   // type specifies action's course and the rest whatever works best for you
// }

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

// first thunk.
export function loadCourses() {
  // every thunk returns a function that receives dispatch as an argument.
  return function(dispatch) {
    dispatch(beginApiCall());
    // redux thunk injects dispatch so we don't have to. making it agnostic of sync/async
    return courseApi
      .getCourses()
      .then(courses => {
        // we would like to dispatch an action once we receive the response form the API
        dispatch(loadCoursesSuccess(courses));
      }) // good idea to declare a catch to intercept any errors as we are expecting a promise to be returned from the api call
      .catch(error => {
        dispatch(apiCallError(error));
        throw error; // can also go ahead and dispatch an action to handle errors btu we're keeping it simple here.
      });
  };
}

export function saveCourse(course) {
  return function(dispatch, getState) {
    // optional getState parameter can help us access anything from the redux store
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

// another thunk for deletion
export function deleteCourse(course) {
  // this is one example where we can substantiate our decision of not injecting dispatch into our api components so that we can have less number of dispatches
  // but losing control over places where we would like to delay the dispatch of an action, just like here, as we're trying to avoid beginAPiCall action's dispatch.
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
