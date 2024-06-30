import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Box, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import SearchProducts from '../Pages/SearchProducts';

const Searchbar = () => {
 const navigate=useNavigate()
  
   const [search,setSearch]=useState("");
  

  const handleSearch=(e)=>{
    setSearch(e.target.value)
    
    if (search.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
    
  }
    
  const handleCross=()=>{
    navigate("/")
    setSearch("")
  }
 

  return (
    <Box
      display='flex'
      alignItems='center'
      bg='white'
      w='400px'
      borderRadius='10px'
      h='2.5rem'
      p='0 15px'
      boxShadow='0px 0px 8px #ddd'
    
    >
      <Input
        type="text"
        placeholder='Search for a product or brand ...'
        bg='transparent'
        border='none'
        h='100%'
        fontSize='1.25rem'
        ml='5px'
        outline='none'
        _focus={{
          border: 'none',
          boxShadow: 'none',
        }}
       
        value={search}
        
        onChange={(e)=>handleSearch(e)}
      />
      <Box as={ImCross} color="gray.500" ml="10px" onClick={handleCross} />
      <Box as={FaSearch} color="gray.500" ml="10px" />
    </Box>
  );
};

export default Searchbar;
