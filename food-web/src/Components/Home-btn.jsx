import React from "react";

function Homebtn({ text, onClick }) {
  return (
    <div>
      <button className="home-btn" onClick={onClick}>
        {text} <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}

export default Homebtn;
