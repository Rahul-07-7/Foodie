import React from "react";
import Homebtn from "./Home-btn";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="f-header">
            <div className="f-child">
              <div className="f-icon">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <div className="f-text">
                <h6>address</h6>
                <h3>D-306 Chitra Road, Bhavnagar</h3>
              </div>
            </div>
            <div className="f-child">
              <div className="f-icon">
                <i class="fa-solid fa-envelope"></i>
              </div>
              <div className="f-text">
                <h6>send email</h6>
                <a href="mailto:rahuljogadiya007@gmail.com">
                  rahul007@gmail.com
                </a>
              </div>
            </div>
            <div className="f-child">
              <div className="f-icon">
                <i class="fa-solid fa-phone"></i>
              </div>
              <div className="f-text">
                <h6>call emergency</h6>
                <a href="tel:+91 798428905">+91 7984289055</a>
              </div>
            </div>
          </div>
          <div className="f-main">
            <div className="f-first">
              <img src="/logo.png" alt="Logo" />

              <p>
                Phasellus ultricies aliquam volutpat ullamcorper laoreet neque,
                a lacinia curabitur lacinia mollis
              </p>
              <div className="f-social">
                <div className="f-box">
                  <i class="fa-brands fa-facebook"></i>
                </div>
                <div className="f-box">
                  <i class="fa-brands fa-instagram"></i>
                </div>
                <div className="f-box">
                  <i class="fa-brands fa-twitter"></i>
                </div>
                <div className="f-box">
                  <i class="fa-brands fa-youtube"></i>
                </div>
              </div>
            </div>
            <div className="f-second">
              <h3>Quick Links</h3>
              <Link to="/about">
                <i class="fa-solid fa-angles-right"></i> About Us
              </Link>
              <Link to="/contect">
                <i class="fa-solid fa-angles-right"></i> Contact Us
              </Link>
              <Link to="/menu">
                <i class="fa-solid fa-angles-right"></i> Shop
              </Link>
            </div>
            <div className="f-second">
              <h3>Our Menu</h3>
              <Link to="/menu?category=Burger">
                <i className="fa-solid fa-angles-right"></i> Burger King
              </Link>
              <Link to="/menu?category=Pizza">
                <i className="fa-solid fa-angles-right"></i> Pizaa King
              </Link>
            </div>
            <div className="f-third">
              <p style={{ fontSize: "20px", color: "gray" }}>
                Monday - Friday : <span>8am - 4am</span>
              </p>
              <p style={{ fontSize: "20px", color: "gray" }}>
                Saturday : <span>8am - 12am</span>
              </p>
              <input
                className="mb-3"
                type="text"
                name=""
                id=""
                placeholder=" Your Email Address"
              />
              <Homebtn text={"submit"} />
            </div>
          </div>
        </div>
        <div className="f-bottom">
          <div className="container">
            <p>© All Copyright 2025 by Rahul</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
