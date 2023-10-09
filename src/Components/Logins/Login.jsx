import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your CSS file
import { Link } from 'react-router-dom';
import { useUser } from '../../Context/UseUser'; // Import useUser from your UserContext
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserData } = useUser(); // Import and use setUserData from your UserContext
  const [customerName, setCustomerName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already authenticated (e.g., with data in localStorage)
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      navigate('/home');
    }
  }, [setUserData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObject = new FormData();
    formDataObject.append('email', email);
    formDataObject.append('password', password);

    try {
      const response = await axios.post('http://localhost:8080/api/customer/login', formDataObject);

      if (response.status === 200 && response.data) {
        console.log('Login successful:', response.data);

        setUserData(response.data);
        toast.success("Sign In Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // Save the user data in localStorage
        localStorage.setItem('userData', JSON.stringify(response.data));

        setCustomerName(response.data.customerName);

        navigate('/home');
      } else {
        toast.error("Error sign in failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.error('Invalid credentials');
      }
    } catch (error) {
      toast.error("Error signin failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="loginandsignup">
          <div className="login">
            <button type="submit">Submit</button>
          </div>
          <div className="signup">
            <Link to="/loginSignup">Signup?</Link>
          </div>
          <div className="forgot">
            <Link to="/forgot">Forgot?</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;