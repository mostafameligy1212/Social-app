import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { useContext } from 'react'
import { authContext } from '../../contextComponent/authContext/AuthContext'

export default function Layout() {
  let {darkMood , setDarkMood} =useContext(authContext);
  return (
    
    <div className={`${darkMood ? "dark":""} flex flex-col justify-between min-h-screen bg-stone-200 dark:bg-gray-700 transition-all duration-500`}>
    <Navbar />
      <div className=" mt-5 ">
        <Outlet/>
      </div>

      <Footer/>
    </div>
  
  )
}
