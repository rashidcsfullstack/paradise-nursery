import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      const numericCost = parseFloat(item.cost.replace('$', ''));
      total += numericCost * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon! Checkout functionality will be added soon.');
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items-list">
          {cart.map((item, index) => {
            const unitPrice = parseFloat(item.cost.replace('$', ''));
            const subtotal = (unitPrice * item.quantity).toFixed(2);
            return (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Unit Price: {item.cost}</p>
                  <p>Subtotal: ${subtotal}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <button className="delete-btn" onClick={() => handleRemove(item)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="cart-actions">
        <button className="get-started-btn" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="checkout-btn" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
