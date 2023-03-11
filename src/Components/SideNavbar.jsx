import React from "react";
import { NavLink } from "react-router-dom";
import "./sidenavbar.css";

const SideNavbar = () => {
  const LogoutDoner = async () => {
    window.localStorage.removeItem("DonerId");
    const response = await fetch("http://localhost:3000/api/logoutdoner", {
      // credentials: "include",
    });
  };
  return (
    <>
      <div className="SideNav__Main">
        <NavLink to="/" className="SideNav__Logo">
          <img src="/donate.png" alt="logo" />

          <h2>Medicine Donation</h2>
        </NavLink>

        <div className="SideNav__Links">
          <div className="Link">
            <NavLink to="/alldonations">
              <i className="fa-solid fa-list"></i> All Donation List
            </NavLink>
          </div>

          <div className="Link">
            <NavLink to="/addmedicine">
              <i className="fa-solid fa-plus"></i> Donate Medicine
            </NavLink>
          </div>

          <div className="Link">
            <NavLink to="/donatedbyyou">
              <i className="fa-solid fa-pills"></i> Donation By You
            </NavLink>
          </div>

          <div className="Link" onClick={LogoutDoner}>
            <NavLink to="/">
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
