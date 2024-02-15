import { useState } from 'react'
import './navbar.style.css'

function Navbar({handleChange,handleSubmit}) {
  
  return (
    <div className='search-box'>
      <form onChange={handleChange}>
        <input placeholder='Busqueda' type='search'/>
        
        <button className="button" type="submit" onClick={handleSubmit} >
  <span className="button-content">Buscar</span>
</button>
      </form>

      </div>
    
  )
}

export default Navbar
