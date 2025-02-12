import React from "react";
import TopProducts from "../components/TopProducts/TopProducts";

const TrendingProductsPage = ({ handleOrderPopup, searchTerm, cart }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Trending Products</h1>
      <TopProducts
        handleOrderPopup={handleOrderPopup}
        searchTerm={searchTerm}
        cart={cart}
        onlyTrending={true} 
      />
    </div>
  );
};

export default TrendingProductsPage;
