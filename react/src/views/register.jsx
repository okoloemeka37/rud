import axiosClient from '../axios';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider'

export default function register() {

  const nameRef=useRef();
  const emailRef=useRef();
  const passwordRef=useRef();

const{setUser,setToken}=useStateContext()

  const submit=(e)=>{
e.preventDefault();

const payload={
  name:nameRef.current.value,
  email:emailRef.current.value,
   password:passwordRef.current.value,
}
  axiosClient.post('/register',payload).then(({data})=>{
  setUser(data.user);
  setToken(data.token);
  
  }).catch(err=>{
    const response=err.response;
    if (response && response.status===422) {
      console.log(response.data.errors)
    }
  });

  }
  return (
    <div className='login-signup-form animated fadeinDown'>
        <div className="form">
          <h1 className="title">Create An Account</h1>
          <form onSubmit={submit}>
            <input type="text" ref={nameRef} placeholder='Name' />
          <input type="email" ref={emailRef} placeholder='Email'/>
        <input type="password" ref={passwordRef} placeholder='Password'/>
      
      <button className='btn btn-black'>Register</button>
      <p className="message">Have An Account? <Link to='/login'>Login</Link></p>

      
          </form>
        </div>
    </div>
  )
}
 