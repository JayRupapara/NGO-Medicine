import "../login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import Navbar from "../../Components/Navbar";

export const AdminLogin = () => {
  const [Email, setEmail] = useState("");
  const [Password, setpassword] = useState("");
  const navigate = useNavigate();

  // ------------------------- Valid Email -------------------------
  const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    } else {
      return false;
    }
  };

  // ------------------------ Handle Submit ------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Email == "" || Password == "") {
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
      return;
    } else {
      if (!ValidateEmail(Email)) {
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
      } else {
        const response = await fetch(
          "http://localhost:3000/api/admin/loginadmin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              Email,
              Password,
            }),
            // credentials: "include",
          }
        );

        const data = await response.json();
        // console.log(data);
        /////////////// For INVALID PASSWORD //////////////
        if (response.status === 401) {
          toast.error(data, {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }

        /////////////// For INVALID EMAIL //////////////
        else if (response.status === 400) {
          toast.error(data, {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else if (response.status == 200) {
          window.localStorage.setItem("adminId", data.AdminId);
          toast.success("Login Successfull", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/adminallmedicines");
          }, 2200);
        } else {
          toast.error("Somthing Went Wrong !!", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
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
      <div className="Login__Mian">
        <ToastContainer theme="colored" />
        <form
          className="Login__Form Admin_Login_Form"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="Login__Right">
            <img src="./girlLogin.jpg" alt="bg" className="Admin_Login_Img" />
          </div>
          <div className="Login__Left">
            <h2>NGO Login Here</h2>
            <div className="Login__Input">
              <input
                type="text"
                name="username"
                placeholder="Enter Your Email : "
                autoComplete="username"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="Login__Input">
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password : "
                value={Password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <div className="Login__Input">
              <input
                type="submit"
                value="Login"
                className="btn"
                style={{ backgroundColor: "#80adee", color: "black" }}
              />
            </div>

            <Link to="/login" style={{ color: "black" }}>
              User Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
