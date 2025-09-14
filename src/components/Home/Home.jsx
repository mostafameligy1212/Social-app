import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from '../Post/Post';
import { FadeLoader, MoonLoader } from 'react-spinners';
import LoaderBage from '../loaderBage/loaderBage';
import { useQuery } from '@tanstack/react-query';
import Commentdasign from '../Comment/Commentdesign';
import CreatPost from '../CreatPost/CreatPost';
import MyInfo from '../MyInfo/MyInfo';
import { Helmet } from 'react-helmet';
export default function Home() {
  
  // let [allPosts , setAllPosts] =useState(null);

  // function getAllPosts(){
  //   axios.get(`https://linked-posts.routemisr.com/posts?limit=30`, {
  //     headers :{
  //       token : localStorage.getItem("tok"),
  //     }
  //   })
  //   .then((response)=>{
  //     console.log(response.data.posts  );
  //     setAllPosts(response.data.posts)
      
  //   })
  //   .catch((erorr)=>{
  //     console.log("Erorr" , erorr); 
  //   })
  //   .finally(()=>{
  //   });
  // }
  // useEffect(()=>{
  //   getAllPosts()
  // } , [])
  function getAllPosts(){
    return axios.get("https://linked-posts.routemisr.com/posts" , {
      headers : {
        token : localStorage.getItem("tok")
      }
    })
  }
  let {data , isLoading , isError , isFetching , error} =  useQuery({
    queryKey : ["getPosts"],
    queryFn : getAllPosts ,


  })
  // console.log("data" , data);
  
  
  // if(isLoading){
  //   return <LoaderBage/>
  // }
  if(isError){
    return <div className='text-3xl h-screen flex justify-center items-center'><p>{error.message}</p></div>
  }
  
  let commentsRender= [];
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
    {isLoading ? <LoaderBage/>:
    <>
    <MyInfo/>
    <div className=' pb-3 md:pt-15   '>
      <div className="posts min-h-screen mx-2  md:w-2/4 lg:w-1/3  md:mx-auto flex justify-center items-center  flex-col  ">
      
      <CreatPost/>

        {
          data?.data.posts.map((post , index)=>{
             commentsRender= [post.comments[0]];
             
            //  console.log( post.comments[0]?.commentCreator.name);
            return <Post   id={post.id} date={post.createdAt} userImg={post.user.photo} PostUserId={post.user._id} userName={post.user.name} body={post.body} img={post.image}  key={post._id}>
                {
                  commentsRender[0] &&
                  <Commentdasign commentId={post.comments[0]?._id} showlink={true} key={post.comments[0]?._id}  commentUserId={post.comments[0]?.commentCreator._id} id={post.id} name={post.comments[0]?.commentCreator.name}  createdAt={post.comments[0]?.createdAt.split("-",2).join("-")} content={post.comments[0]?.content}  />
                  
                }
                
              </Post>
            
            
          })
        }
      </div>
    </div>
        </>
    }


    </>
  )
}
