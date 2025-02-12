import React from "react";
import TopProducts from "../components/Products/Products";

const TopRatedPage = ({ searchTerm }) => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-4">Top Rated Products</h1>
      <TopProducts searchTerm={searchTerm} onlyTopRated={true} />
    </div>
  );
};

export default TopRatedPage;
