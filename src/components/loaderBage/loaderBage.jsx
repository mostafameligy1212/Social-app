import React from 'react'
import { FadeLoader } from 'react-spinners'

export default function LoaderBage() {
  return (
    <>
     <div className='h-screen flex justify-center items-center w-screen'><FadeLoader color="blue" /></div> 
    </>
  )
}
