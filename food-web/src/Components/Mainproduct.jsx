import React from "react";
import Homebtn from "./Home-btn";
import { useNavigate } from "react-router-dom";

function Mainproduct({ products }) {
  const navigate = useNavigate();

  const nav = () => {
    navigate("/menu");
  };

  return (
    <main className="container main-container">
      <div className="mt-5 d-flex  gap-2 justify-content-center">
        <img
          src="https://www.ex-coders.com/php-template/fresheat/assets/img/icon/titleIcon.svg"
          alt=""
        />
        <h4>POPULAR DISHES</h4>
        <img
          src="https://www.ex-coders.com/php-template/fresheat/assets/img/icon/titleIcon.svg"
          alt=""
        />
      </div>
      <div className="mt-1 text-center">
        <h1>Best selling Dishes</h1>
      </div>
      <div className="product-wrapper">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <div className="icon-wrapper">
              <div className="fav-icon">
                <i className="fa-solid fa-heart"></i>
              </div>
              <div className="cart-icon">
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
            </div>

            <img src={product.img} alt="Product" className="product-im" />

            <h2 className="product-name mt-2">{product.title}</h2>
            <p className="text-muted">The Registration Fee</p>
            <p className="product-price"> ₹ {product.price} /-</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Homebtn text={"View All items"} onClick={nav} />
      </div>
    </main>
  );
}

export default Mainproduct;
