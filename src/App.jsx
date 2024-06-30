import "./App.css";
import Navbar from "./components/Navbar";


import ProductPage from "./Pages/ProductPage";
import { Route, Routes } from "react-router-dom";
import Dermstore from "./Pages/Dermstore";
import Sale from "./Pages/Sale";
import Skincare from "./Pages/Skincare";
import Sunscreen from "./Pages/Sunscreen";
import Haircare from "./Pages/Haircare";
import Fragnance from "./Pages/Fragnance";
import Blogs from "./Pages/Blogs";
import Makeup from "./Pages/Makeup";
import Brands from "./Pages/Makeup";
import ToolsDevices from "./Pages/ToolsDevices";
import Home from "./Pages/Home";
import SingleProduct from "./Pages/SingleProduct";
import Cart from "./Pages/Cart";
import LoginPage from "./Pages/LoginPage";
import Register from "./Pages/Register";
import PrivateRoute from "./BrowserRouter/PrivateRoute";
import SearchProducts from "./Pages/SearchProducts";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dermstore" element={<Dermstore />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/skincare" element={<Skincare />} />
          <Route path="/sunscreen" element={<Sunscreen />} />
          <Route path="/makeup" element={<Makeup />} />
          <Route path="/haircare" element={<Haircare />} />
          <Route path="/tools&devices" element={<ToolsDevices />} />
          <Route path="/fragnance" element={<Fragnance />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:id" element={<PrivateRoute><SingleProduct /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><Cart/></PrivateRoute>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/search" element={<SearchProducts/>} />
      </Routes>
{/*  */}
    </>
  );
}

export default App;
