import axios from "axios";

export const GET_USERS = "GET_USERS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_BY_ID = "GET_BY_ID";
export function getUsers() {
  return async function(dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/drivers`);
      dispatch({
        type: GET_USERS,
        payload: response.data
      });
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  };
}
export const getAllUsers = async(dispatch)=>{
  try {
    const {data} = await axios.get(`http://localhost:3001/drivers`);
    console.log("funcion getAllUsers de actions:",{data})
    return (dispatch)=>dispatch({type: GET_USERS, payload: data})
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
  }
}
export function getTeams() {
  return async function(dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/teams`)
      
      dispatch({
        type: GET_ACTIVITIES,
        payload: response.data
      });
      
      // Retorna directamente los datos (response.data)
      return response.data;
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  };
}
export function getByName(name) {
  console.log("entra 1:",name);
  return async function(dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/drivers/name/${name}`);
      console.log("sale 2:" + response.data.id); 
     return dispatch({
        type: GET_BY_NAME,
        payload: response.data
        
      });
      
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  };
  
}
export function getById(id) {
  console.log("entra 1:",id,typeof id);
  return async function(dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/drivers/${id}`);
      console.log("sale 2:" + response.data); 
     return dispatch({
        type: GET_BY_ID,
        payload: response.data
        
      });
      
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  };
  
}
