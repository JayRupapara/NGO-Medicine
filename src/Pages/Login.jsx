import "./login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import Navbar from "../Components/Navbar";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setpassword] = useState("");
  const navigate = useNavigate();

  // ------------------------- Valid Email Or Not -------------------------
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
        const response = await fetch("https://ngo-medicine.onrender.com/api/logindoner", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Email,
            Password,
          }),
          // credentials: "include",
        });

        const data = await response.json();

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
          window.localStorage.setItem("DonerId", data.DonerId);
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
            navigate("/alldonations");
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
        <form className="Login__Form" method="POST" onSubmit={handleSubmit}>
          <div className="Login__Right">
            <img src="./typing.png" alt="bg" />
          </div>
          <div className="Login__Left">
            <h2>Login Here</h2>
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
              <input type="submit" value="Login" className="btn" />
            </div>

            <Link to="/adminlogin" style={{ color: "black" }}>
              NGO Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
