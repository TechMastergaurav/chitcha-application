import { Input } from './ui/input'
import { Button, buttonVariants } from './ui/button'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const signUpHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:8000/api/v1/user/register", input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCrendentials: true
            })
            if (res.data.success) {
                navigate("/login")
                toast.success(res.data.message)
                setInput({
                    username: "",
                    email: "",
                    password: "",
                })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='flex items-center w-screen h-screen justify-center'>
            <form onSubmit={signUpHandler} action="" className='shadow-lg flex flex-col gap-5 p-8'>
                <div className='my-4'>
                    <h1 className='text-center font-bold text-xl'>ChitChat</h1>
                    <p className='text-sm text-center ' >Signup to See Photos And Videos of Your Friend</p>
                </div>
                <div className='text-left'>
                    <span className='font-medium'>Username</span>
                    <Input
                        type="text"
                        name="username"
                        value={input.username}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"

                    />
                    <span className='font-medium'>Email</span>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"

                    />
                    <span className='font-medium'>Password</span>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"

                    />
                </div>
                {
                    loading?(
                    <Button>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                        Please wait
                    </Button>
                    ):(
              <Button type="submit">Signup</Button>
                    )
                }
                
                <span className='text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link> </span>
            </form>
        </div>
    )
}

export default Signup