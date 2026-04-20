import { useState, useEffect, useRef } from 'react'

const TimepassSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const openGameModal = () => {
    // This will open the game in the demo modal
    const event = new CustomEvent('openDemoModal', {
      detail: {
        title: 'VOID STRIKER',
        description: 'An intense wave-based survival shooter with multiple enemy types and particle effects',
        url: '/2d_shooter_game.html'
      }
    })
    window.dispatchEvent(event)
  }

  return (
    <section id="timepass" ref={sectionRef} style={{
      minHeight: '100vh',
      padding: '120px 5%',
      background: 'var(--bg)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="reveal" style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <div className="section-label" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '.75rem',
            color: 'var(--green)',
            letterSpacing: '.15em',
            marginBottom: '16px',
            textTransform: 'uppercase'
          }}>
            05 - Timepass
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--text)',
            marginBottom: '24px',
            fontWeight: 600,
            lineHeight: 1.2
          }}>
            Take a Break & Play
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'var(--muted)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Sometimes you need a break from coding. Here's a fun 2D shooter game I built to unwind and have some fun!
          </p>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '40px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, var(--green), var(--green2))'
            }}></div>
            
            <div style={{
              fontSize: '3rem',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <span style={{
                display: 'inline-block',
                padding: '16px 24px',
                background: 'var(--green-dim)',
                borderRadius: '12px',
                fontSize: '2.5rem'
              }}>
                <span style={{ filter: 'hue-rotate(0deg)' }}>{'\ud83c\udfae'}</span>
              </span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              color: 'var(--text)',
              marginBottom: '16px',
              textAlign: 'center',
              fontWeight: 600
            }}>
              VOID STRIKER
            </h3>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--muted)',
              lineHeight: 1.6,
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              An intense wave-based survival shooter with multiple enemy types, 
              particle effects, and progressive difficulty. How long can you survive?
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '.9rem',
                color: 'var(--muted2)'
              }}>
                <span style={{ color: 'var(--green)' }}>{'>'}</span>
                <span>Wave-based survival gameplay</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '.9rem',
                color: 'var(--muted2)'
              }}>
                <span style={{ color: 'var(--green)' }}>{'>'}</span>
                <span>Multiple enemy types (Normal, Tank, Fast)</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '.9rem',
                color: 'var(--muted2)'
              }}>
                <span style={{ color: 'var(--green)' }}>{'>'}</span>
                <span>Health & particle effects system</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '.9rem',
                color: 'var(--muted2)'
              }}>
                <span style={{ color: 'var(--green)' }}>{'>'}</span>
                <span>Mouse aiming & touch controls</span>
              </div>
            </div>

            <button
              onClick={openGameModal}
              style={{
                width: '100%',
                fontFamily: 'var(--font-mono)',
                fontSize: '.85rem',
                color: 'var(--black)',
                background: 'var(--green)',
                border: 'none',
                padding: '14px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                letterSpacing: '.08em',
                fontWeight: 600,
                transition: 'background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                textTransform: 'uppercase'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--green2)'
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 8px 24px rgba(0, 255, 136, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'var(--green)'
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              Play Game
            </button>
          </div>

          <div style={{
            background: 'var(--bg3)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '40px',
            position: 'relative'
          }}>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              color: 'var(--text)',
              marginBottom: '20px',
              fontWeight: 600
            }}>
              How to Play
            </h4>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'var(--green-dim)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '.9rem',
                  color: 'var(--green)',
                  flexShrink: 0
                }}>
                  1
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text)',
                    marginBottom: '4px',
                    fontWeight: 500
                  }}>
                    WASD/Arrows to Move
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '.9rem',
                    color: 'var(--muted)',
                    lineHeight: 1.5
                  }}>
                    Navigate your ship through waves of enemies
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'var(--green-dim)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '.9rem',
                  color: 'var(--green)',
                  flexShrink: 0
                }}>
                  2
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text)',
                    marginBottom: '4px',
                    fontWeight: 500
                  }}>
                    Mouse to Aim & Click to Shoot
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '.9rem',
                    color: 'var(--muted)',
                    lineHeight: 1.5
                  }}>
                    Aim with your mouse and click (or Space) to fire at enemies
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'var(--green-dim)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '.9rem',
                  color: 'var(--green)',
                  flexShrink: 0
                }}>
                  3
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text)',
                    marginBottom: '4px',
                    fontWeight: 500
                  }}>
                    Survive the Waves
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '.9rem',
                    color: 'var(--muted)',
                    lineHeight: 1.5
                  }}>
                    Each wave brings more enemies. Manage your health and watch out for Tanks!
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '32px',
              padding: '20px',
              background: 'var(--bg2)',
              borderRadius: '12px',
              border: '1px solid var(--border)'
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '.85rem',
                color: 'var(--muted)',
                textAlign: 'center',
                fontStyle: 'italic',
                marginBottom: '8px'
              }}>
                Pro tip: Target Fast enemies first, they're quick but fragile!
              </p>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '.8rem',
                color: 'var(--muted2)',
                textAlign: 'center'
              }}>
                Built with pure JavaScript and HTML5 Canvas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TimepassSection
