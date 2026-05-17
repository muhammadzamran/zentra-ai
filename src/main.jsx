import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/index.css'
import { Landing }   from './pages/Landing'
import { Directory } from './pages/Directory'
import { About, NotFound } from './pages/About'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Landing />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/about"     element={<About />} />
        <Route path="*"          element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
