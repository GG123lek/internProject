import React, { useRef, useEffect } from "react";
import Img1 from "../../assets/cute shirt.webp";
import Img2 from "../../assets/cotton image.avif";
import Img3 from "../../assets/fashion image.avif";
import Img4 from "../../assets/grey.jpg";
import Img5 from "../../assets/red.jpg";
import Img6 from "../../assets/button stripe.jpg";
import Img7 from "../../assets/kids wear1.webp";
import Img8 from "../../assets/kids wear2.webp";
import Img9 from "../../assets/kids wear3.png";
import Img10 from "../../assets/elect watch.jpg";
import Img11 from "../../assets/elect headphone.webp";
import Img12 from "../../assets/elect phone.png";
import Img13 from "../../assets/elect charger.jpg";
import Img14 from "../../assets/elect speaker.webp";
import Img15 from "../../assets/elect powerbank.jpeg";
import Img16 from "../../assets/laptop charger.jpeg"
import Img17 from "../../assets/elect airpod.jpeg";


import { FaStar } from "react-icons/fa";

const ProductsData = [
  { id: 1, img: Img1, title: "Casual Wear", description: "Beautiful Great shirt for men", topRated: true, mensWear: true },
  { id: 2, img: Img2, title: "Printed Shirt", description: "A nice well-designed shirt for men", topRated: false, mensWear: true },
  { id: 3, img: Img3, title: "Women Shirt", description: "Cute lovely shirt for men", topRated: true, mensWear: false },
  { id: 4, img: Img4, title: "Grey Wear", description: "Beautiful Great shirt for men", topRated: false, mensWear: true },
  { id: 5, img: Img5, title: "A Fine Red Wear", description: "A nice well-designed shirt for men", topRated: true, mensWear: true },
  { id: 6, img: Img6, title: "Button Stripe Wear", description: "Cute lovely shirt for men", topRated: false, mensWear: true },
  { id: 7, img: Img7, title: "Cute Kids Wear", description: "Cute lovely shirt for kids", topRated: false, kidsWear: true },
  { id: 8, img: Img8, title: "Well Designed Kid Wear", description: "A simple wear for kids", topRated: false, kidsWear: true },
  { id: 9, img: Img9, title: "A Casual Kid Wear", description: "Lovely casual wear for kids", topRated: true, kidsWear: true },
  { id: 10, img: Img10, title: "WristWatch", description: "Latest watches with advanced features", topRated: true, electronics: true },
  { id: 11, img: Img11, title: "Headphone", description: "Powerful headphone for work and gaming", topRated: true, electronics: true },
  { id: 12, img: Img12, title: "Wireless Phones", description: "Noise-canceling high-quality sound", topRated: false, electronics: true },
  { id: 13, img: Img13, title: "Charger", description: "Fast and affordable charger", topRated: false, electronics: true },
  { id: 14, img: Img14, title: "Speaker", description: "Best soundbeat u can get", topRated: false, electronics: true },
  { id: 15, img: Img15, title: "PowerBank", description: "Get the best charging experience ever", topRated: false, electronics: true },
  { id: 16, img: Img16, title: "LaptopCharger", description: "Very fast laptop charger", topRated: false, electronics: true },
  { id: 17, img: Img17, title: "Airpod", description: "Small and very lovely listening devices", topRated: false, electronics: true },
];

const TopProducts = ({ handleOrderPopup, searchTerm, cart, onlyTopRated = false, onlyKidsWear = false, onlyMensWear = false, onlyElectronics = false }) => {
  const productRefs = useRef({});

  useEffect(() => {
    Object.keys(productRefs.current).forEach((key) => {
      if (productRefs.current[key] && productRefs.current[key].current) {
        productRefs.current[key].current.classList.add("animate-fadeIn");
      }
    });
  }, []);

  // Filter products based on search term and selected category
  const filteredProducts = ProductsData.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (onlyTopRated) return product.topRated && matchesSearch;
    if (onlyKidsWear) return product.kidsWear && matchesSearch;
    if (onlyMensWear) return product.mensWear && matchesSearch;
    if (onlyElectronics) return product.electronics && matchesSearch; // <-- Added Electronics Filtering
    return matchesSearch;
  });

  return (
    <div className="container">
      <div className="text-left gap-4 mb-24">
        <p data-aos="fade-up" className="text-sm text-primary">
          {onlyTopRated ? "Top Rated Products for You" : 
           onlyKidsWear ? "Best Kids Wear" : 
           onlyMensWear ? "Best Men's Wear" : 
           onlyElectronics ? "Best Electronics" : "Best Products"}
        </p>
        <h1 data-aos="fade-up" className="text-3xl font-bold">
          {onlyTopRated ? "Top Rated Products" : 
           onlyKidsWear ? "Kids Wear" : 
           onlyMensWear ? "Men's Wear" : 
           onlyElectronics ? "Electronics Collection" : "Best Products"}
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
                  <button
                    className="bg-red-600 hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-red-600"
                    onClick={() => handleOrderPopup(data)}
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
