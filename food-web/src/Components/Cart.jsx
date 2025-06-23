import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Cartbtn from "./Cartbtn";
import axios from "../axios";

function Cart({
  cartItems,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
}) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    address: "",
    paymentMethod: "cod",
    upiId: "",
  });

  const navigate = useNavigate();
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { id, name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name || id]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in before placing an order.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "/orders",
        { items: cartItems, total: totalAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        clearCart();
        navigate("/menu");
      }, 3000);
    } catch (error) {
      const errMsg =
        error.response?.data?.error || "Server error while placing order.";
      alert(errMsg);
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setShowSummary(true);
    setShowCheckout(false);
  };

  return (
    <div>
      <Nav />
      <div className="cart-img">
        <h1>Cart List</h1>
      </div>
      <div className="container mt-5">
        <h3 className="mb-4 text-center">Cart Items</h3>

        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <>
            {!showCheckout && !showSummary && (
              <>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Menu Image</th>
                        <th>Menu Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
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
                          <td>{item.quantity}</td>
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
                <div className="d-flex justify-content-between mt-5 mb-3">
                  <Cartbtn
                    text="Continue Shopping"
                    onClick={() => navigate("/menu")}
                  />
                  <Cartbtn
                    text="Proceed to Payment"
                    onClick={() => setShowCheckout(true)}
                  />
                </div>
              </>
            )}

            {showCheckout && (
              <div className="billing-section mt-5">
                <form action="" onSubmit={handleCheckout}>
                  <h2 className="mb-4 text-warning">Billing & Payment</h2>

                  <div className="row border rounded p-3 bg-light">
                    <h5 className="mb-3">Customer Details</h5>
                    {["fullname", "email", "address"].map((field) => (
                      <div className="col-md-4 input-box" key={field}>
                        <label htmlFor={field}>
                          {field.charAt(0).toUpperCase() + field.slice(1)}:
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          id={field}
                          placeholder={field}
                          value={formData[field]}
                          onChange={handleInputChange}
                          required
                          className="form-control"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="row border rounded p-3 bg-light mt-4">
                    <h5 className="mb-3">Select Payment Method</h5>
                    <div className="col-md-12 input-box payment-options">
                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === "cod"}
                          onChange={handleInputChange}
                          required
                        />
                        Cash on Delivery
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={formData.paymentMethod === "upi"}
                          onChange={handleInputChange}
                        />
                        UPI
                      </label>
                    </div>

                    {formData.paymentMethod === "upi" && (
                      <div className="col-md-6 input-box mt-2">
                        <label htmlFor="upiId">UPI ID:</label>
                        <input
                          type="text"
                          id="upiId"
                          placeholder="example@upi"
                          value={formData.upiId}
                          onChange={handleInputChange}
                          required
                          className="form-control"
                        />
                      </div>
                    )}
                  </div>

                  <div className="d-flex justify-content-between mt-5 mb-3">
                    <Cartbtn text="Proceed to Checkout" />
                    <Cartbtn
                      text="Back"
                      onClick={() => setShowCheckout(false)}
                    />
                  </div>
                </form>
              </div>
            )}

            {showSummary && (
              <div className="mt-5">
                <h4>Your Order Summary</h4>
                <div className="mt-3 border rounded p-3">
                  <p>
                    <strong>Name:</strong> {formData.fullname}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> ₹ {totalAmount}
                  </p>
                </div>
                <div className="d-flex justify-content-between mt-4 mb-3">
                  <Cartbtn text="Place Order" onClick={handlePlaceOrder} />
                  <Cartbtn
                    text="Back"
                    onClick={() => {
                      setShowSummary(false);
                      setShowCheckout(true);
                    }}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {showPopup && (
          <div className="toast-message show">
            <i className="fas fa-check-circle"></i>Thank You!
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
