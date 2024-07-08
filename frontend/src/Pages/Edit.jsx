import React, { useState,useContext,useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate,useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const Edit = () => {
  const [title,setTitle]=useState('');
  const[category,setCategory]=useState('Uncategories');
  const[description,setDescription]=useState('');
  const[thumbnail,setThumbnail]=useState('');
  const[error,setError]=useState('');

  const navigate=useNavigate();
  const{id}=useParams();

    const{currentUser}=useContext(UserContext);
    const token =currentUser?.token;
  
    useEffect(()=>{
      if(!token){
        navigate('/login');
      }
    },[])

  const madules={
    toolbar:[
      [{'header':[1,2,3,4,5,6,false]}],
      ['bold','italic','underline','strike','blockquote'],
      [{'list':'ordered'},{'list':'bullet'},{'indent':'-1'},{'indent':'+1'}],
      ['link','image'],
      ['clean']
    ],
  }

  const formats=[
    'header','bold','italic','underline','strike','blockquote','list','bullet','indent','link','image'
  ]

  const Post_categories=['Agriculture','Business','Education','Entertainment','Art','Investment','Weather']

  useEffect(()=>{
    const getPost=async()=>{
    
    try {
      const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/post/${id}`)
      setTitle(response.data.title)
      setDescription(response.data.description)
    } catch (err) {
      console.log(err);
      
       }
    }

    getPost();
  },[])

  const editPost=async(e)=>{
    e.preventDefault();
    const postData=new FormData();
    postData.set('title',title)
    postData.set('category',category)
    postData.set('description',description)
    postData.set('thumbnail',thumbnail)

    try {
      const response=await axios.patch(`${process.env.REACT_APP_BASE_URL}/post/${id}`,postData,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
      console.log(response.status);
      if(response.status ==200){
        return navigate('/')
      }
    } catch (err) {
      setError(err.response.data.message)
    }
  }
  return (
    <section className="create-post">
      <div className="container create-post_container">
      <h2 className="create-post_heading">Edit Post</h2>
      {error&&<p className="error-form_registation">{error}</p>}
      <form action="" className="create-post_form" onSubmit={editPost}>
      <input type="text" placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} autoFocus />
      <select name="category" value={category} onChange={e=>setCategory(e.target.value)} >
        {
          Post_categories.map(each_cat=> <option key={each_cat} >{each_cat}</option>)
        }
      </select>
      <ReactQuill modules={madules} formats={formats} value={description} onChange={setDescription} />
      <input type="file" onChange={e=>setThumbnail(e.target.files[0])} accept='png,jpg,jpeg' />
      <button type="submit" className="btn">Update</button>
      </form>
      </div>
    </section>
  )
}

export default Edit