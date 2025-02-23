import { NavLink } from "react-router-dom";
import { ImCart } from "react-icons/im";
import { useCart } from "@/hooks/useCart";
import { AiFillHeart } from "react-icons/ai";
import { useState, useEffect } from "react";
import { cn } from "@/utils/utilities";
import { useNavbar } from "@/hooks/useNavbar";
const Header = () => {
  const { totalItems } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const { navBar } = useNavbar();

  useEffect(() => {
    if (totalItems > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <header
      className={cn(
        "flex justify-between items-center w-full lg:px-32 px-4 py-3 md:py-4",
        { "shadow-custom-hover bg-white": navBar }
      )}
    >
      <div className="nav-logo">
        <NavLink to="/">
          <h1>
            Shopping<span className="logo-span">Spree</span>
          </h1>
        </NavLink>
      </div>

      <div className="flex gap-4">
        <NavLink
          to="/likes"
          className="bg-amber-700 rounded-full p-4 md:p-4 flex items-center"
        >
          <button className="nav-like-button">
            <AiFillHeart color="white" />
          </button>
        </NavLink>

        <div className="relative">
          {/* Cart button as a perfect circle */}
          <NavLink
            to="/cart"
            className="bg-green-800 rounded-full flex items-center justify-center w-12 h-12 relative"
          >
            <button className="relative z-10">
              <ImCart color="white" />
            </button>
          </NavLink>

          {/* Counter circle positioned at top right */}
          <div className="absolute -top-2 -right-2 inline-flex items-center justify-center">
            <span
              className={cn("absolute z-10", {
                "text-black": isAnimating,
                "text-white": !isAnimating,
              })}
            >
              {totalItems}
            </span>
            <span
              className={cn(
                "w-6 h-6 bg-blue-600 rounded-full", // Permanent blue circle
                { "pop-animation": isAnimating }
              )}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
