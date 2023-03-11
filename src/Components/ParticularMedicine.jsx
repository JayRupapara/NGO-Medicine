import { useEffect, useState } from "react";
import AdminSideNavbar from "./AdminSideNavbar";
import "./particularMedicine.css";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";

const ParticularMedicine = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [MedicineData, setMedicineData] = useState([]);
  const [DataAvailable, setDataAvailable] = useState(false);

  // -------------------- Fetch Medicine Data --------------------
  const fetchMedicineData = async () => {
    const response = await fetch(
      `https://ngo-medicine.onrender.com/api/admin/medicine/${id}`,
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

  //------------------------ Update Reciever ------------------------
  const handleUpdateBtn = async () => {
    const response = await fetch(
      `https://ngo-medicine.onrender.com/api/admin/updatemedicine/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          DonerId: window.localStorage.getItem("DonerId"),
          AdminId: window.localStorage.getItem("adminId"),
        }),
        // credentials: "include",
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      toast.success(data.msg, {
        style: {
          fontSize: "15px",
          letterSpacing: "1px",
        },
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/adminallmedicines");
      }, 2500);
    } else {
      toast.error("Somthing Went Wrong !!", {
        style: {
          fontSize: "15px",
          letterSpacing: "1px",
        },
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <AdminSideNavbar />
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
              <hr />
              <h2>Doner Details :</h2>
              <hr />
              <p>Donation Date : {MedicineData[0].entryTime}</p>
              <p>
                Doner Name :{" "}
                {MedicineData[1].firstname + " " + MedicineData[1].lastname}
              </p>
              <p>Doner Number : {MedicineData[1].phoneno}</p>
              <p>Doner Email : {MedicineData[1].email}</p>
              <p>Doner Address : {MedicineData[1].address}</p>

              {MedicineData[0].collected && (
                <>
                  <hr />
                  <h2>Ngo Details :</h2>
                  <hr />
                  {/* <p>Collected : Yes</p> */}
                  <p>Collected By : {MedicineData[0].recieverName}</p>
                  <p>NGO Phone No : {MedicineData[0].recieverContact}</p>
                  <p>NGO Email : {MedicineData[0].recieverEmail}</p>
                  <p>
                    NGO Registration No :{" "}
                    {MedicineData[0].recieverRegistrationNo}
                  </p>
                  <p>NGO Address : {MedicineData[0].recieverAddress}</p>
                </>
              )}
            </div>

            {!MedicineData[0].collected && (
              <>
                <div className="EditMedicineReciever">
                  <div className="EditDiv">
                    <button className="updateBtn" onClick={handleUpdateBtn}>
                      Take It Medicine
                    </button>
                  </div>
                </div>
              </>
            )}
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

export default ParticularMedicine;
