import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <h1>Welcome to the Landing Page</h1>
      <Link to="/main">Go to Main Page</Link>
    </div>
  );
};

export default Landing;
