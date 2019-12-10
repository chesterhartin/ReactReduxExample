import React from "react";
import { Link } from "react-router-dom";

// functional component
const HomePage = () => (
  <div className="jumbotron">
    <h1>Concurrency Administration</h1>
    <p>React, Redux and React Router for ultra-responsive web apps.</p>
    <Link to="about" className="btn btn-primary btn-lg">
      {/* "about" is picked up from the routes in App.js file */}
      Learn more
    </Link>
  </div>
);

export default HomePage;
