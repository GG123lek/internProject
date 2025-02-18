import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { CircleLoader } from "react-spinners";
import { PaystackButton } from "react-paystack";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import TopProducts from "./components/TopProducts/TopProducts";
import Banner from "./components/Banner/Banner";
import Subscribe from "./components/Subscribe/Subscribe";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import BestSellingPage from "./components/BestSellingPage";
import TopRatedPage from "./components/TopRatedPage";
import KidsWearPage from "./components/KidsWearPage";
import MensWearPage from "./components/MensWearPage";
import ElectronicsPage from "./components/ElectronicsPage";
import TrendingProductsPage from "./components/TrendingProductPage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [orderPopup, setOrderPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartPopup, setCartPopup] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState(""); // User email input

  const publicKey = "pk_test_a9d73f58d8bd3e53d1ecba33162740b568fef46d"; // Replace with your actual Paystack public key

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
    AOS.init({ offset: 100, duration: 800, easing: "ease-in-sine", delay: 100 });
  }, []);

  const handleOrderPopup = (product) => {
    console.log("handleOrderPopup triggered with product:", product);
    if (product) {
      setSelectedProduct(product);
      setOrderQuantity(1);
      setOrderPopup(false);
      setTimeout(() => setOrderPopup(true), 0);
    }
  };

  const handleProceedToCheckout = () => {
    console.log("Proceeding to checkout with:", selectedProduct);
    if (selectedProduct) {
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === selectedProduct.id);
        if (existingProduct) {
          return prevCart.map((item) =>
            item.id === selectedProduct.id ? { ...item, quantity: item.quantity + orderQuantity } : item
          );
        }
        return [...prevCart, { ...selectedProduct, quantity: orderQuantity }];
      });

      setOrderPopup(false);
      setCartPopup(true);
    }
  };

  const handleSearch = (query) => setSearchTerm(query.toLowerCase());

  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <CircleLoader color="#3498db" size={80} />
          </div>
        ) : (
          <>
            <Navbar cart={cart} handleOpenCartPopup={() => setCartPopup(true)} onSearch={handleSearch} />

            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <TopProducts handleOrderPopup={handleOrderPopup} searchTerm={searchTerm} cart={cart} />
                    <Products handleOrderPopup={handleOrderPopup} searchTerm={searchTerm} cart={cart} />
                  </>
                }
              />
              <Route path="/top-rated" element={<TopRatedPage searchTerm={searchTerm} />} />
              <Route path="/kids-wear" element={<KidsWearPage searchTerm={searchTerm} />} />
              <Route path="/mens-wear" element={<MensWearPage searchTerm={searchTerm} />} />
              <Route path="/electronics" element={<ElectronicsPage searchTerm={searchTerm} />} />
              <Route path="/best-selling" element={<BestSellingPage handleOrderPopup={handleOrderPopup} searchTerm={searchTerm} cart={cart} />} />
              <Route path="/trending-products" element={<TrendingProductsPage handleOrderPopup={handleOrderPopup} searchTerm={searchTerm} cart={cart} />} />
            </Routes>

            <Banner />
            <Subscribe />
            <Testimonials />
            <Footer />

            {orderPopup && selectedProduct && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <h2 className="text-xl font-bold mb-2 text-purple-700">{selectedProduct.title}</h2> 
                  <p className="mb-4 text-purple-600">{selectedProduct.description}</p> 
            
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <button 
                      className="bg-red-300 px-3 py-1 rounded" 
                      onClick={() => setOrderQuantity((prev) => Math.max(1, prev - 1))}
                    >
                      -
                    </button>
                    <span className="text-lg font-bold text-orange-500">{orderQuantity}</span>

                    <button 
                      className="bg-red-300 px-3 py-1 rounded" 
                      onClick={() => setOrderQuantity((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <p className="text-lg font-semibold text-gray-800">
                    Total: ₦{selectedProduct.price * orderQuantity}
                  </p>

                  <PaystackButton
                    className="bg-green-500 text-white px-4 py-2 rounded mb-2 mt-3"
                    amount={selectedProduct.price * orderQuantity * 100} // Paystack processes in kobo
                    email={email}
                    publicKey={publicKey}
                    text="Proceed to Payment"
                    onSuccess={(response) => {
                      alert(`Payment Successful! Transaction ID: ${response.transaction}`);
                      setOrderPopup(false);
                    }}
                    onClose={() => alert("Payment window closed.")}
                  />

                  <button 
                    className="bg-red-500 text-white px-4 py-2 rounded mt-2" 
                    onClick={() => setOrderPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
