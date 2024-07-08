import React, { useState,useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/userContext'

const Login = () => {
  const [userData, setUserData] = useState({
    email: '', password: ''
  })

  const [error,setError]=useState('');
  const navigate=useNavigate();
  
  const {setCurrentUser}=useContext(UserContext)

  const changeHandler = (event) => {
    event.preventDefault();
    setUserData((pre) => ({
      ...pre, [event.target.name]: event.target.value
    }))

  }



  const loginUser=async(e)=>{
    e.preventDefault();
    setError("")
    try {
      const response= await axios.post(`http://localhost:5000/api/user/login`,userData)
      const user=await response.data;
      setCurrentUser(user)
      navigate('/')
    } catch (err) {
      console.log(err.response.data.message)
      setError(err.response.data.message)
      console.log(error);
      
    }
  }



  return (
    <section className="login">
      <div className="container">
        <h2 className='heading_2nd'>LogIn</h2>

        <form className="form form_login" onSubmit={loginUser}>
          
          {error && <p className="error-form_registation"> {error} </p>}
          <input type="text" placeholder='email' name="email" value={userData.email} onChange={changeHandler} />
          <input type="password" placeholder='password' name="password" value={userData.password} onChange={changeHandler} />
          <button className="btn">Log IN</button>
        </form>
        <small className='login--signup'>Don't have any account?<Link to='/register'>Signup</Link></small>
      </div>
    </section>
  )
}

export default Login