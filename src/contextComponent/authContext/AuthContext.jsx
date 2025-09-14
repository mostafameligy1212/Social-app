import React, { createContext, useEffect, useState } from 'react'
import {jwtDecode} from "jwt-decode";
export let authContext = createContext();

export default function AuthContext({children}) {
  // let [token , setToken ] =useState( localStorage.getItem('tok'));
    let [token , setToken ] =useState(()=>{return localStorage.getItem('tok')});
    let [userId , setUserId] = useState(null);
    let [darkMood , setDarkMood] = useState(true);

    useEffect(()=>{
      if(token){
        let Data = jwtDecode(token).user;
        setUserId(Data)
        // console.log(Data);
        
      }
    } , [token])
    // console.log(userId);
    
 
    // useEffect(()=>{
    //     // console.log(localStorage.getItem('tok'));
    //     let LSToken = localStorage.getItem('tok');    
    //     if(LSToken){
    //     updateToken(LSToken);
    //     }
    // },[])

    // console.log(token);
    
    function updateToken(tok){
        setToken(tok)
    }

  return (
    <authContext.Provider value={{updateToken , token , userId , darkMood , setDarkMood}}>
      {children}
    </authContext.Provider>
  )
}
