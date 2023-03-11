import "./register.css";
import { useState } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Register = () => {
  const [DonerData, setDonerData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneno: "",
    password: "",
    address: "",
  });

  const nevigate = useNavigate();

  // ------------------------- Valid Email -------------------------
  const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    } else {
      return false;
    }
  };

  // ------------------------- handle Changes -------------------------
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setDonerData({ ...DonerData, [name]: value });
  };

  // ------------------------- clear All -------------------------
  const ResetAll = (e) => {
    setDonerData({
      firstname: "",
      lastname: "",
      email: "",
      phoneno: "",
      password: "",
    });
  };

  // ------------------------- handle Submit -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstname, lastname, email, phoneno, password, address } =
      DonerData;

    if (
      firstname == "" ||
      lastname == "" ||
      email == "" ||
      phoneno == "" ||
      password == "" ||
      address == ""
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
    } else {
      if (ValidateEmail(email) == false) {
        toast.error("Enter a valid email address", {
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
      if (phoneno.length != 10) {
        toast.error("Enter a valid Phone No", {
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
      } else if (password.length < 6) {
        toast.error("Password Must Have 6 Characters", {
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
      } else {
        const response = await fetch(
          "http://localhost:3000/api/registerdoner",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstname,
              lastname,
              phoneno,
              email,
              password,
              address,
            }),
          }
        );

        const data = await response.json();

        if (response.status == 201) {
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
          ResetAll();

          setTimeout(() => {
            nevigate("/login");
          }, 2000);
        } else if (response.status == 409) {
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
          toast.error("Somthing Went Wrong !!", {
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
    }
  };

  return (
    <>
      <Navbar />
      <div className="Register__Main">
        <ToastContainer theme="colored" />
        <div className="Form__Mian">
          <div className="Register__Left">
            <img src="./registerBg.jpg" alt="bg" />
          </div>
          <div className="Register__Right">
            <h2>Register Here</h2>
            <form method="POST" className="Form" onSubmit={handleSubmit}>
              <div className="inputField FullName">
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="First name : "
                  name="firstname"
                  value={DonerData.firstname}
                />
                <input
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  placeholder="Last name : "
                  value={DonerData.lastname}
                />
              </div>

              <div className="inputField">
                <input
                  type="number"
                  onChange={handleChange}
                  placeholder="Enter Your Contact no : "
                  min={0}
                  name="phoneno"
                  value={DonerData.phoneno}
                />
              </div>

              <div className="inputField">
                <input
                  type="email"
                  onChange={handleChange}
                  placeholder="Enter Your Email : "
                  value={DonerData.email}
                  name="email"
                />
              </div>

              <div className="inputField">
                <input
                  type="address"
                  onChange={handleChange}
                  placeholder="Enter Your Address : "
                  value={DonerData.address}
                  name="address"
                />
              </div>

              <div className="inputField">
                <input
                  type="password"
                  onChange={handleChange}
                  placeholder="Enter Your Password : "
                  value={DonerData.password}
                  name="password"
                />
              </div>

              <div className="btnsGroup">
                <input type="submit" value="Submit" className="btn" />
                <input
                  type="reset"
                  value="Reset"
                  className="btn"
                  onClick={ResetAll}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
