import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";


const BestSellers = () => {
  const url = "http://localhost:8080/BestSeller";
  const [images, setImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate()

  

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



  return (
    <div className="bestSeller-container">
      {images.map((item) => (
        <div key={item.id} className="slide-content">
          <img src={item.image_path} alt={item.title} />
          <p className="title">{item.title}</p>
          <p>{item.price}</p>
          <button>Quick Buy</button>
        </div>
      ))}
      <button className="viewallProducts"  onClick={()=>navigate('/product')}>VIEW ALL</button>
    </div>
  );
};

export default BestSellers;
