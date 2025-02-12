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
import Img16 from "../../assets/laptop charger.jpeg";
import Img17 from "../../assets/elect airpod.jpeg";

import { FaStar } from "react-icons/fa";

const ProductsData = [
  { id: 1, img: Img1, title: "Casual Wear", description: "Beautiful Great shirt for men", price: 25, topRated: true, trending: true, mensWear: true, bestSelling: true },
  { id: 2, img: Img2, title: "Printed Shirt", description: "A nice well-designed shirt for men", price: 30, topRated: false, mensWear: true, bestSelling: false },
  { id: 3, img: Img3, title: "Women Shirt", description: "Cute lovely shirt for men", price: 28, topRated: true, trending: true, mensWear: false, bestSelling: false },
  { id: 4, img: Img4, title: "Grey Wear", description: "Beautiful Great shirt for men", price: 22, topRated: false, mensWear: true, bestSelling: true },
  { id: 5, img: Img5, title: "A Fine Red Wear", description: "A nice well-designed shirt for men", price: 35, topRated: true, trending: true, mensWear: true, bestSelling: true },
  { id: 6, img: Img6, title: "Button Stripe Wear", description: "Cute lovely shirt for men", price: 27, topRated: false, mensWear: true, bestSelling: false },
  { id: 7, img: Img7, title: "Cute Kids Wear", description: "Cute lovely shirt for kids", price: 20, topRated: false, kidsWear: true, bestSelling: false },
  { id: 8, img: Img8, title: "Well Designed Kid Wear", description: "A simple wear for kids", price: 18, topRated: false, kidsWear: true, bestSelling: true },
  { id: 9, img: Img9, title: "A Casual Kid Wear", description: "Lovely casual wear for kids", price: 22, topRated: true, trending: true, kidsWear: true, bestSelling: true },
  { id: 10, img: Img10, title: "WristWatch", description: "Latest watches with advanced features", price: 50, topRated: true, electronics: true, bestSelling: true },
  { id: 11, img: Img11, title: "Headphone", description: "Powerful headphone for work and gaming", price: 40, topRated: true, electronics: true, bestSelling: false },
  { id: 12, img: Img12, title: "Wireless Phones", description: "Noise-canceling high-quality sound", price: 200, topRated: false, electronics: true, bestSelling: true },
  { id: 13, img: Img13, title: "Charger", description: "Fast and affordable charger", price: 15, topRated: false, electronics: true, bestSelling: false },
  { id: 14, img: Img14, title: "Speaker", description: "Best soundbeat u can get", price: 45, topRated: false, electronics: true, bestSelling: true },
  { id: 15, img: Img15, title: "PowerBank", description: "Get the best charging experience ever", price: 55, topRated: false, electronics: true, bestSelling: true },
  { id: 16, img: Img16, title: "LaptopCharger", description: "Very fast laptop charger", price: 35, topRated: false, electronics: true, bestSelling: false },
  { id: 17, img: Img17, title: "Airpod", description: "Small and very lovely listening devices", price: 60, topRated: false, electronics: true, bestSelling: true },
];

const TopProducts = ({ handleOrderPopup, searchTerm, cart, onlyTopRated = false, onlyKidsWear = false, onlyMensWear = false, onlyElectronics = false, onlyTrending = false, onlyBestSelling = false }) => {
  const productRefs = useRef({});

  useEffect(() => {
    Object.keys(productRefs.current).forEach((key) => {
      if (productRefs.current[key] && productRefs.current[key].current) {
        productRefs.current[key].current.classList.add("animate-fadeIn");
      }
    });
  }, []);

  const filteredProducts = ProductsData.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (onlyTopRated) return product.topRated && matchesSearch;
    if (onlyKidsWear) return product.kidsWear && matchesSearch;
    if (onlyMensWear) return product.mensWear && matchesSearch;
    if (onlyElectronics) return product.electronics && matchesSearch;
    if (onlyTrending) return (product.electronics || product.mensWear) && matchesSearch;
    if (onlyBestSelling) return product.bestSelling && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="container">
      <div className="text-left gap-4 mb-24">
        <h1 className="text-3xl font-bold">Best Products</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-28 place-items-center">
        {filteredProducts.map((data) => (
          <div key={data.id} className="rounded-2xl bg-white shadow-xl max-w-[300px] min-h-[250px] p-6">
            <img src={data.img} alt={data.title} className="max-w-[140px] mx-auto -translate-y-20" />
            <h1 className="text-xl font-bold">{data.title}</h1>
            <p className="text-gray-500 text-sm">{data.description}</p>
            <p className="text-lg font-bold mt-2">${data.price}</p>
            <button className="bg-red-600 text-white py-1 px-4 rounded-full mt-4" onClick={() => handleOrderPopup(data)}>Order Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
