import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  TextField,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../../../Apis/api";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductsTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filterValue, setFilterValue] = useState({
    sort: "price_low",
    availability: "All",
  });
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const pageSize = 10; // Set your desired page size

  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");

  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploadImagesDialogOpen, setIsUploadImagesDialogOpen] =
    useState(false);
    const [errors, setErrors] = useState({});
  const [productData, setProductData] = useState({
    productName: "", // Initial values for your form fields
    productCost: 0,
    productOffer: "",
    productQuantity: 0,
    productDescription: "",
    discountPercent: "",
  });
  const openUpdateForm = (product) => {
    setSelectedProduct(product);
    setProductData({
      // Populate the form fields with the selected product's data
      productName: product.productName,
      productCost: product.productCost,
      productOffer: product.productOffer,
      productQuantity: product.productQuantity,
      productDescription: product.productDescription,
      discountPercent: product.discountPercent,
    });
    setIsUpdateFormOpen(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate inputs
    const newErrors = { ...errors };
    switch (name) {
      case "productName":
        newErrors.productName = /^[a-zA-Z ]+$/.test(value)
          ? ""
          : "Product name should only contain alphabets";
        break;
      case "productCost":
        newErrors.productCost = /^\d+$/.test(value)
          ? ""
          : "Product cost should only contain numbers";
        break;
      case "productOffer":
        newErrors.productOffer = /^(\d+%)?$/.test(value)
          ? ""
          : "Product offer should be in the format of number%";
        break;
      case "productQuantity":
        newErrors.productQuantity = /^\d+$/.test(value)
          ? ""
          : "Product quantity should only contain numbers";
        break;
      case "discountPercent":
        newErrors.discountPercent = /^(\d+%)?$/.test(value)
          ? ""
          : "Discount percentage should be in the format of number%";
        break;
      default:
        break;
    }

    setErrors(newErrors);

    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleCloseUpdateForm = () => {
    setIsUpdateFormOpen(false);
  };

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value - 1);
  };

  const handleUpdateProduct = () => {
    if (!productData.productName) {
      console.error("Product Name is required.");
      return;
    }
    const updatedProductData = new FormData();
    updatedProductData.append("productName", productData.productName);
    updatedProductData.append("productCost", productData.productCost);
    updatedProductData.append("productOffer", productData.productOffer);
    updatedProductData.append("productQuantity", productData.productQuantity);
    updatedProductData.append(
      "productDescription",
      productData.productDescription
    );
    updatedProductData.append("discountPercent", productData.discountPercent);
    if (selectedImage) {
      updatedProductData.append("pImage", selectedImage);
    }
    axios
      .put(
        `http://localhost:8080/api/product/updateproduct/${selectedProduct.productId}`,
        updatedProductData
      )
      .then((response) => {
        console.log("Product updated successfully:", response.data);
        toast.success("Product updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        handleCloseUpdateForm();
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        toast.error("Error updating product", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("Response data:", error.response.data);
      });
  };
  const handleDeleteProduct = (productId) => {
    console.log("Deleting product with ID:", productId);
    axios
      .delete(`http://localhost:8080/api/product/deleteproduct/${productId}`)
      .then((response) => {
        console.log("Product deleted successfully:", response.data);
        // Show a success toast
        toast.success("Product deleted successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        // Show an error toast
        toast.error("Error deleting product", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const handleImageUpload = (e) => {
    if (e.target.files) {
      const selectedImages = e.target.files;
      // Store selectedImages in state
      setSelectedImages(selectedImages);
    }
  };

  const handleUploadImages = () => {
    if (selectedProduct && selectedImages.length > 0) {
      // Create a new FormData object
      const formData = new FormData();

      // Append each selected image with the part name "files"
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append("files", selectedImages[i]);
      }

      axios
        .post(
          `http://localhost:8080/api/productimages/save/${selectedProduct.productId}`,
          formData
        )
        .then((response) => {
          console.log("Images uploaded successfully:", response.data);
          toast.success("Images uploaded successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          // Close the upload images dialog
          closeUploadImagesDialog();
        })
        .catch((error) => {
          console.error("Error uploading images:", error);
          console.log("Request data:", error.config.data);
          console.log("Response data:", error.response.data);
          toast.error("Error uploading images", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };

  const openUploadImagesDialog = (product) => {
    setSelectedProduct(product);
    setIsUploadImagesDialogOpen(true);
  };

  const closeUploadImagesDialog = () => {
    setSelectedProduct(null);
    setSelectedImages([]);
    setIsUploadImagesDialogOpen(false);
  };
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  // Function to open the confirmation dialog
  const openDeleteConfirmation = (product) => {
    setProductToDelete(product);
    setIsDeleteConfirmationOpen(true);
  };

  // Function to close the confirmation dialog
  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
    setProductToDelete(null);
  };

  // Function to handle product deletion after confirmation
  const handleDeleteAfterConfirmation = () => {
    if (productToDelete) {
      // Call the delete function
      handleDeleteProduct(productToDelete.productId);

      // Close the confirmation dialog
      closeDeleteConfirmation();
    }
  };

  const handleFilterChange = (e, sectionId) => {
    if (sectionId === "sort") {
      setFilterValue({ ...filterValue, sort: e.target.value });
    } else if (sectionId === "availability") {
      setFilterValue({ ...filterValue, availability: e.target.value });
    }
  };

  const sortedAndFilteredProducts = products
    .slice()
    .filter((product) => {
      const { availability } = filterValue;
      if (
        availability === "All" ||
        (availability === "in_stock" && product.productQuantity > 0) ||
        (availability === "out_of_stock" && product.productQuantity <= 0)
      ) {
        return true;
      }
      return false;
    })
    .sort((a, b) => {
      if (filterValue.sort === "price_high") {
        return b.productCost - a.productCost;
      } else {
        return a.productCost - b.productCost;
      }
    });

  const totalPages = Math.ceil(sortedAndFilteredProducts.length / pageSize);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/product/getallproducts`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const slicedProducts = sortedAndFilteredProducts.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const imageStyle = {
    width: "50px",
    height: "30px",
  };
  return (
    <Box width={"100%"}>
      <Card className="p-3">
        <CardHeader
          title="Sort"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid container spacing={2}>
          {/* <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.category}
                label="Category"
                onChange={(e) => handleFilterChange(e, "category")}
              >
                <MenuItem value={"pant"}></MenuItem>
                <MenuItem value={"mens_kurta"}></MenuItem>
                <MenuItem value={"saree"}></MenuItem>
                <MenuItem value={"lengha_choli"}></MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Availability
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.availability}
                onChange={(e) => handleFilterChange(e, "availability")}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"in_stock"}>In Stock</MenuItem>
                <MenuItem value={"out_of_stock"}>Out Of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sort By ProductCost
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.sort}
                onChange={(e) => handleFilterChange(e, "sort")}
              >
                <MenuItem value={"price_high"}>High - Low</MenuItem>
                <MenuItem value={"price_low"}>Low - High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      <Card className="mt-2">
        <CardHeader
          title="All Products"
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
                <TableCell>Productid</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Product cost</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  Product Offer
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  ProductQuantity
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>createdAt</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  discountedPrice
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  Product Image
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  Upload Images
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedProducts.map((product) => (
                <TableRow key={product.productId}>
                  <TableCell>{product.productId}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.productCost}</TableCell>
                  <TableCell>{product.discountPercent}</TableCell>
                  <TableCell>{product.productQuantity}</TableCell>
                  <TableCell>{product.createdAt}</TableCell>
                  <TableCell>{product.discountedPrice}</TableCell>
                  <TableCell>
                    {/* Display product image here */}
                    <img
                      src={`data:image/png;base64,${product.pImage}`}
                      alt={product.productName}
                      style={imageStyle}
                    />
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => openUpdateForm(product)}
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => openDeleteConfirmation(product)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => openUploadImagesDialog(product)}
                    >
                      Upload Images
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog
            open={isUploadImagesDialogOpen}
            onClose={closeUploadImagesDialog}
          >
            <DialogTitle style={{ textAlign: "center" }}>
              Upload Images
            </DialogTitle>

            <DialogContent
              style={{ textAlign: "center", marginBottom: "10px" }}
            >
              You can select multiple images at a time
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ marginTop: "10px" }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeUploadImagesDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleUploadImages} color="primary">
                Upload
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={isDeleteConfirmationOpen}
            onClose={closeDeleteConfirmation}
          >
            <DialogTitle style={{ textAlign: "center" }}>
              Confirm Deletion
            </DialogTitle>
            <DialogContent style={{ textAlign: "center" }}>
              Are you sure you want to delete this product?
            </DialogContent>
            <DialogActions style={{ justifyContent: "center" }}>
              <Button onClick={closeDeleteConfirmation} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteAfterConfirmation} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={isUpdateFormOpen}
            onClose={handleCloseUpdateForm}
            maxWidth="md"
          >
            <DialogTitle style={{ textAlign: "center" }}>
              Update Product
            </DialogTitle>
            <DialogContent>
              {selectedProduct && (
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <InputLabel
                        htmlFor="productName"
                        shrink
                        style={{ marginBottom: "2px" }}
                      >
                        Product Name
                      </InputLabel>
                      <TextField
                        fullWidth
                        name="productName"
                        value={productData.productName}
                        onChange={handleChange}
                        error={!!errors.productName}
                        helperText={errors.productName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel
                        htmlFor="productName"
                        shrink
                        style={{ marginBottom: "2px" }}
                      >
                        Product Cost
                      </InputLabel>
                      <TextField
                        fullWidth
                        name="productCost"
                        value={productData.productCost}
                        onChange={handleChange}
                        error={!!errors.productCost}
                        helperText={errors.productCost}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel
                        htmlFor="productName"
                        shrink
                        style={{ marginBottom: "2px" }}
                      >
                        Product Offer
                      </InputLabel>
                      <TextField
                        fullWidth
                        name="productOffer"
                        value={productData.productOffer}
                        onChange={handleChange}
                        error={!!errors.productOffer}
                        helperText={errors.productOffer}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel
                        htmlFor="productName"
                        shrink
                        style={{ marginBottom: "2px" }}
                      >
                        Product Quantity
                      </InputLabel>
                      <TextField
                        fullWidth
                        name="productQuantity"
                        value={productData.productQuantity}
                        onChange={handleChange}
                        error={!!errors.productQuantity}
                        helperText={errors.productQuantity}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InputLabel
                        htmlFor="productName"
                        shrink
                        style={{ marginBottom: "2px" }}
                      >
                        Discount Percentage
                      </InputLabel>
                      <TextField
                        fullWidth
                        name="discountPercent"
                        value={productData.discountPercent}
                        onChange={handleChange}
                        error={!!errors.discountPercent}
                        helperText={errors.discountPercent}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InputLabel
                        htmlFor="productName"
                        shrink
                        style={{ marginBottom: "2px" }}
                      >
                        Product Description
                      </InputLabel>
                      <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        name="productDescription"
                        onChange={handleChange}
                        value={productData.productDescription}
                        error={!!errors.productDescription}
                        helperText={errors.productDescription}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <input
                        type="file"
                        accept="image/*"
                        name="pImage"
                        onChange={handleImageChange}
                      />
                    </Grid>
                  </Grid>
                </form>
              )}
            </DialogContent>
            <DialogActions style={{ justifyContent: "center" }}>
              <Button onClick={handleCloseUpdateForm} color="primary">
                Cancel
              </Button>
              <Button onClick={handleUpdateProduct} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </TableContainer>
      </Card>
      <Card className="mt-2 border">
        <Pagination
          count={totalPages}
          page={currentPage + 1} // Add 1 because Pagination starts from page 1 but arrays start from index 0
          onChange={handlePaginationChange}
        />
        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md"></div>
      </Card>
    </Box>
  );
};

export default ProductsTable;