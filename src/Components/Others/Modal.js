// Modal.js
import React, { useState } from 'react';

const Modal = ({ isOpen, closeModal, product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <div className="product-details">
          {/* Display the selected image */}
          <img
            src={`data:image/png;base64,${product.images[selectedImageIndex].imageData}`}
            alt={product.productName}
          />
          {/* Display other product details */}
          <h2>{product.productName}</h2>
          <p>Cost: {product.productCost}</p>
          <p>Quantity: {product.productQuantity}</p>
          <p>productOffer: {product.productOffer}</p>
          <div className="product-description">{product.productDescription}</div>
          <p>discountedPrice: {product.discountedPrice}</p>
        </div>
        <div className="image-thumbnails">
          {/* Render image thumbnails */}
          {product.images.map((image, index) => (
            <img
              key={index}
              src={`data:image/png;base64,${image.imageData}`}
              alt={product.productName}
              onClick={() => handleImageClick(index)}
              className={index === selectedImageIndex ? 'selected' : ''}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
