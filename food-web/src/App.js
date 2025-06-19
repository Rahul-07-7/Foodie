import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import ContectUs from "./Components/ContectUs";
import Shop from "./Components/Shop";
import Cart from "./Components/Cart";
import Loader from "./Components/Loader";
import ScrollToTop from "./Components/Scrolltotop";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { useLocation } from "react-router-dom";

const RouteHandler = ({
  cartItems,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  useEffect(() => {
    const checkSession = async () => {
      if (pathname === "/login" || pathname === "/register") {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "https://foodie-kb4r.onrender.com/api/auth/check-auth",
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!data.authenticated) {
          navigate("/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [navigate, pathname]);
  if (loading) return <Loader />;
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home addToCart={addToCart} />} />
      <Route path="/about" element={<About />} />
      <Route path="/contect" element={<ContectUs />} />
      <Route
        path="/menu"
        element={
          <Shop
            cartItems={cartItems}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            updateCartItemQuantity={updateCartItemQuantity}
          />
        }
      />
      <Route
        path="/cart"
        element={
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateCartItemQuantity={updateCartItemQuantity}
            clearCart={clearCart}
          />
        }
      />
    </Routes>
  );
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.title === product.title);
      if (existing) {
        return prev.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartItemQuantity = (index, updatedItem) => {
    const newCartItems = [...cartItems];
    newCartItems[index] = updatedItem;
    setCartItems(newCartItems);
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCartItems([]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {isLoading ? (
        <Loader />
      ) : (
        <RouteHandler
          cartItems={cartItems}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          updateCartItemQuantity={updateCartItemQuantity}
          clearCart={clearCart}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
