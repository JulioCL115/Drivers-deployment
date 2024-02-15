import './landing.style.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import { getAllUsers, getByName, getUsers } from "../../redux/action"
import Navbar from '../../components/navbar/navbar.component'
import Cards from '../../components/cards/cards.component'
import { Link } from 'react-router-dom';
function Landing() {
  
  const dispatch = useDispatch();
  console.log("dispatch:",{dispatch})
  useEffect(() => {
    const doIt = async () => {
       const result = await getAllUsers(dispatch)
       return result
    }
  
    // Calling doIt function inside useEffect
    doIt().then(result => console.log("Llega a landing:", result));
  


    /*const doIt = async () => {
      await getAllUsers(dispatch);
      console.log("getallusers de doIt:", result);  // Aquí deberías ver los datos reales, no la función de acción
      return result;  // Devuelve los datos reales para que estén disponibles en el `then` externo.
  };
  
  // Llamando a la función doIt dentro de useEffect
  doIt().then(result => console.log("Llega a landing:", result));*/
  
  }, [dispatch]);//llega a doIt los usuarios
  
  
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Link to="/home">
      <button className="button">
  <span className="button-content">Comenzar </span>
</button>
    </Link>
    </div>
  )
}

export default Landing
