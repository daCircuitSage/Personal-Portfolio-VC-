import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import TimepassSection from './sections/TimepassSection'
import ExperienceSection from './sections/ExperienceSection'
import ContactSection from './sections/ContactSection'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Loader from './components/Loader'
import DemoModal from './components/DemoModal'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
      setIsMobile(isTouchDevice)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Hide loader after animation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1800)

    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {!isMobile && <CustomCursor />}
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimepassSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
      <DemoModal />
    </>
  )
}

export default App
