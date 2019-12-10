import React from "react";
import { Route, Switch } from "react-router-dom"; // Switch allows to ensure only one route is matched and once the first match is found it exits the comparison loop.
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursePage from "./courses/ManageCoursePage"; // eslint-disable-line import/no-named-as-default
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    // this div's class wraps our appication. Container-fluid is the class that comes with the react bootstrap
    <div className="container-fluid">
      <Header />
      {/* It's important to wrap the components below in a switch element, for the first matching path alone to be picked up and resolved
        Commenting this Switch wrapper would resolve all the matching routes and since we don't have a path mentioned for the PageNotFound component, it would always be rendered.
      */}
      <Switch>
        {/* declaring the header component here will always render this component */}
        <Route exact path="/" component={HomePage} />
        {/* exact prop says that only the exact/absolute path matches which is a "/" */}
        <Route path="/about" component={AboutPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Route path="/courses" component={CoursesPage} />
        <Route component={PageNotFound} />
        {/* No need to supply a path as the routes are sequentially looked up, and only runs to the pagenotfound line above if none of the abo0ve routes match*/}
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar></ToastContainer>
    </div>
  );
}

export default App;
