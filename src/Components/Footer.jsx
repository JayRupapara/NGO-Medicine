import "./footer.css";

const Footer = () => {
  return (
    <div className="Footer__Main">
      <div className="Footer__Left">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.717310849059!2d73.36123171475504!3d22.288695785329566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fda2400192473%3A0xc319c9237f2928e8!2sParul%20University!5e0!3m2!1sen!2sin!4v1671706208737!5m2!1sen!2sin"
          width="400"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="Map"
        ></iframe>
      </div>

      <div className="Footer__Right">
        <h2>Contact</h2>
        <h3>
          <i className="fa-solid fa-phone"></i> +91 45612378903
        </h3>
        <div className="Footer__Links">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-twitter"></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
