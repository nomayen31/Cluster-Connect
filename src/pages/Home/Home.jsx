import React from 'react'
import HeroSection from '../../Components/HeroSection'
import Features from '../../Components/Features'
import Talent from '../../Components/Talent'
import FeaturedTasks from './FeaturedTasks'
import EmployerSteps from '../../Components/EmployerSteps'

const Home = () => {
  return (
     <div className='bg-[#1A3A37] min-h-screen font-sans'>
            <HeroSection/>
            <Features/>
            <Talent/>
            <FeaturedTasks/>
            <EmployerSteps/>
        </div>
  )
}

export default Home