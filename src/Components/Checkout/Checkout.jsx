import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import AddressForm from "./AddressForm";
import Summary from "./Summary";
import { useUser } from '../../Context/UseUser';
import PaymentForm from "./PaymentForm";

const steps = [
  "Login",
  "Delivery Address",
  "Order Summary",
  "Payment",
];

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0); // Start at the first step (Login)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const step = parseInt(queryParams.get("step")) || 0; // Default to the first step if no step parameter
  const navigate = useNavigate();
  const { userData } = useUser();
  const [orderId, setOrderId] = useState(null);  // Manage orderId state
  useEffect(() => {
    const isLoggedInUser = isLoggedIn();

    if (isLoggedInUser) {
      if (step === 0) {
        setActiveStep(1);
        navigate(`/checkout?step=1&customerId=${userData.customerId}`);
      } else if (!isNaN(step) && step >= 0 && step < steps.length) {
        setActiveStep(step);
      }
    }
  }, [step]);
  const handleNext = (orderId) => {
    setOrderId(orderId); // Set the orderId in the Checkout component
    if (activeStep === 1) {
      setActiveStep(2);
      navigate(`/checkout?step=2`);
    } else if (activeStep === 2) {
      setActiveStep(3);
      navigate(`/checkout?step=3`);
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    navigate(`/checkout?step=${activeStep - 1}`);
  };

  const handleReset = () => {
    setActiveStep(0);
    navigate(`/checkout?step=0`);
  };

  const handlePayment = () => {
    console.log("Handling payment...");
  };

  const isLoggedIn = () => {
    return true; // Replace this with your logic to check if the user is logged in
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <div>Login Form</div>;
      case 1:
        return (
          <AddressForm
      onNext={(orderId) => handleNext(orderId)} // Pass the orderId to handleNext
      onPrev={() => handleBack()}
    />
        );
      case 2:
        return (
          <Summary
          orderId={orderId} 
            onNext={handleNext}
            onPrev={handleBack}
          />
        );
      case 3:
        return (
          <PaymentForm
            onNext={handleNext}
            onPrev={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box className="px-5 lg:px-32" sx={{ width: "100%", mt: 4 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
            <div className="my-5">{renderStepContent(activeStep)}</div>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
