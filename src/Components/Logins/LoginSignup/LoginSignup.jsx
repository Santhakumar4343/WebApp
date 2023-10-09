import axios from 'axios'; 
import React, { useState ,useEffect} from 'react'; 
import './LoginSignup.css'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => { 
  const [password, setPassword] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [customerName, setCustomerName] = useState(''); 
  const [contactNo, setContactNo] = useState(''); 
  const navigate = useNavigate();
  const [existingCustomers, setExistingCustomers] = useState([]);
  const fetchExistingCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/customer/getAllCustomers");
      setExistingCustomers(response.data); // Assuming the response contains an array of existing customers
    } catch (error) {
      console.error('Error fetching existing customers:', error);
    }
  };
  useEffect(() => {
    fetchExistingCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if any of the required fields are empty
    if (!customerName || !contactNo || !email || !password) {
      toast.error("Error: Please fill in all required fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
  
    // Check for uniqueness against existing data
    const isCustomerNameExists = existingCustomers.some(
      (customer) => customer.customerName === customerName
    );
    const isContactNoExists = existingCustomers.some(
      (customer) => customer.contactNo === contactNo
    );
    const isEmailExists = existingCustomers.some(
      (customer) => customer.email === email
    );
  
    if (isCustomerNameExists) {
      toast.error("Error: UserName name already exists", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (isContactNoExists) {
      toast.error("Error: Contact number already exists", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
  
    if (isEmailExists) {
      toast.error("Error: Email already exists", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    // Proceed with the save operation if data is unique
    try {
      const formDataObject = new FormData();
      formDataObject.append('contactNo', contactNo);
      formDataObject.append('customerName', customerName);
      formDataObject.append('email', email);
      formDataObject.append('password', password);
  
      const response = await axios.post(
        "http://localhost:8080/api/customer/save",
        formDataObject,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      // Reset the form by updating the state
      setCustomerName('');
      setContactNo('');
      setPassword('');
      setEmail('');
  
      toast.success("Register successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
  
      console.log('Response:', response.data);
  
      // Navigate to the login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error: Registration failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  
  return ( 
 
<> 
 
     
    <div className="login-signup-container"> 
      <form onSubmit={handleSubmit}> 
        
 
        <div className="input-group"> 
          <input 
            type="text" 
            name='customerName' 
            placeholder="customerName" 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)} 
          /> 
        </div> 
 
        <div className="input-group"> 
          <input 
            type="text" 
            name='contactNo' 
            placeholder="contactNo" 
            value={contactNo} 
            onChange={(e) => setContactNo(e.target.value)} 
          /> 
        </div> 
        <div className="input-group"> 
          <input 
            type="password" 
            name='password' 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          /> 
        </div> 
 
        <div className="input-group"> 
          <input 
            type="email" 
            name='email' 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          /> 
        </div> 
 
        <button type="submit">Submit</button> 
      </form> 
    </div> 
    </> 
 
  ); 
}; 
 
export default LoginSignup;