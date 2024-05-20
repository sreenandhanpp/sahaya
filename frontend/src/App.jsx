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
import CampaignDetails from './components/CampaignDetails/CampaignDetails'
import ProfilePage from './pages/ProfilePage/ProfilePage'

function App() {

  return (
    <>
      <Provider store={store}>
        <Routes>
          {/* <Route exact path="/" element={<RequireAuth>  <Home /></RequireAuth>} /> */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/update-campaign/:id" element={<UpdateCampaign />} />
          <Route exact path="/create-campaign" element={<CreateCampaign />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route exact path="/verify-email" element={<VerifyEmail />} />
          <Route exact path="/user/profile" element={<ProfilePage />} />
          <Route exact path="/user/history" element={<ProfilePage />} />
          <Route exact path="/user/password" element={<ProfilePage />} />
          <Route exact path="/user/logout" element={<ProfilePage />} />
        </Routes>
      </Provider>
    </>
  )
}

export default App
