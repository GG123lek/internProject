import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
// import { FaCartShopping, FaBars, FaTimes } from "react-icons";
import { FaCartShopping, FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";  // ✅ Correct import
import { FaCaretDown } from "react-icons/fa";
// import DarkMode from "./DarkMode";
import CheckoutButton from "../CheckOutButton";

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Top Rated", link: "/top-rated" },
  { id: 3, name: "Kids Wear", link: "/kids-wear" },
  { id: 4, name: "Mens Wear", link: "/mens-wear" },
  { id: 5, name: "Electronics", link: "/electronics" },
];

const DropdownLinks = [
  { id: 1, name: "Trending Products", link: "/trending-products" },
  { id: 2, name: "Best Selling", link: "/best-selling" },
  { id: 3, name: "Top Rated", link: "/top-rated" },
];

const Navbar = ({ handleOrderPopup, onSearch, cart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartRef = useRef(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch(searchTerm);
    }
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalAmount = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
              Suleiman-Shop
            </Link>
          </div>
          <div className="flex items-center gap-4">
          
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-yellow-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

           
            <button
              onClick={toggleCart}
              className="relative bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">Cart</span>
              <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                ${totalAmount.toFixed(2)}
              </span>
            </button>

           
            {/* <div>
              <CheckoutButton />
            </div> */}

          
            <button className="sm:hidden text-xl" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

     
      <div className={`sm:flex ${menuOpen ? "block" : "hidden"} justify-center`}>
        <ul className="sm:flex flex-col sm:flex-row items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <Link to={data.link} className="inline-block px-4 hover:text-primary duration-200">
                {data.name}
              </Link>
            </li>
          ))}
         
          <li className="group relative cursor-pointer">
            <span className="flex items-center gap-[2px] py-2">
              Trending Products
              <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
            </span>
            <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <Link to={data.link} className="inline-block w-full rounded-md p-2 hover:bg-primary/20">
                      {data.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>

      
      {cartOpen && (
        <div ref={cartRef} className="absolute right-5 top-14 bg-white shadow-lg p-4 rounded-md w-64 z-50">
         <h2 className="text-lg font-bold text-blue-700">Shopping Cart</h2>

          {cart.length > 0 ? (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="border-b py-2">
                  <div className="flex justify-between items-center text-yellow-300">
                    <span>{item.title} ({item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-green-500">Your cart is empty</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
