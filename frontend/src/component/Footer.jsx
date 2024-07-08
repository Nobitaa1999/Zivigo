import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <ul className=" footer__container container">
        <li><Link to="/posts/categories/Agriculture" >Agriculture</Link></li>
        <li><Link to="/posts/categories/Bussiness" >Bussiness</Link></li>
        <li><Link to="/posts/categories/Education" >Education</Link></li>
        <li><Link to="/posts/categories/Entertainment" >Entertainment</Link></li>
        <li><Link to="/posts/categories/Art" >Art</Link></li>
        <li><Link to="/posts/categories/Investment" >Investment</Link></li>
        <li><Link to="/posts/categories/Weather" >Weather</Link></li>
      </ul>
      <p className='footer__para'>All containt are copyrights knit has</p>
    </footer>
  )
}

export default Footer