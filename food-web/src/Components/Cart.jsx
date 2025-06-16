import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Cartbtn from "./Cartbtn";

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
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setShowSummary(true);
    setShowCheckout(false);
  };
  const handlePlaceOrder = async () => {
    try {
      const authRes = await fetch(
        "https://foodie-kb4r.onrender.com/api/auth/check-auth",
        {
          credentials: "include",
        }
      );
      const authData = await authRes.json();

      if (!authData.authenticated) {
        alert("Please log in before placing an order.");
        navigate("/login");
        return;
      }

      const orderRes = await fetch(
        "https://foodie-kb4r.onrender.com/api/orders",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems,
            total: totalAmount,
          }),
        }
      );

      const contentType = orderRes.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        const rawText = await orderRes.text();
        console.error("❌ Server returned non-JSON:", rawText);
        alert("Server returned unexpected response.");
        return;
      }

      const result = await orderRes.json();
      console.log("✅ Order result:", result);

      if (orderRes.ok) {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          clearCart();
          navigate("/menu");
        }, 3000);
      } else {
        alert(result?.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("❌ Order error:", error);
      alert("Server error while placing order.");
    }
  };

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
                        <td className="quantity-btn">
                          <button
                            className="btn btn-sm btn-outline-secondary me-2"
                            onClick={() => handleDecrement(idx)}
                          >
                            -
                          </button>
                          {item.quantity}
                          <button
                            className="btn btn-sm btn-outline-secondary ms-2"
                            onClick={() => handleIncrement(idx)}
                          >
                            +
                          </button>
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
            )}

            {!showCheckout && !showSummary && (
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
            )}

            {showCheckout && (
              <div className="billing-section mt-5">
                <h2 className="mb-4 text-warning">Billing & Payment</h2>
                <form onSubmit={handleCheckout}>
                  <div className="row">
                    <div className="col">
                      <h5 className="title">Billing Address</h5>
                      <div className="input-box">
                        <label htmlFor="fullname">Full Name:</label>
                        <input
                          type="text"
                          id="fullname"
                          placeholder="Rahul Jogadiya"
                          value={formData.fullname}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="input-box">
                        <label htmlFor="email">Email:</label>
                        <input
                          type="email"
                          id="email"
                          placeholder="example@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="input-box">
                        <label htmlFor="address">Address:</label>
                        <input
                          type="text"
                          id="address"
                          placeholder="room - street - locality"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="input-box">
                        <label htmlFor="city">City:</label>
                        <input
                          type="text"
                          id="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="flex">
                        <div className="input-box">
                          <label htmlFor="state">State:</label>
                          <input
                            type="text"
                            id="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="input-box">
                          <label htmlFor="zip">Zip Code:</label>
                          <input
                            type="text"
                            id="zip"
                            placeholder="Zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col">
                      <h5 className="title">Payment</h5>
                      <div className="input-box">
                        <label>Cards Accepted:</label>
                        <img
                          src="https://raw.githubusercontent.com/Gustavo-Victor/payment-gateway-form/e2eeb53a05d6b5ada2d10306a9fd0b20605a897c/assets/images/card_img.png"
                          alt="cards accepted"
                        />
                      </div>
                      <div className="input-box">
                        <label htmlFor="cardName">Name on Card:</label>
                        <input
                          type="text"
                          id="cardName"
                          placeholder="Mr. Rahul Jogadiya"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="input-box">
                        <label htmlFor="cardNumber">Card Number:</label>
                        <input
                          type="text"
                          id="cardNumber"
                          placeholder="1111 2222 3333 4444"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="input-box">
                        <label htmlFor="expMonth">Exp Month:</label>
                        <input
                          type="number"
                          id="expMonth"
                          placeholder="03"
                          min="1"
                          max="12"
                          value={formData.expMonth}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="flex">
                        <div className="input-box">
                          <label htmlFor="expYear">Exp Year:</label>
                          <input
                            type="number"
                            id="expYear"
                            placeholder="2029"
                            value={formData.expYear}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="input-box">
                          <label htmlFor="cvv">CVV:</label>
                          <input
                            type="number"
                            id="cvv"
                            placeholder="945"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mt-5 mb-3">
                    <Cartbtn text="Proceed to  Checkout" />
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
                <div className="table-responsive">
                  <table className="table table-bordered mt-3">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
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
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4" className="text-end fw-bold">
                          Total:
                        </td>
                        <td className="fw-bold" style={{ color: "#eb0029" }}>
                          ₹ {totalAmount}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="mt-4 p-3 border rounded">
                  <h5>Billing Details</h5>
                  <p>
                    <strong>Name:</strong> {formData.fullname}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {formData.address},{" "}
                    {formData.city}, {formData.state} - {formData.zip}
                  </p>
                </div>

                <div className="d-flex justify-content-between mt-5 mb-3">
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
          <div className="toast-message show">✅ Order Placed!</div>
        )}
      </div>
    </div>
  );
}

export default Cart;
