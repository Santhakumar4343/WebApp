import React, { useState, useEffect } from 'react';
import ProductDetails from '../Carousel/ProductDetails';
import { useUser } from '../../Context/UseUser';
import { Grid, Select, IconButton } from "@mui/material";
import { Link } from 'react-router-dom';
import axios from "axios";
import './Home.css';
import Skeleton from '@mui/material/Skeleton';

const Home = () => {
  const [productData, setProductData] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/api/product/getallproducts',)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('API Response:', data);
        setProductData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const productCardStyle = {
    border: '1px solid #ddd',
    padding: '20px',
    textAlign: 'center',
    width: '100%',
    margin: '10px',

    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  };

const imageStyle = {
  maxWidth: '100%',
};

const titleStyle = {
  fontSize: '18px',
  marginTop: '10px',
};

const descriptionStyle = {
  fontSize: '14px',
  margin: '10px 0',
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  textTransform: 'uppercase',
  fontWeight: 'bold',
};
const imageContainerStyle = {
  width: '100%', // You can adjust the width as needed
  height: '200px', // You can adjust the height as needed
  overflow: 'hidden', // To hide any image overflow
};
const [deals, setDeals] = useState([]);
const [offerAvailability, setOfferAvailability] = useState('New Offer');

useEffect(() => {
  const fetchDealsByOfferAvailability = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/deal/deals', {
        params: {
          offerAvailability: offerAvailability
        }
      });

      setDeals(response.data);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  fetchDealsByOfferAvailability();
}, [offerAvailability]);

  return (
    <div>
    <ProductDetails />

    <h2 className="text-xl font-bold mt-5">Special Offers</h2>
    <div className="card-container">
      {deals.length === 0 ? (
        // Skeleton loading for special offers
        [1, 2, 3, 4].map((index) => (
          <div key={index} className="card">
            <Skeleton variant="rectangular" width={200} height={200} />
            <Skeleton variant="text" width={300} height={20} />
            <Skeleton variant="text" width={300} height={20} />
            <Skeleton variant="text" width={300} height={20} />
          </div>
        ))
      ) : (
        // Render special offers when available
        deals.map((deal, index) => (
          <div key={index} className="card">
            <Link to={`/productdetails/${deal.product.productId}`}>
              <h3 className="card-title">{deal.product.productName}</h3>
            </Link>
            <Link to={`/productdetails/${deal.product.productId}`}>
              <img
                src={`data:image/png;base64,${deal.product.pImage}`}
                alt={deal.product.productName}
                className="card-image"
              />
            </Link>
            <div className="card-details">
              <p className="card-detail cost">productCost: {deal.product.productCost}</p>
              <p className="card-detail green">Discounted Price: {deal.product.discountedPrice}</p>
              <p className="card-detail">Discount Percent: {deal.product.discountPercent}</p>
              <p className="card-detail">Offer Availability: {deal.offerAvailability}</p>
             
            </div>
          </div>
        ))
      )}
    </div>

    <h2 className="section-title text-center">Featured Products</h2>
    <div className="container">
      <div className="row">
        {productData.length === 0 ? (
          // Skeleton loading for featured products
          [1, 2, 3, 4].map((index) => (
            <div className="col-md-3" key={index}>
              <div className="product-card" style={productCardStyle}>
                <Skeleton variant="rectangular" width={200} height={200} />
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={100} height={20} />
              </div>
            </div>
          ))
        ) : (
          // Render featured products when available
          productData.map((product) => (
            <div className="col-md-3" key={product.id}>
              <div className="product-card" style={productCardStyle}>
                <div style={imageContainerStyle}>
                  <Link to={`/productdetails/${product.productId}`}>
                    <img
                      src={`data:image/png;base64,${product.pImage}`}
                      alt={product.productName}
                      style={imageStyle}
                    />
                  </Link>
                </div>
                <h3 style={titleStyle}>{product.title}</h3>
                {product.productName ? (
                  <Link
                    to={`/productdetails/${product.productId}`}
                    className="card-title text-dark"
                  >
                    <h2>{product.productName}</h2>
                  </Link>
                ) : (
                  <p>No product name available</p>
                )}
                <div className='myproducts'>
                  {product.productCost ? (
                    <p style={{ textDecoration: 'line-through', color: 'black', fontSize: '30px' }}>{` ${product.productCost}`}</p>
                  ) : (
                    <p>No product price available</p>
                  )}
                  {product.discountedPrice ? (
                    <p style={{ fontSize: '30px' }}>{`₹${product.discountedPrice}`}</p>
                  ) : (
                    <p>No product price available</p>
                  )}
                  {product.discountPercent ? (
                    <p style={{ color: 'green', fontSize: '40px' }}>{` ${product.discountPercent}`}</p>
                  ) : (
                    <p>No product price available</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  );
};

export default Home;