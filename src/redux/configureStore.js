import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

// ONE TIME SETUP FOR THE REDUX STORE
export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for redux dev tools

  return createStore(
    rootReducer,
    initialState,
    // don't forget to put the parenthesis after the argument as it's a function
    // an unhelpful error pops up if you forget to.
    // we can add as many middlewares as we want here.
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())) // the composeEnhancers gives us a function to call and that calls applyMiddleWare() function which in turn uses a piece of middleware called "reduxImmutableStateInvariant" that we're using
  ); // needs a root reducer and a state that's initialized
}

// reduximmutableStateInvariant argument will warn us if we accidentally mutate any state.
