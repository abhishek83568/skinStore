import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css"; // Ensure this path is correct

const TopBrands = () => {
  const url = "http://localhost:8080/Topbrands";

  const [images, setImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(url);
  }, [url]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (errorMsg) {
    return <div>Error occurred! {errorMsg}</div>;
  }

  // Responsive settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default number of slides to show
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    arrows: true,
    responsive: [
      {
        breakpoint: 900, // Screens up to 900px wide
        settings: {
          slidesToShow: 3, // Show 3 slides on larger screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Screens up to 768px wide
        settings: {
          slidesToShow: 2, // Show 2 slides on tablets
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Screens up to 480px wide
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="top-brands-slider">
      <Slider {...settings}>
        {images && images.length
          ? images.map((imageItem) => (
              <div key={imageItem.title} className="slide">
                <div className="slide-content">
                  <img
                    src={imageItem.image_path}
                    alt={imageItem.title}
                    className="circular-image"
                  />
                 
                </div>
              </div>
            ))
          : null}
      </Slider>
    </div>
  );
};

export default TopBrands;
