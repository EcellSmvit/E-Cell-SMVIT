import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Ouralumni from './pages/Ouralumni'
import Recruitment from './pages/Recruitment'
import MeetOurTeam from './pages/MeetOurTeam'

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recruitment' element={<Recruitment />} />
        <Route path='/ourteam' element={<MeetOurTeam />} />
        <Route path='/alumni' element={<Ouralumni />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App