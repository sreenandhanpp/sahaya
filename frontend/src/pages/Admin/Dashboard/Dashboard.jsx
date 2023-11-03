import React from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import Hero from '../../../components/Hero/Hero'
import Campaigns from '../Campaigns/Campaigns'
import ConfirmDeletion from '../../../components/Admin/ConfirmDeletion/ConfirmDeletion'
const Dashboard = () => {

  return (
    <>
      <Navbar />
      <Hero />
      <Campaigns />
    </>
  )
}

export default Dashboard
