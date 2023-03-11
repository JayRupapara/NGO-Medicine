import "./addAdmin.css";
import AdminSideNavbar from "../../Components/AdminSideNavbar";
import { useState } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";

const AddAdmin = () => {
  const [AdminDetails, setAdminDetails] = useState({
    ngoname: "",
    ngoemail: "",
    ngoaddress: "",
    ngoregno: "",
    ngopass: "",
    ngocontac: "",
  });

  //------------------------ Handle Input Changes ------------------------
  const handleCahnge = (e) => {
    setAdminDetails({ ...AdminDetails, [e.target.name]: e.target.value });
  };

  //------------------------ Validate Email ------------------------
  const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    } else {
      return false;
    }
  };

  //------------------------ Add Admin Function ------------------------
  const addAdminFunc = async () => {
 
    const { ngoname, ngoemail, ngoaddress, ngoregno, ngopass, ngocontac } =
      AdminDetails;
    if (
      ngoname === "" ||
      ngoemail === "" ||
      ngoaddress === "" ||
      ngoregno === "" ||
      ngopass === "" ||
      ngocontac === ""
    ) {
      toast.error("Fill all Details !!", {
        style: {
          fontSize: "18px",
          letterSpacing: "1px",
        },
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
    } else {
      if (!ValidateEmail(ngoemail)) {
        toast.error("Enter Valid Email !!", {
          style: {
            fontSize: "18px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Flip,
        });
      } else if (ngocontac.length !== 10) {
        toast.error("Please Enter Valid Phone No !!", {
          style: {
            fontSize: "18px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Flip,
        });
      } else if (ngopass.length < 6) {
        toast.error("Password Must Have 6 charcters", {
          style: {
            fontSize: "18px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Flip,
        });
      } else {
        try {
          const response = await fetch(
            "http://localhost:3000/api/admin/addadmin",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(AdminDetails),
            }
          );
          const data = await response.json();

          if (response.status === 409) {
            toast.error(data, {
              style: {
                fontSize: "18px",
                letterSpacing: "1px",
              },
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Flip,
            });
          } else if (response.status === 201) {
            toast.success(data, {
              style: {
                fontSize: "18px",
                letterSpacing: "1px",
              },
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Flip,
            });

            // //------------- Clearing All Input Fields -------------
            // setAdminDetails({
            //   adminname: "",
            //   adminemail: "",
            //   adminpass: "",
            //   admincpass: "",
            // });
          }
        } catch (e) {
          toast.error("Somthing Went Wrong !!", {
            style: {
              fontSize: "18px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Flip,
          });
        }
      }
    }
  };

  return (
    <>
      <AdminSideNavbar />
      <ToastContainer theme="colored" />

      <div className="Add_Admin_Main">
        <h1>Add NGO</h1>
        <div className="Add_Admin_Form">
          <div className="Add_Admin_Form_Left">
            <img src="./typing1.png" alt="img" />
          </div>
          <div className="Add_Admin_Form_Right">
            <div className="Add_Admin_inputField">
              <input
                type="text"
                name="ngoname"
                id="ngoname"
                placeholder="Enter Ngo Name"
                onChange={handleCahnge}
                value={AdminDetails.ngoname}
              />
            </div>

            <div className="Add_Admin_inputField">
              <input
                type="email"
                name="ngoemail"
                id="ngoemail"
                placeholder="Enter Ngo Email"
                onChange={handleCahnge}
                value={AdminDetails.ngoemail}
              />
            </div>

            <div className="Add_Admin_inputField">
              <input
                type="text"
                name="ngoregno"
                id="ngoregno"
                placeholder="Enter Ngo Registration No"
                onChange={handleCahnge}
                value={AdminDetails.ngoregno}
              />
            </div>

            <div className="Add_Admin_inputField">
              <input
                type="text"
                name="ngocontac"
                id="ngocontac"
                placeholder="Enter Ngo Contact No"
                onChange={handleCahnge}
                value={AdminDetails.ngocontac}
              />
            </div>

            <div className="Add_Admin_inputField">
              <input
                type="text"
                name="ngoaddress"
                id="ngoaddress"
                placeholder="Enter Ngo Address"
                onChange={handleCahnge}
                value={AdminDetails.ngoaddress}
              />
            </div>

            <div className="Add_Admin_inputField">
              <input
                type="password"
                name="ngopass"
                id="ngopass"
                placeholder="Enter Password"
                onChange={handleCahnge}
                value={AdminDetails.ngopass}
              />
            </div>

            {/* <div className="Add_Admin_inputField">
              <input
                type="password"
                name="ngocpass"
                id="ngocpass"
                placeholder="Enter Password Again"
                onChange={handleCahnge}
                value={AdminDetails.ngocpass}
              />
            </div> */}

            <button className="Add_Admin_submt_btn" onClick={addAdminFunc}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAdmin;
