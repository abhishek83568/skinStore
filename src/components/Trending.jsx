import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Trending = () => {
  const url = "http://localhost:8080/Trending";

  const [trending, setTrending] = useState([]);
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async (url) => {
    try {
      isLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (data) {
        setTrending(data);
        isLoading(false);
      }
    } catch (error) {
      setError(error.message);
      isLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(url);
  }, [url]);

  

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,

          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
        style: {
          overflow: "hidden",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
        style: {
          overflow: "hidden",
        },
      },
    ],
  };
  return (
    <div
      className="slider-container"
      style={{ width: "90%", margin: "auto", cursor: "pointer", marginBottom:"100px" , marginTop:"50px" }}
    >
      <Slider {...settings}>
        {trending.map((item, index) => {
          return (
            <div key={index} style={{ position: "relative" }}>
              <div style={{ position: "relative" }}>
                <img
                  src={item.image_path}
                  alt={index}
                  style={{ height: "250px", width: "300px" }}
                />
                <button
                  style={{
                    position: "absolute",
                    top: "80%",
                    left: "35%",
                   
                    transform: "translate(-50%, -50%)",
                    padding: "5px",
                    cursor: "pointer",
                    backgroundColor: "black",
                    color: "white",
                    margin: "10px",
                    overflow: "hidden",
                  }}
                >
                  {item.title}
                </button>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
