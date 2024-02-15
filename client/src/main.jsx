import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from "./redux/store/index";
import { Provider } from "react-redux";
import App from './App.jsx'
//import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
  
)