import React, { useRef, useEffect, useState } from "react";
import Img1 from "../../assets/cute shirt.webp";
import Img2 from "../../assets/cotton image.avif";
import Img3 from "../../assets/fashion image.avif";
import Img4 from "../../assets/sweater1.jpg";
import Img5 from "../../assets/sweater2.jpg";
import Img6 from "../../assets/sweater3.png";
import { FaStar } from "react-icons/fa";

const ProductsData = [
  { id: 1, img: Img1, title: "Casual Wear", description: "Beautiful Great shirt for men", price: 500 },
  { id: 2, img: Img2, title: "Printed Shirt", description: "A nice well designed shirt for men", price: 600 },
  { id: 3, img: Img3, title: "Women Shirt", description: "Cute lovely shirt for men", price: 550 },
  { id: 4, img: Img4, title: "Casual Sweater", description: "Beautiful Great Sweater for men", price: 700 },
  { id: 5, img: Img5, title: "Colored Sweater for men", description: "A nice well designed sweater for men", price: 800 },
  { id: 6, img: Img6, title: "Well designed Sweater", description: "Cute lovely sweater for men", price: 400 },
];

const TopProducts = ({ handleOrderPopup, searchTerm, cart }) => {
  const productRefs = useRef({});
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    Object.keys(productRefs.current).forEach((key) => {
      if (productRefs.current[key] && productRefs.current[key].current) {
        productRefs.current[key].current.classList.add("animate-fadeIn");
      }
    });
  }, []);

  const filteredProducts = ProductsData.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle the order when the button is clicked
  const handleOrder = (product) => {
    // Prompt user for email if not already provided
    if (!userEmail) {
      const email = prompt("Please enter your email to proceed with payment:");
      if (email) {
        setUserEmail(email);
        // Once email is entered, proceed with payment logic (you can replace this with your payment gateway logic)
        alert(`Proceeding to payment for ${product.title} with email: ${email}`);
        handleOrderPopup(product); // You can call your existing handleOrderPopup function here for additional actions (e.g., opening a modal or redirecting)
      } else {
        alert("You need to provide an email to proceed.");
      }
    } else {
      // If email is already set, just proceed with the order
      alert(`Proceeding to payment for ${product.title} with email: ${userEmail}`);
      handleOrderPopup(product); // Trigger payment or other logic
    }
  };

  return (
    <div className="container">
      <div className="text-left gap-4 mb-24">
        <p data-aos="fade-up" className="text-sm text-primary">
          Top Rated Products for you
        </p>
        <h1 data-aos="fade-up" className="text-3xl font-bold">
          Best Products for Men
        </h1>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-28 place-items-center">
          {filteredProducts.map((data) => {
            if (!productRefs.current[data.id]) {
              productRefs.current[data.id] = React.createRef();
            }
            const cartItem = cart?.find((item) => item.id === data.id);
            const quantity = cartItem ? cartItem.quantity : 0;
            return (
              <div
                ref={productRefs.current[data.id]}
                data-aos="zoom-in"
                className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px] min-h-[250px] p-6"
                key={data.id}
              >
                <div className="h-[100px] relative">
                  <img
                    src={data.img}
                    alt={data.title}
                    className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="w-full flex items-center justify-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                  </div>
                  <h1 className="text-xl font-bold">{data.title}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                    {data.description}
                  </p>
                  <p className="text-lg font-bold text-green-500 mt-2">₦{data.price}</p>
                  <button
                    className="bg-red-600 hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-red-600"
                    onClick={() => handleOrder(data)} // Updated to use the new handleOrder function
                  >
                    Order Now
                  </button>
                  {quantity > 0 && (
                    <span className="ml-2 text-red-500 font-bold block mt-2">
                      {quantity} in Cart
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No products found for "{searchTerm}"
        </p>
      )}
    </div>
  );
};

export default TopProducts;
