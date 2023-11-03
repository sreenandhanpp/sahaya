import { useEffect, useState } from 'react'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import { Provider } from 'react-redux'
import store from './redux/store'
import './index.css'
import VerifyEmail from './pages/VerifyEmail/VerifyEmail'
import Home from './pages/Home/Home'
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import CreateCampaign from './pages/Admin/CreateCampaign/CreateCampaign'
import UpdateCampaign from './pages/Admin/UpdateCampaign/UpdateCampaign'

function App() {

  return (
    <>
      <Provider store={store}>
        <Routes>
          {/* <Route exact path="/" element={<RequireAuth>  <Home /></RequireAuth>} /> */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/update-campaign/:id" element={<UpdateCampaign />} />
          <Route exact path="/create-campaign" element={<CreateCampaign />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/verify-email" element={<VerifyEmail />}  />
        </Routes>
      </Provider>
    </>
  )
}

export default App
