import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./CreateProductForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateProductForm = () => {
  // State to manage product data and form fields
  const [productData, setProductData] = useState({
    productName: "",
    productCost: "",
    productOffer: "",
    productQuantity: "",
    productDescription: "",
    discountPercent: "",
    categoryId: "",
    subcategoryId: "",
    pImage: null, // Initialize pImage as null
  });

  // State to store categories and subcategories fetched from the API
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch all categories when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/Categories/getAllCategories")
      .then((response) => {
        setCategories(response.data);
        console.log("Categories:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Fetch subcategories based on the selected category
  useEffect(() => {
    if (productData.categoryId) {
      axios
        .get(
          `http://localhost:8080/api/subcategroy/getByCategory/${productData.categoryId}`
        )
        .then((response) => {
          setSubcategories(response.data);
        })
        .catch((error) => {
          console.error("Error fetching subcategories:", error);
        });
    }
  }, [productData.categoryId]);

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

  // const hasErrors = Object.values(errors).some((error) => error !== "");
  // if (hasErrors) {
  //   toast.error("Please fix the errors in the form", {
  //     position: toast.POSITION.TOP_RIGHT,
  //   });
  //   return;
  // }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("productCost", productData.productCost);
    formData.append("productOffer", productData.productOffer);
    formData.append("productQuantity", productData.productQuantity);
    formData.append("productDescription", productData.productDescription);
    formData.append("discountPercent", productData.discountPercent);
    formData.append("pImage", productData.pImage);

    // Send a POST request to save the product
    axios
      .post(
        `http://localhost:8080/api/product/save/${productData.subcategoryId}`,
        formData
      )
      .then((response) => {
        console.log("Product saved successfully:", response.data);
        toast.success("Product saved successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // Clear the form fields after successful submission if needed
        setProductData({
          productName: "",
          productCost: "",
          productOffer: "",
          productQuantity: "",
          productDescription: "",
          discountPercent: "",
          categoryId: productData.categoryId, // You can optionally retain the category selection
          subcategoryId: "",
          pImage: null,
        });
      })
      .catch((error) => {
        console.error("Error saving product:", error);
        toast.error("Please Fill Required Fields", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProductData((prevState) => ({
      ...prevState,
      pImage: imageFile,
    }));
  };

  return (
    <div className="createProductContainer">
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: "20px" }}
        className="py-10 text-center"
      >
        Add New Product
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel htmlFor="productName" shrink style={{ marginBottom: "2px" }}>
              Product Name
            </InputLabel>
            <TextField
              fullWidth
              id="productName"
              name="productName"
              value={productData.productName}
              onChange={handleChange}
              error={!!errors.productName}
              helperText={errors.productName}
            />
          </Grid>
          <Grid item xs={6}>
            {/* Text input for Product Cost */}
            <InputLabel htmlFor="productName" shrink style={{ marginBottom: "2px" }}>
              Product Cost
            </InputLabel>
            <TextField
              fullWidth 
              name="productCost"
              value={productData.productCost}
              onChange={handleChange}
              error={!!errors.productCost}
              helperText={errors.productCost}
              style={{ height: "56px" }}
            />
          </Grid>

          {/* Row 2 */}
          <Grid item xs={6}>
            {/* Text input for Product Offer */}
            <InputLabel htmlFor="productName" shrink style={{ marginBottom: "2px" }}>
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
          <Grid item xs={6}>
            {/* Text input for Product Quantity */}
            <InputLabel htmlFor="productName" shrink style={{ marginBottom: "2px" }}>
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

          {/* Row 3 */}
          <Grid item xs={6}>
            {/* Text input for Discount Percentage */}
            <InputLabel htmlFor="productName" shrink style={{ marginBottom: "2px" }}>
            Discount Percent 
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
          <Grid item xs={6}>
            {/* File input for Product Image */}
            <input  style={{ marginTop: "23px" }}
              type="file"
              accept="image/*"
              name="pImage"
              onChange={handleImageChange}
            />
          </Grid>

          {/* Row 4 */}

          <Grid item xs={6}>
            {/* Dropdown for selecting a Category */}
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="categoryId"
                value={productData.categoryId}
                onChange={handleChange}
              >
                <MenuItem value="">Select Category</MenuItem>
                {categories.map((category) => (
                  <MenuItem
                    key={category.categoryId}
                    value={category.categoryId}
                  >
                    {category.categoryNames}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            {/* Dropdown for selecting a Subcategory */}
            <FormControl fullWidth>
              <InputLabel>Subcategory</InputLabel>
              <Select
                name="subcategoryId"
                value={productData.subcategoryId}
                onChange={handleChange}
                disabled={!productData.categoryId}
              >
                <MenuItem value="">Select Subcategory</MenuItem>
                {subcategories.map((subcategory) => (
                  <MenuItem key={subcategory.subId} value={subcategory.subId}>
                    {subcategory.subCategoryNames}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Row 5 */}
          <Grid item xs={6}>
          <InputLabel htmlFor="productName" shrink style={{ marginBottom: "2px" }}>
           Product Description
            </InputLabel>
            <TextField
              fullWidth
              id="outlined-multiline-static"
            
              multiline
              name="productDescription"
              onChange={handleChange}
              value={productData.productDescription}
              error={!!errors.productDescription}
              helperText={errors.productDescription}
            />
          </Grid>

          {/* Row 6 */}
          <Grid item xs={12}>
            {/* Submit button */}
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              type="submit"
            >
              Add New Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateProductForm;