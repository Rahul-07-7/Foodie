import React, { useState } from "react";
import Nav from "./Nav";
import Homebtn from "./Home-btn";
import Footer from "./Footer";

function ContectUs() {
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    privacy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.privacy) {
      alert("Please agree to the privacy policy.");
      return;
    }

    // You can handle the submission logic here (e.g., API call)
    console.log("Submitted:", formData);

    // Reset form
    setFormData({
      fullname: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      privacy: false,
    });
    setSuccessMessage("Your message has been sent. Thank you!");

    // Optionally hide after few seconds
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const contents = [
    {
      img: "https://www.ex-coders.com/php-template/fresheat/assets/img/icon/location.png",
      text: "Our Address",
      address: "D-306 Mukhyamantri Aavas near Chitra Bhavnagar",
    },
    {
      img: "https://www.ex-coders.com/php-template/fresheat/assets/img/icon/gmail.png",
      text: "info@exmple.com",
      address: "Email us anytime for any kind ofquety.",
    },
    {
      img: "https://www.ex-coders.com/php-template/fresheat/assets/img/icon/phone.png",
      text: "No:+917984289055",
      address: "24/7/365 priority Live Chat and ticketing support.",
    },
    {
      img: "https://www.ex-coders.com/php-template/fresheat/assets/img/icon/clock.png",
      text: "Opening Hour",
      address: "Sunday-Fri: 9 AM – 6 PM   Saturday: 9 AM – 4 PM",
    },
  ];
  return (
    <div>
      <Nav />
      <div className="contect-img">
        <h1>Contect Us</h1>
      </div>
      <section>
        <div className="container">
          <div className="main-content">
            {contents.map((item, index) => (
              <div className="content-box" key={index}>
                <img src={item.img} alt="" />
                <h4>{item.text} </h4>
                <p>{item.address} </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="contect">
            <div>
              <img
                src="https://www.ex-coders.com/php-template/fresheat/assets/img/contact/contactThumb2_1.png"
                alt=""
              />
            </div>
            <div className="main-form">
              <h1>Get In Touch</h1>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[0-9]{10,15}"
                    title="Enter a valid phone number"
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row full">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="form-rows checkbox-row">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="privacy">
                    I agree to the <span>Privacy Policy</span>.
                  </label>
                </div>
                <div className="btn-wrapper">
                  <Homebtn text={"Submit Now"} className="full-width-btn" />
                </div>
                {successMessage && (
                  <p className="success-message">{successMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
      <section>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3705.8513885353013!2d72.0790910740321!3d21.747286362715013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f5110adfb103d%3A0x9c6114665f10fc57!2sNari%20Chokdi!5e0!3m2!1sen!2sin!4v1746420888106!5m2!1sen!2sin"
          width="600"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Descriptive title of the iframe content"
        ></iframe>
      </section>
      <Footer />
    </div>
  );
}

export default ContectUs;
