import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../Context/UseUser";
import { API_BASE_URL } from "../../Apis/api";
import Summary from "./Summary";
import {
  Grid,
  TextField,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
  DialogActions,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddressForm({ onNext, onPrev }) {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { userData } = useUser();
  const [addresses, setAddresses] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [openEditModal, setOpenEditModal] = useState(false);

  const cust = userData.customerId;
  console.log(cust);

  const fetchAddresses = async () => {
    try {
      if (cust) {
        const response = await axios.get(
          `${API_BASE_URL}/api/order/user/${cust}`
        );
        setAddresses(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, [cust]);

  const handleCancelEdit = () => {
    // Close the edit modal without saving changes
    setOpenEditModal(false);
    // Optionally, you can reset the editAddress state if needed
    setEditAddress({
      id: "",
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      mobile: "",
    });
  };

  const saveAddressToBackend = async (custId, addressData) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/order/save/${custId}`,
        addressData
      );
      const orderId = response.data.id;
      console.log("Address saved successfully. Order ID:", orderId);
      return orderId;
    } catch (error) {
      console.error("Error saving address:", error);
      throw error;
    }
  };

  const handleNext = async () => {
    // Create an addressData object with the form values
    const addressData = {
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipCode,
      mobile,
    };
  
    // Check if any field in addressData is empty or contains only whitespaces
    const isAnyFieldEmpty = Object.values(addressData).some(
      (value) => !value.trim()
    );
  
    if (!isAnyFieldEmpty) {
      try {
        // Save the address data to the backend
        const orderId = await saveAddressToBackend(cust, addressData);
        toast.success("Order placed Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // Proceed to the next step
        onNext(orderId);
      } catch (error) {
        console.error("Error handling next step:", error);
      }
    } else {
      toast.error("Address data is empty or contains only whitespaces, please fill required fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log("Address data is empty or contains only whitespaces, API not called.");
      // Handle the case where any field in addressData is empty or contains only whitespaces
    }
  };
  

  const handlePrev = () => {
    onPrev();
  };

  const [editAddress, setEditAddress] = useState({
    id: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    mobile: "",
  });

  const handleEditClick = (address) => {
    setEditAddress(address);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/address/edit/${cust}/${editAddress.id}`,
        editAddress
      );

      console.log("Address updated successfully:", response.data);
      setOpenEditModal(false);
      toast.success("Address updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchAddresses();
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Error updating address", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditAddress({
      ...editAddress,
      [name]: value,
    });
  };

  const handleDeliveryHere = async (addressId) => {
    console.log("bhbhfe" + addressId);
    try {
      if (addressId) {
        // Make a POST request to your Spring Boot API
        const response = await axios.post(
          `${API_BASE_URL}/api/order/create/${cust}/${addressId}`
        );

        // Check if the response status code is CREATED (201)
        if (response.status === 201) {
          // The order was created successfully, you can handle the response data as needed
          const createdOrder = response.data;
          console.log("Order created:", createdOrder);

          const orderId = createdOrder.id;

          // Check if orderId is valid before proceeding to the next step
          if (orderId) {
            // Proceed to the next step (you can call onNext here)
            onNext(orderId);

            // You can also show a success message or perform any additional actions if needed
            toast.success("Order Placed  successfully", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            console.error("Invalid orderId received.");
            // Handle the case where orderId is missing or invalid
          }
        } else {
          // Handle any other status codes if needed
          console.error("Error creating order. Status code:", response.status);
          toast.error("Error creating order", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        console.log("No valid addressId available, API not called.");
        // Handle the case where addressId is missing or falsy
      }
    } catch (error) {
      console.error("Error handling delivery:", error);
      toast.error("Error handling delivery", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;

    // Regular expression to match only alphabets
    const alphabetRegex = /^[A-Za-z ]+$/;

    setFirstName(value);

    // Basic validation: non-empty first name and only alphabets
    if (!value) {
      setFirstNameError("First Name is required.");
    } else if (!alphabetRegex.test(value)) {
      setFirstNameError("First Name should contain only alphabets.");
    } else {
      setFirstNameError("");
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);

    // Basic validation: non-empty and 10 digits
    const mobilePattern = /^[0-9]{10}$/;
    if (!value) {
      setMobileError("Mobile number is required.");
    } else if (!mobilePattern.test(value)) {
      setMobileError("Please enter a valid 10-digit mobile number.");
    } else {
      setMobileError("");
    }
  };
  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    setZipCode(value);

    // Basic validation: non-empty and 5 digits
    const zipCodePattern = /^\d{6}$/;
    if (!value) {
      setZipCodeError("Zip Code is required.");
    } else if (!zipCodePattern.test(value)) {
      setZipCodeError("Please enter a valid 5-digit Zip Code.");
    } else {
      setZipCodeError("");
    }
  };
  const isFormValid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      streetAddress.trim() !== "" &&
      city.trim() !== "" &&
      state.trim() !== "" &&
      zipCode.trim() !== "" &&
      mobile.trim() !== ""
    );
  };

  const [stateOptions] = useState([
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ]);
  const handleStateChange = (e) => {
    setState(e.target.value);
  };
  return (
    <>
      <Grid container spacing={1}>
        <div className="col-md-6">
          <Grid item xs={12} lg={12}>
            <Box
              className="border rounded-md shadow-md overflow-y-scroll"
              style={{ height: "30.5rem" }}
            >
              {addresses && addresses.length > 0 ? (
                addresses[0]?.customer?.addresses.map((address, index) => (
                  <Card
                    key={index}
                    className="border rounded-md shadow-md"
                    style={{ marginBottom: "10px" }}
                  >
                    <CardContent>
                      <h3>Address</h3>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <p>
                            <strong style={{ color: "black" }}>
                              Address id:
                            </strong>{" "}
                            {address.id}
                          </p>
                        </Grid>
                        <Grid item xs={6}>
                          <p>
                            <strong style={{ color: "black" }}>
                              firstName:
                            </strong>{" "}
                            {address.firstName}
                          </p>
                        </Grid>
                        <Grid item xs={6}>
                          <p>
                            <strong>Last Name:</strong> {address.lastName}
                          </p>
                        </Grid>
                        <Grid item xs={6}>
                          <p>
                            <strong>Street Address:</strong>{" "}
                            {address.streetAddress}
                          </p>
                        </Grid>
                        <Grid item xs={6}>
                          <p>
                            <strong>City:</strong> {address.city}
                          </p>
                        </Grid>
                        <Grid item xs={6}>
                          <p>
                            <strong>State:</strong> {address.state}
                          </p>
                        </Grid>
                        <Grid item xs={6}>
                          <p>
                            <strong>Zip Code:</strong> {address.zipCode}
                          </p>
                        </Grid>
                        <Grid item xs={4}>
                          <p>
                            <strong>Mobile:</strong> {address.mobile}
                          </p>
                        </Grid>
                      </Grid>
                      <Button
                        sx={{ mt: 2 }}
                        style={{ marginRight: "30px" }}
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditClick(address)}
                      >
                        Edit
                      </Button>

                      <Button
                        sx={{ mt: 2 }}
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => handleDeliveryHere(address.id)}
                      >
                        Delivery here
                      </Button>
                      <Dialog
                        open={openEditModal}
                        onClose={handleCloseEditModal}
                        aria-labelledby="edit-address-dialog-title"
                        maxWidth="sm"
                      >
                        <DialogTitle id="edit-address-dialog-title">
                          Edit Address
                        </DialogTitle>
                        <DialogContent style={{ overflowY: "hidden" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <InputLabel htmlFor="id">Address id:</InputLabel>
                              <TextField
                                id="id"
                                name="id"
                                value={editAddress.id}
                                fullWidth
                                readOnly
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <InputLabel htmlFor="firstName">
                                First Name:
                              </InputLabel>
                              <TextField
                                id="firstName"
                                name="firstName"
                                value={editAddress.firstName}
                                fullWidth
                                onChange={handleInputChange}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <InputLabel htmlFor="firstName">
                                Last Name:
                              </InputLabel>
                              <TextField
                                id="lastName"
                                name="lastName"
                                value={editAddress.lastName}
                                fullWidth
                                onChange={handleInputChange}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <InputLabel htmlFor="firstName">
                                Street Address:
                              </InputLabel>
                              <TextField
                                id="streetAddress"
                                name="streetAddress"
                                value={editAddress.streetAddress}
                                fullWidth
                                onChange={handleInputChange}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <InputLabel htmlFor="firstName">City:</InputLabel>
                              <TextField
                                id="city"
                                name="city"
                                value={editAddress.city}
                                fullWidth
                                onChange={handleInputChange}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <InputLabel htmlFor="firstName">
                                State:
                              </InputLabel>
                              <TextField
                                id="state"
                                name="state"
                                value={editAddress.state}
                                fullWidth
                                onChange={handleInputChange}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <InputLabel htmlFor="firstName">
                                Zip Code:
                              </InputLabel>
                              <TextField
                                id="zipCode"
                                name="zipCode"
                                value={editAddress.zipCode}
                                fullWidth
                                onChange={handleInputChange}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <InputLabel htmlFor="firstName">
                                Mobile:
                              </InputLabel>
                              <TextField
                                id="mobile"
                                name="mobile"
                                value={editAddress.mobile}
                                fullWidth
                                onChange={handleInputChange}
                              />
                            </Grid>
                          </Grid>
                          <DialogActions style={{ marginRight: "140px" }}>
                            <Button
                              style={{ marginRight: "10px" }}
                              sx={{ mt: 2 }}
                              size="large"
                              variant="contained"
                              color="primary"
                              onClick={handleCloseEditModal}
                            >
                              Save
                            </Button>
                            <Button
                              sx={{ mt: 2 }}
                              size="large"
                              variant="contained"
                              color="primary"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </Button>
                          </DialogActions>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No addresses found</p>
              )}
            </Box>
          </Grid>
        </div>

        <Grid item xs={12} lg={6}>
          <div className="col-md-6">
            <div
              style={{
                width: "600px",
                height: "auto",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <h2>Address Form</h2>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  First Name:
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    borderColor: firstNameError ? "red" : "initial", // Highlight border if there's an error
                  }}
                />
                {firstNameError && (
                  <div
                    style={{ color: "red", width: "100%", marginTop: "5px" }}
                  >
                    {firstNameError}
                  </div>
                )}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Last Name:
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Street Address:
                </label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  City:
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  State:
                </label>
                <select
                  value={state}
                  onChange={handleStateChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                  }}
                >
                  <option value="">Select a state</option>
                  {stateOptions.map((stateName) => (
                    <option key={stateName} value={stateName}>
                      {stateName}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Zip Code:
                </label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={handleZipCodeChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    borderColor: zipCodeError ? "red" : "initial", // Highlight border if there's an error
                  }}
                />
                {zipCodeError && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {zipCodeError}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Mobile:
                </label>
                <input
                  type="text"
                  value={mobile}
                  onChange={handleMobileChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    borderColor: mobileError ? "red" : "initial", // Highlight border if there's an error
                  }}
                />
                {mobileError && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {mobileError}
                  </div>
                )}
              </div>
              <button onClick={handlePrev}>Previous</button>
              <button
                onClick={handleNext}
             
                style={{ marginLeft: "10px" }}
              >
                Next
              </button>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default AddressForm;
