import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { CircleLoader } from "react-spinners";
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
import PaystackPayment from "./components/PaystackPayment"; // Keep the PaystackPayment import

const App = () => {
  const [loading, setLoading] = useState(true);
  const [orderPopup, setOrderPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartPopup, setCartPopup] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState(""); // To capture the email input
  const [userEmail, setUserEmail] = useState(""); // Email to store per user order

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
    AOS.init({ offset: 100, duration: 800, easing: "ease-in-sine", delay: 100 });
  }, []);

  const handleOrderPopup = (product) => {
    setSelectedProduct(product);
    setOrderQuantity(1);
    setOrderPopup(true);
  };

  const handleProceedToCheckout = () => {
    if (selectedProduct) {
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === selectedProduct.id);
        if (existingProduct) {
          return prevCart.map((item) =>
            item.id === selectedProduct.id
              ? { ...item, quantity: item.quantity + orderQuantity }
              : item
          );
        }
        return [...prevCart, { ...selectedProduct, quantity: orderQuantity }];
      });
      setOrderPopup(false);
      setCartPopup(true);
    }
  };

  const handlePayment = () => {
    if (!userEmail) {
      alert("Please enter your email to proceed.");
      return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (totalAmount <= 0) {
      alert("Total amount cannot be zero. Please check your cart.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: "pk_test_a9d73f58d8bd3e53d1ecba33162740b568fef46d", // Replace with your actual Paystack Public Key
      email: userEmail, // Using the email entered by the user for payment
      amount: totalAmount * 100, // Paystack processes amounts in kobo (1 Naira = 100 Kobo)
      currency: "NGN", // The currency you're using
      callback: function (response) {
        // Handle successful payment
        alert(`Payment successful! Transaction ID: ${response.reference}`);
        setCart([]); // Clear cart after successful payment
        setCartPopup(false); // Close cart popup
      },
      onClose: function () {
        // Handle when the payment modal is closed
        alert("Transaction was not completed. You can try again.");
      },
    });

    // Open the Paystack modal
    handler.openIframe();
  };

  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <CircleLoader color="#3498db" size={80} />
          </div>
        ) : (
          <>
            <Navbar cart={cart} handleOpenCartPopup={() => setCartPopup(true)} onSearch={setSearchTerm} />

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

            {/* Order Popup */}
            {orderPopup && selectedProduct && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center w-3/4 max-w-md">
                  <h2 className="text-xl font-bold mb-2 text-purple-700">{selectedProduct.title}</h2>
                  <p className="mb-4 text-purple-600">{selectedProduct.description}</p>
                  <p className="mb-4 font-bold text-lg text-orange-500">Price: ₦{selectedProduct.price}</p>

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
                    placeholder="Enter your email for payment"
                    value={userEmail} // Bind the email input to the state
                    onChange={(e) => setUserEmail(e.target.value)} // Update email on input change
                    className="border p-2 mb-4 w-full text-center"
                  />

                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mb-2"
                    onClick={() => {
                      handleProceedToCheckout();
                      handlePayment();
                    }}
                  >
                    Proceed to Payment
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setOrderPopup(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Cart Popup */}
            {cartPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center w-3/4 max-w-md">
                  <h2 className="text-xl font-bold mb-4 text-purple-700">Your Cart</h2>
                  <ul className="mb-4">
                    {cart.length === 0 ? (
                      <p className="text-gray-600">Your cart is empty.</p>
                    ) : (
                      cart.map((item) => (
                        <li key={item.id} className="flex justify-between items-center mb-4">
                          <span className="text-gray-800">{item.title} (x{item.quantity})</span>
                          <span className="text-orange-500">₦{item.price * item.quantity}</span>
                        </li>
                      ))
                    )}
                  </ul>
                  <div className="font-bold text-lg text-orange-500 mb-4">
                    Total: ₦{cart.reduce((total, item) => total + item.price * item.quantity, 0)}
                  </div>
                  <div className="flex justify-between gap-4">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
                      onClick={handlePayment}
                    >
                      Pay Now
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600"
                      onClick={() => setCartPopup(false)}
                    >
                      Close
                    </button>
                  </div>
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
