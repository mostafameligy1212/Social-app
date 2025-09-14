
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FileInput, Label } from "flowbite-react";
import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { set } from "zod";

export function UploudPhoto() {
    let[showMyPhoto  , setShowMyPhoto] =useState(null);
    let[showPhotoinput  , setShowPhotoinput] =useState(true);
      let myImgInput = useRef(null);

    // console.log(myPhoto);

    function handelUploudPhoto(){
       let formData = FormData();
       if(myImgInput.current.files?.[0]){
        formData.append("myPhoto" , myImgInput.current.files?.[0])
       }
        return axios.put(`https://linked-posts.routemisr.com/users/upload-photo` , {} , {
            headers:{
                token:localStorage.getItem("tok")
            }
        })
    }

    let {mutate ,isPending , isError} = useMutation({
        mutationFn : handelUploudPhoto,
        mutationKey : ['my photo'],
        onSuccess : (data)=>{
            
            handelclosebutton();
            toast.success('sucess');
        },
        onError : (error)=>{
            console.log(error);
            toast.error("somthing erorr try again")
        }
    });

    function handelImge(e){
        
        const url = URL.createObjectURL(e.target.files?.[0]);
        setShowMyPhoto(url)
    }
    function handelclosebutton(){
        myImgInput.current.value ="";
        setShowMyPhoto(null);
    }
    
  return (
        <>

        <div className=" fixed text-center  top-1/3 right-3 items-center justify-center w-1/4  overflow-hidden ">
         <button onClick={()=>{showPhotoinput ? setShowPhotoinput(false): setShowPhotoinput(true) ;handelclosebutton(); }} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            {
                showPhotoinput ? <p>close</p>:
                 <p>change photo</p>
            }
            
           
            
        </button>
      
      <div className={`${showPhotoinput ? "":"translate-x-full"} transition-all duration-1000`}>
        <IoMdClose onClick={handelclosebutton}  className=' cursor-pointer bg-black dark:bg-white rounded-lg m-1 text-white dark:text-black' fontSize={30}/> 
        
        <img src={showMyPhoto} alt="my photo" className={`rounded-lg w-full block ${showMyPhoto ? "" : "hidden"}`} />

    <label  htmlFor="handelMyPhoto" className={`${showMyPhoto ? "hidden" : ""} flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input ref={myImgInput} onChange={(e)=>{handelImge(e)}} id="handelMyPhoto" type="file" className="hidden" />
        </label>
            
            <button onClick={mutate} type="button" class="cursor-pointer mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">add </button>

      </div>
       
       

        
        </div>


        </>
  );
}
