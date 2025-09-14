import { Dropdown, DropdownItem } from "flowbite-react";
import React, { useContext, useId } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { authContext } from "../../contextComponent/authContext/AuthContext";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function PostHeader({userImg , userName , date , PostUserId=undefined , postId }) {
  
  let {userId} = useContext(authContext);

  let quaryClient = useQueryClient();

  function deletePost() {

    return axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`,{
      headers:{
        token : localStorage.getItem("tok")
      }
    })
  }

  let {isPending , mutate} =useMutation({
    mutationFn : deletePost,
    onSuccess :()=>{},
    onError :()=>{},
    onSuccess:()=>{
      quaryClient.invalidateQueries(["getUserPosts", userId]);
    }
  })


  return (
    <>
       <div className={`post-header flex justify-between items-center p-3 border-b border-b-gray-400` } >
        <div className="left-part flex items-center w-1/2 ">
          <img className="w-10 h-10 rounded-full " src={userImg} alt="" />
          <div className="info ps-3">
            <h5>{ userName}</h5>
            <p>{ date.split("-",2).join(" ")}</p>
          </div>
        </div>
        <div className="right-part ">
          
          { PostUserId === userId ? 
           <Dropdown className="p-0  !border-0  !bg-transparent text-black" label={<HiDotsHorizontal  className="cursor-pointer" fontSize={30} />}size="xs" dismissOnClick={true}>
              <DropdownItem onClick={mutate} className=" !text-blue-600 bg-white hover:!text-white hover:!bg-blue-600">Delete</DropdownItem>
              <DropdownItem className=" !text-blue-600 bg-white hover:!text-white hover:!bg-blue-600">Update</DropdownItem>
            </Dropdown>
          :<HiDotsHorizontal  className="cursor-pointer" fontSize={30} />  
          }
            {/* <HiDotsHorizontal  className="cursor-pointer" fontSize={30} /> */}

        </div>


      </div> 
    </>
  );
 
}
