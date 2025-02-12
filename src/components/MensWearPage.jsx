import React from "react";
import TopProducts from "../components/Products/Products";

const MensWearPage = ({ searchTerm }) => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-4">Mens Wear Collection</h1>
      <TopProducts searchTerm={searchTerm} onlyMensWear={true} />
    </div>
  );
};

export default MensWearPage;
