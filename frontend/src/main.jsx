import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {Toaster} from 'react-hot-toast'
import { UserProvider } from './UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
        <Toaster />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
