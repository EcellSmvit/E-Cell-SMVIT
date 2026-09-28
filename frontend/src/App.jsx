import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Ouralumni from './pages/Ouralumni'
import Recruitment from './pages/Recruitment'
import MeetOurTeam from './pages/MeetOurTeam'
import NewMeetOurTeam from './pages/NewMeetOurTeam'
import StarPitch from './pages/Starpitch'
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import RecruitmentTask from "./pages/RecruitmentTask";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recruitment' element={<Recruitment />} />
        <Route path='/ourteam' element={<MeetOurTeam />} />
        <Route path='/alumni' element={<Ouralumni />} />
        <Route path='/newteam' element={<NewMeetOurTeam/>}/>
        <Route path='/starpitch' element={<StarPitch/>}/>
        <Route path="/tasks" element={<Tasks />}/>
        <Route path="/tasks/:taskId" element={<TaskDetails />}/>
        <Route path="/recruitment/task" element={<RecruitmentTask />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App