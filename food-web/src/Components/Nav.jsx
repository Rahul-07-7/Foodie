import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");

    navigate("/login");
  };

  const contactInfo = [
    {
      img: "https://www.ex-coders.com/php-template/fresheat/assets/img/icon/location.png",
      address: "Bhavnagar, Gujarat",
    },
    {
      img: "https://www.ex-coders.com/php-template/fresheat/assets/img/icon/gmail.png",
      address: "rahuljogadiya007@gmail.com",
    },
    {
      img: "https://www.ex-coders.com/php-template/fresheat/assets/img/icon/phone.png",
      address: "+91 7984289055",
    },
    {
      img: "https://www.ex-coders.com/php-template/fresheat/assets/img/icon/clock.png",
      address: <>Mon–Fri: 9 AM – 6 PM</>,
    },
  ];

  const renderUserDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="user-dropdown-btn"
      >
        <i className="fa-solid fa-user"></i>
        <span className="capitalize">{username}</span>
        <i className="fa-solid fa-caret-down"></i>
      </button>

      {dropdownOpen && (
        <div className="user-dropdown">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src="/logo.png" alt="Logo" />
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            ×
          </button>
        </div>
        <div
          style={{
            paddingTop: "20px",
            paddingBottom: "10px",
            borderBottom: "1px solid #ddd",
          }}
        >
          {isLoggedIn ? (
            renderUserDropdown()
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Link
                to="/login"
                className="nav-auth-btn"
                onClick={() => setSidebarOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="nav-auth-btn"
                onClick={() => setSidebarOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        <ul className="sidebar-links">
          <li>
            <Link to="/" onClick={() => setSidebarOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/menu" onClick={() => setSidebarOpen(false)}>
              Menu
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setSidebarOpen(false)}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contect" onClick={() => setSidebarOpen(false)}>
              Contact Us
            </Link>
          </li>
        </ul>
        <Link
          to="/cart"
          className="cart-button"
          onClick={() => setSidebarOpen(false)}
        >
          🛒 View Cart
        </Link>

        {/* Contact Info */}
        <div style={{ padding: "20px 0 0 0" }}>
          {contactInfo.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: "20px",
              }}
            >
              <img
                src={item.img}
                alt="icon"
                style={{ width: "30px", marginRight: "15px" }}
              />
              <div>{item.address}</div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="f-social">
          {["facebook", "instagram", "twitter", "youtube"].map((platform) => (
            <div
              key={platform}
              className="f-box"
              style={{ borderRadius: "20px", border: "2px solid gray" }}
            >
              <i
                className={`fa-brands fa-${platform}`}
                style={{ color: "gray" }}
              ></i>
            </div>
          ))}
        </div>
      </div>

      {/* Top Nav */}
      <div className="navs">
        <div className="nav-top">
          <img src="/logo.png" alt="Logo" />

          <button className="hamburger" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
        </div>

        <div className="nav-main">
          <div className="nav-inner">
            <div className="nav-inner-item">
              <span>
                <i className="fa-solid fa-clock"></i> 09:00 am - 06:00 pm
              </span>
            </div>
            <div className="nav-inner-item">
              <span>
                Follow Us:
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-twitter"></i>
              </span>
            </div>
          </div>

          <div className="nav-inner-2">
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contect">Contact Us</Link>
              </li>
            </ul>
            <div className="nav-side">
              <li
                style={{
                  listStyle: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Link to="/cart">
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
                {isLoggedIn ? (
                  renderUserDropdown()
                ) : (
                  <>
                    <Link to="/login" className="nav-auth-btn">
                      Login
                    </Link>
                    <Link to="/register" className="nav-auth-btn">
                      Register
                    </Link>
                  </>
                )}
              </li>
              <button
                className="hamburger"
                onClick={() => setSidebarOpen(true)}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
