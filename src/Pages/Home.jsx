import React from 'react'
import Slideshow1 from "../components/Slideshow1";
import TopBrands from "../components/TopBrands";
import reward from "../../src/assets/images/Rewards.avif";
import { Trending } from "../components/Trending";
import offer from "../../src/assets/images/Offers.avif";
import Offers from "../components/Offers";
import powerbright from '../../src/assets/images/powerbright.avif'
import BestSellers from "../components/BestSellers";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
        
      <Slideshow1 />
      <h1 style={{ fontSize: "30px", textAlign: "center" }}>
        Shop by Top Brands on Dermstore
      </h1>
      <TopBrands />
      <img
        src={reward}
        style={{
          marginTop: "100px",
          border: "2px solid ",
          borderRadius: "5px",
          marginBottom: "30px",
        }}
      />
      <h1 style={{ fontSize: "30px", textAlign: "center" }}>
       Trending now at Dermstore
      </h1>
      <Trending/>
      <img
        src={offer}
        style={{
          marginTop: "100px",
          border: "2px solid ",
          borderRadius: "5px",
          marginBottom: "100px",
        }}
      />
      <Offers/>
      <img
        src={powerbright}
        style={{
          marginTop: "100px",
          border: "2px solid ",
         
          borderRadius: "5px",
          marginBottom: "100px",
        }}
      />
       <h1 style={{ fontSize: "30px", textAlign: "center" }}>
       BEST SELLERS
      </h1>
      <BestSellers/>
      
      <Footer/>
    </div>
  )
}

export default Home