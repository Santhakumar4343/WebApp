import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AdminLogin.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';

const AdminLogin = ({setIsAdminLogedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isFormValid = () => {
    return username.trim() !== "" && password.trim() !== "" && !loading;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner

    // Prepare the login request data
    const loginData = {
      adminName: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `adminName=${username}&password=${password}`,
      });

      console.log(loginData)
      if (response.ok) {
        // Login successful
        setIsAdminLogedIn(true);
        navigate("/admin");
        setLoading(false); // Hide loading spinner
        toast.success("Login successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        // Login failed
        setIsAdminLogedIn(false)
        setLoading(false); // Hide loading spinner
        setLoginError(true);
        toast.error("Wrong Credentials", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      setIsAdminLogedIn(false)
      setLoading(false); // Hide loading spinner
      toast.error("An error occurred during login", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <div className="mainconainer">
        <div className="container">
          <div className="LOGOIMAGE">
            <img src="\assests\li.jpg" alt="Logo" style={{ maxWidth: '200px' }} />
          </div>
          <div className="login-card">
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {username === "" && (
                  <p className="error-msg">Please enter a username</p>
                )}
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password === "" && (
                  <p className="error-msg">Please enter a password</p>
                )}
              </div>

              <button type="submit" disabled={!isFormValid()}>
                {loading ? (
                  <ThreeDots color="#fff" height={20} width={20} />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;