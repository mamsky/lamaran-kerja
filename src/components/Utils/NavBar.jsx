import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Home } from "../Home";
// import Register from "../authentication/Register";
// import Login from "../authentication/Login";
import Cookies from "js-cookie";
const NavBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar bg-base-100 px-4 md:px-10 shadow-md shadow-zinc-700/50 mb-2">
        <div className="flex-1">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://ik.imagekit.io/hashtechy/web-prod/icon/services/frontend-development/react-js/react-js-logo-icon.svg"
              className="h-8"
              alt="Foto"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              Final Project
            </span>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-black"
                // aria-current="page"
              >
                Home
              </Link>
            </li>
            {Cookies.get("token") && (
              <li className="md:block hidden">
                <Link to="/list-job-vacancy">Dashboard</Link>
              </li>
            )}

            {!Cookies.get("token") && (
              <li className="md:block hidden">
                <Link to="/login">Login</Link>
              </li>
            )}
            {Cookies.get("token") && (
              <li className="md:block hidden">
                <Link
                  to="/login"
                  onClick={() => {
                    Cookies.remove("token");
                    navigate("/dashboard");
                  }}
                >
                  Logout
                </Link>
              </li>
            )}

            <li>
              <details className="md:hidden mr-6">
                <summary>
                  <img
                    src="https://img.icons8.com/?size=256&id=123621&format=png"
                    alt="hamburger"
                    className="w-6"
                  />
                </summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  {Cookies.get("token") && (
                    <li className="cursor-pointer">
                      <Link to="/list-job-vacancy">Dashboard</Link>
                    </li>
                  )}

                  {!Cookies.get("token") && (
                    <li className="cursor-pointer">
                      <Link to="/login">Login</Link>
                    </li>
                  )}
                  {Cookies.get("token") && (
                    <li className="cursor-pointer">
                      <Link
                        to="/login"
                        onClick={() => {
                          Cookies.remove("token");
                          navigate("/dashboard");
                        }}
                      >
                        Logout
                      </Link>
                    </li>
                  )}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
