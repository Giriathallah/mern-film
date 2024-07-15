/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useState } from 'react'
import './App.css'
import { getMovies, searchMovie } from './api/api'
import { useEffect } from 'react';
import Navbar from './components/navbar';





const App = () => {
  // bikin state buat anuin data populer

  return (
    <div className="app">
      <Navbar/>
    <div className="main">
      
    </div>
    </div>
  )
}

export default App
