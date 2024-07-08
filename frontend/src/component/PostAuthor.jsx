import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' 

import axios from 'axios'

const PostAuthor = ({id,createdAt}) => {
  const[author,setAuthor]=useState({});
 
  useEffect(()=>{
    const getAuthor=async()=>{
      try {
        const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${id}`);
        setAuthor(response?.data); 
      } catch (err) {
        console.log(err);
      }
    }
    getAuthor();
  },[])
  // console.log("ank",author)
  const date=new Date(createdAt);
  const fixdate=date.toLocaleDateString();

  return (
    <div className="postauthor">
        <Link to={`/posts/user/${id}`}  >
            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author.avatar}`} alt="author pic" />
            <div className="postauthor__detail">
            <p>by : {author.name}</p>
            <small>{fixdate}</small>
            </div>
        </Link>
     </div>
  )
}

export default PostAuthor