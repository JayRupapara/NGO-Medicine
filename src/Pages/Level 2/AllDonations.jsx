import { useState, useEffect } from "react";
import SideNavbar from "../../Components/SideNavbar";
import "./alldonations.css";
import { ToastContainer, toast, Flip } from "react-toastify";

const AllDonations = () => {
  const [allMedicinesData, setAllMedicinesData] = useState([]);
  const [NoData, setNoData] = useState(true);

  // -------------------- Fetch All Medicines Data --------------------
  const fetchAllMedicines = async () => {
    const response = await fetch("http://localhost:3000/api/allmedicines", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // credentials: "include",
    });

    const data = await response.json();

    if (response.status === 300) {
      toast.error(data, {
        style: {
          fontSize: "15px",
          letterSpacing: "1px",
        },
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (response.status === 200) {
      if (data.length != 0) {
        setNoData(false);
        setAllMedicinesData(data);
      }
    }
  };

  useEffect(() => {
    fetchAllMedicines();
  }, []);

  return (
    <>
      <SideNavbar />
      <ToastContainer theme="colored" />

      <div className="AllDonation__Main">
        <h2>All Medicine List</h2>
        {!NoData ? (
          <table className="Medicine__Table">
            <thead>
              <tr>
                <th>id</th>
                <th>Brand Name</th>
                <th>Generic Name</th>
                <th>Expiry Date</th>
                <th>Quantity</th>
                <th>Collected</th>
              </tr>
            </thead>

            <tbody>
              {allMedicinesData.map((medicine, index) => {
                return (
                  <tr key={medicine._id}>
                    <td>{index + 1}</td>
                    <td>{medicine.brandName}</td>
                    <td>{medicine.genericName}</td>
                    <td>{medicine.expireDate}</td>
                    <td>
                      {medicine.quantity} {medicine.medicineType}
                    </td>
                    <td>{!medicine.collected ? "❌ Not Yet" : "✅ Yes"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <>
            <h3 className="NoDonatedMedicine">
              No Medicine Donated Till Now !!
            </h3>
          </>
        )}
      </div>
    </>
  );
};

export default AllDonations;
