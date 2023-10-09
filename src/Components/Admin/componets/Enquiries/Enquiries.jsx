import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [updatedEnquiry, setUpdatedEnquiry] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:8080/api/enqiures/getallequires")
      .then((response) => response.json())
      .then((data) => {
        setEnquiries(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleUpdateClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setUpdatedEnquiry({
      name: enquiry.name,
      email: enquiry.email,
      phoneNumber: enquiry.phoneNumber,
      message: enquiry.message,
    });
    setOpenUpdateDialog(true);
  };

  const handleUpdateDialogClose = () => {
    setOpenUpdateDialog(false);
  };

  const handleUpdateEnquiry = async () => {
    // Create a FormData object and append the updated data
    const formData = new FormData();
    formData.append("name", updatedEnquiry.name);
    formData.append("email", updatedEnquiry.email);
    formData.append("phoneNumber", updatedEnquiry.phoneNumber);
    formData.append("message", updatedEnquiry.message);

    try {
      const response = await fetch(
        `http://localhost:8080/api/enqiures/update/${selectedEnquiry.eId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        // Handle success (you can show a success message here)
        console.log("Enquiry updated successfully");
        toast.success("Enquiry updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // Close the update dialog
        setOpenUpdateDialog(false);
        // Fetch updated data from the API and update the enquiries state
        fetch("http://localhost:8080/api/enqiures/getallequires")
          .then((response) => response.json())
          .then((data) => {
            setEnquiries(data);
           
          });
      } else {
        // Handle error (you can show an error message here)
        console.error("Error updating enquiry");
        toast.error("Error updating enquiry", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error updating enquiry:", error);
    toast.error("Network error. Please try again later.", {
        position: "top-right",
      });    }
  };

  const handleDeleteClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteEnquiry = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/enqiures/delete/${selectedEnquiry.eId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Handle success (you can show a success message here)
        console.log("Enquiry deleted successfully");
        toast.success("Enquiry deleted successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // Close the delete dialog
        setOpenDeleteDialog(false);
        // Fetch updated data from the API and update the enquiries state
        fetch("http://localhost:8080/api/enqiures/getallequires")
          .then((response) => response.json())
          .then((data) => {
            setEnquiries(data);
          });
      } else {
        // Handle error (you can show an error message here)
        console.error("Error deleting enquiry");
        toast.error("Error deleting enquiry", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error deleting enquiry:", error);
      toast.error("Network error. Please try again later.", {
        position: "top-right",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEnquiry((prevEnquiry) => ({
      ...prevEnquiry,
      [name]: value,
    }));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enquiries.map((enquiry, index) => (
              <TableRow key={index}>
                <TableCell>{enquiry.eId}</TableCell>
                <TableCell>{enquiry.name}</TableCell>
                <TableCell>{enquiry.email}</TableCell>
                <TableCell>{enquiry.phoneNumber}</TableCell>
                <TableCell>{enquiry.message}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleUpdateClick(enquiry)}
                    style={{ marginRight:"10px"}}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClick(enquiry)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        maxWidth="sm"
      >
        <DialogTitle style={{ textAlign:"center"}}>Delete Confirmation</DialogTitle>
        <DialogContent>
            Are you sure you want to delete this enquiry?
        </DialogContent>
        <DialogActions  style={{ justifyContent: "center" }}>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteEnquiry} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog  style={{ color:"white"}}open={openUpdateDialog} onClose={handleUpdateDialogClose}>
        <DialogTitle style={{ textAlign:"center"}}>Update Enquiry</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                label="Name"
                name="name"
                value={updatedEnquiry.name}
                onChange={handleInputChange}
                style={{ width: "48%" ,marginBottom:"15px"}}
              />
              <TextField
                label="Email"
                name="email"
                value={updatedEnquiry.email}
                onChange={handleInputChange}
                style={{ width: "48%" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                label="Contact Number"
                name="phoneNumber"
                value={updatedEnquiry.phoneNumber}
                onChange={handleInputChange}
                style={{ width: "48%" }}
              />
              <TextField
                label="Message"
                name="message"
                value={updatedEnquiry.message}
                onChange={handleInputChange}
              
                style={{ width: "48%" }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleUpdateDialogClose}>Cancel</Button>
          <Button onClick={handleUpdateEnquiry}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Enquiries;
