import React from "react";
import Navbar from "./Navbar";
import "./errorPage.css";

const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <div className="ErrorMain">
        <h1>404</h1>
        <h2>Sorry Page Not Found 😓</h2>
      </div>
    </>
  );
};

export default ErrorPage;
