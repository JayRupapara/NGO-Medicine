import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "react-toastify/dist/ReactToastify.css";
import AllDonations from "./Pages/Level 2/AllDonations";
import AddMedicine from "./Pages/Level 2/AddMedicine";
import DonatedByYou from "./Pages/Level 2/DonatedByYou";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AddAdmin from "./Pages/Admin/AddAdmin";
import AdminAllDonationList from "./Pages/Admin/AdminAllDonationList";
import ParticularMedicine from "./Components/ParticularMedicine";
import ParticularMedicineForDoner from "./Pages/Level 2/ParticularMedicineForDoner";
import ErrorPage from "./Components/ErrorPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/alldonations" element={<AllDonations />} />
          <Route path="/addmedicine" element={<AddMedicine />} />
          <Route path="/donatedbyyou" element={<DonatedByYou />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/addAdmin" element={<AddAdmin />} />
          <Route path="/adminallmedicines" element={<AdminAllDonationList />} />
          <Route path="/medicine/:id" element={<ParticularMedicine />} />
          <Route
            path="/donersmedicine/:id"
            element={<ParticularMedicineForDoner />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
