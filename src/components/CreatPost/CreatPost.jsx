import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export default function CreatPost() {
   let [modelState , setModelState] = useState(false);
   let [imgePreview , setImgePreview] = useState(null);

   
   let isImgPreview = !!imgePreview;

  let captianCreatPost = useRef(null);
  let imgInput = useRef(null);
  let quaryClient = useQueryClient();  

//   console.log(captianCreatPost.current.value );
  
   
  let {mutate , isPending , isError} = useMutation({
    mutationFn : handelCreatePost,
    onSuccess :(data)=>{
        handelCloseBtn();
        quaryClient.invalidateQueries(["getPosts"])
        toast.success("sucess post")
    } ,
    onError :(err)=>{
        console.log(err);
        toast.error("somthing error")
    } ,
   });


  function handelImgPrewiew(e){
    // console.log("img"  , e.target.files?.[0]); 
    const url = URL.createObjectURL(e.target.files?.[0]);
    setImgePreview(url)
    console.log(imgePreview);
    

  }
  function handelCloseBtn(){
    setModelState(false);
    setImgePreview(null);
    captianCreatPost.current.value = "";

  }

  function handelCreatePost(){

    let formData = new FormData();    
    if(imgInput.current.files?.[0])
    {
        formData.append("image" , imgInput.current.files[0])
    }
    if(captianCreatPost.current.value)
    {
        formData.append("body" , captianCreatPost.current.value);
    }
    
    return axios.post("https://linked-posts.routemisr.com/posts" , formData,{
        headers :{
            token : localStorage.getItem("tok")
        }
    })
  }

  function handeClearImgPreviewr(){
    setImgePreview(null);
    imgInput.current.value = ""
  }

  return (
    <>
    <button onClick={()=>{setModelState(true)}} type="button" className={`${modelState==true ? "hidden":""}  cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}>add post</button>
    <div className={`${modelState==false ? "hidden":" "}  backdrop-blur-3xl fixed inset-0 flex justify-center items-center z-20`}>
        <div className={`${modelState==false ? "hidden":" "} max-h-screen backdrop-blur-sm w-full md:w-1/2 lg:w-1/3  bg-white rounded-xl z-10  p-3 text-center `} >
            <div className='flex justify-between  items-center py-2'>
                <h1 className='text-xl font-bold'>add Post</h1>
                <IoMdClose onClick={handelCloseBtn}  className='cursor-pointer' fontSize={30}/> 
            </div>
            <div className="mb-6  w-full py-3">
                <input  ref={captianCreatPost}  placeholder=' enter your description' type="text" id="default-input" className="py-4 bg-gray-50  border-2  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            
            <div className="flex items-center justify-center w-full relative">
                <div className={`w-full ${imgePreview ? "":"hidden" }`}>
                    <IoMdClose onClick={handeClearImgPreviewr} color='red' className='absolute top-2 right-2 bg-white border-2 cursor-pointer rounded-md' fontSize={30}/>
                    
                    <img src={imgePreview} alt="photo" className='w-full block' />
                </div>
                <label htmlFor="dropzone-file" className={`${imgePreview ? "hidden": ""} flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input ref={imgInput} onChange={(e)=>{handelImgPrewiew(e)}} id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>
            <button disabled={isPending} onClick={mutate}  type="button" className="disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-not-allowed text-white cursor-pointer mt-2 bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                {isPending ?<ClipLoader size={15}/>  : "post"}
            </button>
            <button disabled={isPending} onClick={handelCloseBtn} type="button" className="cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">close</button>
        </div> 
    </div>
    </>
  )
}
