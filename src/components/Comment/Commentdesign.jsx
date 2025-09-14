import React, { use, useContext, useRef, useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { Link } from 'react-router-dom';
import { authContext } from '../../contextComponent/authContext/AuthContext';
import { Dropdown, DropdownItem } from 'flowbite-react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export default function Commentdasign( { commentId,  name , content , createdAt , id , showlink , commentUserId = undefined })
{
 let quaryClient = useQueryClient();
 
   
   let{userId} = useContext(authContext);
  //  console.log(commentId , " " , userId);
  // if(commentUserId === userId){
  //   console.log("true");
  // }
  // else{
  //   console.log("false");
  // }


  function deleteComment(){
    return axios.delete(`https://linked-posts.routemisr.com/comments/${commentId}` , {
      headers:{
        token:localStorage.getItem("tok"),
      }
    })
  }

  let {data , isPending , mutate} = useMutation({
    mutationFn : deleteComment,
    mutationKey : ["deleteMyComments" , commentId],
    onSuccess : ()=>{
      
      quaryClient.invalidateQueries([`getPost` , id])
      console.log("i did it");
    },
  })


  return (
    <>
      {showlink && 
        <div   className='text-white font-bold   text-center'> <Link to={`commentsPage/${id}`}  className='bg-blue-700  w-fit p-2 rounded-2xl border border-blue-600 hover:bg-white hover:text-blue-700 transition-all duration-[1s]'>show all commments</Link></div>
      }
      {
        <div className=' flex justify-between items-center bg-gray-300 py-2 px-1 rounded-md  mt-4' >            
              <div className=' flex justify-center items-center'>
                <img className='w-8 h-8 rounded-full block me-4' src={`https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?w=360`} alt={`${name}`} />
                <div>
                  <p>{name}</p>
                  <p>{createdAt}</p>
                </div>
              </div>
            <div className='flex  justify-center items-center'>
              <div className='comment bg-white border border-gray-400  text-black  mt-1 rounded-2xl text-center p-2'>
                <p>{content}</p>
              </div>
              <div>
                
                { commentUserId === userId ? 
                 <Dropdown className="p-0  !border-0  !bg-transparent text-black" label={<HiDotsHorizontal  className="cursor-pointer" fontSize={30} />}size="xs" dismissOnClick={true}>
                    <DropdownItem onClick={mutate} className=" !text-blue-600 bg-white hover:!text-white hover:!bg-blue-600">Delete</DropdownItem>
                    <DropdownItem className=" !text-blue-600 bg-white hover:!text-white hover:!bg-blue-600">Update</DropdownItem>
                  </Dropdown>
                :<HiDotsHorizontal  className="cursor-pointer" fontSize={30} />  
                }
              </div>
            </div>

           </div> 
      }
           
    </>
  )
}
