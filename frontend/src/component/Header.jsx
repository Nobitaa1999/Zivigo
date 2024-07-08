import React, { useState,useContext } from 'react'
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { UserContext } from '../context/userContext';

const Header = () => {
  const[navshown,setNavshown]=useState(window.innerWidth>900?true:false);
  const{currentUser}=useContext(UserContext)
  const changeHandler =()=>{
    if(window.innerWidth>900){
      setNavshown(true)
    }else{
      setNavshown(false);
    }
  }
  
  return (
    <nav>
      <div className='container header__container'>
        <Link to="/"><FaHome /></Link>
      
      {currentUser?.id && navshown&&<ul className='header__menu'>
        <li><Link to={`/profile/${currentUser.id}`} onClick={changeHandler} >{currentUser?.name}</Link></li>
        <li><Link to="/authors" onClick={changeHandler} >Authors</Link></li>
        <li><Link to="/create" onClick={changeHandler} >Create</Link></li>
        <li><Link to="/logout" onClick={changeHandler} >Logout</Link></li>
        
      </ul>}
      {!currentUser?.id && navshown&&<ul className='header__menu'>
        <li><Link to="/authors" onClick={changeHandler} >Authors</Link></li>
        <li><Link to="/login" onClick={changeHandler} >Login</Link></li>
        
      </ul>}
      <button className="nav_toggle" onClick={()=>setNavshown(!navshown)}>
      {navshown?<RxCross2/>:<GiHamburgerMenu/>}
      </button>

      </div>

    </nav>

    
  )
}

export default Header