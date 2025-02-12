import React from "react";
import TopProducts from "../components/TopProducts/TopProducts";

const BestSellingPage = ({ handleOrderPopup, searchTerm, cart }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Best Selling Products</h1>
      <TopProducts
        handleOrderPopup={handleOrderPopup}
        searchTerm={searchTerm}
        cart={cart}
        onlyKidsWear={true}  
        onlyMensWear={true}  
      />
    </div>
  );
};

export default BestSellingPage;
