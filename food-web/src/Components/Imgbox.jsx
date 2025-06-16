import React from "react";
import Imgbtn from "./Img-btn";

function Imgbox({ items }) {
  return (
    <div>
      <div className="container">
        <div className="img-container">
          {items.map((item, index) => (
            <div className="main-img" key={index}>
              <img
                src="https://img.freepik.com/free-photo/colorful-abstract-nebula-space-background_53876-111356.jpg"
                alt=""
              />
              <div className="child-img">
                <img src={item.img} alt="" />
              </div>
              <div className="offer-shape">
                <img
                  src="https://www.ex-coders.com/php-template/fresheat/assets/img/shape/offerShape1_4.png"
                  alt="shape"
                />
              </div>

              <div className="img-content ">
                <h6>{item.h6}</h6>
                <h4> {item.h3line1}</h4>
                <h4>{item.h3line2} </h4>
                <h4 dangerouslySetInnerHTML={{ __html: item.h3 }} />
                <span>{item.span}</span>
                <Imgbtn />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Imgbox;
