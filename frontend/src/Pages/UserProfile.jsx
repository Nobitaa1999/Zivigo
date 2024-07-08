import React, { useState,useContext,useEffect } from 'react'

import { Link,useNavigate } from 'react-router-dom'
import { FaEdit,FaCheck } from "react-icons/fa";
import { UserContext } from '../context/userContext';
import axios from 'axios';

const UserProfile = () => {
  const [avatar, setAvatar] = useState('');
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[newPassword,setNewPassword]=useState('');
  const[conformPassword,setConformPassword]=useState('');
  const[isAvatarTouched,setIsAvatarTouched]=useState(false);
  const[error,setError]=useState('')
  const navigate=useNavigate();
  const{currentUser}=useContext(UserContext)
  const token=currentUser?.token;

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

  useEffect(()=>{
    const getUser=async()=>{
      const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${currentUser.id}`,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
      const{name,email,avatar}=response.data;
      setName(name)
      setEmail(email)
      setAvatar(avatar)

    }
    getUser()
  },[])

  const changeAvatarHandle=async()=>{
    setIsAvatarTouched(false);
    try {
      const postData=new FormData();
      postData.set('avatar',avatar)
      const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/user/change_avatar`,postData,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
      setAvatar(response?.data.avatar)
    } catch (error) {
      console.log(error);
    }
  }

  const updateUserDetail=async(e)=>{
    e.preventDefault();
    try {
      const userData=new FormData();
      userData.set('name',name)
      userData.set('email',email)
      userData.set('currrentPassword',password)
      userData.set('newPassword',newPassword)
      userData.set('confirmNewPassword',conformPassword)
      const response=await axios.patch(`${process.env.REACT_APP_BASE_URL}/user/edit-userInfo`,userData,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}}) 
      if(response.status==200){
        navigate('/logout')
      }
    } catch (err) {
      setError(err.response.data.message)      
    }
  }


  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/mypost/${currentUser.id}`} >My Post</Link>

        <div className="profile_detail">

          <div className="avatar_wrapper">
            <div className="profile_avatar">
              <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt="avatar_img" />
            </div>
            <form action="" className="form_avatar">
              <input type="file" name="avatar" id="avatar" onChange={e => setAvatar(e.target.files[0])} accept="jpg,png,jpeg" />
              <label htmlFor="avatar" onClick={()=>setIsAvatarTouched(true)}>
                <FaEdit />
              </label>
            </form>

            {isAvatarTouched && <button className='profile_avatar_btn' onClick={changeAvatarHandle} ><FaCheck/></button>}
          </div>

          <h2 className="profile_avatar-name">{currentUser.name}</h2>
          <form  className="form profile_form" onSubmit={updateUserDetail}>
            {error && <p className="error-form_registation">{error}</p>}
            <input type="text" placeholder='full name' value={name} onChange={e=>setName(e.target.value)} />
            <input type="mail" placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} />
            <input type="password" placeholder='New Password' value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
            <input type="password" placeholder='Conform Password' value={conformPassword} onChange={e=>setConformPassword(e.target.value)} />
            <button className='btn primary' >Update my detail</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile