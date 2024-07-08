import React, { useState,useEffect,useContext } from 'react'
import { Link ,useNavigate,useParams} from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import Loader from '../component/Loader'
import Delete from './Delete'
const Dashboard = () => {
    const[posts,setPosts]=useState([])
    const[isLoading,setIsLoading]=useState(false);

    const navigate=useNavigate();

    const{currentUser}=useContext(UserContext);
    const token =currentUser?.token;
    const{id}=useParams();
  
    useEffect(()=>{
      if(!token){
        navigate('/login');
      }
    },[])

    useEffect(()=>{
        const fetchPost=async()=>{
            setIsLoading(true);
            try {
                const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/post/author/${id}`,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
                setPosts(response.data)
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }
        fetchPost();
    },[id])
    
    if(isLoading){
        return <Loader/>
    }


  return (
    <section className="dashboard">
        {
            posts.length?<div className='container dashboard__container'>
                {
                    posts.map(post=>{
                        return <div key={post.id} className="dashbosrd_post">
                            <div className="dashboard_post_info">
                                <div className="dashboard_avatar">
                                    <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="avatar" />
                                </div>
                                <div className="dashboard_info_title">
                                    {post.title}
                                </div>
                            </div>
                            <div className="dashboard_post_action">
                                <Link to={`/post/${post._id}`} className='btn post_action_view'>view</Link>
                                <Link to={`/post/${post._id}/edit`} className='btn post_action_edit'>edit</Link>
                                <Delete postid={post._id}/>
                                                               
                            </div>
                        </div>
                    })
                }
            </div>:<h2 className='center' >NOT ANY POST YET</h2>
        }
    </section>
  )
}

export default Dashboard