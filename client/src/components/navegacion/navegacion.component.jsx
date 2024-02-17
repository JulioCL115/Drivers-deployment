import React from 'react';
import { Link } from 'react-router-dom';
import './navegacion.style.css'

const Navigation = () => {
  const baseURL = "https://drivers-deployment.vercel.app";

  return (
    <div className="navbar">
      <Link to={`${baseURL}/home`}>
        
        <button className="button">
  <span className="button-content">Home</span>
</button>
      </Link>
      <Link to={`${baseURL}/create`}>
        
        <button className="button">
  <span className="button-content">Create</span>
</button>
      </Link>
      <Link to={`${baseURL}/Teams`}>
        
        <button className="button">
  <span className="button-content">Teams</span>
</button>
      </Link>
    </div>
  );
};

export default Navigation;