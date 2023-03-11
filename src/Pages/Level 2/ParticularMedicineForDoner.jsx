import { useEffect, useState } from "react";
import SideNavbar from "../../Components/SideNavbar";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";

const ParticularMedicineForDoner = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [MedicineData, setMedicineData] = useState([]);
  const [DataAvailable, setDataAvailable] = useState(false);

  // -------------------- Fetch Medicine Data --------------------
  const fetchMedicineData = async () => {
    const response = await fetch(
      `http://localhost:3000/api/admin/medicine/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // credentials: "include",
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      setMedicineData(data);
      setDataAvailable(true);
    } else if (response.status === 404) {
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

      setTimeout(() => {
        navigate("/adminallmedicines");
      }, 2500);
    }
  };

  useEffect(() => {
    fetchMedicineData();
  }, []);

  return (
    <>
      <SideNavbar />
      <ToastContainer theme="colored" />
      <div className="ParticularMedicine__Main">
        {DataAvailable ? (
          <>
            <div className="ParticularMedicine__Container">
              <p>Brand Name : {MedicineData[0].brandName}</p>
              <p>Generic Name : {MedicineData[0].genericName}</p>
              <p>Quantity : {MedicineData[0].quantity}</p>
              <p>MedicineType : {MedicineData[0].medicineType}</p>
              <p>Expiry Date : {MedicineData[0].expireDate}</p>
              <p>Donation Date : {MedicineData[0].entryTime}</p>
              {MedicineData[0].collected && (
                <>
                  <hr />
                  <h2>Ngo Information : </h2>
                  <hr />
                  {/* <p>Collected : Yes</p> */}

                  <p>Collected By : {MedicineData[0].recieverName}</p>
                  <p>NGO Contact No : {MedicineData[0].recieverContact}</p>
                  <p>NGO Email : {MedicineData[0].recieverEmail}</p>
                  <p>
                    NGO Registration No :{" "}
                    {MedicineData[0].recieverRegistrationNo}
                  </p>
                  <p>NGO Address : {MedicineData[0].recieverAddress}</p>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <h1>No Medicine Data Available </h1>
          </>
        )}
      </div>
    </>
  );
};

export default ParticularMedicineForDoner;
