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
import ProtectedRoute from './components/ProtectedRoute';
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import VerifyRoute from './components/VerifyRoute';
import AdminDashboard from "./pages/AdminDashboard";
import { Navigate } from "react-router-dom";
import Ouralumni from './pages/Ouralumni'
import Recruitment from './pages/Recruitment'
import MeetOurTeam from './pages/MeetOurTeam'

const App = () => {
  const { userData } = useContext(AppContext);
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/verify-email" element={<VerifyRoute />} />
        <Route path='/reset-passsword' element={<ResetPassword/>}/>
        <Route path='/recruitment' element={<Recruitment/>}/>
        <Route path ='/ourteam' element={<MeetOurTeam/>}/>
        <Route path='/alumni' element={<Ouralumni/>}/>
        <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /></ProtectedRoute>}/>
        <Route path='/feed' element={<Feed />} />
        <Route path='/profile/:username' element={<ProfilePage/>}/>
        <Route path="/admin" element={userData?.isAdmin ? (<AdminDashboard />) : (<Navigate to="/" />)}/>
      </Routes>
    </div>
  )
}

export default App