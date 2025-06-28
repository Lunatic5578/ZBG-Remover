import { useState } from 'react'
import React from 'react'
import { Route,Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import './App.css'
import Home from './pages/Home'
import Result from './pages/Result'
import Credit from './pages/Credit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer position='bottom-right'/>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/result" element={<Result/>}/>
      <Route path="/credit" element={<Credit/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
