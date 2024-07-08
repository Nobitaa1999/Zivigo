import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const[userData,setUserData]=useState({
    name:'',email:'',password:'',password2:'',
  })
  const[error,setError]=useState('');
  const navigate=useNavigate();
  const changeHandler=(event)=>{
       event.preventDefault();
       setUserData((pre)=>({
        ...pre,[event.target.name]:event.target.value
       }))
       
  }
  const registerUser=async(e)=>{
    e.preventDefault();
    setError('');
    try {
      
      const response = await axios.post(`http://localhost:5000/api/user/register`,userData);
     
      const newUser=await response.data;
      
      
      if(!newUser){
        setError("Could't register user,Please try again")
      }
      navigate('/login');
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      
      setError(err.response.data.message);      
    }
  }
  
  return (
    <section className='register'>
      <div className="container">
        <h2 className='heading_2nd'>Sign up</h2>
        <form className="form form_registation" onSubmit={registerUser} >
          {error && <p className="error-form_registation">{error} </p>}
          <input type="text" placeholder='Your name' onChange={changeHandler} className='user-name' name='name' value={userData.name} />
          
          <input type="text" placeholder='Email' onChange={changeHandler} className='user-name' name='email' value={userData.email} />
          
          <input type="password" placeholder='Passowrd' onChange={changeHandler} className='user-name' name='password' value={userData.password} />
          
          <input type="password" placeholder='conform passowrd' onChange={changeHandler} className='user-name' name='password2' value={userData.password2} />
          <button className="btn">Register</button>
        </form>
        <small className='login--signup'>allready have an account?<Link to='/login' >log in</Link></small>
      </div>

    </section>
  )
}

export default Register