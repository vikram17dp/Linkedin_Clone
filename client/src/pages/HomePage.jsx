import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from '../lib/axois.js';
import Sidebar from '../components/Sidebar.jsx';
export default function HomePage() {
    const {data:authUser} = useQuery({queryKey:["authUser"]});
    const {data:recommendedUsers} = useQuery({
        queryKey:["recommendedUsers"],
        queryFn:async()=>{
            const res = await axiosInstance.get('/users/suggesutions');
            return res.data;
        }
    })  
    const {data:posts} = useQuery({
        queryKey:["posts"],
        queryFn:async()=>{
            const res = await axiosInstance.get('/posts');
            return res.data
        }
    })

    console.log("recommendedUsers",recommendedUsers);
    console.log("posts",posts);
    
    

   
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
    <div className='hidden lg:block lg:col-span-1'>
        <Sidebar user={authUser} />
    </div>

    </div>
  )
}
