import React from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios';
import { useRef } from 'react';

import { useStateContext } from '../Contexts/ContextProvider'

export default function login() {
  const emailRef=useRef();
  const passwordRef=useRef()

  const{setUser,setToken}=useStateContext()


  const submit=(e)=>{
e.preventDefault();
const payload={
  email:emailRef.current.value,
  password:passwordRef.current.value
}

axiosClient.post("/login",payload).then(({data})=>{
setUser(data.user);
setToken(data.token)

}).catch(err=>{
  if (err.status===422) {
    console.log(err.data.errors)
  }
})

console.log(payload)
  }
  return (
    <div className='login-signup-form animated fadeinDown'>
        <div className="form">
          <h1 className="title">Login To Your Account</h1>
          <form onSubmit={submit}>
          <input type="email" ref={emailRef} name="" placeholder='Email' id="" />
        <input type="password" ref={passwordRef} name=""placeholder='Password' id="" />
      
      <button className='btn btn-black'>Login</button>
      <p className="message">Don't Have An Account? <Link to='/register'>Create One</Link></p>
          </form>
        </div>
    </div>
  )
}
 