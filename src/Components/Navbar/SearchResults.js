import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];

  const searchImage = {
    width: '150px',
    height: '80px',
  };

  const listStyle = {
    listStyleType: 'none',
  };

  const flexsearchdata = {
    display: 'flex'
  }
  const costStyle = {
    textDecoration: 'line-through',
    color: '#ccc',  // Adjust the color as needed
  };

  const offerPriceStyle = {
    color: 'green', 
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Search Results</h2>
      {searchResults.length > 0 ? (
        <ul style={listStyle}>
          {searchResults.map((result, index) => (
            <li key={index} className="mb-6 flex">
              <div style={flexsearchdata}>
              <div className="mr-4">
                <Link to={`/productdetails/${result.product.productId}`}>
                  <img
                    src={`data:image/png;base64,${result.product.pImage}`}
                    alt={result.product.productName}
                    style={searchImage}
                  />
                </Link>
              </div>
              <div className="searchproductdetails">
                <Link to={`/productdetails/${result.product.productId}`} className="text-blue-500 font-bold">
                  {result.product.productName}
                </Link>
                <p style={costStyle}>Cost: {result.product.productCost}</p>
                <p style={offerPriceStyle}>Offer Price: {result.product.discountedPrice}</p>
                <p className="text-gray-300">{result.product.productDescription}</p>
              </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No search results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
