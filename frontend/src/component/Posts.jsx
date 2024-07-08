import React, { useEffect, useState } from 'react'
import PostItem from '../component/PostItem'
import Loader from '../component/Loader'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const Posts = () => {
  const [post, setpost] = useState([]);
  const[isLoading,setIsLoading]=useState(false);
  const[error,setError]=useState(null);
  
  useEffect(()=>{
    const fetchPost=async()=>{
      setIsLoading(true);
      try {
        const responce =await axios.get(`http://localhost:5000/api/post`)
        setpost(responce?.data);
        // console.log('ankue',responce.data);
      } catch (err) {
        setError(err)
        console.log(err)
      }
      setIsLoading(false);
    }
    fetchPost();
  },[])

  if(isLoading){
    return <Loader/>
  }
  if (error) {
    return <h2 className="center">Error fetching posts: {error.message}</h2>;
  }

  return ( 
    <section className="posts">
     {post.length > 0 ? <div className="container post__container">

        {
          post.map((item) => {
            return (<PostItem key={item._id} item={item} />)
          })

        }
      </div> : <h2 className='center'>No post avilable</h2>}
      
    </section>
  )
}

export default Posts

