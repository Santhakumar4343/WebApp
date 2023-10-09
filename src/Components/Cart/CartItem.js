// CartItem.js
import React from "react";

function CartItem({ item, handleAddItem, handleRemoveItem }) {
  return (
    <li className="cart-item">
      <div className="cart-item-details">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="cart-item-image"
        />
        <div className="cart-item-info">
          <h3 className="cart-item-name">{item.name}</h3>
          <p className="cart-item-price">{item.price}</p>
        </div>
      </div>
      <div className="cart-item-quantity">
        Quantity: {item.quantity}
        <button onClick={() => handleAddItem(item.id)}>+</button>
        <button onClick={() => handleRemoveItem(item.id, item.quantity)}>-</button>
      </div>
    </li>
  );
}

export default CartItem;
