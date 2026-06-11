import { useState } from 'react'
import {LoginPage} from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'
import { PublicRoutes } from './PublicRoutes'
function App() {

  return (
    <>
    <Routes>
      <Route element={<ProtectedRoutes/>}>
        <Route path='/' element={<HomePage/>}/>
      </Route>
      <Route element={<PublicRoutes/>}>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
