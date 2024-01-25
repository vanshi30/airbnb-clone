import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const registerUser = async(e) =>{
        e.preventDefault();
        try{
          await axios.post('/register',{name,email,password})
          // alert("DONE")
          toast.success("Registration successful", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Slide,
          });
        }catch(e){
          // alert("NOT DONE")
          toast.warn('Registration failed', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Slide,
            });
        }

    }
  return (

    <>
     <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition:Slide
      />
      
      <ToastContainer />
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
       <h1 className='text-4xl text-center mb-4'>Register</h1>
       <form className='max-w-md mx-auto' onSubmit={registerUser}>
        <input type="text" className='hover:shadow-lg' placeholder='Enter your name' value={name} onChange={e=>setName(e.target.value)} />
        <input type="email" className='hover:shadow-lg' placeholder="your@gmail.com" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input type="password" className='hover:shadow-lg' placeholder='password' value={password} onChange={e=>setPassword(e.target.value)}/>
        <button className='primary mt-4'>Register</button>
        <div className="text-center py-2 text-gray-500">
        Already a member? <Link className="underline text-black hover:text-primary" to={'/login'}>Login</Link>
          </div>
       </form>
      </div>
    </div>
  </>
  )
}

export default RegisterPage