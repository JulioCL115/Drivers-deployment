import React, { useState, useEffect } from 'react';
import './detail.style.css';
import { getByName, getById, getTeams } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';

function Detail() {
  const name = window.location.pathname.split('/').pop();
  console.log("1:" + name);

  const dispatch = useDispatch();
const [user, setUser] = useState(null);
const [filtered, setfiltered] = useState(null);
const [teams, setteams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await dispatch(getByName(name));
        const userId = userData.payload[0].id;
        const filteredData = await dispatch(getById(userId));
        const teamsData = await dispatch(getTeams());
        const filter2 = filteredData.payload.shift()
        setteams(teamsData);
        setUser(userData);
        setfiltered(filteredData);
        
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    

    fetchData();
  }, [dispatch, name]);

  if (!user) {
    // Puedes mostrar un mensaje de carga o renderizar algo mientras la promesa se resuelve
    return <p>Cargando...</p>;
  }
  
  const { id, nombre, apellido, descripcion, imagen, nacionalidad, fechaNacimiento, color } = user.payload[0];
  
  
  const filteredTeams = teams.filter(equipo => {
    return filtered.payload.some(item => item.TeamId === equipo.id);
  });

  
  return (
    <>
        <div className='cont'>
            <div>
                <div className='horizontal'>

                    <img src={imagen} alt={`imagen de ${nombre}`} />

                    <div className='alingh'>
                        <p>Nombre: {nombre+" "+apellido}</p>
                        <p>Nacionalidad: {nacionalidad}</p>
                        <p>Fecha de Nacimiento: {fechaNacimiento}</p>
                        <p>Id: {id}</p>
                        <p>Color:</p>
                        <p>{color}</p>
                    </div>
                </div>
            </div>
            <p className='des'>Descripcion:</p>
            <p className='des'>{descripcion}</p>
        </div>
        <div className='horizontal2'>
        {filteredTeams.map((activity) => (
        <div key={activity.id} className='cont2'>
          <p>Nombre:</p>
          <p>{activity.nombre}</p>
          <p>Id:</p>
          <p>{activity.id}</p>
          
        </div>
      ))}
        </div>
    </>
  );
}

export default Detail;
