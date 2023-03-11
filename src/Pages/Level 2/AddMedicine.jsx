import { useState } from "react";
import SideNavbar from "../../Components/SideNavbar";
import "./addmedicine.css";
import { ToastContainer, toast, Flip } from "react-toastify";

const AddMedicine = () => {
  const [MedicineData, setMedicineData] = useState({
    DonerId: "",
    brandName: "",
    genericName: "",
    expireDate: "",
    medicineType: "",
    quantity: "",
  });

  // --------------------- Handle Input Changes ---------------------
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setMedicineData({ ...MedicineData, [name]: value });
  };

  // --------------------- Handle ISubmit Function ---------------------
  const HandleSubmit = async (e) => {
    e.preventDefault();

    const { brandName, genericName, expireDate, medicineType, quantity } =
      MedicineData;

    if (
      brandName == "" ||
      genericName == "" ||
      quantity == "" ||
      expireDate == "" ||
      medicineType == ""
    ) {
      toast.error("Fill all Details !!", {
        style: {
          fontSize: "18px",
          letterSpacing: "1px",
        },
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
    } else if (quantity <= 0) {
      toast.error("Quantity should be greater than zero", {
        style: {
          fontSize: "18px",
          letterSpacing: "1px",
        },
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
    } else {
      MedicineData.DonerId = window.localStorage.getItem("DonerId");
      const response = await fetch("https://ngo-medicine.onrender.com/api/donatemedicine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(MedicineData),
        // credentials: "include",
      });

      const data = await response.json();
      // ----------------------- If all good -----------------------
      if (response.status === 201) {
        toast.success(data, {
          style: {
            fontSize: "15px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // ----------- Reseting Values Of input -----------
        setMedicineData({
          brandName: "",
          genericName: "",
          expireDate: "",
          medicineType: "",
          quantity: "",
        });
      }
      // ----------------------- If Medicine Already Exists -----------------------
      else if (response.status === 403) {
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
      } else {
        toast.error("Somthing went wrong !!", {
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
      }
    }
  };
  return (
    <>
      <SideNavbar />
      <ToastContainer theme="colored" />
      <div className="AddMedicine__Main">
        <h2>Add Medicine</h2>

        <div className="AddMedicine__Form">
          <div className="left_side_form">
            <img src="./doc2.jpg" alt="logo" />
          </div>
          <form
            className="right_side_form"
            method="POST"
            onSubmit={HandleSubmit}
          >
            <div className="MedicineInputField">
              <input
                type="text"
                placeholder="Brand Name"
                name="brandName"
                value={MedicineData.brandName}
                onChange={handleChange}
              />
            </div>

            <div className="MedicineInputField">
              <input
                type="text"
                placeholder="Generic  Name"
                name="genericName"
                value={MedicineData.genericName}
                onChange={handleChange}
              />
            </div>

            <div className="MedicineInputField">
              <label htmlFor="edate">Expire Date : </label>
              <input
                type="date"
                placeholder="Expire Name"
                id="edate"
                name="expireDate"
                value={MedicineData.expireDate}
                onChange={handleChange}
              />
            </div>

            <div className="MedicineInputField">
              <label htmlFor="medicineType"> Type : </label>
              <select
                name="medicineType"
                id="medicineType"
                value={MedicineData.medicineType}
                onChange={handleChange}
              >
                <option value="" defaultValue>
                  Select Medicine Type
                </option>
                <option value="Tablet (pcs)">Tablet (pcs)</option>
                <option value="Capsule (pcs)">Capsule (pcs)</option>
                <option value="Syrup (ml)">Syrup (ml)</option>
              </select>
            </div>

            <div className="MedicineInputField">
              <input
                type="number"
                placeholder="Quantity"
                id="quantity"
                min={0}
                step={0.05}
                name="quantity"
                value={MedicineData.quantity}
                onChange={handleChange}
              />
            </div>
            <input type="submit" value="Submit" className="btnSubmit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMedicine;
