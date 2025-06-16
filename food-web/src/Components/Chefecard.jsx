import React, { useState } from "react";

function ChefCard({ name, title, img }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="chefe-img"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={img} alt={name} />

      <div className="chefe-text">
        <h2>{name}</h2>
        <span>{title}</span>
        <div className={`hover-line ${isHovered ? "active" : ""}`} />
      </div>

      {isHovered && (
        <div className="social-box">
          <span>
            <i className="fab fa-facebook-f"></i>
          </span>
          <span>
            <i className="fab fa-twitter"></i>
          </span>
          <span>
            <i className="fab fa-instagram"></i>
          </span>
        </div>
      )}
    </div>
  );
}

export default ChefCard;
