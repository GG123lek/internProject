import React from "react";
import TopProducts from "../components/Products/Products";

const ElectronicsPage = ({ searchTerm }) => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-4">Electronics Collection</h1>
      <TopProducts searchTerm={searchTerm} onlyElectronics={true} />
    </div>
  );
};

export default ElectronicsPage;
