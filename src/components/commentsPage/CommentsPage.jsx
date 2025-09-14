import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import LoaderBage from '../loaderBage/loaderBage';
import Post from '../Post/Post';
import { is } from 'zod/locales';
import Commentdasign from '../Comment/Commentdesign';

export default function CommentsPage() {
  
  let {id} =useParams();
  // console.log( "id", id);
  function getSingelPost(){
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
      headers: {
        token : localStorage.getItem("tok"),
      }
    })
  }
  let {data , isLoading , isError , error } = useQuery({
    queryKey :[`getPost` , id],
    queryFn : getSingelPost,
    
  })
  // console.log("data", data?.data.post);
  // console.log("isLoading", isLoading);
  // console.log("isError", isError);
  // console.log("error", error);
  let post = data?.data.post;
  let commentsReversed = structuredClone(post);
  // console.log(post);
  
      

  if(isLoading){
    return <LoaderBage/>
  }
  if(isError)
  {
    <div className='h-screen w-screen flex justify-center items-center'><p>error 404</p></div>
  }

  return (<>
      
        <div className=" mx-2  md:w-3/4 lg:w-1/3  md:mx-auto mt-11">

          <Post PostUserId={post?.user._id} key={post?.id} id={post?.id} body={ post?.body} img={post?.image} userImg={post?.user.photo} userName={post?.user.name} date={post?.createdAt.split("-" , 2).join("-")}>
            {
              commentsReversed?.comments.map((comment , index)=>{
                // console.log(index);
                return <Commentdasign commentId={post.comments[index]?._id} commentUserId={post.comments[index]?.commentCreator._id} key={comment._id} name={comment.commentCreator.name} content={comment.content} createdAt={comment.createdAt.split("-" , 2).join("-")} id={comment._id} showlink={false}/>
              })
            }
            </Post>
        
        </div>
        
      
      </>
  
  )
}
