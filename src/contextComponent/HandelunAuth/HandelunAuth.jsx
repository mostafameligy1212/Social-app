import React from 'react'
import { Navigate } from 'react-router-dom'

export default function HandelunAuth({children}) {
  
    if(localStorage.getItem("tok")!=null ){
        return <Navigate to={"/home"}/>
    }
  
    return (
    <div>
      {children}
    </div>
  )
}
