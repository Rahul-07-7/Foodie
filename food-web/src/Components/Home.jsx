import React from "react";
import Nav from "./Nav";
import Homebtn from "./Home-btn";
import Products from "./Products";
import Imgbox from "./Imgbox";
import Mainproduct from "./Mainproduct";
import Countdown from "./Countdown";
import Footer from "./Footer";

function Home() {
  return (
    <div style={{ backgroundColor: "#F4F1EA", overflowX: "hidden" }}>
      <Nav />
      <section className="home-main">
        <div className="home-img mb-5">
          <div className="home-text">
            <h2>WELCOME FRESHEAT</h2>
            <h1>SPICE FRIED</h1>
            <h1>CHICKEN</h1>
            <Homebtn text={"Order Now"} />
          </div>
        </div>
      </section>

      <section>
        <div className="mt-5 d-flex  gap-2 justify-content-center">
          <img
            src="https://www.ex-coders.com/php-template/fresheat/assets/img/icon/titleIcon.svg"
            alt=""
          />
          <h4>Best Food</h4>
          <img
            src="https://www.ex-coders.com/php-template/fresheat/assets/img/icon/titleIcon.svg"
            alt=""
          />
        </div>
        <div className="mt-1 text-center">
          <h1>Popular Food Items</h1>
          <div className="carousel container mb-5">
            <div className="carousel-track">
              {[...Array(2)].map((_, i) => [
                <Products
                  key={`item1-${i}`}
                  img="https://www.ex-coders.com/php-template/fresheat/assets/img/food-items/item1_1.png"
                  title="Egg and Cucumber"
                  price="199"
                />,
                <Products
                  key={`item2-${i}`}
                  img="https://www.ex-coders.com/php-template/fresheat/assets/img/food-items/item1_2.png"
                  title="Chicken Fried Rice"
                  price="159"
                />,
                <Products
                  key={`item3-${i}`}
                  img="https://www.ex-coders.com/php-template/fresheat/assets/img/food-items/item1_3.png"
                  title="Chicken Mega Pizza "
                  price="259"
                />,
                <Products
                  key={`item4-${i}`}
                  img="https://www.ex-coders.com/php-template/fresheat/assets/img/food-items/item1_4.png"
                  title="Chicken Leg Piece"
                  price="199"
                />,
              ])}
            </div>
          </div>
        </div>
      </section>
      <section className="mb-5">
        <Imgbox
          items={[
            {
              img: "https://www.ex-coders.com/php-template/fresheat/assets/img/offer/offerThumb1_1.png",
              h6: "ON THIS WEEK",
              h3line1: "SPICY FRIED ",
              h3line2: "CHICKEN",
              span: "Limited Time Offer",
            },
            {
              img: "https://www.ex-coders.com/php-template/fresheat/assets/img/offer/offerThumb1_2.png",
              h6: "WELCOME FRESHEAT",
              h3line1: "SPICY FRIED ",
              h3line2: "CHICKEN",
              span: "Limited Time Offer",
            },
            {
              img: "https://www.ex-coders.com/php-template/fresheat/assets/img/offer/offerThumb1_3.png",
              h6: "NEW ARRIVAL",
              h3line1: "SPICY FRIED ",
              h3line2: "CHICKEN",
              span: "Limited Time Offer",
            },
          ]}
        />
      </section>
      <section className="mt-5">
        <Mainproduct
          products={[
            {
              img: "https://www.ex-coders.com/php-template/fresheat/assets/img/dishes/dishes1_5.png",
              title: "Grilled Chicken",
              price: "199",
            },
            {
              img: "https://www.ex-coders.com/php-template/fresheat/assets/img/dishes/dishes1_2.png",
              title: "Chinese Pasta",
              price: "159",
            },
            {
              img: "https://www.ex-coders.com/php-template/fresheat/assets/img/dishes/dishes1_3.png",
              title: "Chicken Pizaa",
              price: "259",
            },
            {
              img: "https://www.ex-coders.com/php-template/fresheat/assets/img/dishes/dishes1_4.png",
              title: "Chicken Noodels",
              price: "199",
            },
            {
              img: "https://www.ex-coders.com/php-template/fresheat/assets/img/dishes/dishes1_1.png",
              title: "Chiken Fried Rice",
              price: "199",
            },
          ]}
        />
      </section>
      <section>
        <div className="container">
          <div className="home-pizza">
            <div className="pizaa-content">
              <h5>WELCOME FRESHEAT</h5>
              <h1>TODAY SPACIAL FOOD</h1>
              <h6>limits Time Offer</h6>
              <Homebtn text={"Order Now"} />
            </div>
            <div className="pizaa-img">
              <img
                src="https://www.ex-coders.com/php-template/fresheat/assets/img/cta/ctaThumb1_1.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="scroll-wrapper">
          <div class="scroll-content text-muted">
            <h1>CHICKEN PIZZA</h1>
            <h1>BURGER</h1>
            <h1>GRILLED CHICKEN</h1>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="burger-img">
            <div className="child-burger">
              <img
                src="https://www.ex-coders.com/php-template/fresheat/assets/img/timer/timerThumb1_1.png"
                alt=""
              />
            </div>
            <div className="child-burger2">
              <div className="mt-5 d-flex  gap-2 justify-content-center">
                <img
                  src="https://www.ex-coders.com/php-template/fresheat/assets/img/icon/titleIcon.svg"
                  alt=""
                />
                <h4>Best Food</h4>
                <img
                  src="https://www.ex-coders.com/php-template/fresheat/assets/img/icon/titleIcon.svg"
                  alt=""
                />
              </div>
              <div className="mt-1 text-center text-white">
                <h2>Get 30% Discount Every Item</h2>
              </div>
              <Countdown />
              <div className="text-center pb-4">
                <Homebtn text={"Order Now"} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
}

export default Home;
