import React from 'react'
import PostAuthor from '../component/PostAuthor'
import { Link } from 'react-router-dom';


const PostItem = (props) => { 
    const{_id,thumbnail,title,description,category,creator,createdAt}=props.item;
    const sortdesc=description&&description.length<145?description:(description ? description.slice(0, 145) + '...' : '');
    const sorttitle=title.length<30?title:title.slice(0,30)+'...';

  return (
    <div className='postitem posthover'> 
        <div className="postitem__pic">
        <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt="" />
        </div>
        <div className="postitem__containt">
            <Link to={`/post/${_id}`} >{sorttitle}</Link>
            <p dangerouslySetInnerHTML={{__html:sortdesc}}/>
        </div>
        <div className="postitem__footer">
            <PostAuthor id={creator} createdAt={createdAt}/>
            <Link to={`/posts/categories/${category}`} className='btn'>{category}</Link>
        </div>

    </div>
  )
}

export default PostItem