import { useEffect, useRef } from 'react'
import profileImage from '../assets/profile.png'

const HeroSection = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    // Add animation classes to elements
    const elements = hero.querySelectorAll('.hero-animate')
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 200 + (index * 150))
    })
  }, [])

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-grid"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: '60px',
        paddingTop: '120px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Animated background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,255,136,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
          pointerEvents: 'none'
        }}
      />
      
      {/* Animated glow circle */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,136,.12) 0%, transparent 70%)',
          top: '50%',
          right: '-100px',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          animation: 'pulse 4s ease-in-out infinite'
        }}
      />

      <div className="hero-left" style={{ position: 'relative', zIndex: 2 }}>
        <div
          className="hero-animate hero-badge"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '.72rem',
            color: 'var(--green)',
            letterSpacing: '.12em',
            border: '1px solid var(--green-dim)',
            padding: '6px 16px',
            borderRadius: '99px',
            marginBottom: '28px',
            background: 'rgba(0,255,136,.04)',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity .8s .2s both, transform .8s .2s both'
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              background: 'var(--green)',
              borderRadius: '50%',
              animation: 'blink 1.5s ease-in-out infinite'
            }}
          />
          Available for Freelance & Full-time
        </div>

        <h1
          className="hero-animate hero-name"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-.03em',
            marginBottom: '12px',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity .8s .35s both, transform .8s .35s both'
          }}
        >
          Shihabul Abedin<br /><span className="green" style={{ color: 'var(--green)' }}>Shimul</span>
        </h1>

        <p
          className="hero-animate hero-title"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(.8rem, 2.5vw, 1rem)',
            color: 'var(--green)',
            letterSpacing: '.08em',
            marginBottom: '22px',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity .8s .5s both, transform .8s .5s both'
          }}
        >
          // Backend Developer | AI Automation
        </p>

        <p
          className="hero-animate hero-tagline"
          style={{
            fontSize: 'clamp(.95rem, 2.5vw, 1.15rem)',
            color: 'var(--muted)',
            lineHeight: 1.7,
            maxWidth: '440px',
            marginBottom: '40px',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity .8s .6s both, transform .8s .6s both',
            '@media (max-width: 768px)': {
              margin: '0 auto 32px',
              maxWidth: '100%'
            }
          }}
        >
          I build <em style={{ color: 'var(--text)', fontStyle: 'normal', fontWeight: 500 }}>intelligent systems</em> that scale — from robust Django APIs
          to autonomous AI pipelines that turn complexity into <em style={{ color: 'var(--text)', fontStyle: 'normal', fontWeight: 500 }}>competitive advantage</em>.
        </p>

        <div
          className="hero-animate hero-btns"
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity .8s .75s both, transform .8s .75s both',
            '@media (max-width: 768px)': {
              justifyContent: 'center'
            }
          }}
        >
          <a
            href="#projects"
            onClick={(e) => handleSmoothScroll(e, '#projects')}
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--green)',
              color: 'var(--black)',
              fontFamily: 'var(--font-mono)',
              fontSize: '.8rem',
              fontWeight: 700,
              letterSpacing: '.08em',
              padding: '14px 28px',
              borderRadius: '99px',
              textDecoration: 'none',
              border: 'none',
              cursor: 'none',
              transition: 'box-shadow .25s, transform .2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = 'var(--glow)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = 'none'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            ▶ View Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, '#contact')}
            className="btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              color: 'var(--text)',
              fontFamily: 'var(--font-mono)',
              fontSize: '.8rem',
              letterSpacing: '.08em',
              padding: '13px 28px',
              borderRadius: '99px',
              textDecoration: 'none',
              border: '1px solid var(--border2)',
              cursor: 'none',
              transition: 'border-color .25s, color .25s, transform .2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--green)'
              e.target.style.color = 'var(--green)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'var(--border2)'
              e.target.style.color = 'var(--text)'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            → Contact Me
          </a>
        </div>
      </div>

      <div
          className="hero-photo hero-animate"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative', 
            zIndex: 2
          }}>
        <div
          className="photo-wrapper hero-photo-frame"
          style={{
            position: 'relative',
            width: 'clamp(180px, 28vw, 360px)',
            height: 'clamp(180px, 28vw, 360px)'
          }}
        >
          <div
            className="photo-ring"
            style={{
              position: 'absolute',
              inset: '-12px',
              borderRadius: '50%',
              border: '1px solid var(--green-dim)',
              animation: 'spin 12s linear infinite'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-3px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '8px',
                height: '8px',
                background: 'var(--green)',
                borderRadius: '50%',
                boxShadow: 'var(--glow-sm)'
              }}
            />
          </div>
          
          <div
            className="photo-glow"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 50% 80%, rgba(0,255,136,.35) 0%, transparent 65%)',
              pointerEvents: 'none'
            }}
          />
          
          <div
            className="photo-frame hero-photo-emoji"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid var(--border2)',
              background: 'var(--bg3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              fontSize: '7rem'
            }}
          >
            <img 
  src={profileImage} 
  alt="Shihabul Abedin Shimul - Backend Developer"
  style={{
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover'
  }}
/>
          </div>

          {/* Floating tech badges */}
          <div
            className="tech-badge tech-badge-1"
            style={{
              position: 'absolute',
              background: 'rgba(10,10,10,.9)',
              border: '1px solid var(--border2)',
              borderRadius: '10px',
              padding: '8px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '.72rem',
              color: 'var(--green)',
              letterSpacing: '.05em',
              backdropFilter: 'blur(10px)',
              animation: 'float 3s ease-in-out infinite',
              whiteSpace: 'nowrap',
              top: '8%',
              right: '-18%',
              animationDelay: '0s'
            }}
          >
            🐍 Python
          </div>
          
          <div
            className="tech-badge tech-badge-2"
            style={{
              position: 'absolute',
              background: 'rgba(10,10,10,.9)',
              border: '1px solid var(--border2)',
              borderRadius: '10px',
              padding: '8px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '.7rem',
              color: 'var(--green)',
              letterSpacing: '.05em',
              backdropFilter: 'blur(10px)',
              animation: 'float 3s ease-in-out infinite',
              whiteSpace: 'nowrap',
              bottom: '18%',
              left: '-20%',
              animationDelay: '.8s',
              '@media (max-width: 768px)': {
                fontSize: '.62rem',
                padding: '6px 10px',
                bottom: '5%',
                left: '-5%'
              }
            }}
          >
            ⚡ Django
          </div>
          
          <div
            className="tech-badge tech-badge-3"
            style={{
              position: 'absolute',
              background: 'rgba(10,10,10,.9)',
              border: '1px solid var(--border2)',
              borderRadius: '10px',
              padding: '8px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '.7rem',
              color: 'var(--green)',
              letterSpacing: '.05em',
              backdropFilter: 'blur(10px)',
              animation: 'float 3s ease-in-out infinite',
              whiteSpace: 'nowrap',
              top: '55%',
              right: '-22%',
              animationDelay: '1.6s'
            }}
          >
            🤖 LangChain
          </div>
          
          <div
            className="tech-badge tech-badge-4"
            style={{
              position: 'absolute',
              background: 'rgba(10,10,10,.9)',
              border: '1px solid var(--border2)',
              borderRadius: '10px',
              padding: '8px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '.7rem',
              color: 'var(--green)',
              letterSpacing: '.05em',
              backdropFilter: 'blur(10px)',
              animation: 'float 3s ease-in-out infinite',
              whiteSpace: 'nowrap',
              top: '-8%',
              left: '10%',
              animationDelay: '.4s'
            }}
          >
            🔗 RAG
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="scroll-hint hero-scroll-hint"
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '.65rem',
          letterSpacing: '.15em',
          color: 'var(--muted2)',
          zIndex: 2
        }}
      >
        <span>SCROLL</span>
        <div
          className="scroll-line"
          style={{
            width: '1px',
            height: '50px',
            background: 'linear-gradient(to bottom, var(--border2), transparent)',
            animation: 'scrollline 2s ease-in-out infinite'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,100% { transform: translateY(-50%) scale(1) }
          50% { transform: translateY(-50%) scale(1.08) }
        }
        @keyframes spin {
          to { transform: rotate(360deg) }
        }
        @keyframes float {
          0%,100% { transform: translateY(0) }
          50% { transform: translateY(-8px) }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        @keyframes scrollline {
          0%,100% { opacity: .3 }
          50% { opacity: 1 }
        }
      `}</style>
    </section>
  )
}

export default HeroSection
