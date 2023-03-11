import { useEffect, useState } from "react";
import SideNavbar from "../../Components/SideNavbar";
import "./donatedByYou.css";
import { useNavigate, Link } from "react-router-dom";

const DonatedByYou = () => {
  const navigate = useNavigate();

  const [MedicineData, setMedicineData] = useState([]);
  const [noDonationMedicine, setNoDonationMedicine] = useState(false);

  useEffect(() => {
    fetchMedicineData();
  }, []);

  // -------------------- Fetch Medicine Data --------------------
  const fetchMedicineData = async () => {
    const DonerId = window.localStorage.getItem("DonerId");

    const response = await fetch(
      `https://ngo-medicine.onrender.com/api/getdonatedmedicine/${DonerId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // credentials: "include",
      }
    );

    const data = await response.json();

    if (data.length == 0 || response.status == 401) {
      setNoDonationMedicine(true);
    } else if (response.status == 200) {
      setMedicineData(data);
      setNoDonationMedicine(false);
    } else {
      console.log(data);
    }
  };

  return (
    <>
      <SideNavbar />
      <div className="DonatedByYou__Main">
        <h2>Medicine Donated By You</h2>

        {!noDonationMedicine ? (
          <table className="Medicine__Table">
            <thead>
              <tr>
                <th>id</th>
                <th>Brand Name</th>
                <th>Generic Name</th>
                <th>Expiry Date</th>
                <th>Quantity</th>
                <th>Collected</th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>
              {MedicineData.map((medicine, index) => {
                return (
                  <tr key={medicine._id}>
                    <td>{index + 1}</td>
                    <td>{medicine.brandName}</td>
                    <td>{medicine.genericName}</td>
                    <td>{medicine.expireDate}</td>
                    <td>
                      {medicine.quantity} {medicine.medicineType}
                    </td>
                    <td>{medicine.collected ? "✅ Yes" : "❌ Not Yet"}</td>
                    <td>
                      <Link to={`/donersmedicine/${medicine._id}`}>
                        <i
                          className="fa-solid fa-file"
                          style={{ color: "black" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h3 className="NoDonatedMedicine">No Medicine Donated By You !!</h3>
        )}
      </div>
    </>
  );
};

export default DonatedByYou;
