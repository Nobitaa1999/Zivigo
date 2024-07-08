import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Loader from '../component/Loader';


const Author = () => {
  const[authors,setAuthors]=useState([]);
  const[isLoading,setIsLoading]=useState(false);

  useEffect(()=>{
    const getAuthor=async()=>{
      setIsLoading(true);
      try {
        const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/user`)
        setAuthors(response?.data)
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false)
    }
    getAuthor()
  },[])

  if (isLoading){
    return <Loader/>
  }

  return (
    <section className="author_card">
      {authors.length>0?<div className="container author_post">
        {
          authors.map((item)=>{
            return <Link key={item._id} to={`/posts/user/${item._id}`} className='author'>
              <div className="author_avatar">
                <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${item.avatar}`} alt={`img of ${item.name}`} />
              </div>
              <div className="author-author_detail">
                <p className="author_name">{item.name}</p>
                <p className="authot_post">{item.post}</p>
              </div>
            </Link>
          })
        }
      </div>:<h2>no author loging</h2>

      }
    </section>
  )
}

export default Author