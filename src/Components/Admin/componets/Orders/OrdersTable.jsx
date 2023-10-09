import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";

import Checkbox from "@mui/material/Checkbox";
import {
  Alert,
   AlertTitle,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Select,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


import { API_BASE_URL } from "../../../../Apis/api";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const OrdersTable = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(""); // Default status (empty string)
  const [sortBy, setSortBy] = useState("Newest"); // Default sort option
  const [anchorEl, setAnchorEl] = useState(null); // Anchor element for the menu
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Selected order ID for the menu
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [page, setPage] = useState(1); // Current page
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isPaymentInfoModalOpen, setIsPaymentInfoModalOpen] = useState(false);
  const [selectedPaymentInfoOrderId, setSelectedPaymentInfoOrderId] = useState(null);
  const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);

const fetchOrders = () => {
  axios
    .get(`${API_BASE_URL}/api/admin/orders/`)
    .then((response) => {
      setOrders(response.data);
    })
    .catch((error) => {
      console.error("Error fetching orders:", error);
    });
};

useEffect(() => {
  fetchOrders();
}, []);




const openPaymentInfoModal = (orderId) => {
  setSelectedPaymentInfoOrderId(orderId);
  const selectedOrder = orders.find((order) => order.id === orderId);
  if (selectedOrder) {
    setSelectedPaymentDetails(selectedOrder.paymentDetails);
  }
  setIsPaymentInfoModalOpen(true);
};


const closePaymentInfoModal = () => {
  setIsPaymentInfoModalOpen(false);
};


  const showSuccessAlert = (message) => {
    setAlertMessage(message);
    setSuccessAlert(true);
    setErrorAlert(false);
    setTimeout(() => setSuccessAlert(false), 5000); 
  };
  
  const showErrorAlert = (message) => {
    setAlertMessage(message);
    setErrorAlert(true);
    setSuccessAlert(false);
    setTimeout(() => setErrorAlert(false), 5000); 
  };
  
  const hideAlerts = () => {
    setSuccessAlert(false);
    setErrorAlert(false);
  };
  
  

  const handleOrderSelect = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredOrders = selectedStatus
    ? orders.filter((order) => order.orderStatus === selectedStatus)
    : orders;


  const sortedOrders = [...filteredOrders].sort((a, b) => {

    const dateComponentsA = a.orderDate;
    const dateComponentsB = b.orderDate;

    const dateA = new Date(
      dateComponentsA[0],
      dateComponentsA[1] - 1, 
      dateComponentsA[2],
      dateComponentsA[3],
      dateComponentsA[4]
    );

    const dateB = new Date(
      dateComponentsB[0],
      dateComponentsB[1] - 1, 
      dateComponentsB[2],
      dateComponentsB[3],
      dateComponentsB[4]
    );

    if (sortBy === "Newest") {
      return dateB - dateA;
    } else if (sortBy === "Oldest") {
      return dateA - dateB;
    }
    
    return 0;
  });

  const formatDate = (dateComponents) => {
    if (!dateComponents || dateComponents.length < 6) {
      return "";
    }

    const year = dateComponents[0];
    const month = dateComponents[1].toString().padStart(2, "0");
    const day = dateComponents[2].toString().padStart(2, "0");
    const hours = dateComponents[3].toString().padStart(2, "0");
    const minutes = dateComponents[4].toString().padStart(2, "0");
    const seconds = dateComponents[5].toString().padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const handleConfirmOrder = (orderId) => {
    axios
      .put(`${API_BASE_URL}/api/admin/orders/${orderId}/confirmed`)
      .then((response) => {
        console.log("Order confirmed:", response.data);
        showSuccessAlert("Order confirmed successfully.");
        fetchOrders();
        handleMenuClose();
      })
      .catch((error) => {
        console.error("Error confirming order:", error);
        showErrorAlert("Error confirming order. Please try again.");
      });
  };
  
  const handleShipOrder = (orderId) => {
    axios
      .put(`${API_BASE_URL}/api/admin/orders/${orderId}/ship`)
      .then((response) => {
        console.log("Order shipped:", response.data);
        showSuccessAlert("Order shipped successfully.");
        fetchOrders();
        handleMenuClose();
      })
      .catch((error) => {
        console.error("Error shipping order:", error);
        showErrorAlert("Error shipping order. Please try again.");
      });
  };
  
  const handleDeliverOrder = (orderId) => {
    axios
      .put(`${API_BASE_URL}/api/admin/orders/${orderId}/deliver`)
      .then((response) => {
        console.log("Order delivered:", response.data);
        fetchOrders();
        showSuccessAlert("Order delivered successfully.");
        handleMenuClose();
      })
      .catch((error) => {
        console.error("Error delivering order:", error);
        showErrorAlert("Error delivering order. Please try again.");
      });
  };
  
  const handleCancelOrder = (orderId) => {
    axios
      .put(`${API_BASE_URL}/api/admin/orders/${orderId}/cancel`)
      .then((response) => {
        console.log("Order canceled:", response.data);
        showSuccessAlert("Order canceled successfully.");
        fetchOrders();
        handleMenuClose();
      })
      .catch((error) => {
        console.error("Error canceling order:", error);
        showErrorAlert("Error canceling order. Please try again.");
      });
  };
  
  const handleDeleteOrder = (orderId) => {
    axios
      .delete(`${API_BASE_URL}/api/admin/orders/${orderId}/delete`)
      .then(() => {
        console.log("Order deleted:", orderId);
        showSuccessAlert("Order deleted successfully.");
        fetchOrders()
        handleMenuClose();
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
        showErrorAlert("Error deleting order. Please try again.");
      });
  };
  
  const handleMenuOpen = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <Box>
      <Card className="p-4">
        <CardHeader
          title="Sort"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedStatus}
                onChange={handleStatusChange}
                label="Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value={"PLACED"}>PLACED</MenuItem>
                <MenuItem value={"CONFIRMED"}>CONFIRMED</MenuItem>
                <MenuItem value={"SHIPPED"}>SHIPPED</MenuItem>
                <MenuItem value={"DELIVERED"}>DELIVERED</MenuItem>
                <MenuItem value={"CANCELED"}>CANCELED</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortBy}
                onChange={handleSortChange}
                label="Sort By"
              >
                <MenuItem value={"Newest"}>Newest</MenuItem>
                <MenuItem value={"Oldest"}>Oldest</MenuItem>
    
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      {successAlert && (
  <Alert severity="success" onClose={hideAlerts}>
    <AlertTitle>Success</AlertTitle>
    {alertMessage}
  </Alert>
)}

{errorAlert && (
  <Alert severity="error" onClose={hideAlerts}>
    <AlertTitle>Error</AlertTitle>
    {alertMessage}
  </Alert>
)}


      <Card className="mt-2">
   

        <CardHeader
          title="All Orders"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                {/* <TableCell>Select</TableCell> */}
                <TableCell>ID</TableCell>
                <TableCell>Order date</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>discount</TableCell>
                <TableCell>Final price</TableCell>
                <TableCell>Total price</TableCell>
                <TableCell>Total Products</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Payment status</TableCell>
                <TableCell>Manage Order</TableCell>
                <TableCell>More Information</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((order) => (
                <TableRow key={order.id}>
                  {/* <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleOrderSelect(order.id)}
                    />
                  </TableCell> */}
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{formatDate(order.orderDate)}</TableCell>

                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                  <TableCell>{order.discounte}</TableCell>
                  <TableCell>{order.finalPrice}</TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell>{order.totalItem}</TableCell>
                  <TableCell>{order.customer.customerName}</TableCell>
                  <TableCell>{order.paymentDetails.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(event) => handleMenuOpen(event, order.id)}
                    >
                      Actions
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={selectedOrderId === order.id && Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleConfirmOrder(order.id)}>
                        Confirm
                      </MenuItem>
                      <MenuItem onClick={() => handleShipOrder(order.id)}>
                        Ship
                      </MenuItem>
                      <MenuItem onClick={() => handleDeliverOrder(order.id)}>
                        Deliver
                      </MenuItem>
                      <MenuItem onClick={() => handleCancelOrder(order.id)}>
                        Cancel
                      </MenuItem>
                      <MenuItem onClick={() => handleDeleteOrder(order.id)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                  <TableCell>
                  <Button
                variant="contained"
                color="primary"
                onClick={() => openPaymentInfoModal(order.id)}
              >
                View Payment Info
              </Button>
</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Pagination
        count={Math.ceil(sortedOrders.length / itemsPerPage)}
        page={page}
        onChange={(event, value) => setPage(value)}
      />
      <Card className="mt-2 felx justify-center items-center"></Card>
       {/* Payment Information Modal */}
       <Modal
        open={isPaymentInfoModalOpen}
        onClose={closePaymentInfoModal}
        aria-labelledby="payment-info-modal-title"
        aria-describedby="payment-info-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <Typography id="payment-info-modal-title" variant="h6" component="h2">
  Payment Information for Order {selectedPaymentInfoOrderId}
</Typography>
{/* Display individual properties from selectedPaymentDetails */}
{selectedPaymentDetails && (
  <div>
    <p>Payment Status: {selectedPaymentDetails.status}</p>
    <p>Payment Method: {selectedPaymentDetails.paymentMethod}</p>
    <p>Payment ID: {selectedPaymentDetails.paymentId}</p>
   <p>For more Information refer your razor pay account </p>
   <a href="https://dashboard.razorpay.com/app/dashboard">Go to Razorpay Dashboard</a>
  </div>
)}

        </Box>
      </Modal>
    </Box>
  );
};

export default OrdersTable;