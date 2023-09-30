import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { BrowserRouter, Routes, Route }from "react-router-dom"
import AboutPage from './about.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
      
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/:id" element={<AboutPage/>}></Route>
        </Routes>
  </BrowserRouter>
)
