import { useState } from 'react'
import {LoginPage} from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'
function App() {

  return (
    <>
    <Routes>
      <Route element={<ProtectedRoutes/>}>
        <Route path='/' element={<HomePage/>}/>
      </Route>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
    </Routes>
    </>
  )
}

export default App
