import { useState, useEffect } from 'react';
import './create.style.css';
import axios from 'axios';  // Asegúrate de importar axios si no lo has hecho
import { getTeams } from '../../redux/action/index.js';
import { useDispatch } from 'react-redux';

function Create() {
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);
  const [input, setInput] = useState({
    nombre: '',
    apellido: '',
    descripcion: '',
    imagen: '',
    nacionalidad: '',
    fechaNacimiento: '',
    team: [],
  });
  const [error, setError] = useState({
    nombre: '',
    apellido: '',
    descripcion: '',
    imagen: '',
    nacionalidad: '',
    fechaNacimiento: '',
    team: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsData = await dispatch(getTeams());
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams data', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    validate(input);

    if (Object.values(error).some((e) => e)) {
      console.log('Error en el formulario. No se enviarán datos.');
      return;
    }

    try {
      const url = 'http://localhost:3001/drivers';
      const response = await axios.post(url, {
        nombre: input.nombre,
        apellido: input.apellido,
        descripcion: input.descripcion,
        imagen: input.imagen,
        nacionalidad: input.nacionalidad,
        fechaNacimiento: input.fechaNacimiento,
        team: input.team,
      });

      console.log('Respuesta del servidor:', response.data);

      setInput({
        nombre: '',
        apellido: '',
        descripcion: '',
        imagen: '',
        nacionalidad: '',
        fechaNacimiento: '',
        team: [],
      });
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const validate = (input) => {
    let newErrors = {};

    if (!/^[a-zA-Z\s]+$/.test(input.nombre)) {
      newErrors = { ...newErrors, nombre: 'Error: El nombre solo debe contener letras y espacios.' };
    }

    if (!/^[a-zA-Z\s]+$/.test(input.apellido)) {
      newErrors = { ...newErrors, apellido: 'Error: El apellido solo debe contener letras y espacios.' };
    }

    if (!/^[a-zA-Z0-9.,\s]+$/.test(input.descripcion)) {
      newErrors = {
        ...newErrors,
        descripcion: 'Error: La descripción solo debe contener texto, minúsculas, mayúsculas, números, puntos y comas.',
      };
    }

    const imageUrlRegex = /\.(jpg|png)$/i;
    if (!imageUrlRegex.test(input.imagen)) {
      newErrors = {
        ...newErrors,
        imagen: 'Error: La URL de la imagen debe tener la extensión .jpg o .png.',
      };
    }

    if (!/^[a-zA-Z\s]+$/.test(input.nacionalidad)) {
      newErrors = {
        ...newErrors,
        nacionalidad: 'Error: La nacionalidad solo debe contener letras y espacios.',
      };
    }

    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!dateRegex.test(input.fechaNacimiento)) {
      newErrors = {
        ...newErrors,
        fechaNacimiento: 'Error: El formato de la fecha debe ser MM/DD/YYYY.',
      };
    }

    if (input.team.length === 0 || input.team[0] === '') {
      newErrors = { ...newErrors, team: 'Selecciona al menos un equipo.' };
    }

    setError(newErrors);

    if (Object.values(newErrors).every((e) => !e)) {
      console.clear();
    } else {
      console.log('Errors:', newErrors);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'team') {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      setInput((prevInput) => ({
        ...prevInput,
        [e.target.name]: selectedOptions,
      }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [e.target.name]: e.target.value,
      }));
    }
  };

  if (teams.length === 0) {
    return <p>Cargando...</p>;
  }

  return (
    <div className='dividendo'>
      <form className='formulario' onSubmit={(e) => handleSubmit(e)}>
        {/* ... (rest of the form) ... */}
      </form>
    </div>
  );
}

export default Create;
