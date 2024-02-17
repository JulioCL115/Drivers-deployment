import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from 'react';
import Home from './views/home/home.component';
import Detail from './views/detail/detail.component';
import Create from './views/create/create.component';
import Navigation from "./components/navegacion/navegacion.component";
import Teams from "./views/Teams/Teams.component";
import Landing from "./views/landing/landing.component.jsx";
import axios from "axios";
console.log('URL base de Axios:', axios.defaults.baseURL);
axios.defaults.baseURL = 'https://drivers-deployment-production.up.railway.app';
console.log('URL base de Axios:', axios.defaults.baseURL);
//sis
function App() {
  return (
    <BrowserRouter>
    <Navigation/>
    <Routes>
      
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/create" element={<Create />} />
      <Route path="/teams" element={<Teams />} />
    
    </Routes>
</BrowserRouter>
  );
}

export default App;
