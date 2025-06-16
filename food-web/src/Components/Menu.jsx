import React from "react";
import Shopbtn from "./Shopbtn";

function Menu({ img, title, price, onOrderNow }) {
  const product = { img, title, price };

  return (
    <div>
      <div className="products-card">
        <div className="img-border">
          <img src={img} alt="Product" className="product-img" />
        </div>
        <h2 className="product-name"> {title}</h2>
        <p className="text-muted">The Registration Fee</p>
        <p className="product-price"> ₹ {price} /-</p>
        <Shopbtn onOrderNow={() => onOrderNow(product)} />
      </div>
    </div>
  );
}

export default Menu;
