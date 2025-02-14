import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import { IoIosLogIn } from "react-icons/io";
import { Typography } from "@mui/material";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <header className="shadow-none sm:shadow-xl rounded-none sm:rounded-full mx-5 my-3">
      <div className="container mx-auto px-4 py-4 flex items-center sm:justify-between flex-wrap gap-5 justify-center">
        <p
          onClick={() => navigate("/")}
          className="text-2xl text-blue-500 font-bold cursor-pointer"
        >
          Noquery...
          <p className="text-xs text-gray-600">aims to give best solution</p>
        </p>
        <nav>
          <ul className="flex space-x-4 items-center">
            {user ? (
              <div className="py-8 px-8 max-w-sm mx-auto space-y-2 bg-white rounded-full shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
                {/* <img
                    className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
                    src="/img/erin-lindford.jpg"
                    alt="Woman's Face"
                  /> */}
                <div className="text-center flex flex-row items-center justify-center gap-5 sm:text-left">
                  <div className="">
                    <div className="text-lg flex flex-row items-center gap-3 text-black font-semibold">
                      <div
                        onClick={() => navigate("/profile")}
                        className="cursor-pointer"
                      >
                        {<FaUserCircle />}
                      </div>
                      {user.username}
                    </div>
                  </div>
                  <button
                    className="px-4 pb-1 text-md text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    onClick={logout}
                  >
                    logout
                  </button>
                </div>
              </div>
            ) : (
              <li>
                <div
                  className="flex flex-row gap-2 text-blue-500 items-center cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  <span className="text-lg">Login</span>
                  <IoIosLogIn size={"2rem"} />
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
