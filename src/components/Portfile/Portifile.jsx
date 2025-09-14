import React, { useContext } from 'react'
import CreatPost from '../CreatPost/CreatPost'
import axios from 'axios'
import { authContext } from '../../contextComponent/authContext/AuthContext'
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import LoaderBage from '../loaderBage/loaderBage';
import Post from '../Post/Post';
import Commentdasign from '../Comment/Commentdesign';
import MyInfo from '../MyInfo/MyInfo';
import { Dropdown, DropdownItem } from 'flowbite-react';
import { IoSettings } from 'react-icons/io5';
import { Helmet } from 'react-helmet';
import { UploudPhoto } from '../uploudPhoto/UploudPhoto';

export default function Portifile() {
  // console.log(1234);
  let {userId} =useContext(authContext);
  // console.log(userId);
  function getUserPosts(){

      return axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts`,{
         headers:{
           token:localStorage.getItem("tok")
         }
       })
  }
  // console.log(userId);
 let {data, isLoading ,isError , error}= useQuery({
    queryKey : ["getUserPosts", userId],
    queryFn:getUserPosts,
    enabled : !!userId,
  });
  // if(isLoading)
  // {
  //  return <LoaderBage/>
  // }
  if(error)
  {
    return <div className='text-3xl h-screen flex justify-center items-center'><p>{error.message}</p></div>
  }
  
  
  return (
    <>

        <Helmet>
          <title>My Profile</title>
        </Helmet>

        {
          isLoading ? <LoaderBage/>:
          <>
        <MyInfo />
    
        <div className='pb-3 md:pt-15 '>
      <div className="posts min-h-screen mx-2  md:w-2/4 lg:w-1/3  md:mx-auto flex justify-center items-center  flex-col">
    
          <div className="flex justify-center items-center">
                   <CreatPost/>

          </div>
          {
            data?.data.posts.map((post)=>{
              
              if(post.image)
              {
              return <Post img={post.image} key={post._id} userName={post.user.name} userImg={post.user.photo} id={post._id} date={post.createdAt} body={post.body} PostUserId={post.user._id}>
                {
                  post.comments.length > 0 &&
                <Commentdasign commentId={post.comments[0]?._id} key={post._id} commentUserId={post.comments[0]?.commentCreator._id}  content={post.comments[0].content} createdAt={post.comments[0].createdAt} id={post._id} showlink={true} name={post.comments[0].commentCreator.name} />

                }
              </Post>
              }
              return <Post key={post._id} userName={post.user.name} userImg={post.user.photo} id={post._id} date={post.createdAt} body={post.body} PostUserId={post.user._id}>
                  {                
                  post.comments.length > 0 &&
                    <Commentdasign commentId={post.comments[0]?._id} key={post._id} commentUserId={post.comments[0]?.commentCreator._id} content={post.comments[0].content} createdAt={post.comments[0].createdAt} id={post._id} showlink={true} name={post.comments[0].commentCreator.name} />
                  }
              </Post>
            })
          }

      </div>
        </div>
          {/* <UploudPhoto/> */}
          </>
        }


    </>

  )
}
