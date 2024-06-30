import React, { useEffect, useState } from "react";
import "../App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Offers = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [currentDiscount, setCurrentDiscount] = useState("15%");

  const fetchProducts = async (discount) => {
    const url =
      discount === "15%"
        ? "https://skinstore-backend.onrender.com/Offers15"
        : "https://skinstore-backend.onrender.com/Offers50";

    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (data) {
        setProduct(data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentDiscount);
  }, [currentDiscount]);

  const handle50Discount = () => {
    console.log("hello 50% discount");
    setCurrentDiscount("50%");
  };

  const handle15Discount = () => {
    console.log("hello 15% discount");
    setCurrentDiscount("15%");
  };

  if (isLoading) {
    return <div>Loading ... </div>;
  }

  if (isError) {
    return <div>Error occurred .. {isError}</div>;
  }

  const Arrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="offers-container">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handle15Discount} className="firstDiscount">
          15% off The Ordinary
        </button>
        <button onClick={handle50Discount} className="SecondDiscount">
          Up to 50% off
        </button>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {product.map((item, index) => (
            <div key={index} className="slide">
              {/* Customize the rendering of each product item here */}
              <img src={item.image_path} alt={item.title} />
              <p className="title">{item.title}</p>
              <p> {item.price}</p>
              <button>Quick Buy</button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Offers;
