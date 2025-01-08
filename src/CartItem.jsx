import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, increaseItemQuantity, decreaseItemQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items); // Lấy danh sách sản phẩm từ state
  const dispatch = useDispatch();

  // Tính tổng số tiền của tất cả sản phẩm trong giỏ hàng
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = parseFloat(item.cost.replace('$', '')) * item.quantity;
      return total + cost;
    }, 0).toFixed(2); // Giữ 2 số sau dấu thập phân
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping(); // Gọi callback nếu được truyền vào
    }
  };



  const handleCheckoutShopping = (e) => {
  alert('Functionality to be added for future reference');
};

    const handleIncreaseQuantity = itemName => {
    dispatch(increaseItemQuantity(itemName));
  };

  const handleDecreaseQuantity = itemName => {
    dispatch(decreaseItemQuantity(itemName));
  };

  const handleRemove = (item) => {
    console.log(item)
    dispatch(removeItem(item));
  };

  // Tính tổng giá dựa trên số lượng của một sản phẩm
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', ''));
    return (cost * item.quantity).toFixed(2); // Giữ 2 số sau dấu thập phân
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecreaseQuantity(item.name)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncreaseQuantity(item.name)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item.name)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
            Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;