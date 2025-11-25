import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  HelpCircle,
  BookOpen,
  Info,
  UserRound,
  Settings,
  LogOut,
  User,
  Home,
  Compass,
  PlusCircle,
  MessageSquare,
} from "lucide-react";
import BottomNavbar from "./BottomNavbar";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // replace with real auth check later

  return (
    <>
      {/* ===== TOP NAVBAR (Desktop) ===== */}
      <div className="relative w-full bg-white shadow-sm px-4 md:px-8 flex items-center h-16 hidden md:flex">
        {/* Left: Logo */}
        <div className="flex-1">
          <img
            className="w-36 md:w-40"
            src="/elomaze-logo.png"
            alt="Elomaze Logo"
          />
        </div>

        {/* Center: Main Links */}
        <div className="flex-1 hidden md:flex justify-center gap-8 font-medium text-black">
          <Link to="/listings" className="hover:text-primary transition">
            Listings
          </Link>
          <Link to="/accommodation" className="hover:text-primary transition">
            Find Accommodation
          </Link>
          <Link to="/services" className="hover:text-primary transition">
            Services
          </Link>
        </div>

        {/* Right: Links + Menu */}
        <div className="flex-1 flex justify-end items-center text-gray-600 font-medium relative">
          <div className="flex items-center gap-5">
            <Link to="/list-space" className="hover:text-primary transition">
              List Your Space
            </Link>

            {isLoggedIn ? (
              <img
                src="/elomaze-hero.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
              />
            ) : (
              <>
                <span className="text-primary">|</span>
                <Link to="/signin" className="hover:text-primary transition">
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="ml-3 p-2 rounded-full bg-gray-200 hover:bg-gray-400 transition"
          >
            <Menu className="size-5 text-gray-700" />
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 top-14 bg-white shadow-xl rounded-lg w-52 py-2 z-50 border border-gray-100">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <User className="size-4 text-primary" />
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <Settings className="size-4 text-primary" />
                    Account Settings
                  </Link>
                  <hr className="my-2 border-gray-200" />
                  <Link
                    to="/help"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <HelpCircle className="size-4 text-primary" />
                    Help Center
                  </Link>
                  <Link
                    to="/blog"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <BookOpen className="size-4 text-primary" />
                    Blog
                  </Link>
                  <Link
                    to="/about"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <Info className="size-4 text-primary" />
                    About Us
                  </Link>
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={() => {
                      setOpen(false);
                      // handle logout
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    <LogOut className="size-4 text-primary" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/help"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <HelpCircle className="size-4 text-primary" />
                    Help Center
                  </Link>
                  <Link
                    to="/blog"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <BookOpen className="size-4 text-primary" />
                    Blog
                  </Link>
                  <Link
                    to="/about"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <Info className="size-4 text-primary" />
                    About Us
                  </Link>
                  <hr className="my-2 border-gray-200" />
                  <Link
                    to="/signin"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <UserRound className="size-4 text-primary" />
                    Login / Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ===== TOP NAVBAR (Mobile) ===== */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md flex justify-between items-center px-4 h-14 md:hidden z-50">
        <img src="/elomaze-logo.png" alt="Elomaze Logo" className="w-28" />

        {isLoggedIn ? (
          <img
            src="/elomaze-hero.jpg"
            alt="Profile"
            className="w-9 h-9 rounded-full border border-gray-200 object-cover"
          />
        ) : (
          <div className="flex items-center gap-3 text-sm font-medium">
            <Link to="/list-space" className="text-gray-700 hover:text-primary transition">
              List
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/signin" className="text-primary hover:underline">
              Sign Up
            </Link>
          </div>
        )}
      </div>

     
      <BottomNavbar/>
    </>
  );
};

export default Navbar;
