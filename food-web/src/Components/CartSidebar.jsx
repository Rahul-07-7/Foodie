import React from "react";
import { useNavigate } from "react-router-dom";
import Cartbtn from "./Cartbtn";

function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
  updateCartItemQuantity,
}) {
  const navigate = useNavigate();

  const handleIncrement = (idx) => {
    const updatedItem = {
      ...cartItems[idx],
      quantity: cartItems[idx].quantity + 1,
    };
    updateCartItemQuantity(idx, updatedItem);
  };

  const handleDecrement = (idx) => {
    const updatedItem = {
      ...cartItems[idx],
      quantity: Math.max(1, cartItems[idx].quantity - 1),
    };
    updateCartItemQuantity(idx, updatedItem);
  };

  return (
    <div className={`cart-sidebar ${isOpen ? "expanded" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
      <h3 className="text-center">Cart</h3>

      {cartItems.length === 0 ? (
        <p className="text-center">No items in cart</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <img src={item.img} alt={item.title} width="50" />
                    </td>
                    <td>{item.title}</td>
                    <td>₹ {item.price}</td>
                    <td>
                      <button onClick={() => handleDecrement(idx)}>-</button>
                      {item.quantity}
                      <button onClick={() => handleIncrement(idx)}>+</button>
                    </td>
                    <td>₹ {item.price * item.quantity}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(idx)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <Cartbtn
              text="Continue Shopping"
              onClick={() => {
                navigate("/menu");
                onClose();
              }}
            />
            <Cartbtn
              text="Proceed to Payment"
              onClick={() => {
                navigate("/cart");
                onClose();
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CartSidebar;
