import React from 'react'
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="container">
      <div className="home">
        <h1>Skin Cancer Detection</h1>
        <p>Use our platform to detect skin cancer early.</p>
        <Link to="/Main"><button>Let's Get Started</button></Link>
      </div>
    </div>   
  )
}

export default Home;