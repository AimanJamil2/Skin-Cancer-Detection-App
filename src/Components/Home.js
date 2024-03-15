import React from 'react'
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="home">
    <h1>Welcome</h1>
    <p>to Skin Cancer Detection</p>
    <Link to="/main" className="btn btn-primary">Let's Get Started</Link>
    </div>
  )
}

export default Home;