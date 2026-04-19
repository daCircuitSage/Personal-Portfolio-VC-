import { useEffect, useRef } from 'react'

const ScrollProgress = () => {
  const progressBarRef = useRef(null)

  useEffect(() => {
    const progressBar = progressBarRef.current
    
    if (!progressBar) return

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollProgress = (scrollTop / scrollHeight) * 100
      
      progressBar.style.width = scrollProgress + '%'
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      ref={progressBarRef}
      id="scroll-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9000,
        height: '2px',
        width: '0%',
        background: 'linear-gradient(90deg, var(--green), var(--green2))',
        boxShadow: 'var(--glow-sm)',
        transition: 'width .05s linear'
      }}
    />
  )
}

export default ScrollProgress
