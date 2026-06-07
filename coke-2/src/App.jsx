import { useState } from 'react'
import './App.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/all'
import NavBar from './sections/NavBar'
import AboutSection from './sections/AboutSection'
import { Route, Routes } from 'react-router-dom'
import HomeSection from './sections/HomeSection'
import StoreSection from './sections/StoreSection'
import VideoAnimation from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

function App() {
  const [user] = useState(() => JSON.parse(localStorage.getItem('userInfo')))

  if (!user) {
    return (
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Login />} />
      </Routes>
    )
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeSection />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/store" element={<StoreSection />} />
        <Route path="*" element={<HomeSection />} />
      </Routes>
      <VideoAnimation />
    </>
  )
}

export default App
