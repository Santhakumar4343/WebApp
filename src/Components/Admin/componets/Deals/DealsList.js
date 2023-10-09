import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import UpdateProductForm from '../updateProduct/UpdateProduct'; 
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import { API_BASE_URL } from "../../../../Apis/api";


const DealsList= () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [offerEndDate, setOfferEndDate] = useState('');
  const [newDiscountPercent, setNewDiscountPercent] = useState('0%');
  const [newProductCost, setNewProductCost] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productId, setProductId] = useState(null);

  

  const handleOfferEndDateChange = (e) => {
    setOfferEndDate(e.target.value);
  };

  const handleNewDiscountPercentChange = (e) => {
    setNewDiscountPercent(e.target.value);
  };

  const handleNewProductCostChange = (e) => {
    const newValue = parseFloat(e.target.value);
    console.log(newValue); // Check if newValue is a valid double
    setNewProductCost(newValue);
  };
  
  

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
// Create a function to fetch products
const fetchProducts = () => {
  fetch(`${API_BASE_URL}/api/product/getallproducts`)
    .then((response) => response.json())
    .then((data) => {
      setProducts(data); // Set the products directly within this function
    })
    .catch((error) => {
      console.error('Error fetching products:', error);
    });
};

useEffect(() => {
  fetchProducts();
}, []);

  const handleUpdateProduct = (productId) => {
    // Set the selected product's ID to open the UpdateProduct form with auto-populated details
    setSelectedProductId(productId);
  };

  const handleDeleteProduct = (productId) => {
    // Send a DELETE request to the API to delete the product
    fetch(`${API_BASE_URL}/api/product/deleteproduct/${productId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted product from the products list
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.productId !== productId)
          );
        } else {
          console.error('Failed to delete product');
        }
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveDeals = async () => {
    const formData = new FormData();
  
    selectedProducts.forEach((selectedProductId) => {
      formData.append('productIds', selectedProductId); 
    });
  
    formData.append('newDiscountPercent', newDiscountPercent);
    formData.append('newProductCost', newProductCost);
    if (offerEndDate) {
        // Format the offerEndDate as "YYYY-MM-DD"
        const formattedOfferEndDate = new Date(offerEndDate);
        formData.append('offerEndDate', formattedOfferEndDate.toISOString().split('T')[0]);
      }
  
    try {
      const response = await axios.post(`${API_BASE_URL}/api/deal/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        alert('Deals saved successfully');
        setOfferEndDate('');
        setNewDiscountPercent('');
        setNewProductCost('');
        setSelectedProducts([]);
        handleClose();

        fetchProducts();
      } else {
        alert('Error saving deals');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  
  useEffect(() => {
  
    axios.get(`${API_BASE_URL}/api/product/getallproducts`) 
      .then((response) => {
        // Update the state with the fetched products
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

return (

  
  <div className="product-list">
    <h5>Add Deals For Products</h5>
   
    <div className='mb-5'>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Deals
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"DEAL OF THE DAY"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div> <TextField id="standard-basic" label="New Product Price" type='text' variant="standard" value={newProductCost} onChange={handleNewProductCostChange}/></div>
         <div className='mt-5'> <TextField id="standard-basic" label="Rate of discount (in %)" variant="standard" value={newDiscountPercent} onChange={handleNewDiscountPercentChange}/></div>
        <div className='mt-5'> <TextField id="standard-basic" label="Last Date for Offer" type='date' variant="standard" value={offerEndDate} onChange={handleOfferEndDateChange}/></div> 
         <div className='mt-5'>
          
         <Button
            variant="contained"
            onClick={() => handleSaveDeals(selectedProducts)}
          >
            Enable Deal
          </Button>

</div> 
          
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>
    </div>




    <div className="table-container">
      <Paper sx={{ width: '100%' }}>
        {/* <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
              <TableCell>Checkbox</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Offer</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {products
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((product) => (
      <TableRow key={product.productId}>
        <TableCell>
          <Checkbox
            checked={selectedProducts.includes(product.productId)}
            onChange={() => handleSelectProduct(product.productId)}
          />
        </TableCell>
        <TableCell>{product.productId}</TableCell>
        <TableCell>
          <img
            src={`data:image/png;base64,${product.pImage}`}
            alt={`Product ${product.productId}`}
            width="100"
            height="100"
          />
        </TableCell>
        <TableCell>{product.productName}</TableCell>
        <TableCell>{product.productCost}</TableCell>
        <TableCell>{product.productOffer}</TableCell>
        <TableCell>{product.productQuantity}</TableCell>
        <TableCell>{product.productDescription}</TableCell>
       
      </TableRow>
    ))}
</TableBody>

          </Table>;
        </TableContainer> */}
          <TableContainer style={{float:"left"}}>
      <Table stickyHeader aria-label="table in dashboard">
        <TableHead>
          <TableRow>
          <TableCell>Checkbox</TableCell>
            <TableCell>Productid</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Product cost</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Product Offer</TableCell>
            <TableCell sx={{ textAlign: "center" }}>ProductQuantity</TableCell>
            <TableCell sx={{ textAlign: "center" }}>createdAt</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Product Image</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {products
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((product) => (
            <TableRow key={product.productId}>
                   <TableCell>
          <Checkbox
            checked={selectedProducts.includes(product.productId)}
            onChange={() => handleSelectProduct(product.productId)}
          />
        </TableCell>
              <TableCell>{product.productId}</TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.productCost}</TableCell>
              <TableCell>{product.discountPercent}</TableCell>
              <TableCell>{product.productQuantity}</TableCell>
              <TableCell>{product.createdAt}</TableCell>
              <TableCell>
          <img
            src={`data:image/png;base64,${product.pImage}`}
            alt={`Product ${product.productId}`}
            width="100"
            height="100"
          />
        </TableCell>
      
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
    {selectedProductId && ( // Wrap this part in a div or fragment
      <div>
        <UpdateProductForm
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
          onProductUpdated={() => {
            // Handle product updated, e.g., refetch the product list
            // You can add your logic here to refresh the product list
          }}
        />
      </div>
    )}
  </div>
);
};

export default DealsList;