import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CircleLoader } from "react-spinners"; // ✅ Use CircleLoader

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import TopProducts from "./components/TopProducts/TopProducts"; // ✅ Ensure default export
import Banner from "./components/Banner/Banner";
import Subscribe from "./components/Subscribe/Subscribe";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [orderPopup, setOrderPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartPopup, setCartPopup] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);

  // ✅ Simulate App Loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate API/Data Load
  }, []);

  // ✅ Open Order Popup
  const handleOrderPopup = (product) => {
    setSelectedProduct(product);
    setOrderQuantity(1); // Reset quantity
    setOrderPopup(true);
  };

  // ✅ Update Cart when Proceed to Checkout is clicked
  const handleProceedToCheckout = () => {
    if (selectedProduct) {
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === selectedProduct.id);
        if (existingProduct) {
          return prevCart.map((item) =>
            item.id === selectedProduct.id ? { ...item, quantity: item.quantity + orderQuantity } : item
          );
        } else {
          return [...prevCart, { ...selectedProduct, quantity: orderQuantity }];
        }
      });
    }
    setOrderPopup(false); // Close popup
  };

  // ✅ Open Cart Details
  const handleOpenCartPopup = () => {
    setCartPopup(true);
  };

  // ✅ Close Popups
  const handleClosePopups = () => {
    setOrderPopup(false);
    setCartPopup(false);
  };

  useEffect(() => {
    AOS.init({ offset: 100, duration: 800, easing: "ease-in-sine", delay: 100 });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      {/* ✅ Loader */}
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <CircleLoader color="#3498db" size={80} />
        </div>
      ) : (
        <>
          <Navbar cart={cart} handleOpenCartPopup={handleOpenCartPopup} />
          <Hero handleOrderPopup={handleOrderPopup} />
          <Products handleOrderPopup={handleOrderPopup} />

          {/* ✅ Pass cart to update the badge */}
          <TopProducts handleOrderPopup={handleOrderPopup} cart={cart} />

          <Banner />
          <Subscribe />
          <Testimonials />
          <Footer />

          {/* ✅ Order Popup with Quantity Selection */}
          {orderPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold">{selectedProduct?.title}</h2>
                <p>{selectedProduct?.description}</p>
                <div className="flex items-center mt-4">
                  <button
                    className="bg-gray-300 px-3 py-1 rounded-l"
                    onClick={() => setOrderQuantity((q) => (q > 1 ? q - 1 : 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{orderQuantity}</span>
                  <button
                    className="bg-gray-300 px-3 py-1 rounded-r"
                    onClick={() => setOrderQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-green-500 text-white px-4 py-2 mt-4 w-full rounded-lg"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 mt-2 w-full rounded-lg"
                  onClick={handleClosePopups}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* ✅ Cart Popup */}
          {cartPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold">My Cart</h2>
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b py-2">
                      <img src={item.img} alt={item.title} className="w-12 h-12 object-cover rounded-md" />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Your cart is empty</p>
                )}
                <button
                  className="bg-red-500 text-white px-4 py-2 mt-4 w-full rounded-lg"
                  onClick={handleClosePopups}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
