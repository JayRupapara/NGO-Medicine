import { NavLink } from "react-router-dom";
import "./sidenavbar.css";

const AdminSideNavbar = () => {
  // --------------------- Logout Admin Function ---------------------
  const LogoutAdmin = async () => {
    window.localStorage.removeItem("adminId");

    const response = await fetch(
      "https://ngo-medicine.onrender.com/api/admin/logoutadmin",
      {
        // credentials: "include",
      }
    );
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
            <NavLink to="/adminallmedicines">
              <i className="fa-solid fa-list"></i> All Donation
            </NavLink>
          </div>

          <div className="Link">
            <NavLink to="/addAdmin">
              <i className="fa-solid fa-user-plus"></i> Add NGO
            </NavLink>
          </div>

          <div className="Link" onClick={LogoutAdmin}>
            <NavLink to="/">
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSideNavbar;
