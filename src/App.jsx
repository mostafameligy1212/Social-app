import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import AuthContext from './contextComponent/authContext/AuthContext'
import ProtocetedRoutes from './contextComponent/ProtecetedRoutes/ProtocetedRoutes'
import Portifile from './components/Portfile/Portifile'
import HandelunAuth from './contextComponent/HandelunAuth/HandelunAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Commentdasign from './components/Comment/Commentdesign'
import CommentsPage from './components/commentsPage/CommentsPage'
import { ToastContainer } from 'react-toastify'
import MyInfo from './components/MyInfo/MyInfo'
import { Offline } from 'react-detect-offline'
import { Toast } from 'flowbite-react'
import { FaTelegramPlane } from 'react-icons/fa'

let router =  createBrowserRouter([
  {path : "" ,element : <Layout/> , children : [
    {path : '' , element :<ProtocetedRoutes> <Home/></ProtocetedRoutes>},
    { path: "home", element:   <Navigate to={"/"} />},
    {path : 'register' , element :<HandelunAuth><Register/></HandelunAuth>},
    {path : 'login' , element :<HandelunAuth><Login/></HandelunAuth>},
    {path : 'portifile' , element :<ProtocetedRoutes><Portifile/></ProtocetedRoutes>},
    {path : 'commentsPage/:id' , element :<ProtocetedRoutes><CommentsPage/></ProtocetedRoutes>},
    {path : 'portifile/commentsPage/:id' , element :<ProtocetedRoutes><CommentsPage/></ProtocetedRoutes>},
    {path : 'myInfo' , element :<ProtocetedRoutes><MyInfo/></ProtocetedRoutes>},
    {path : '*' , element :<h1 className='min-h-screen flex justify-center items-center text-3xl'>erorr 404</h1>},
  ]},
])
const client = new QueryClient();
export default function App() {
  return (
      <>

        <Offline>
          <Toast className='fixed bottom-10 right-10 w-fit bg-black dark:bg-white border-2 z-50'>
            <div className=" text-lg text-red-600 dark:text-white ">Network erorr try again leater</div>
          </Toast>
        </Offline>

        <AuthContext>
          <QueryClientProvider client={client}>

                <RouterProvider router={router}>

                </RouterProvider>
          </QueryClientProvider>
        </AuthContext>
        <ToastContainer/>



      </>
  )
}
