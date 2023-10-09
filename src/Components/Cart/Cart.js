import React, { useState, useEffect } from "react";
import './Cart.css'
import axios from "axios";
import { useUser } from '../../Context/UseUser';
import { Card, Col, Row } from 'react-bootstrap';
import ProductList from "../Product/ProductList";
import AddressForm from '../Checkout/AddressForm';
import Summary from '../Checkout/Summary';
import PaymentForm from '../Checkout/PaymentForm';
import { Badge, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Initialize with empty data
    loggedIn: false, // Add a flag to indicate if the user is logged in
    addressProvided: false, // Add a flag to indicate if an address is provided
  });
  const { userData } = useUser();
  const [customerCartDetails, setCustomerCartDetails] = useState({
    cartItems: [],
    customer: {},
    totalItem: 0,
    totalPrice: 0,
    discounte: 0,
    finalPrice: 0,
  });


  const cartData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cart/${userData.customerId}`);
      setCustomerCartDetails(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // useEffect(() => {
  //   cartData();
  // }, [userData.customerId]);

  const retrieveCartItemsFromLocalStorage = () => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCustomerCartDetails({
      ...customerCartDetails,
      cartItems: storedCartItems,
    });
  };

  useEffect(() => {
    if (userData && userData.customerId) {
      // If the user is logged in and has a customerId
      cartData();
    } else {
      // If the user is not logged in or doesn't have a customerId
      retrieveCartItemsFromLocalStorage();
      console.log(retrieveCartItemsFromLocalStorage());
    }
  }, [userData]);
  
  // Rest of the code remains the same...
  

  const increaseQuantity = async (cartItemId, currentQuantity) => {
    // Find the cart item in customerCartDetails and update its quantity in the frontend
    const updatedCartItems = customerCartDetails.cartItems.map((cartItem) => {
      if (cartItem.id === cartItemId) {
        cartItem.quantity = currentQuantity + 1; // Increase the quantity by 1 in the frontend
      }
      return cartItem;
    });

    // Update the customerCartDetails state with the updated cart items in the frontend
    setCustomerCartDetails({
      ...customerCartDetails,
      cartItems: updatedCartItems,
    });

    // Make a PUT request to update the quantity in the backend
    try {
      await axios.put(`http://localhost:8080/api/cartitem/${cartItemId}/${userData.customerId}`, {
        quantity: currentQuantity + 1, // Send the dynamically updated quantity in the request body
      });
      cartData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const decreaseQuantity = async (cartItemId, currentQuantity) => {
    // Find the cart item in customerCartDetails and update its quantity in the frontend
    const updatedCartItems = customerCartDetails.cartItems.map((cartItem) => {
      if (cartItem.id === cartItemId) {
        cartItem.quantity = currentQuantity - 1; // Increase the quantity by 1 in the frontend
      }
      return cartItem;
    });

    // Update the customerCartDetails state with the updated cart items in the frontend
    setCustomerCartDetails({
      ...customerCartDetails,
      cartItems: updatedCartItems,
    });

    // Make a PUT request to update the quantity in the backend
    try {
      await axios.put(`http://localhost:8080/api/cartitem/${cartItemId}/${userData.customerId}`, {
        quantity: currentQuantity - 1, // Send the dynamically updated quantity in the request body
      });
      cartData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteItemFromCart = async (cartItemId) => {
    console.log("clciked");
    try {
      // Send a delete request to the backend
      await axios.delete(`http://localhost:8080/api/cartitem/${cartItemId}/${userData.customerId}`);
  
      // After successful delete, update the cart data in your component
      cartData();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };
  

  const handlePayment = () => {
    // Simulate payment processing (replace this with actual payment logic)
    console.log('Processing payment:', formData);
    alert('Payment Successful!'); // Display a success message (for demo)
    setStep(1); // Reset the form to the first step
    setFormData({}); // Clear the form data
  };

  const imageStyle = {
    width: '150px',
  };
  
  return (
    <div>
    <div className="cart">
      <h2>Your Cart</h2>
      <Row>
        <Col xs={12} md={8}>
          <div className="cart-items">
            <h3>Cart Items:</h3>
            {customerCartDetails.cartItems?.map((cartItem) => (
              <Card key={cartItem.id} className="mb-3">
                <Card.Body>
                  <Card.Title>{cartItem.product?.productName}</Card.Title>
                  <img
      src={`data:image/png;base64,${cartItem.product?.pImage}`}
      alt={cartItem.product?.productName}
      style={imageStyle}
    />
                  <Card.Text>
            
                    <p>Price: ₹{cartItem.price}</p>
                    <p>Discount Offer :{cartItem.product?.discountPercent}</p>
                    <p>Discounted Price: ₹{cartItem.discountedPrice}</p>
                    
                    <div className="row">
                    <div className="col">
                  { (cartItem.quantity > 1) ? 
                    (<button className="btn btn-light btn-outline-dark"  onClick={() => decreaseQuantity(cartItem.id, cartItem.quantity)}>-</button>) : 
                    (  <button
                      className="btn btn-danger btn-outline-dark"
                      onClick={() => deleteItemFromCart(cartItem.id)}
                    >
                      Remove from cart
                    </button>)
                    } 

                    </div>
                    <div className="col">
                    <p>Quantity: {cartItem.quantity}</p>
                    </div>
                    <div className="col">
                    <button className="btn btn-light btn-outline-dark"  onClick={() => increaseQuantity(cartItem.id, cartItem.quantity)}>+</button>
                    </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      
                 {/* Customer Information */}
        <Col xs={12} md={4}>
          <div className="card">
            <h3>Customer Information:</h3>
            <p>Name: {customerCartDetails.customer?.customerName}</p>
            <p>Email: {customerCartDetails.customer?.email}</p>
            <p>Contact No: {customerCartDetails.customer?.contactNo}</p>
          </div>
          <div className="card mt-1">
            <h3>Cart Summary:</h3>
                 <p>Total Items: {customerCartDetails.totalItem}</p>
            <p>Total Price: ₹{customerCartDetails.totalPrice}</p>
            <p>Discount:₹{customerCartDetails.discounte}</p>
            <p>Final Price: ₹{customerCartDetails.finalPrice}</p>
   
          </div>
          <Button
            onClick={() => navigate("/checkout")}
            variant="contained"
            type="submit"
            sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
          >
            Check Out
          </Button>
  
        </Col>
          {/* Cart Summary */}
    
    
      </Row>
 
    </div>




    </div>
  );
}

export default Cart;