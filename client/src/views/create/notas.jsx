import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './create.style.css';
import {getUsers} from "../../redux/action/index.js"


function Create() {
  const [pais, setPais] = useState([])
  const [input, setInput] = useState({
    nombre: "",
    dificultad: "",
    duración: "",
    temporada: ""
  });

  const [error, setError] = useState({
    nombre: "",
    dificultad: "",
    duración: "",
    temporada: ""
  });

  const validate = (input) => {
    // Nombre: Solo letras y espacios permitidos
    if (!/^[a-zA-Z\s]+$/.test(input.nombre)) {
      console.log("Error: El nombre solo debe contener letras y espacios.");
      setError({ ...error, nombre: "Error: El nombre solo debe contener letras y espacios." });
      return;
    }

    // Dificultad: Debe ser un número entre 1 y 5
    if (!/^[1-5]$/.test(input.dificultad)) {
      console.log("Error: La dificultad debe ser un número entre 1 y 5.");
      setError({ ...error, dificultad: "Error: La dificultad debe ser un número entre 1 y 5." });
      return;
    }

    // Duración: Debe ser un número entero (opcional)
    if (input.duración && !/^\d+$/.test(input.duración)) {
      console.log("Error: La duración debe ser un número entero.");
      setError({ ...error, duración: "Error: La duración debe ser un número entero." });
      return;
    }

    // Temporada: Debe ser una de las opciones especificadas
    const temporadasPermitidas = ['Verano', 'Otoño', 'Invierno', 'Primavera'];
    if (!temporadasPermitidas.includes(input.temporada)) {
      console.log("Error: La temporada no es válida.");
      setError({ ...error, temporada: "Error: La temporada no es válida." });
      return;
    }
    setError({
      nombre: input.nombre ? "" : "Error: El nombre es requerido.",
      dificultad: input.dificultad ? "" : "Error: La dificultad es requerida.",
      duración: /^\d+$/.test(input.duración) ? "" : "Error: La duración debe ser un número entero.",
      temporada: temporadasPermitidas.includes(input.temporada) ? "" : "Error: La temporada no es válida."
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));

    validate({
      ...input,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realiza la validación antes de enviar los datos
    validate(input);

    // Verifica si hay errores antes de enviar la solicitud
    if (error.nombre || error.dificultad || error.duración || error.temporada) {
      console.log('Error en el formulario. No se enviarán datos.');
      return;
    }

    try {
      // Construye la URL con los parámetros
      const url = `http://localhost:3000/activities?nombre=${input.nombre}&dificultad=${input.dificultad}&duración=${input.duración}&temporada=${input.temporada}`;
  
      // Realiza la solicitud POST a la URL construida
      const response = await axios.post(url);
  
      // Puedes manejar la respuesta aquí (por ejemplo, mostrar un mensaje de éxito)
      console.log('Respuesta del servidor:', response.data);
  
      // Limpia el formulario después de enviar los datos si es necesario
      setInput({
        "nombre":"",
        "dificultad":"",
        "duración":"",
        "temporada":"",
        "country":[]
      });
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  useEffect(() => {
    validate(input);
  }, [input]);
  
  useEffect(() => {
    const doIt = async()=>{
      setPais(await getUsers())
    
    }
    doIt();
  }, []);
console.log(pais)
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input name="nombre" value={input.nombre} onChange={handleChange} />
          <span>{error.nombre}</span>
        </div>
        <div>
          <label>Dificultad:</label>
<select name="dificultad" value={input.dificultad} onChange={handleChange}>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</select>
<span>{error.dificultad}</span>
        </div>
        <div>
          <label>Duración:</label>
          <input name={"duración"} value={input.duración} onChange={handleChange}/>
          <span>{error.duración}</span>
        </div>
        <div>
  <label>Temporada:</label>
  <select name="temporada" value={input.temporada} onChange={handleChange}>
    <option value="Verano">Verano</option>
    <option value="Otoño">Otoño</option>
    <option value="Invierno">Invierno</option>
    <option value="Primavera">Primavera</option>
  </select>
  <span>{error.temporada}</span>
</div>
<div>
  <label>País:</label>
  <select name="pais" value={input.pais} onChange={handleChange}>
  {pais.map((pais) => ( <option value={pais.id}>{pais.nombre}</option>))}
  </select>
  <span>{error.temporada}</span>
</div>
        {error.nombre || error.dificultad || error.duración || error.temporada ? (null) : (<button type="submit">Submit</button>)}
      </form>
    </div>
  );
}

export default Create;
