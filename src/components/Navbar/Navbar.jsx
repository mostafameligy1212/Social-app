import React, { useContext } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../contextComponent/authContext/AuthContext";
import { IoMdHome, IoMdLogOut } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { FaFacebookMessenger, FaLinkedin, FaMoon, FaSun } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { MdOutlineCreate } from "react-icons/md";

export default function Navbar() {
  let {darkMood , setDarkMood } = useContext(authContext);
  let navigate = useNavigate();
  let { token, updateToken } = useContext(authContext);
  function handelToken() {
    navigate("login");
    localStorage.removeItem("tok");
    updateToken(null);
  }

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full z-40 transition-all duration-500 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className=" flex">

              <NavLink to={"/home"} className="text-xl font-bold  cursor-pointer text-blue-700 dark:text-white hover:text-blue-600 transition-all duration-500 flex items-center space-x-3 rtl:space-x-reverse">
              <FaLinkedin size={40} />
  
            </NavLink>
            <span
              className=" ms-3 flex flex-col justify-center items-center cursor-pointer  text-black  p-2  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:!text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              {darkMood ? <FaSun size={20} onClick={()=>{setDarkMood(false)}}/>
              :<FaMoon onClick={(()=>{setDarkMood(true)})} size={20}/> }
              
            </span>
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 transition-all duration-500">

              {token && (
                <>

                  <li>
                    <NavLink
                      to={"/home"}
                      className="active:bg-red-500 flex flex-col justify-center items-center text-black p-2  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      <IoMdHome size={20}/>

                      <p>Home</p>
                    </NavLink>
                  </li>
                            <li>
                    <NavLink
                      to={"/portifile"}
                      className="flex flex-col justify-center items-center text-black p-2  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      <ImProfile size={20}/>
                      Protofile
                    </NavLink>
                  </li>
                    <li>
                      <span
                        className=" flex flex-col justify-center items-center cursor-pointer  text-black p-2  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:!text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        <FaFacebookMessenger  size={20} className="" />
                        messaging
                      </span>
                    </li>

     

                  <li>
                    <span
                      onClick={handelToken}
                      className=" flex flex-col justify-center items-center cursor-pointer  text-black p-2  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:!text-red-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      <IoMdLogOut size={20} className="" />
                      logout
                    </span>
                  </li>

                </>
              )}
              {!token && (
                <>
                  <li>
                    <NavLink
                      to={"/login"}
                      className="flex flex-col justify-center items-center p-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      <CiLogin size={30} />
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/register"}
                      className="flex flex-col justify-center items-center p-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      <MdOutlineCreate size={30} />
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
