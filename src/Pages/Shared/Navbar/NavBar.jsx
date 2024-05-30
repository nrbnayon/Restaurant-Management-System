import { Link, NavLink } from "react-router-dom";
import Logo from "/logo.png";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { FaCartArrowDown } from "react-icons/fa";

const NavBar = () => {
  const [theme, setTheme] = useState("dark");
  const { user, logOut } = useAuth();
  const [dropDownState, setDropDownState] = useState(false);
  const dropDownMenuRef = useRef();

  useEffect(() => {
    const closeDropDown = (e) => {
      if (
        dropDownMenuRef.current &&
        !dropDownMenuRef.current.contains(e.target)
      ) {
        setDropDownState(false);
      }
    };
    document.addEventListener("mousedown", closeDropDown);
    return () => {
      document.removeEventListener("mousedown", closeDropDown);
    };
  }, []);
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const handleTheme = (e) => {
    const newTheme = e.target.checked ? "dark" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.querySelector("html").setAttribute("data-theme", savedTheme);
    }
  }, [theme]);
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary border border-primary"
              : "font-bold bg-sky-500 transition-all duration-300 group-hover:w-full"
          }
        >
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allFoods"
          className={({ isActive }) =>
            isActive
              ? "text-primary border border-primary"
              : "font-bold bg-sky-500 transition-all duration-300 group-hover:w-full"
          }
        >
          ALL FOODS
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/gallery"
          className={({ isActive }) =>
            isActive
              ? "text-primary border border-primary"
              : "font-bold bg-sky-500 transition-all duration-300 group-hover:w-full"
          }
        >
          GALLERY
        </NavLink>
      </li>
      {user && (
        <li
          className="hidden md:flex font-bold uppercase"
          ref={dropDownMenuRef}
        >
          <button
            onClick={() => setDropDownState(!dropDownState)}
            className="relative flex items-center gap-1 py-2 hover:underline font-bold uppercase"
          >
            <span>My Profile</span>
            <svg
              className={`${dropDownState ? "" : "rotate-180"}`}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
          {dropDownState && (
            <ul className="absolute md:w-52 top-10  z-[200]  space-y-2 rounded-lg bg-gray-700 p-2 text-gray-100">
              <li className="px-3  hover:underline hover:bg-primary">
                <Link to="/myAddedFoods">My added food</Link>
              </li>
              <li className="px-3 hover:underline hover:bg-primary">
                <Link to="/addFood">Add a food</Link>
              </li>
              <li className="px-3 hover:underline hover:bg-primary">
                <Link to="/myOrderFood">My ordered food</Link>
              </li>
            </ul>
          )}
        </li>
      )}
      {user && (
        <details className=" md:hidden font-bold uppercase dropdown">
          <summary tabIndex={0}>My Profile</summary>
          <ul
            tabIndex={0}
            className="p-2 shadow space-y-2 menu dropdown-content z-[1] bg-base-100 rounded-box w-40 uppercase"
          >
            <li className="btn btn-primary hover:underline">
              <Link className="btn btn-primary w-full" to="/myAddedFoods">
                My added Items
              </Link>
            </li>
            <li className="btn btn-primary">
              <Link
                className="btn btn-primary w-full hover:underline"
                to="/addFood"
              >
                Add a food{" "}
              </Link>
            </li>
            <li className="btn btn-primary hover:underline">
              <Link to="/myOrderFood" className="btn btn-primary w-full">
                My ordered
              </Link>
            </li>
          </ul>
        </details>
      )}
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-primary border border-primary"
              : "font-bold bg-sky-500 transition-all duration-300 group-hover:w-full"
          }
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 h-20 border-b-2 drop-shadow fixed z-50 bg-opacity-90 max-w-7xl mx-auto overflow-hidden">
      <div className="navbar-start mr-10 sm:mr-28 md:mr-0 ">
        <div className="drawer drawer-end md:hidden ">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </div>
          <div className="drawer-side z-50 ">
            <ul className="menu p-4 w-52 min-h-full bg-base-200 text-base-content">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              >
                <IoClose className="h-5 w-5 absolute top-1 left-1 cursor-pointer" />
              </label>
              {navLinks}
              <li>
                {user ? (
                  <Link
                    onClick={handleLogout}
                    className="font-bold btn-outline bg-sky-500 transition-all duration-300 group-hover:w-full"
                  >
                    LOGOUT
                  </Link>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? " btn text-pink-600 border border-primary"
                        : "font-bold bg-sky-500 btn btn-outline transition-all duration-300 group-hover:w-full"
                    }
                  >
                    LOGIN
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="h-10 w-20">
          <Link to="/" className="">
            <img src={Logo} alt="logo" className="h-full w-full " />
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-2 px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end space-x-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <FaCartArrowDown className="h-6 w-6" />
              <span className="badge text-red-500 badge-sm indicator-item">
                10
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg"> Items</span>
              <span className="text-info">Subtotal: $0</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={handleTheme}
            className="theme-controller "
          />
          <svg
            className="swap-off fill-current w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on fill-current w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        <div className="flex justify-center items-center gap-3">
          {user ? (
            <>
              <div>
                <Tooltip title={`${user?.displayName}`} placement="left">
                  <div className="avatar online w-10 h-10 ">
                    <img
                      tabIndex={0}
                      className="rounded-full"
                      src={user?.photoURL}
                    />
                  </div>
                </Tooltip>
              </div>
              <Link
                onClick={handleLogout}
                className="hidden md:flex btn text-secondary"
              >
                LOGOUT
              </Link>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "flex btn text-pink-600 border border-primary"
                  : "font-bold btn btn-outline  transition-all duration-300"
              }
            >
              LOGIN
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
