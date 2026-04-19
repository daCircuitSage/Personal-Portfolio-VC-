import { useEffect, useRef } from 'react'

const CustomCursor = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const ringPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    
    if (!dot || !ring) return

    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
    }

    const animateCursor = () => {
      // Smooth follow for ring
      ringPosition.current.x += (mousePosition.current.x - ringPosition.current.x) * 0.15
      ringPosition.current.y += (mousePosition.current.y - ringPosition.current.y) * 0.15

      // Update positions
      dot.style.left = mousePosition.current.x + 'px'
      dot.style.top = mousePosition.current.y + 'px'
      ring.style.left = ringPosition.current.x + 'px'
      ring.style.top = ringPosition.current.y + 'px'

      requestAnimationFrame(animateCursor)
    }

    const handleMouseEnter = () => {
      // Don't show cursor effects on form elements
      if (event.target.closest('input, textarea, button')) {
        return;
      }
      ring.style.width = '52px'
      ring.style.height = '52px'
      ring.style.borderColor = 'var(--green)'
      ring.style.opacity = '.8'
      dot.style.width = '4px'
      dot.style.height = '4px'
    }

    const handleMouseLeave = () => {
      // Don't hide cursor effects on form elements
      if (event.target.closest('input, textarea, button')) {
        return;
      }
      ring.style.width = '36px'
      ring.style.height = '36px'
      ring.style.borderColor = 'var(--green)'
      ring.style.opacity = '.5'
      dot.style.width = '8px'
      dot.style.height = '8px'
    }

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .skill-cat, .project-card, .stat-card, .social-btn')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })
    // Add special handling for form elements to prevent cursor interference
    const formElements = document.querySelectorAll('input, textarea')
    formElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        // Hide custom cursor when over form elements
        dot.style.opacity = '0'
        ring.style.opacity = '0'
      })
      el.addEventListener('mouseleave', () => {
        // Show custom cursor when leaving form elements
        dot.style.opacity = '1'
        ring.style.opacity = '0.5'
      })
    })
    document.addEventListener('mousemove', handleMouseMove)
    animateCursor()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        id="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          width: '8px',
          height: '8px',
          background: 'var(--green)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          transition: 'width .15s, height .15s, opacity .15s',
          boxShadow: 'var(--glow-sm)'
        }}
      />
      <div
        ref={ringRef}
        id="cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9998,
          width: '36px',
          height: '36px',
          border: '1.5px solid var(--green)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          transition: 'transform .08s ease, width .2s, height .2s, opacity .2s, border-color .2s',
          opacity: '.5'
        }}
      />
    </>
  )
}

export default CustomCursor
