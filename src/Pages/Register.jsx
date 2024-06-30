import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

const Register = () => {
  
    const navigate=useNavigate();

  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

 const handleGoToLogin=()=>{
    navigate("/login");
 }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userCred",JSON.stringify(register))
    navigate("/login")
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='register-container'>
        <input
          type="text"
          name="username"
          value={register.username}
          placeholder="Enter username"
          onChange={(e) =>
            setRegister({ ...register, [e.target.name]: e.target.value })
          }
        />
        <input
          type="email"
          value={register.email}
          name="email"
          placeholder="Enter email"
          onChange={(e) =>
            setRegister({ ...register, [e.target.name]: e.target.value  })
          }
        />
        <input
          type="password"
          name="password"
          value={register.password}
          placeholder="Enter password"
          onChange={(e) =>
            setRegister({ ...register, [e.target.name]: e.target.value  })
          }
        />

        <button type="submit">Register</button>

        <h4>Already Register . <span onClick={handleGoToLogin}>Login Here</span></h4>
      </form>
    </div>
  );
};

export default Register;
