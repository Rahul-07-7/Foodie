import React from "react";

const images = [
  "https://www.ex-coders.com/php-template/fresheat/assets/img/gallery/galleryThumb1_5.jpg",
  "https://www.ex-coders.com/php-template/fresheat/assets/img/gallery/galleryThumb1_1.jpg",
  "https://www.ex-coders.com/php-template/fresheat/assets/img/gallery/galleryThumb1_2.jpg",
  "https://www.ex-coders.com/php-template/fresheat/assets/img/gallery/galleryThumb1_3.jpg",
  "https://www.ex-coders.com/php-template/fresheat/assets/img/gallery/galleryThumb1_4.jpg",
];

function ImageSlider() {
  return (
    <div className="slider-container">
      <div className="slider-track">
        {[...images, ...images].map((src, index) => (
          <div className="slide" key={index}>
            <div className="img-wrapper">
              <img src={src} alt={`Slide ${index}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
