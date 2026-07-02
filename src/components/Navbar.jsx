import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiClipboard,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { motion } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    navigate("/login");
  };

  const navLink = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
      location.pathname === path
        ? "bg-blue-600 text-white shadow-lg"
        : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
    }`;

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            E
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">
              eHub
            </h1>

            <p className="hidden md:block text-xs text-slate-500">
              Event Management Platform
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden md:flex items-center gap-3">

          <Link
            to="/"
            className={navLink("/")}
          >
            <FiHome />
            Home
          </Link>

          <Link
            to="/events"
            className={navLink("/events")}
          >
            <FiCalendar />
            Events
          </Link>

          {role === "USER" && (
            <Link
              to="/registrations"
              className={navLink("/registrations")}
            >
              <FiClipboard />
              My Registrations
            </Link>
          )}

          {(role === "ADMIN" ||
            role === "ORGANIZER") && (
            <Link
              to="/create-event"
              className={navLink("/create-event")}
            >
              <FiCalendar />
              Create Event
            </Link>
          )}

          {role === "ORGANIZER" && (
            <Link
              to="/dashboard"
              className={navLink("/dashboard")}
            >
              <FiGrid />
              Dashboard
            </Link>
          )}

          {role === "ADMIN" && (
            <>
              <Link
                to="/dashboard"
                className={navLink("/dashboard")}
              >
                <FiGrid />
                Dashboard
              </Link>

              <Link
                to="/registrations"
                className={navLink("/registrations")}
              >
                <FiClipboard />
                All Registrations
              </Link>
            </>
          )}

          <button
            onClick={logout}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 shadow-md"
          >
            <FiLogOut />
            Logout
          </button>

        </div>

        {/* Mobile Hamburger */}

        <button
          className="md:hidden text-3xl text-slate-700"
          onClick={() =>
            setMobileMenu(!mobileMenu)
          }
        >
          {mobileMenu ? <FiX /> : <FiMenu />}
        </button>

      </div>

      {/* Mobile Menu */}

      {mobileMenu && (

        <div className="md:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-4 shadow-lg">

          <Link
            to="/"
            className="block"
            onClick={() =>
              setMobileMenu(false)
            }
          >
            Home
          </Link>

          <Link
            to="/events"
            className="block"
            onClick={() =>
              setMobileMenu(false)
            }
          >
            Events
          </Link>

          {role === "USER" && (
            <Link
              to="/registrations"
              className="block"
              onClick={() =>
                setMobileMenu(false)
              }
            >
              My Registrations
            </Link>
          )}

          {(role === "ADMIN" ||
            role === "ORGANIZER") && (
            <Link
              to="/create-event"
              className="block"
              onClick={() =>
                setMobileMenu(false)
              }
            >
              Create Event
            </Link>
          )}

          {(role === "ADMIN" ||
            role === "ORGANIZER") && (
            <Link
              to="/dashboard"
              className="block"
              onClick={() =>
                setMobileMenu(false)
              }
            >
              Dashboard
            </Link>
          )}

          {role === "ADMIN" && (
            <Link
              to="/registrations"
              className="block"
              onClick={() =>
                setMobileMenu(false)
              }
            >
              All Registrations
            </Link>
          )}

          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-3 rounded-xl"
          >
            Logout
          </button>

        </div>

      )}

    </motion.nav>
  );
}

export default Navbar;