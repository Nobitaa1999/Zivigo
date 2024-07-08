import React, { useState,useEffect,useContext } from 'react'
import {Link, useNavigate,useLocation, useParams} from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'

const Delete = ({postid}) => {
  

  const navigate=useNavigate();
  const location =useLocation();
  const{currentUser}=useContext(UserContext);
  const token =currentUser?.token;
  

  useEffect(()=>{
    if(!token){
      navigate('/login');
    }
  },[])

  const removePost=async()=>{
    try {
      
      const response=await axios.delete(`${process.env.REACT_APP_BASE_URL}/post/${postid}`,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
      
      if(response.status==200){
        if(location.pathname==`/mypost/${currentUser.id}`){
          navigate(0)
        }
        else
        navigate('/')
      }
      
    } catch (error) {
      console.log("couldn't delete post");      
    }
  }

  return (
    <Link className="btn btn-sm" onClick={removePost}>Delete</Link>
  )
}

export default Delete