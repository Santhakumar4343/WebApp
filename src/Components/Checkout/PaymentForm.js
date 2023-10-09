import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, AlertTitle } from '@mui/material';
import { API_BASE_URL } from '../../Apis/api';
import { useParams } from 'react-router-dom';

function PaymentForm({ onPrev, onCheckout }) {
  const [paymentId, setPaymentId] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [userData, setUserData] = useState(null);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const { orderId } = useParams();

  useEffect(() => {
    // Retrieve userData from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    const urlParams = new URLSearchParams(window.location.search);
    const razorpayPaymentId = urlParams.get('razorpay_payment_id');

    if (razorpayPaymentId) {
      setPaymentId(razorpayPaymentId);
      setReferenceId(urlParams.get('razorpay_payment_link_reference_id'));
      setPaymentStatus(urlParams.get('razorpay_payment_link_status'));

      // Send payment details to the backend
      sendPaymentDetailsToBackend(razorpayPaymentId);
    }
  }, [orderId]);

  const handlePrev = () => {
    onPrev();
  };

  const sendPaymentDetailsToBackend = async (paymentId) => {
    try {
      // Make a GET request to fetch payment details from your backend endpoint
      const response = await axios.get(
        `${API_BASE_URL}/api/pay/payments?payment_id=${paymentId}&order_id=${orderId}`
      );

      if (response.status === 200) {
        setShowPaymentSuccess(true);
      } else {
        // Handle the case when the payment request fails
      }
    } catch (error) {
      console.error('Error fetching payment details from the backend:', error);
    }
  };

  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        {showPaymentSuccess && (
          userData ? (
            <Alert
              variant="filled"
              severity="success"
              sx={{ mb: 6, width: 'fit-content' }}
            >
              <AlertTitle>Payment Success, {userData.customerName}</AlertTitle>
              Congratulations! Your order has been placed.
            </Alert>
          ) : (
            <Alert
              variant="filled"
              severity="success"
              sx={{ mb: 6, width: 'fit-content' }}
            >
              <AlertTitle>Payment Success</AlertTitle>
              Congratulations! Your order has been placed.
            </Alert>
          )
        )}
      </div>
    </div>
  );
}

export default PaymentForm;