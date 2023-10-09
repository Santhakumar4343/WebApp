import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Profile = () => {
  const { customerId } = useParams();

  const [customer, setCustomer] = useState(null);


  const [isEditing, setIsEditing] = useState(false);

  const [updatedCustomerName, setUpdatedCustomerName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedContactNo, setUpdatedContactNo] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/customer/getCustomer/${customerId}`)
      .then(response => {
        setCustomer(response.data);
        setUpdatedCustomerName(response.data.customerName);
        setUpdatedEmail(response.data.email);
        setUpdatedContactNo(response.data.contactNo);
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
      });
  }, [customerId]);
const handleUpdate = () => {
  const formData = new FormData();
  formData.append('customerName', updatedCustomerName);
  formData.append('email', updatedEmail);
  formData.append('contactNo', updatedContactNo);
  formData.append('password', updatedPassword);

  axios
    .put(`http://localhost:8080/api/customer/updatecustomer/${customerId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log('Customer updated:', response.data);
      setCustomer(response.data);
      setIsEditing(false);
      toast.success("Customer updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .catch(error => {
      console.error('Error updating customer:', error);
      toast.error("Error updating customer", {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
};

  
  

  return (
    <div style={profileStyle}>
      <h2 style={headingStyle}>Profile Page</h2>

      {customer ? (
        <div>
          <label>
            Name:
            <input
              type="text"
              value={updatedCustomerName}
              onChange={e => setUpdatedCustomerName(e.target.value)}
              disabled={!isEditing}
            />
          </label>

          <label>
            Email:
            <input
              type="text"
              value={updatedEmail}
              onChange={e => setUpdatedEmail(e.target.value)}
              disabled={!isEditing}
            />
          </label>

          <label>
            Phone Number:
            <input
              type="text"
              value={updatedContactNo}
              onChange={e => setUpdatedContactNo(e.target.value)}
              disabled={!isEditing}
            />
          </label>

       

          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>

          {isEditing && (
            <button onClick={handleUpdate}>Save Changes</button>
          )}
        </div>
      ) : (
        <p>Loading customer information...</p>
      )}
    </div>
  );
};

const profileStyle = {
  padding: '20px',
  maxWidth: '600px',
  margin: '0 auto',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  backgroundColor: '#fff',
  margin: '70px auto'
};

const headingStyle = {
  borderBottom: '1px solid #ccc',
  paddingBottom: '10px',
  marginBottom: '20px',
  fontSize: '1.5em',
};

export default Profile;