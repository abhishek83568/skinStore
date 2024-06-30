// src/components/Navbar.js
import { Box, Flex, Img, IconButton, Button } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsBasket3 } from "react-icons/bs";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { FaSearch, FaBars } from "react-icons/fa";


import Searchbar from "./Searchbar";
import logo from '../assets/images/skinstorelogo.webp';
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const userDetails = JSON.parse(localStorage.getItem("userCred"));

  const handleLogoClick = () => navigate("/");
  const handleCartLogo = () => navigate("/cart");
  const handleAccount = () => navigate("/login");

  const handleSearch=(e)=>{
    console.log(e.target.value)
  }

  return (
    <Flex
      as="nav"
      boxShadow="0px 0px 4px #ccc"
      justifyContent="space-between"
      alignItems="center"
      p="10px"
      height="150px"
      w="100%"
      overflow="hidden"
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        aria-label="Menu"
        icon={<FaBars />}
        variant="ghost"
      />
      
      <Box onClick={handleLogoClick} flexShrink={0}>
        <Img src={logo} alt="logo" p="10px" m="10px" />
      </Box>

      <Box
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        flex={1}
        mx={{ base: "10px", md: "20px" }}
        justifyContent="center"
      >
        <Searchbar />
      </Box>

      <IconButton 
        display={{ base: "flex", md: "none" }}
        aria-label="Search"
        icon={<FaSearch />}
        variant="ghost"
        ml="2"
      />

      <Flex
        alignItems="center"
        ml={{ base: "auto", md: "20px" }}
        gap="4"
      >
        {isLoggedIn ? (
          <>
            <Box>
              Welcome {userDetails.username}
            </Box>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={logout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Box onClick={handleAccount}>
            <RiAccountPinCircleFill fontSize="30px" />
            <Box as="h1" ml="2" display={{ base: "none", md: "inline" }}>
              Account
            </Box>
          </Box>
        )}

        <Box onClick={handleCartLogo}  mr="2">
          <BsBasket3 fontSize="30px" />
          <Box as="h1" ml="2" display={{ base: "none", md: "inline" }}>
            cart
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
