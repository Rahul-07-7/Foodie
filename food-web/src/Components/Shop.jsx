import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Menu from "./Menu";
import Footer from "./Footer";
import products from "./Product";
import { useNavigate, useLocation } from "react-router-dom";

function Shop({ cartItems, addToCart, removeFromCart }) {
  const navigate = useNavigate();
  const [priceInput, setPriceInput] = useState(250);
  const [price, setPrice] = useState(250);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [filtered, setFiltered] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const location = useLocation();

  // Extract category from query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catFromURL = params.get("category");
    if (catFromURL) {
      setCategory(catFromURL);
    }
  }, [location.search]);

  useEffect(() => {
    let result = products;

    // Price filter
    result = result.filter((p) => p.price <= price);

    // Category filter
    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    // Search filter
    if (searchTerm.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [price, searchTerm, category]);

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Auto-suggestions
  const suggestions = products
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm
    )
    .slice(0, 5);
  useEffect(() => {
    console.log("Cart Items in Shop:", cartItems);
  }, [cartItems]);

  return (
    <div>
      <Nav />
      <div className="shop-img">
        <h1>Shop</h1>
      </div>

      <div className="container">
        <div className="main-menu">
          <div className="menu-2">
            <div className="search-box">
              <h3>Search</h3>
              <div className="position-relative">
                <input
                  type="search"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {suggestions.length > 0 && (
                  <ul className="suggestion-box">
                    {suggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => setSearchTerm(item.title)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="search-box mt-5 ">
              <h3>Category</h3>
              <div className="spans">
                {[
                  "All",
                  "Burger",
                  "Pizza",
                  "chicken",
                  "chinese",
                  "drinks",
                  "Panjabi",
                ].map((cat) => (
                  <span
                    key={cat}
                    className={category === cat ? "active" : ""}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="search-box mt-5 mb-4">
              <div className="price-filter">
                <h3>Filter By Price</h3>
                <input
                  type="range"
                  min="30"
                  max="300"
                  value={priceInput}
                  onChange={(e) => setPriceInput(Number(e.target.value))}
                  className="form-range"
                />
                <div className="d-flex gap-3 mt-3">
                  <h5 className="mt-3">Price (₹): {priceInput}</h5>
                  <button
                    onClick={() => setPrice(priceInput)}
                    className="btn btn-outline-danger mt-2"
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="menu">
            {currentProducts.length > 0 ? (
              currentProducts.map((p) => (
                <Menu
                  key={p.id}
                  img={p.img}
                  title={p.title}
                  price={p.price}
                  rating={p.rating}
                  onOrderNow={() => {
                    addToCart(p);
                    navigate("/cart");
                  }}
                />
              ))
            ) : (
              <p>No products found</p>
            )}

            <div className="page">
              <div className="pagination ">
                {[...Array(totalPages).keys()].map((num) => (
                  <button
                    key={num + 1}
                    onClick={() => paginate(num + 1)}
                    className={`btn btn-sm ${
                      currentPage === num + 1
                        ? "btn-danger"
                        : "btn-outline-danger"
                    } mx-1`}
                  >
                    {num + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Shop;
