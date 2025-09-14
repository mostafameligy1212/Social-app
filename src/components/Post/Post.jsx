import React, { useRef, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { IoMdClose, IoMdShareAlt } from "react-icons/io";
import PostHeader from "../PostHeader/PostHeader";
import { Link } from "react-router-dom";
import Commentdasign from "../Comment/Commentdesign";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

export default function Post({  body, img = null, userImg, userName, date, id , PostUserId , children}) {
  let [comment , setComment]=useState("");
  let [layerState , setLayerState] = useState(false);

  let quaryClient = useQueryClient();

  let commetnInputRef = useRef(null);
  // console.log(commetnInputRef.current?.value);
  
  
  function handelInput(){
    const data = {
    content: comment  ,
    post: id  ,
    }
    return axios.post("https://linked-posts.routemisr.com/comments" , data , {
      headers : {
        token : localStorage.getItem("tok"),
      }
    })
  }

 let {mutate , isPending }=  useMutation({
    mutationFn : handelInput,
    onSuccess : (data)=>{
      // console.log("data", data);
      setComment("")
      quaryClient.invalidateQueries([`getPost` , id]);
      toast.success("comment added"  )
      
    },
    onError : (error)=>{
      console.log("erorr" , error);
      toast.error("somthing error")
    },
    onSettled :()=>{
      console.log("done");
    }
  });
  // function handelInput(){
  //   setIsLodaing(true);
  //   const data = {
  //   content: comment  ,
  //   post: id ,
  //   }

  //   axios.post("https://linked-posts.routemisr.com/comments" , data , {
  //     headers : {
  //       token : localStorage.getItem("tok"),
  //     }
  //   }).then((data)=>{
  //     console.log("data",data);
  //     setComment("");
  //   })
  //   .catch((erorr)=>{
  //     console.log("erorr" , erorr);
  //   })
  //   .finally(()=>{
  //     setIsLodaing(false)
  //   })
  // }

  const imgHandel = !!img;
  return (
    <>
      {imgHandel &&
       <div onClick={()=>{setLayerState(false)}} className={` fixed inset-0 ${layerState ? " bg-[#ffffff7d] dark:bg-[#0000007c]" :"hidden" } bg-[#00000007] z-50 flex justify-center items-center`}>
        <div className="w-full rounded-2xl lg:w-3/4  overflow-hidden h-3/4 relative flex justify-center items-center dark:bg-black bg-white">
        <IoClose size={40} onClick={()=>{setLayerState(false)}} className="absolute top-3 right-3 p-1 rounded-lg text-red-500 border border-red-500 cursor-pointer bg-transparent"/>
          <img onClick={(e)=>{e.stopPropagation()}} src={img} alt={body} className="w-full block"  />
        </div>
       </div>
       }
      <div className="Post w-full border border-gray-300 bg-white overflow-hidden   rounded-lg mb-4  ">
        <div className="inner p-3">
          <PostHeader postId={id} userImg={userImg} userName={userName} date={date} PostUserId={PostUserId} />
          <div className="post-content">
            {body && <h3 className="text-center">{body}</h3>}
            {imgHandel && (
              <img
                onClick={()=>{setLayerState(true)}}
                src={img}
                alt={body}
                className="w-full block my-2 rounded-lg cursor-pointer "
              />
            )}
          </div>
          <div className="post-footer flex justify-between px-3 border-t border-t-gray-300 pt-1 ">
            <div className="like">
              <AiOutlineLike fontSize={30} className=" cursor-pointer" />
            </div>
            <div className="comment">
              <FaRegCommentDots fontSize={30} className=" cursor-pointer" />
            </div>
            <div className="share">
              <IoMdShareAlt fontSize={30} className=" cursor-pointer" />
            </div>
          </div>
        </div>

            

        <div className="mx-3 mb-1">
            <div className="relative">

              <input  ref={commetnInputRef} value={comment} onChange={(e)=>setComment(e.target.value)} type="search" id="default-search" className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="set a comment..."  />
              <button disabled={!commetnInputRef.current?.value || isPending} onClick={mutate}  type="submit" className="disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-not-allowed cursor-pointer text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                
                {isPending ? <ClipLoader  size={15} color=" white"/> : "add" }
                
                
              </button>
            </div>
        </div>


        <div className="p-2">
          {children}
         </div>
      </div>
    </>
  );
}
