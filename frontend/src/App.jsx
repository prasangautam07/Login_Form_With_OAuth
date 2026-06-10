import { useState } from 'react'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import { Route, Routes } from 'react-router-dom'
function App() {

  return (
    <>
    <Routes>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/' element={<LoginPage/>}/>
    </Routes>
    </>
  )
}

export default App
