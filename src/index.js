import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom"; // which is the version of the router that works for the web
import "bootstrap/dist/css/bootstrap.min.css"; // remember - this will import the minified version of css. Also since, we have configured the web pack to handle css for us,
// it also bundles this bootstrap css for us and injects a reference of this into the index.html for us.
import App from "./components/App";
import "./index.css";
import configureStore from "./redux/configureStore";
// provider is a higher order component that can provide the redux store data to the child components
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore(); // not passing the initial state here.
/*
  passing an initial state here would be necessary or helpful if we're server rendering the application or we want to rehydrate the redux store using a state passed down from a server or from a local storage.
  the "state" passed in here would override the state that we have initialized in the reducers 
*/

// this is our app's entry point.
render(
  // wrapping our application within the provider, provides the redux store data to all the child components from this level on ward
  <ReduxProvider store={store}>
    {/* passing our store on props. All these attributes are accessible through props in react consuming components*/}
    {/* trying to wrap the component within the router */}
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
