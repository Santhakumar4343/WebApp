import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API requests
import { useUser } from '../../Context/UseUser';
import { API_BASE_URL } from '../../Apis/api';
import './Summary.css';

function Summary({ orderId, data, onPrev, onNext }) {
  const [orderHistory, setOrderHistory] = useState([]);
  const { userData } = useUser();
  const[orderitemsssss,setOrderitemsss]=useState([]);
console.log("this-->"+orderId)
  const handlePrev = () => {
    onPrev();
  };
 const custt=userData.customerId;
 const custname=userData.customerName;
  const handleNext = () => {
    // You can add additional logic here if needed
    onNext();
  };

  const fetchOrderHistory = async () => {
    if (orderId) {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/order/${orderId}/${custt}`);
        setOrderHistory(response.data);
        const { orderItems } = response.data; // Destructuring orderItems from the response
        setOrderitemsss(orderItems);
        // Now you can use the orderItems array
        console.log('Order Items:', orderItems);
        console.log(response.data.orderItems +"helldxffdsfdo")
        console.log("order deatls get from summaey"+response.data)
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    }
  };
  
  useEffect(() => {
    if (orderId) {
      fetchOrderHistory();
    }
  }, [orderId]);

  const [paymentLinkUrl, setPaymentLinkUrl] = useState('');
  

  const custid=userData.customerId;
 

  const createPaymentLink = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/pay/payments/${orderId}/${custid}`, {
        // Add necessary data for creating payment link (order ID, customer ID, etc.)
      });
  
      // Extract the payment link URL from the response
      const linkUrl = response.data.payment_link_url;
      return linkUrl; // Return the payment link URL
    } catch (error) {
      console.error('Error creating payment link:', error);
      throw error; // Re-throw the error to handle it in the caller
    }
  };
  
  const handleCheckout = async () => {
    try {
      // Call the function to create a payment link
      const paymentLinkUrl = await createPaymentLink();
      
      if (paymentLinkUrl) {
        // Navigate to the payment link URL
        window.location.href = paymentLinkUrl;
      } else {
        console.error('No payment link URL received.');
      }
    } catch (error) {
      console.error('Error handling checkout:', error);
    }
  };

  
  return (
    <div className="summary-container">
    <div className="left-column">
      <h3>Cart Summary:</h3>
      <p>Total Items: 1</p>
      <ul>
        {orderitemsssss.map((orderItem) => (
          <li key={orderItem.id}>
            <p>customerName: {custname}</p>
            <p>productName: {orderItem.product.productName}</p>
            <img
              src={`data:image/*;base64,${orderItem.product.pImage}`}
              alt="Product Image"
              style={{ width: '100px', height: '100px' }}
            />
          </li>
        ))}
      </ul>
    </div>

    <div className="right-column">
    <ul>
    <li>
      Order ID: {orderHistory.id}
    </li>
    <li>
      Total Price:<span className='totalprice'></span> {orderHistory.totalPrice}
    </li>
    <li>
      Discount: {orderHistory.discounte}
    </li>
    <li>
      Final Price: <span className="final-price">{orderHistory.finalPrice}</span>
    </li>
   
  </ul>

      {/* Display the payment link URL */}
      {paymentLinkUrl && (
        <div>
          <p>Payment Link URL:</p>
          <a href={paymentLinkUrl} target="_blank" rel="noopener noreferrer">
            {paymentLinkUrl}
          </a>
        </div>
      )}

      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleCheckout}>Process Payment</button>
    </div>
  </div>
  );
}

export default Summary;
