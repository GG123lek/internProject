import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Popup = ({ orderPopup, setOrderPopup, selectedProduct }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleClose = () => {
    setOrderPopup(false);
  };

  return (
    orderPopup && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={handleClose}
      >
        <div
          className="bg-white p-6 rounded-lg w-80 md:w-96"
          onClick={(e) => e.stopPropagation()} // Prevent closing on clicking the popup content
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Order Details</h2>
            <FaTimes
              onClick={handleClose}
              className="text-2xl cursor-pointer"
            />
          </div>
          {selectedProduct && (
            <>
              <img
                src={selectedProduct.img}
                alt={selectedProduct.title}
                className="w-full h-60 object-cover rounded-lg my-4"
              />
              <h3 className="text-lg font-semibold">{selectedProduct.title}</h3>
              <p className="text-sm text-gray-600">{selectedProduct.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <label htmlFor="quantity">Quantity: </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleClose}
                  className="py-2 px-4 bg-red-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClose} // You can add payment logic here
                  className="py-2 px-4 bg-green-500 text-white rounded-md"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default Popup;
