import React from "react";

function Shopbtn({ onOrderNow }) {
  return (
    <div>
      <button className="shopbtn" onClick={onOrderNow}>
        Order Now <i class="fa-solid fa-arrow-right"></i>{" "}
      </button>
    </div>
  );
}

export default Shopbtn;
