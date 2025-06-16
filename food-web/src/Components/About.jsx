import Nav from "./Nav";
import Homebtn from "./Home-btn";
import Chefecard from "./Chefecard";
import Testamonial from "./Testamonial";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageSlider from "./Imgslider";
import Footer from "./Footer";

function About() {
  const Chefs = [
    {
      name: " Devon lane ",
      title: "President of Sales",
      img: "https://www.ex-coders.com/php-template/fresheat/assets/img/chefe/chefeThumb2_1.jpg",
    },
    {
      name: " Ralph Edwards ",
      title: "Chefe Manager",
      img: " https://www.ex-coders.com/php-template/fresheat/assets/img/chefe/chefeThumb2_2.jpg",
    },
    {
      name: "Marvin Mckinny ",
      title: "Main Chefe",
      img: "https://www.ex-coders.com/php-template/fresheat/assets/img/chefe/chefeThumb2_3.jpg",
    },
  ];

  return (
    <div>
      <Nav />
      <div className="about-img">
        <h1>About Us</h1>
      </div>

      <section>
        <div className="container">
          <div className="about-box">
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
              <h1 style={{ padding: "0 300px 0 300px" }}>
                Variety of flavours from american cuisine
              </h1>
            </div>
            <p style={{ padding: "0 300px 0 300px" }}>
              It is a long established fact that a reader will be distracted the
              readable content of a page when looking at layout the point
              established fact that
            </p>
            <Homebtn text="Order Now" />
          </div>
        </div>
      </section>
      <section>
        <div className="mt-5 d-flex  gap-2 justify-content-center">
          <img
            src="https://www.ex-coders.com/php-template/fresheat/assets/img/icon/titleIcon.svg"
            alt=""
          />
          <h4>OUR CHEFE</h4>
          <img
            src="https://www.ex-coders.com/php-template/fresheat/assets/img/icon/titleIcon.svg"
            alt=""
          />
        </div>
        <div className="mt-1 text-center">
          <h1>Meet Our Expert Chefe</h1>
        </div>
        <div className="container">
          <div className="chefe-section">
            {Chefs.map((chef, index) => (
              <Chefecard key={index} {...chef} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <Testamonial />
        <ImageSlider />
      </section>
      <Footer />
    </div>
  );
}

export default About;
