import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className=' error__page'>
      <div className='center'>
      <Link><button className='btn btn-dark'>Go to Home Page</button></Link>   
      <h2>404 Not found</h2>
      </div>   
    </section>
  )
}

export default ErrorPage