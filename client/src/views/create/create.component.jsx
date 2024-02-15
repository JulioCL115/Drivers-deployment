import { useState, useEffect } from 'react';
import './create.style.css';
import {getTeams} from "../../redux/action/index.js"
import { useDispatch } from 'react-redux';
import axios from 'axios'
function handleSubmit(e) {
  e.preventDefault(); // Evita el comportamiento predeterminado de recargar la página al enviar el formulario
  // Aquí puedes realizar las acciones que desees al enviar el formulario
}

function Create() {
  const dispatch = useDispatch();
  const [teams, setteams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsData = await dispatch(getTeams());
        setteams(teamsData); // Corrected the function name
      } catch (error) {
        console.error("Error fetching teams data", error);
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
      const url = `http://localhost:3001/drivers?nombre=${input.nombre}&apellido=${input.apellido}&descripcion=${input.descripcion}&imagen=${input.imagen}&nacionalidad=${input.nacionalidad}&fechaNacimiento=${input.fechaNacimiento}&team=${input.team}&color=${input.color}`;//http://localhost:3001/drivers
      //http://localhost:3001/drivers?nombre=${input.nombre}&apellido=${input.apellido}&descripcion=${input.descripcion}&imagen=${input.imagen}&nacionalidad=${input.nacionalidad}&fechaNacimiento=${input.fechaNacimiento}&team=${input.team}
      const response = await axios.post(url/*, {
        nombre: input.nombre,
        apellido: input.apellido,
        descripcion: input.descripcion,
        imagen: input.imagen,
        nacionalidad: input.nacionalidad,
        fechaNacimiento: input.fechaNacimiento,
        team: input.team,
      }*/);

      console.log('Respuesta del servidor:', response.data);

      setInput({
        nombre: '',
        apellido: '',
        descripcion: '',
        imagen: '',
        nacionalidad: '',
        color: "",
        fechaNacimiento: '',
        team: [],
      });
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };
  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    descripcion: "",
    imagen: "",
    nacionalidad: "",
    color: "",
    fechaNacimiento: "",
    team: []
  });
  console.log("input:",input)
  const [error, setError] = useState({
    nombre: "",
    apellido: "",
    descripcion: "",
    imagen: "",
    nacionalidad: "",
    color: "",
    fechaNacimiento: "",
    team: ""
  });
  console.log("error:",error)
  
 
  const validate = (input) => {
    let newErrors = {};
  
    // Validaciones para los nuevos campos
    if (!/^[a-zA-Z\s]+$/.test(input.nombre)) {
      newErrors = { ...newErrors, nombre: "Error: El nombre solo debe contener letras y espacios." };
    }
  
    // Apellido: Solo letras y espacios permitidos
    if (!/^[a-zA-Z\s]+$/.test(input.apellido)) {
      newErrors = { ...newErrors, apellido: "Error: El apellido solo debe contener letras y espacios." };
    }
  
    // Descripción: Puede contener cualquier caracter (opcional)
    if (!/^[a-zA-Z0-9.,\s]+$/.test(input.descripcion)) {
      newErrors = {
        ...newErrors,
        descripcion: "Error: La descripción solo debe contener texto, minúsculas, mayúsculas, números, puntos y comas.",
      };
    }
  
    // Imagen: Puedes realizar validaciones adicionales según tus requisitos
    const imageUrlRegex = /\.(jpg|png)$/i;
    if (!imageUrlRegex.test(input.imagen)) {
      newErrors = {
        ...newErrors,
        imagen: "Error: La URL de la imagen debe tener la extensión .jpg o .png.",
      };
    }
  
    // Nacionalidad: Puedes realizar validaciones específicas según tus requisitos
    if (!/^[a-zA-Z\s]+$/.test(input.nacionalidad)) {
      newErrors = {
        ...newErrors,
        nacionalidad: "Error: La nacionalidad solo debe contener letras y espacios.",
      };
    }
    if (!/^[a-zA-Z\s]+$/.test(input.color)) {
      newErrors = {
        ...newErrors,
        color: "Error: El color solo debe contener letras y espacios.",
      };
    }
   
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!dateRegex.test(input.fechaNacimiento)) {
      newErrors = {
        ...newErrors,
        fechaNacimiento: "Error: El formato de la fecha debe ser MM/DD/YYYY.",
      };
    }
  
    // Team: Puedes realizar validaciones específicas según tus requisitos
    if (input.team.length === 0 || input.team[0] === "") {
      newErrors = { ...newErrors, team: 'Selecciona al menos un equipo.' };
    }
  
    setError(newErrors);
  
    // Clear console log messages
    if (Object.values(newErrors).every((e) => !e)) {
      console.clear();
    } else {
      console.log("Errors:", newErrors);
    }
  };
  

  function handleChange(e) {
    if (e.target.name === "team") {
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
  }
  
  // Use useEffect to perform actions after state update
  useEffect(() => {
    validate(input);
  }, [input]); // Run this effect whenever input changes
  
  
  
  if (teams.length === 0) {
    return <p>Cargando...</p>;
  }
  return (
    
    <div className='dividendo' >
      <p className='home-title'>Create</p>
      <form className='formulario' onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input name="nombre" value={input.nombre} onChange={handleChange} />
          <span className='span2'>{error.nombre}</span>
        </div>
        <div>
          <label>Apellido:</label>
          <input name="apellido" value={input.apellido} onChange={handleChange} />
          <span className='span2'>{error.apellido}</span>
        </div>
        <div>
          <label>Descripción:</label>
          <input name="descripcion" value={input.descripcion} onChange={handleChange} />
          <span className='span2'>{error.descripcion}</span>
        </div>
        <div>
          <label>Imagen (link .png o .jpg):</label>
          <input name="imagen" value={input.imagen} onChange={handleChange} />
          <span className='span2'>{error.imagen}</span>
        </div>
        <div>
          <label>Nacionalidad:</label>
          <input name="nacionalidad" value={input.nacionalidad} onChange={handleChange} />
          <span className='span2'>{error.nacionalidad}</span>
        </div>
        <div>
          <label>Color:</label>
          <input name="color" value={input.color} onChange={handleChange} />
          <span className='span2'>{error.color}</span>
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input
            name="fechaNacimiento"
            type="date"
            value={input.fechaNacimiento}
            onChange={handleChange}
          />
          <span className='span2'>{error.fechaNacimiento}</span>
        </div>
        <div>
          <label>Team (ctrl para seleccionar varios):</label>
          
          <select
  name="team"  // Add the name attribute to link it to the state
  multiple
  value={input.team}  // Link the selected value to the state
  onChange={handleChange}  // Use handleChange to update the state
>
  <option value={[]}>Ninguno</option>
  {teams.map((team) => (
    <option key={team.id} value={team.id}>
      {team.nombre}
    </option>
  ))}
</select>
          <span className='span2'>{error.team}</span>
        </div>
        {Object.values(error).every((e) => !e) && <button type="submit" class="button">
        <span className="button-content">Submit </span>
          </button>}
      </form>
      
    </div>
    
  );
}

export default Create;
