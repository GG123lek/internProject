import React from "react";
import TopProducts from "../components/Products/Products";

const KidsWearPage = ({ searchTerm }) => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-4">Kids Wear Collection</h1>
      <TopProducts searchTerm={searchTerm} onlyKidsWear={true} />
    </div>
  );
};

export default KidsWearPage;
