import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Orders = () => {
  const { customerId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/order/user/${customerId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [customerId]); // Include customerId in the dependency array

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Your Orders</h2>
      {orders.map(order => (
        <div key={order.orderId} style={orderContainerStyle}>
          <p style={infoStyle}>Order ID: {order.orderId}</p>
          <p style={infoStyle}>Total Price: {order.totalPrice}</p>
          <p style={infoStyle}>Order Status: {order.orderStatus}</p>
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
};

const containerStyle = {
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

const orderContainerStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  marginBottom: '10px'
};

const infoStyle = {
  margin: '5px 0'
};

export default Orders;
