import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import "./ProductList.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../Context/UseUser'; // Import useUser from your UserContext
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import the styles

const ProductList = ({ cartData , sendSubCategoryId}) => {
  const { subcategoryId } = useParams();
  const { userData } = useUser(); // Access the userData object from UserContext
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State for storing categories
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000); // Set an initial maximum value


  useEffect(() => {
    // Function to fetch product images by product ID
    const getProductImages = async (productId) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/productimages/byProductId/${productId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching product images:", error);
        return [];
      }
    };

    // Function to fetch products by subcategory (using subId from URL params)
    const fetchProductsBySubcategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/getproductsbysubcategory/${subcategoryId}`
        );
        const productsWithImages = await Promise.all(
          response.data.map(async (product) => {
            const images = await getProductImages(product.productId);
            return { ...product, images, expanded: false };
          })
        );
        setProducts(productsWithImages);
        setOriginalProducts(productsWithImages); // Store the original products
        
        console.log("Received data from API:", productsWithImages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Function to fetch all categories
    const fetchAllCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/Categories/getAllCategories"
        );
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Call the function to fetch products based on subId
    fetchProductsBySubcategory();

    fetchAllCategories();
  }, [subcategoryId]);

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

  const filterProductsBySubCategory = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/subcategroy/${categoryId}`);
      
      // Check if response.data.products is an array before mapping
      if (Array.isArray(response.data.products)) {
        const productsWithImages = await Promise.all(
          response.data.products.map(async (product) => {
            const images = await getProductImages(product.productId);
            return { ...product, images, expanded: false };
          })
        );
        setProducts(productsWithImages);
      } else {
        // Handle the case where response.data.products is not an array
        console.error("Response data.products is not an array:", response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  

  // Function to fetch product images by product ID
  const getProductImages = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/productimages/byProductId/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product images:", error);
      return [];
    }
  };
  const imageStyle = {
    maxWidth: '100%',
    width: '220px',
    height: '110px'
  };
  
  // Function to render star ratings
  const renderStarRating = (rating) => {
    const maxRating = 5;
    const stars = [];

    const fullStars = Math.floor(rating);
    const remainder = rating - fullStars;

    for (let i = 1; i <= maxRating; i++) {
      if (i <= fullStars) {
        stars.push(
          <FontAwesomeIcon key={i} icon={faStar} className="star gold-star" />
        );
      } else if (i === fullStars + 1 && remainder >= 0.25) {
        stars.push(
          <FontAwesomeIcon key={i} icon={faStarHalf} className="star gold-star" />
        );
      } else {
        stars.push(
          <FontAwesomeIcon key={i} icon={faStar} className="star gold-star" />
        );
      }
    }

    return stars;
  };

  // Function to toggle 'expanded' property for a product
  const toggleExpandProduct = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.productId === productId) {
        return { ...product, expanded: !product.expanded };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const ProductDeatilsGetter = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product/getproduct/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product images:", error);
      return [];
    }
  }

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
  
  // Placeholder removeFromCart function (replace with your actual logic)
  const removeFromCart = (productId) => {
    console.log(`Product ${productId} removed from cart`);
  };

  const buyNow = (productId) => {
    if (userData?.customerId) {
      navigate("/cart"); // Navigate to checkout if logged in
      console.log(`Product ${productId} bought now`);
    } else {
      navigate("/Login"); // Navigate to login if not logged in
      console.log(`Product ${productId} - User not logged in, redirecting to login`);
    }
  };
  


  const filterProductsByPriceRange = (min, max) => {
    const filteredProducts = originalProducts.filter((product) => {
      const productPrice = parseFloat(product.productCost);
      return productPrice >= min && productPrice <= max;
    });
    setProducts(filteredProducts);
  };
  
  

  return (
    <div className="container-fluid main">
    <div className="row">
      {/* Filter column */}
      <div className="col-md-3">
  <div className="filter-options">
    <h4>Filter Options</h4>
    <div className="form-group">
      <label htmlFor="categoryFilter">Filter by Category:</label>
      <select
        className="form-control"
        id="categoryFilter"
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          filterProductsBySubCategory(e.target.value);
        }}
        value={selectedCategory}
        style={{ width: '100%' }}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <optgroup key={category.categoryId} label={category.categoryNames}>
            {category.subcategories.map((element) => (
              <option
                key={element.subId}
                value={element.subId}
              >
                {element.subCategoryNames}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  </div>


<div className="card filter-options" style={{backgroundColor : 'black'}}>
  <h4>Pricing Filter :</h4>
<div className="form-group">
  <label htmlFor="priceRange">Price Range:</label>
  <Slider
  range
  min={0}
  max={1000}
  value={[minPrice, maxPrice]}
  onChange={(value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
    filterProductsByPriceRange(value[0], value[1]);
  }}
/>


  <div>
    <span style={{  color : 'whitesmoke'}}>Min Price: ₹{minPrice}</span>
    <span style={{ marginLeft: '5px', color : 'whitesmoke'}}> &nbsp;  Max Price: ₹{maxPrice}</span>
  </div>
</div>
</div>
</div>


        {/* Cards column */}
        <div className="col-md-9">
          <div className="row">
            {products.map((product) => (
              <div key={product.productId} className="col-md-4 mb-4">
                <div className="card product-card">
                  <div className="product-name-link">
                  <Link
        to={`/productdetails/${product.productId}`}
        className="card-title text-primary"
      style={{ textDecoration: 'none' }} >
    <h2 style={{ color: 'blue', fontSize: '24px', fontWeight: 'bold' }}>{product.productName}</h2>
          </Link>
       </div>
                      
                <Link to={`/productdetails/${product.productId}`}>
                <img
                src={`data:image/png;base64,${product.pImage}`}
                 alt={product.productName}
                style={imageStyle}
               />
              </Link>
                  

                  <div className="card-body carditem">
                    <div className="card-text">Cost: {product.productCost}</div>
                    <div className="card-text">
                      Quantity: {product.productQuantity}
                    </div>
                    <div className="card-text">
                      productOffer: {product.productOffer}
                    </div>
                
                    <div className="card-text" style={{ color: '#2ECB0B ' }}>
                        OfferPrice: {product.discountedPrice}
                      </div>


                    {/* Star ratings */}
                    <div className="product-rating">
                      {renderStarRating(product.rating)}
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductList;