import "./navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="Navbar__Main">
        <div className="Navbar__Left">
          <NavLink to="/" className="Navbar__Logo">
            <img src="/donate.png" alt="logo" />

            <h2>Medicine Donation</h2>
          </NavLink>
          {/* <ul className="Navbar__Links">
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/donate">Donate</NavLink>
            </li>
            <li>
              <NavLink to="/request">Request</NavLink>
            </li>
          </ul> */}
        </div>

        <div className="Navbar__Right">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">
            <i className="fa-solid fa-right-to-bracket"></i> Login
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
