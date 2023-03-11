import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="Home__Main">
        <div className="Home__Hero">
          <div className="Home__Left">
            <img src="./bg.jpg" alt="bg" />
          </div>
          <div className="Home__Right">
            <h2>
              The goal of this medicine donation project is to provide unused
              medicine to those in need. Our vision is to create a society where
              no one is unable to afford necessary medication. By donating our
              unused medicine, we hope to help those who may not otherwise have
              access to the medication they need.
            </h2>
            <button className="donateBtn" onClick={() => navigate("/login")}>
              Donate Now
            </button>
          </div>
        </div>

        <div className="Home__Another">
          <div className="Home__why">
            <div className="Home__why__left">
              <h2>Why Medicine ?</h2>
              <p>
                Maintaining good health is a fundamental aspect of being human.
                Without it, we are unable to fully thrive and live our lives to
                the fullest. Unfortunately, it has been reported that nearly 2
                billion people lack access to basic medications, leading to
                preventable suffering and hardship. It is our duty to ensure
                that every individual has the opportunity to attain the
                necessary healthcare they deserve.
              </p>
            </div>
            <div className="Home__why__right">
              <img src="./question.jpg" alt="bg" />
            </div>
          </div>

          <div className="Home__vision">
            <div className="Home__vision__left">
              <img src="./doc.jpg" alt="bg" />
            </div>
            <div className="Home__vision__right">
              <h2>Our Vision</h2>
              <p>
                Maintaining good health is a fundamental aspect of being human.
                Without it, we are unable to fully thrive and live our lives to
                the fullest. Unfortunately, it has been reported that nearly 2
                billion people lack access to basic medications, leading to
                preventable suffering and hardship. It is our duty to ensure
                that every individual has the opportunity to attain the
                necessary healthcare they deserve.
              </p>
            </div>
          </div>

          <div className="Home__why">
            <div className="Home__why__left">
              <h2>Join Us</h2>
              <p>
                You have the opportunity to join our team and make an impact in
                various ways, such as through donations, volunteering, executive
                roles, pharmacists, or as a representative of a non-governmental
                organization. We welcome individuals with diverse backgrounds
                and skills to join our efforts and contribute to our cause.
              </p>
            </div>
            <div className="Home__why__right">
              <img src="./join.png" alt="bg" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
