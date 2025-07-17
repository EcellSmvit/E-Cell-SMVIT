import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Feed from './pages/Feed';
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'



const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/email-verify' element={<EmailVerify/>}/>
        <Route path='/reset-passsword' element={<ResetPassword/>}/>
        <Route
    path='/dashboard'
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
        <Route
    path='/feed'
    element={
      <ProtectedRoute>
        <Feed />
      </ProtectedRoute>
    }
  />
        <Route
    path='/profile/:username'
    element={
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    }
  />
        
      </Routes>
    </div>
  )
}

export default App