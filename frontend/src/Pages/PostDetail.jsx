import React,{useContext,useEffect,useState} from 'react'
import PostAuthor from '../component/PostAuthor'
import axios from 'axios';
import { UserContext } from '../context/userContext';
import Loader from '../component/Loader'
import Delete from './Delete'
import { useParams,Link } from 'react-router-dom';
const PostDetail = () => {
  const {id}=useParams();
  const[post,setPost]=useState(null);
  const[creatorId,setCreatorId]=useState(null);
  const[error,setError]=useState(null);
  const[isLoading,setIsLoading]=useState(false);

  const{currentUser}=useContext(UserContext);

  useEffect(()=>{
    const getPost=async()=>{
      setIsLoading(true);
      try {
        const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/post/${id}`)
        // const response=await axios.get(`http://localhost:5000/api/post/${id}`)
        setPost(response.data)
        console.log(response.data);
        setCreatorId(response.data.creator)      
      } catch (error) {
        setError(error);
      }
      setIsLoading(false)
    }
    getPost();
  },[id])
  

  if(isLoading){
    return <Loader/>
  }
  if (!post) {
    return <section>Post not found</section>;
  }
  return (
    
      <section >
      <div className='container postdetail__container'>
      <div className="postdetail__header">
        <PostAuthor id={post.creator} createdAt={post.createdAt} />
        {currentUser?.id === post?.creator&&
        <div className='postdetail__header__btn'>
        <Link to={`/post/${post?._id}/edit`} className="btn btn-sm">Edit</Link>
        <Delete postid={post._id}/>
       
        </div>}
      </div>
      <h2 className="blog__title">{post.title}</h2>
      <div className="postdetail__image">
      <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" /></div>
      <p dangerouslySetInnerHTML={{ __html: post.description }} ></p>
      </div>
    </section>
  )
}

export default PostDetail