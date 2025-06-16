import React from "react";

function Cartbtn({ text, onClick }) {
  return (
    <div>
      <button
        className="home-btn"
        style={{ fontSize: "17px" }}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

export default Cartbtn;
