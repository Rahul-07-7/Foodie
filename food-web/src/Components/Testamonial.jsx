import React, { useEffect, useState } from "react";

function Testamonial() {
  const testimonials = [
    {
      text: "Absolutely love the food quality and the service! The packaging was neat, and everything arrived hot and fresh. 10/10 experience!",
      name: "John Deo",
      image:
        "https://www.ex-coders.com/php-template/fresheat/assets/img/testimonial/testimonialProfile2_2.png",
    },
    {
      text: "The service was fantastic! Quick delivery and delicious food. I will definitely order again.",
      name: "Sarah Lee",
      image:
        "https://www.ex-coders.com/php-template/fresheat/assets/img/testimonial/testimonialProfile2_1.png",
    },
    {
      text: "Best food experience ever. Great quality, quick response, and amazing packaging.",
      name: "Michael Chen",
      image:
        "https://www.ex-coders.com/php-template/fresheat/assets/img/testimonial/testimonialProfile1_1.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const current = testimonials[currentIndex];

  return (
    <div>
      <div className="testamonial">
        <div className="child-testamonial-1">
          <div className="mt-5 d-flex  gap-2 ">
            <img
              src="https://www.ex-coders.com/php-template/fresheat/assets/img/icon/titleIcon.svg"
              alt=""
            />
            <h4>TESTIMONIALS</h4>
            <img
              src="https://www.ex-coders.com/php-template/fresheat/assets/img/icon/titleIcon.svg"
              alt=""
            />
          </div>
          <div className="mt-1 border-bottom pb-2">
            <h1>what have lots of happy customer feedback</h1>
          </div>
          <div className="testamonial-main">
            <h4 className="mb-4">{current.text}</h4>
            <img
              src={current.image}
              alt={current.name}
              style={{
                width: "100px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <span>__ {current.name}</span>
          </div>
        </div>
        <div className="child-testamonial-2">
          <img
            src="https://www.ex-coders.com/php-template/fresheat/assets/img/testimonial/testimonialThumb2_1.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Testamonial;
