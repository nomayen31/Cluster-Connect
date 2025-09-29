import React from 'react'
import HeroSection from '../../Components/HeroSection'
import Features from '../../Components/Features'
import Talent from '../../Components/Talent'

const Home = () => {
  return (
     <div className='bg-[#1A3A37] min-h-screen font-sans'>
            {/* Navbar is typically here, omitted for brevity */}
            <HeroSection/>
            <Features/>
            <Talent/>
        </div>
  )
}

export default Home