// Activity.js
import React, { useState, useEffect } from 'react';
import './Teams.style.css';
import { getTeams } from '../../redux/action';
import { useDispatch } from 'react-redux';
import Pagination from './Pagination'; // Ajusta la ruta según la ubicación de tu componente de paginación

function Activity() {
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsData = await dispatch(getTeams());
        setTeams(teamsData);
      } catch (error) {
        console.error("Error fetching teams data", error);
      }
    };

    fetchData();
  }, [dispatch]);

  if (teams.length === 0) {
    return <p>Cargando...</p>;
  }

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(teams.length / teamsPerPage)) {
      setCurrentPage(page);
    }
  };

  return (
    
    <div>
      <p className='home-title'>Teams</p>
      <div className='container'>
        {currentTeams.map((team) => (
          <div key={team.id} className='contenedor'>
            <p>Nombre:</p>
            <p>{team.nombre}</p>
            <p>Id:</p>
            <p>{team.id}</p>
          </div>
        ))}
      </div>
      
      <Pagination currentPage={currentPage} totalPages={Math.ceil(teams.length / teamsPerPage)} onPageChange={handlePageChange} />
    </div>
  );
}

export default Activity;
