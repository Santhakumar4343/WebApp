import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './ProductDetail.css'; // Create a CSS file for custom styling
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography, List, ListItem } from '@mui/material';
import Swal from 'sweetalert2';
import { useUser } from '../../Context/UseUser'; 


const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]); 
  const [newReview, setNewReview] = useState('');
  const { userData } = useUser(); // Access the userData object from UserContext
  const navigate = useNavigate();
  const [productImages, setProductImages] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch product details based on productId
        const productResponse = await axios.get(`http://localhost:8080/api/product/getproduct/${productId}`);
        setProduct(productResponse.data);

        // Fetch product images based on productId
        const imageResponse = await axios.get(`http://localhost:8080/api/productimages/byProductId/${productId}`);
        setProductImages(imageResponse.data);

        // Fetch reviews for the product
        const reviewsResponse = await axios.get(`http://localhost:8080/api/review/get/${productId}`);
        setReviews(reviewsResponse.data);

      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);
  

  const addToCart = async (productId) => {
    console.log('Adding to cart. Product ID:', productId);
  
    if (userData?.customerId) {
      try {
        const req = { productId, quantity: 1 }; // Create the request body object
  
        const response = await axios.put(
          `http://localhost:8080/api/cart/add/${userData?.customerId}`,
          req // Send the request body as JSON
        );
   
        console.log(`Product ${productId} added to cart for customerId ${userData?.customerId}`);
  
        // Call cartData function immediately after successful addToCart
        navigate("/cart");
  
        return response.data;
      } catch (error) {
        console.error("Error", error);
        return [];
      }
    } else {
      // User is not logged in, store the cart items in localStorage
      const updatedCartItems = [...cartItems, { productId, quantity: 1 }];
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      console.log(`Product ${productId} added to cart locally for logged-out user`);
    }
  };
  

  const [cartPro, setCartPro] = useState([]);

  // Move the CartInfo function inside a useEffect with the dependency on userData.customerId
  useEffect(() => {
    const CartInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cart/${userData?.customerId}`);
        setCartPro(response.data);
        console.log("Cart Data:", response.data); // Add this line
      } catch (error) {
        console.error('Error:', error);
      }

      const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
    };

    // Call CartInfo when userData.customerId changes
    if (userData?.customerId) {
      CartInfo();
    }
  }, [userData?.customerId]);

  const isProductInCart = (productId) => {
    // Check if cartPro.cartItems is defined before using it
    if (cartPro.cartItems) {
      console.log(cartPro.cartItems.map((element) => element));
      console.log(cartPro.cartItems.some((item) => item.product.productId === productId));
      console.log(productId);
      return cartPro.cartItems.some((item) => item.product.productId === productId);
    }
    return false; // Return false if cartPro.cartItems is undefined
  };





  const handleNgaivte=()=>{
    navigate('/cart')
  }
  const handleReviewChange = (event) => {
    setNewReview(event.target.value);
  };
  const handleReviewSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(`http://localhost:8080/api/review/save/${productId}`, {
        reviews: newReview,
      });
  
      setReviews([...reviews, response.data]);
      setNewReview('');
  
      Swal.fire({
        icon: 'success',
        title: 'Review Saved',
        text: 'Your review has been saved successfully!',
      });
    } catch (error) {
      console.error('Error saving review:', error);
  
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while saving the review.',
      });
    }
  };
  return (
    <div className="product-detail-container">
      {product ? (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-4">
                <div className="product-small-images">
               
                {/* <img src="/assests/product2.jpg" alt="Product" className="small-image mb-2" style={{ width: '100%',height: '100px' }}  />
                <img src="/assests/product3.jpg" alt="Product" className="small-image mb-2" style={{ width: '100%', height: '100px'}} />
                <img src="/assests/product3.jpg" alt="Product" className="small-image mb-2" style={{ width: '100%', height: '100px'}} />
                <img src="/assests/product3.jpg" alt="Product" className="small-image mb-2" style={{ width: '100%', height: '100px'}} /> */}
              {productImages.map((image, index) => (
                      <img
                        key={index}
                        src={`data:image/png;base64,${image.imageData}`}
                        alt={`Product ${index}`}
                        className="small-image mb-2"
                        style={{ width: '100%', height: '100px' }}
                      />
                    ))}
              </div>
                </div>
                <div className="col-md-8">
                <div className="product-image mb-4">
                <Link to={`/productdetails/${product.productId}`}>
                         <img
      src={`data:image/png;base64,${product.pImage}`}
      alt={product.productName}
    
    />
                    </Link>
              </div>
                </div>
              </div>
             

            </div>

            <div className="col-md-6">
              <div className="product-info">
                <h2 className="product-title">{product.productName}</h2>
                <p className="product-description">{product.productDescription}</p>
                <div className="product-price">
                  <p>
                    Total Price : <span className="text-decoration-line-through text-danger">₹{product.productCost}</span>
                  </p>
                  <p>Product Discount : {product.discountPercent}</p>
                  <h4>Offer Price : {product.discountedPrice}</h4>
                </div>
                <div className="btnss">
                    {isProductInCart(product.productId) ? (
                        <>
                          <button
                            className="btn-outline-secondary"
                            onClick={() => navigate("/cart")} // Go to cart
                          >
                            GotoCart
                          </button>
                          <button
                            className="btn btn-success"
                            onClick={() => navigate("/cart")} // Buy Now
                          >
                            BuyNow
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-primary"
                            onClick={() => addToCart(product.productId)} // Add to Cart
                          >
                            AddtoCart
                          </button>
                          <button
                            className="btn btn-success"
                            onClick={() => addToCart(product.productId)}
                          >
                            Buy Now
                          </button>
                        </>
                      )}
                    </div>
              </div>

              <div className="product-reviews">
      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>
      <List>
        {reviews.map((review, index) => (
          <ListItem key={index}>
            <Typography>{review.reviews}</Typography>
          </ListItem>
        ))}
      </List>

      <form onSubmit={handleReviewSubmit}>
                    <input
                      type="text"
                      placeholder="Add a review"
                      value={newReview}
                      onChange={handleReviewChange}
                    />
                    <button type="submit">Submit Review</button>
                  </form>
          </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}



    </div>
  );
};

export default ProductDetail;
