import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { MdEmojiEvents, MdGroups2, MdSaveAlt } from "react-icons/md";
import { GiLoveLetter } from "react-icons/gi";
import { FaApplePay } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Dropdown, DropdownItem } from 'flowbite-react';


export default function MyInfo() {

    function getMyData(){
        return axios.get("https://linked-posts.routemisr.com/users/profile-data" , {
            headers:{
                token:localStorage.getItem("tok"),
            }
        })
    }

   let {data , error , isError , isPending} = useQuery({
        queryKey:['myInfo'],
        queryFn:getMyData,
    })
    let myData = data?.data.user;
    
  return (
    <div className=' rounded-lg pt-15 w-full px-2 mx-auto md:w-1/5 m-3  md:fixed'>
      <div className='inner bg-white  mx-auto rounded-lg'>
        <div className='my-img w-1/5 md:w-1/2 mx-auto relative '>
            <img src={myData?.photo} alt="myPhoto" className='block w-full rounded-full' />
        </div>
        <div className='my-info  p-4'>
        <p className=' '>{myData?.name}</p>
        <p className=' text-gray-500 '> cairo , cairo</p>
        <p className=' '> join us at {myData?.createdAt.split("-", 2).join("-")}</p>
        <p> نحن قوم أعزنا الله بالإسلام فإن ابتغينا العزه بغيره أذلنا الله 💚 free palestine</p>

        </div>
      </div>
      <div className='mt-2 bg-white rounded-lg p-3 hidden md:block'>
        <p className='flex justify-between items-center px-1 cursor-pointer'>Profile viewers <span className='text-blue-600 hover:underline'>55</span></p>
        <p className='flex justify-between items-center px-1 cursor-pointer'>Post impressions <span className='text-blue-600 hover:underline'>2000</span></p>
      </div>  
    <div className='mt-2 bg-white rounded-lg p-3 hidden md:block'>
        <p className='flex justify-between items-center px-1 cursor-pointer text-sm'>Unlock Premium tools & insights</p>
        <p className='flex  items-center px-1 cursor-pointer hover:underline'><FaApplePay    className='text-yellow-500 mx-2' size={30}/> try Premium for 0$ </p>
      </div>  
      <div className='mt-2 bg-white rounded-lg p-3 hidden md:block'>

        <p className='flex items-center px-1 pt-2'>saver items <MdSaveAlt size={20} className='ms-2 cursor-pointer'/></p>
        <p className='flex items-center px-1 pt-2'>groups  <MdGroups2 size={20} className='ms-2 cursor-pointer' /></p>
        <p className='flex items-center px-1 pt-2'>letters <GiLoveLetter size={20} className='ms-2 cursor-pointer' /> </p>
        <p className='flex items-center px-1 pt-2'>events <MdEmojiEvents size={20} className='ms-2 cursor-pointer' /></p>
      </div>
          
    </div>
  )
}
