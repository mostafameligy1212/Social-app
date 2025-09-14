import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import * as zod from "zod"
import { data, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader, FadeLoader, SyncLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';
/*
{
    "name": "Ahmed Bahnasy",
    "email":"bahnasy2040@gmail.com",
    "password":"Bahnasy@123",
    "rePassword":"Bahnasy@123",
    "dateOfBirth":"7-10-1994",
    "gender":"male"
}*/

const schema = zod.object({
  name : zod.string("name must be string").nonempty("Name is requrid").min(2,"min 2 charctres").max(15,"max 15 charctres"),
  email : zod.email(), 
  password :zod.string().nonempty("password is requird").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"password mus have a small char , a captial char , a number and a spacial char"),
  rePassword  : zod.string().nonempty("rePassword is requird"),
  dateOfBirth :  zod.coerce.date("invalid date").refine(((value)=>{
    return(new Date().getFullYear() -value.getFullYear() >=18?true:false);
  }),"age must be 18 or above").transform((date)=>{return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`}),
  gender : zod.enum(["male","female"],"gender invalid"),
}).refine((value)=>{
  if( value.password === value.rePassword){
    return true
  } 
  return false
},{message :"passwords are not match" , path:["rePassword"]});
// .transform((date) => {
//   return ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()};
// }),
// }).refine((data) => data.password === data.rePassword, {
//   message: "Passwords are not match",
//   path: ["rePassword"], // 👈 كده الغلط هيظهر عند rePassword
// });
export default function Register() {    
 let navigate = useNavigate();
 let [isLodaing , setIsLoaging] = useState(false);
 let [sucessMessage , setSucessMessage] = useState(null);
 let [erorrMessage , setErorrMessage] = useState(null);

    let {handleSubmit , register , formState , setError , watch , getValues } =useForm({
      defaultValues:{
        name: "",
        email:"",
        password:"",
        rePassword:"",
        dateOfBirth:"",
        gender:"",
      },
      mode : "onBlur",
      resolver : zodResolver(schema)
    });
     function myHandelSubmit(data){
      if(erorrMessage){setErorrMessage(null)};
      if(sucessMessage){setSucessMessage(null)};
      setIsLoaging(true);
      console.log(data);

    //  let {data1} = await axios.post("https://linked-posts.routemisr.com/users/signup",data)
    //   console.log(data1);

       axios.post("https://linked-posts.routemisr.com/users/signup",data)
       .then((sucess)=>
        {
          // console.log(sucess.data.message);
          // setIsLoaging(false);
          setSucessMessage(sucess.data.message);
          setErorrMessage(null)
          setTimeout(()=>{setSucessMessage(null);navigate("/login");},2000)
        })
       .catch((erorr)=>
        {
          // console.log(erorr.response.data.error)
          // setIsLoaging(false);
          setErorrMessage(erorr.response.data.error);
          setSucessMessage(null);
          setTimeout(()=>{setErorrMessage(null)},3000);
        }).finally(()=>{
          setIsLoaging(false);
        });
      
    }
  return (

    <>
    <Helmet>
      <title>register</title>
    </Helmet>

    <div className=" min-h-screen flex justify-center items-center   py-10">
    <div className='w-[90%] mx-auto md:w-1/2 border border-black dark:border-white rounded-2xl shadow-2xl py-3 mt-10 '>
       <div className="">
          <h1 className=' text-center text-3xl font-bold dark:text-blue-300 text-blue-500'>Register</h1>
          <div className='login'>
          <h2 className='text-center pt-4 text-2xl font-bold text-blue-500'>creat new account   </h2>
       </div>
    <form  onSubmit={handleSubmit(myHandelSubmit)} className=" mx-auto px-4" >
    {sucessMessage && <div className="w-full py-1 border border-green-500 text-center text-green-500 rounded-lg my-1 text-lg">{sucessMessage}</div>}
    {erorrMessage && <div className="w-full py-1 border border-red-500 text-center text-red-500 rounded-lg my-1 text-lg">{erorrMessage}</div>}
      <div className="mb-2">
        <label htmlFor="name" className="block  text-sm font-medium text-blue-500 ">Your Name</label>
        <input {...register('name' ,
       //  {
        //   maxLength :{
        //     value:15,
        //     message : "max length is 15 characters"
        //   },
        //   minLength:{
        //     value:2,
        //     message : "min length is 2 characters"
        //   },
        //   required :{
        //     value : true,
        //     message :"name is requrid"
        //   }
        // }
        )} type="text" id="name" placeholder="Name..." className=" placeholder:!text-blue-500 dark:text-white bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
        {formState.errors.name && formState.touchedFields.email && <p className='text-red-500 border-2 rounded-md py-1 mt-1 text-center'>{formState.errors.name.message}</p>}
      </div>
      
      <div className="mb-2">
        <label htmlFor="email" className="block  text-sm font-medium text-blue-500">Your email</label>
        <input {...register("email" , 
        // {
        //   // pattern:{
        //   //   value : /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
        //   //   message : "this is not requrid",
        //   // },
        //   required :{
        //     value : true,
        //     message :"email is requrid"
        //   },
        //   validate : (value)=>{
        //     if(value.includes("@")){
        //       return true;
        //     }
        //     return "email must include @";
        //   }
        // }
        )} type="email" id="email" className=" placeholder:!text-blue-500 dark:text-white bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..."  />
        {formState.errors.email && formState.touchedFields.email && <p className='text-red-500 border-2 rounded-md py-1 mt-1 text-center'>{formState.errors.email.message}</p>}
      
      </div>
      
      <div className="mb-2">
        <label htmlFor="password" className="block  text-sm font-medium text-blue-500">Your password</label>
        <input {...register("password" ,
        //  {
        //   required : {
        //     value:true,
        //     message : "Password is requrid",
        //   }

        //   // pattern :{
        //   //   value : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        //   //   message : "this is not support",
        //   // }
        // }
        )} type="password" id="password" placeholder="Password..." className=" placeholder:!text-blue-500 dark:text-white bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
        {formState.errors.password && formState.touchedFields.password && <p className='text-red-500 border-2 rounded-md py-1 mt-1 text-center'>{formState.errors.password.message}</p>}
      
      </div>
      
      <div className="mb-2">
        <label htmlFor="rePassword" className="block  text-sm font-medium text-blue-500">repassword</label>
        <input {...register("rePassword" , 
        // {
        //   required : {
        //     value:true,
        //     message : "rePassword is requrid",
        //   },
        //   validate :function(value){
        //     if(getValues("password") == value ){
        //       return true;
        //     }
        //     // console.log(getValues("dateOfBirth").getFullYear);
        //     console.log(value);
            
        //     return "password is not match";

        //   }
        // }
        )} type="password" id="rePassword" placeholder="rePassword..." className=" placeholder:!text-blue-500 dark:text-white bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
        {formState.errors.rePassword && formState.touchedFields.rePassword && <p className='text-red-500 border-2 rounded-md py-1 mt-1 text-center'>{formState.errors.rePassword.message}</p>}

      </div>

      <div className="mb-2">
        <label htmlFor="dateOfBirth" className="block  text-sm font-medium text-blue-500">date</label>
        <input {...register("dateOfBirth" ,
        // {
        //   valueAsDate : true,
        //   validate : function (value){
        //     if(new Date().getFullYear() -value.getFullYear() >=18 ){
        //       return true;
        //     }
        //     return "you must have more than 17 years";
        //   },
        //   required : {
        //     value:true,
        //     message : "Date is requrid",
        //   }
        // }
        )} type="date" id="dateOfBirth"  className=" placeholder:!text-blue-500 dark:text-white bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
        {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth && <p className='text-red-500 border-2 rounded-md py-1 mt-1 text-center'>{formState.errors.dateOfBirth.message}</p>}
      
      </div>

      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input {...register("gender" ,
          //  {
          //   required :{
          //     value:true,
          //     message : "gender is requrid!!!",
          //   }
          // }
          ) } value={"male"} id="male" type="radio" name='gender'  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
        </div>
        <label htmlFor="male" className="ms-2 text-sm font-medium text-blue-300 dark:text-white">Male</label>
      </div>

      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input {...register("gender")} value={"female"} id="female" type="radio" name='gender'  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
        </div>
        <label htmlFor="female" className="ms-2 text-sm font-medium text-blue-300 dark:text-white">Female</label>
      </div>
        {formState.errors.gender && formState.touchedFields.gender && <p className='text-red-500 border-2 rounded-md py-1 mt-1 text-center'>{formState.errors.gender.message}</p>}
      
      



      

      <button  type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
         {isLodaing ? <SyncLoader color='white' size={11} />: "Submit"} </button>

    </form>


           </div>
    </div>

    </div>
    </>
  )
}
