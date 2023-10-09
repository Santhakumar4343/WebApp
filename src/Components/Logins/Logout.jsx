import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

const Logout = () => { 
    const navigate = useNavigate(); 
const Logoutss=()=>{
    window.localStorage.removeItem("isLoggedin")
        navigate("/login");
}
  
  return ( 
    <div> 
   <button onClick={Logoutss}>
        logout
   </button>
    </div> 
  ); 
}; 
 
export default Logout;