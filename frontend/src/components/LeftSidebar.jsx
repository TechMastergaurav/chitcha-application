import { Heart, Home, LogOut, MessageCircle, PlusIcon, PlusSquare, Search, TrendingUp } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils" 
import axios from 'axios'
import CreatePost from './CreatePost'

import React, { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import store from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'


function LeftSidebar() {
    const navigate = useNavigate()
    const {user} = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const[open,setOpen] = useState(false);
    const logoutHandler = async() => {
        try{
        const res = await axios.get('http://localhost:8000/api/v1/user/logout',{withCredentials:true});
        if(res.data.success){
          dispatch(setAuthUser(null))
          navigate("/login");
          toast.success(res.data.message)
        }
        }catch(error){
            toast.error(error.response.data.message)
        }
    }
    const sidebarHandler = (textType) => {
        if(textType === 'Logout') {
          logoutHandler()
        }else if(textType === 'Create'){
           setOpen(true)
        }
    }
    const sidebarItems = [
      { icon:<Home/>,text:"Home"},
      { icon:<Search/>,text:"Search"},
      { icon:<TrendingUp/>,text:"Explore"},
      { icon:<MessageCircle/>,text:"Messages"},
      { icon:<Heart/>,text:"Notifications"},
      { icon:<PlusSquare/>,text:"Create"},
      { icon:(<Avatar className='w-6 h-6'>
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        ),text:"Profile"},
      { icon:<LogOut/>,text:"Logout"},
  ]
  return (
  <div className='fixed top-0 z-10 left-0 px-6 border-r border-gray-300 W-[16%] h-screen'>
    <div className='flex flex-col'>
    <h1 class="text-5xl font-semibold bg-gradient-to-r from-[#ffafbd] via-[#ffc3a0] to-[#ff7e5f] bg-clip-text text-transparent drop-shadow-sm">
  ChitChat
</h1>
        <div>
    {
    sidebarItems.map((item,index)=>{
      return(
        <div onClick={()=>sidebarHandler(item.text)}key={index} className='flex items-center gap-4 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
            {item.icon}
            <span>{item.text}</span>
            </div>
      )
    })
  }
  </div>
    </div>
 <CreatePost open={open} setOpen={setOpen} />
  </div>
  )
}

export default LeftSidebar