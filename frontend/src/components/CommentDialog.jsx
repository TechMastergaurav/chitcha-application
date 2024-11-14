import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { MoreHorizontal, MoreHorizontalIcon, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

function CommentDialog({open,setOpen}) {
  const [text,setText] = useState("");
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if(inputText.trim()){
      setText(inputText)
    }else{
      setText("")
    }
  }
  const sendMessageHandler = async() => {
   alert(text);
  }
  return (
   <Dialog open={open}>
    <DialogContent onInteractOutside={()=>setOpen(false)} className="max-w-5xl p-0 flex flex-col">
      <div className='flex flex-1'>
      <div className='w-1/2'>
      <img className='w-full h-full object-cover rounded-lg'
      src="https://images.unsplash.com/photo-1720048169707-a32d6dfca0b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      />
      </div>
    
      <div className='w-1/2 flex flex-col justify-between'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-3 items-center'>
          <Link>
          <Avatar>
            <AvatarImage/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          </Link>
       <div>
        <Link className='font-semibold text-sx'>username</Link>
        {/* //<span className='text-gray-600'>Bio here...</span> */}
       </div>
          </div>
          <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className='cursor-pointer m-2'/>
          </DialogTrigger>
          <DialogContent className='cursor-pointer items-center text-center text-sm'>
            <div className='cursor-pointer w-full text-[#ED4956] font-bold'>
              Unfollow
            </div>
            <div className='cursor-pointer w-full'>
              Add to favorite
            </div>
          </DialogContent>
          </Dialog>
        </div>
        <hr/>
        <div className='flex-1 overflow-y-auto max-h-96 p-4'>
          Comment aayenge
        </div>
        <div className='p-4'>
          <div className='flex items-center gap-2'>
            
            <input type="text" value={text} onChange={changeEventHandler} placeholder='Add a comment' className='w-full outline-none border border-gray-300 p-2 rounded'/>
            <Button disabled={!text.trim()}onClick={sendMessageHandler}variant="outline">Send</Button>
          </div>
        </div>
      </div>
      </div>
     
    </DialogContent>
   </Dialog>
  )
}

export default CommentDialog