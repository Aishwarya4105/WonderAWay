


import { CgProfile } from "react-icons/cg";
import "../App.css";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { BsLuggage } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";



import ProfileDropdown from "../nav-homepage/ProfileDropdown";


function Header({ }) {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <div className="nav-right">
        <div className="logo">
          Wonder<span>AWay</span>
        </div>
      </div>

      <div className="header-nav">
        <div className="icons">
          <Link to="/packages" className="listing"><span className="icon"> <BsLuggage /></span> <p>package</p></Link>
          <Link to="/wishlist" className="listing"><span className="icon"> <FaRegHeart /></span> <p>Wishlist</p></Link>

          
          {/*<Link to="/bookings-details" className="listing"><span className="carts"><SlCalender /></span> <p>Booking</p></Link>*/}
             
          {/* PROFILE DROPDOWN */}
          <div className="profile-container" ref={profileRef}> <div className="profile-trigger" onClick={() => setIsOpen(!isOpen)} >
          <span className="profile"><CgProfile /> </span><p>Profile</p>
          </div>

         {isOpen && <ProfileDropdown close={()=>setIsOpen(false)}/>}
       </div>
          </div>
        </div>
    </header>
  );
}

export default Header;


