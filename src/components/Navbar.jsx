import { useState, useEffect } from 'react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleIntersection = () => {
      const sections = document.querySelectorAll('section[id]')
      const navLinks = document.querySelectorAll('.nav-link')
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'))
            const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`)
            if (active) active.classList.add('active')
            setActiveSection(entry.target.id)
          }
        })
      }, { threshold: 0.35 })

      sections.forEach(section => observer.observe(section))
    }

    handleScroll()
    handleIntersection()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <>
      <nav 
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 5%',
          height: '64px',
          background: isScrolled ? 'rgba(5,5,5,.9)' : 'rgba(5,5,5,.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          transition: 'background .3s'
        }}
      >
        <a 
          href="#hero" 
          className="nav-logo"
          onClick={(e) => handleSmoothScroll(e, '#hero')}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '.95rem',
            color: 'var(--green)',
            textDecoration: 'none',
            letterSpacing: '.1em'
          }}
        >
          &lt;<span style={{ color: 'var(--text)' }}>dev</span>/&gt;
        </a>

        <ul 
          className="nav-links"
          style={{
            display: 'flex',
            gap: '36px',
            listStyle: 'none',
            '@media (max-width: 768px)': {
              display: 'none'
            }
          }}
        >
          <li><a href="#about" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#about')} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '.78rem',
            color: activeSection === 'about' ? 'var(--green)' : 'var(--muted)',
            textDecoration: 'none',
            letterSpacing: '.08em',
            transition: 'color .2s',
            position: 'relative'
          }}>About</a></li>
          <li><a href="#skills" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#skills')} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '.78rem',
            color: activeSection === 'skills' ? 'var(--green)' : 'var(--muted)',
            textDecoration: 'none',
            letterSpacing: '.08em',
            transition: 'color .2s',
            position: 'relative'
          }}>Skills</a></li>
          <li><a href="#projects" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#projects')} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '.78rem',
            color: activeSection === 'projects' ? 'var(--green)' : 'var(--muted)',
            textDecoration: 'none',
            letterSpacing: '.08em',
            transition: 'color .2s',
            position: 'relative'
          }}>Projects</a></li>
          <li><a href="#experience" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#experience')} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '.78rem',
            color: activeSection === 'experience' ? 'var(--green)' : 'var(--muted)',
            textDecoration: 'none',
            letterSpacing: '.08em',
            transition: 'color .2s',
            position: 'relative'
          }}>Experience</a></li>
          <li><a href="#contact" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#contact')} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '.78rem',
            color: activeSection === 'contact' ? 'var(--green)' : 'var(--muted)',
            textDecoration: 'none',
            letterSpacing: '.08em',
            transition: 'color .2s',
            position: 'relative'
          }}>Contact</a></li>
        </ul>

        <a 
          href="#contact" 
          className="nav-cta"
          onClick={(e) => handleSmoothScroll(e, '#contact')}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '.75rem',
            color: 'var(--green)',
            border: '1px solid var(--green)',
            padding: '8px 20px',
            borderRadius: '99px',
            textDecoration: 'none',
            letterSpacing: '.1em',
            transition: 'background .2s, box-shadow .2s',
            '@media (max-width: 768px)': {
              display: 'none'
            }
          }}
        >
          Hire Me
        </a>

        <button 
          className="hamburger"
          onClick={toggleMobileMenu}
          aria-label="menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            '@media (max-width: 768px)': {
              display: 'flex'
            }
          }}
        >
          <span style={{
            width: '22px',
            height: '1.5px',
            background: 'var(--text)',
            display: 'block',
            transition: '.3s',
            transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }}></span>
          <span style={{
            width: '22px',
            height: '1.5px',
            background: 'var(--text)',
            display: 'block',
            transition: '.3s',
            opacity: mobileMenuOpen ? 0 : 1
          }}></span>
          <span style={{
            width: '22px',
            height: '1.5px',
            background: 'var(--text)',
            display: 'block',
            transition: '.3s',
            transform: mobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
          }}></span>
        </button>
      </nav>

      <div 
        className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
        style={{
          display: 'none',
          position: 'fixed',
          top: '64px',
          insetX: 0,
          zIndex: 799,
          background: 'rgba(5,5,5,.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          flexDirection: 'column',
          gap: 0,
          padding: '12px 0',
          '@media (max-width: 768px)': {
            display: mobileMenuOpen ? 'flex' : 'none'
          }
        }}
      >
        <a href="#about" className="mm-link" onClick={(e) => handleSmoothScroll(e, '#about')} style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '.85rem',
          color: 'var(--muted)',
          textDecoration: 'none',
          padding: '14px 5%',
          letterSpacing: '.08em',
          borderBottom: '1px solid var(--border)',
          transition: 'color .2s'
        }}>About</a>
        <a href="#skills" className="mm-link" onClick={(e) => handleSmoothScroll(e, '#skills')} style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '.85rem',
          color: 'var(--muted)',
          textDecoration: 'none',
          padding: '14px 5%',
          letterSpacing: '.08em',
          borderBottom: '1px solid var(--border)',
          transition: 'color .2s'
        }}>Skills</a>
        <a href="#projects" className="mm-link" onClick={(e) => handleSmoothScroll(e, '#projects')} style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '.85rem',
          color: 'var(--muted)',
          textDecoration: 'none',
          padding: '14px 5%',
          letterSpacing: '.08em',
          borderBottom: '1px solid var(--border)',
          transition: 'color .2s'
        }}>Projects</a>
        <a href="#experience" className="mm-link" onClick={(e) => handleSmoothScroll(e, '#experience')} style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '.85rem',
          color: 'var(--muted)',
          textDecoration: 'none',
          padding: '14px 5%',
          letterSpacing: '.08em',
          borderBottom: '1px solid var(--border)',
          transition: 'color .2s'
        }}>Experience</a>
        <a href="#contact" className="mm-link" onClick={(e) => handleSmoothScroll(e, '#contact')} style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '.85rem',
          color: 'var(--muted)',
          textDecoration: 'none',
          padding: '14px 5%',
          letterSpacing: '.08em',
          borderBottom: '1px solid var(--border)',
          transition: 'color .2s'
        }}>Contact</a>
      </div>

      <style jsx>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--green);
          transition: width .25s;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        .nav-link:hover,
        .nav-link.active {
          color: var(--green);
        }
        .nav-cta:hover {
          background: var(--green-dim);
          box-shadow: var(--glow-sm);
        }
        .mobile-menu a:hover {
          color: var(--green);
        }
        @media (max-width: 768px) {
          .nav-links, .nav-cta {
            display: none;
          }
          .hamburger {
            display: flex;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar
