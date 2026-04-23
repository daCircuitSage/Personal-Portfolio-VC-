import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Zap, Terminal } from 'lucide-react'

// Circuit Pattern Component
const CircuitPattern = ({ isActive }) => {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 400 300">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g stroke={isActive ? "#22c55e" : "#333"} strokeWidth="1" fill="none">
        <motion.path
          d="M 50 50 L 150 50 L 150 100 L 250 100"
          animate={{
            strokeDashoffset: isActive ? [100, 0] : 100,
            stroke: isActive ? "#22c55e" : "#333"
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="energy-line"
        />
        <motion.path
          d="M 50 250 L 100 250 L 100 150 L 200 150"
          animate={{
            strokeDashoffset: isActive ? [100, 0] : 100,
            stroke: isActive ? "#22c55e" : "#333"
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 0.5 }}
          className="energy-line"
        />
        <motion.circle
          cx="250" cy="100" r="3"
          fill={isActive ? "#22c55e" : "#333"}
          animate={{ opacity: isActive ? [0.4, 1, 0.4] : 0.3 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </g>
    </svg>
  );
};

// Metric Item Component
const MetricItem = ({ label, value, unit, isActive }) => (
  <div className="space-y-1">
    <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest leading-none">{label}</div>
    <div className="flex items-baseline gap-1.5 leading-none">
      <motion.span 
        key={value}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`text-lg font-bold tracking-tighter transition-colors duration-500 ${isActive ? 'text-white' : 'text-zinc-800'}`}
      >
        {isActive ? value : '---'}
      </motion.span>
      <span className={`text-[8px] font-mono transition-colors duration-500 ${isActive ? 'text-[#00FF41]' : 'text-zinc-800'}`}>
        {unit}
      </span>
    </div>
  </div>
);

const TimepassSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isPlugged, setIsPlugged] = useState(false)
  const [isPoweringUp, setIsPoweringUp] = useState(false)
  const [metrics, setMetrics] = useState({ requests: 0, load: 0, uptime: 99.982 })
  const [isMobile, setIsMobile] = useState(false)
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

    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    let interval
    if (isPoweringUp) {
      interval = setInterval(() => {
        setMetrics(prev => ({
          requests: Math.floor(Math.random() * 500) + 1200,
          load: Math.floor(Math.random() * 15) + 42,
          uptime: Math.min(99.999, prev.uptime + 0.0001)
        }))
      }, isMobile ? 200 : 100) // Slower updates on mobile
    } else {
      setMetrics({ requests: 0, load: 0, uptime: 99.982 })
    }
    return () => clearInterval(interval)
  }, [isPoweringUp, isMobile])

  const handleInteractionStart = () => {
    setIsPlugged(true)
    setTimeout(() => setIsPoweringUp(true), 450)
  }

  const handleInteractionEnd = () => {
    setIsPlugged(false)
    setIsPoweringUp(false)
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
          marginBottom: '60px'
        }}>
          <div className="section-label" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '.75rem',
            color: 'var(--green)',
            letterSpacing: '.15em',
            marginBottom: '16px',
            textTransform: 'uppercase'
          }}>
            05 - Interactive Core
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--text)',
            marginBottom: '24px',
            fontWeight: 600,
            lineHeight: 1.2
          }}>
            Power Core Interface
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'var(--muted)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Interactive hardware simulation with real-time metrics and dynamic power connection system.
          </p>
        </div>

        <div style={{
          position: 'relative',
          width: '100%',
          height: isMobile ? '500px' : '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '20px' : '0'
        }}
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        >
          {/* Environmental Lighting */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.1,
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 40%, rgba(34, 197, 94, 0.05), transparent)',
            pointerEvents: 'none'
          }} />

          {/* Main 3D Stage */}
          <motion.div 
            style={{ 
              transformStyle: 'preserve-3d',
              perspective: isMobile ? '1000px' : '2000px'
            }}
            animate={{ 
              rotateX: isMobile ? (isPoweringUp ? 15 : 18) : (isPoweringUp ? 32 : 35), 
              rotateZ: isMobile ? (isPoweringUp ? -2 : -3) : (isPoweringUp ? -4 : -5),
              y: isPoweringUp ? (isMobile ? 5 : 10) : 0
            }}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.7s ease-out'
            }}
          >
            
            {/* The Hardware Module (3D Card) */}
            <motion.div 
              style={{
                position: 'relative',
                width: isMobile ? '90vw' : '440px',
                maxWidth: isMobile ? '350px' : '440px',
                height: isMobile ? '280px' : '300px',
                background: '#0a0a0a',
                borderRadius: '16px',
                borderTop: '1px solid #333',
                borderLeft: '1px solid #333',
                display: 'flex',
                flexDirection: 'column',
                padding: isMobile ? '20px' : '32px',
                overflow: 'hidden',
                boxShadow: `
                  -8px 8px 0px #09090b,
                  -20px 20px 40px rgba(0,0,0,0.8),
                  ${isPoweringUp ? '0 0 40px -20px rgba(0, 255, 65, 0.3)' : 'none'}
                `,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Internal Glowing Core */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 20% 30%, rgba(24, 24, 24, 0.4), transparent)',
                pointerEvents: 'none'
              }} />
              <CircuitPattern isActive={isPoweringUp} />

              {/* Module Content */}
              <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                <header style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px' }}>
                      <div style={{
                        width: isMobile ? '6px' : '8px',
                        height: isMobile ? '6px' : '8px',
                        borderRadius: '50%',
                        background: isPoweringUp ? '#00FF41' : '#1a1a1a',
                        boxShadow: isPoweringUp ? '0 0 10px #00FF41' : 'none'
                      }} />
                      <h2 style={{
                        fontSize: isMobile ? '16px' : '20px',
                        fontWeight: 'bold',
                        letterSpacing: '-0.05em',
                        color: '#f4f4f5',
                        textTransform: 'uppercase'
                      }}>
                        Synapse_B12
                      </h2>
                    </div>
                    <p style={{
                      fontSize: isMobile ? '8px' : '10px',
                      fontFamily: 'monospace',
                      color: '#71717a',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase'
                    }}>
                      Core Backend Engine
                    </p>
                  </div>
                  <Terminal style={{
                    width: isMobile ? '16px' : '20px',
                    height: isMobile ? '16px' : '20px',
                    color: isPoweringUp ? '#22c55e' : '#404040'
                  }} />
                </header>

                {/* Live Metrics */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: isMobile ? '20px 24px' : '32px 48px',
                  paddingTop: isMobile ? '20px' : '32px',
                  borderTop: '1px solid #18181b'
                }}>
                  <MetricItem 
                    label="Stream_Rate" 
                    value={`${metrics.requests}`} 
                    unit="REQ/S" 
                    isActive={isPoweringUp} 
                  />
                  <MetricItem 
                    label="CPU_Load" 
                    value={`${metrics.load}`} 
                    unit="%" 
                    isActive={isPoweringUp} 
                  />
                  <MetricItem 
                    label="Uptime" 
                    value={metrics.uptime.toFixed(3)} 
                    unit="%" 
                    isActive={isPoweringUp} 
                  />
                  <MetricItem 
                    label="Nodes" 
                    value={isPoweringUp ? "12/12" : "0/12"} 
                    unit="ONLINE" 
                    isActive={isPoweringUp} 
                  />
                </div>
              </div>

              {/* Connection Slot */}
              <div style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: isMobile ? '24px' : '32px',
                height: isMobile ? '72px' : '96px',
                background: '#000',
                borderLeft: '1px solid #27272a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '4px'
              }}>
                <div style={{
                  width: isMobile ? '3px' : '4px',
                  height: isMobile ? '36px' : '48px',
                  borderRadius: '2px',
                  background: isPoweringUp ? '#00FF41' : '#18181b',
                  transition: 'background 0.5s ease'
                }} />
              </div>
            </motion.div>

            {/* The Power Connector (3D Plug) */}
            <div style={{
              position: 'relative',
              marginLeft: '-20px',
              transform: 'translateZ(40px)',
              transformStyle: 'preserve-3d'
            }}>
              <motion.div
                animate={{ 
                  x: isPlugged ? -25 : 80,
                  z: isPlugged ? -10 : 0,
                  rotateY: isPlugged ? 0 : -5
                }}
                transition={{ type: "spring", stiffness: isPlugged ? 180 : 120, damping: 20 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* The main plug body */}
                <div 
                  style={{
                    position: 'relative',
                    width: isMobile ? '120px' : '160px',
                    height: isMobile ? '90px' : '112px',
                    background: '#18181b',
                    border: '1px solid #404040',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    boxShadow: `
                      -15px 15px 30px rgba(0,0,0,0.6),
                      ${isPoweringUp ? '0 0 20px -5px rgba(0, 255, 65, 0.2)' : 'none'}
                    `,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {/* Energy Rail */}
                  <div style={{
                    width: '12px',
                    height: '100%',
                    background: isPoweringUp ? '#00FF41' : '#27272a',
                    boxShadow: isPoweringUp ? '0 0 10px #00FF41' : 'none',
                    transition: 'all 0.5s ease',
                    position: 'absolute',
                    left: 0
                  }} />
                  
                  <div style={{
                    padding: isMobile ? '0 16px' : '0 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    textAlign: 'center'
                  }}>
                    <Zap style={{
                      width: isMobile ? '24px' : '32px',
                      height: isMobile ? '24px' : '32px',
                      color: isPoweringUp ? '#00FF41' : '#52525b',
                      filter: isPoweringUp ? 'drop-shadow(0 0 5px #00FF41)' : 'none',
                      transition: 'color 0.5s ease'
                    }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{
                        fontSize: isMobile ? '6px' : '8px',
                        fontFamily: 'monospace',
                        color: '#71717a',
                        letterSpacing: '-0.05em',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap'
                      }}>
                        Source_Prime_A
                      </div>
                      <div style={{
                        fontSize: isMobile ? '7px' : '9px',
                        fontWeight: 'bold',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: isPoweringUp ? '#ffffff' : '#404040',
                        transition: 'color 0.5s ease'
                      }}>
                        Active_Source
                      </div>
                    </div>
                  </div>

                  {/* Side Panels */}
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '1px',
                    background: 'rgba(255, 255, 255, 0.1)'
                  }} />
                </div>

                {/* Connector Pin */}
                <div style={{
                  position: 'absolute',
                  left: '-60px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '64px',
                  height: '48px',
                  background: '#a1a1aa',
                  borderRadius: '6px',
                  zIndex: -10,
                  display: isMobile ? 'none' : 'block' // Hide on mobile
                }} />

                {/* Spark Emission */}
                <AnimatePresence>
                  {isPlugged && !isPoweringUp && !isMobile && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }}
                      exit={{ scale: 0, opacity: 0 }}
                      style={{
                        position: 'absolute',
                        left: '-120px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '40px',
                        height: '40px',
                        background: 'white',
                        borderRadius: '50%',
                        filter: 'blur(8px)',
                        zIndex: 30
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Cable */}
                <div style={{
                  position: 'absolute',
                  left: '100%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  paddingLeft: 0,
                  pointerEvents: 'none',
                  display: isMobile ? 'none' : 'block' // Hide on mobile
                }}>
                  <div style={{
                    width: '800px',
                    height: '12px',
                    background: 'linear-gradient(to right, #27272a, transparent)'
                  }} />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Meta Labels */}
          <div style={{
            position: 'absolute',
            top: isMobile ? '24px' : '48px',
            left: isMobile ? '24px' : '48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <h1 style={{
              fontSize: isMobile ? '24px' : '36px',
              fontWeight: 'bold',
              letterSpacing: '-0.05em',
              color: '#ffffff'
            }}>
              ELIAS_VANCE
            </h1>
            <p style={{
              fontFamily: 'monospace',
              fontSize: isMobile ? '7px' : '9px',
              color: '#00FF41',
              textTransform: 'uppercase',
              letterSpacing: '0.4em'
            }}>
              Systems Engineering // Backend Architect
            </p>
          </div>

          <div style={{
            position: 'absolute',
            bottom: isMobile ? '24px' : '48px',
            right: isMobile ? '24px' : '48px',
            textAlign: 'right'
          }}>
            <p style={{
              fontSize: isMobile ? '7px' : '9px',
              fontFamily: 'monospace',
              color: '#71717a',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '8px'
            }}>
              Protocol Deployment v4.0
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'flex-end'
            }}>
              <div style={{
                width: '32px',
                height: '4px',
                background: '#18181b',
                overflow: 'hidden'
              }}>
                <motion.div 
                  style={{
                    height: '100%',
                    background: '#22c55e'
                  }}
                  animate={{ width: isPoweringUp ? '100%' : '0%' }}
                />
              </div>
              <div style={{
                width: '32px',
                height: '4px',
                background: '#18181b'
              }} />
            </div>
          </div>

          <div style={{
            position: 'absolute',
            bottom: isMobile ? '24px' : '48px',
            left: isMobile ? '24px' : '48px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isPoweringUp ? '#22c55e' : '#18181b',
              animation: isPoweringUp ? 'pulse 2s infinite' : 'none'
            }} />
            <span style={{
              fontSize: isMobile ? '8px' : '10px',
              fontFamily: 'monospace',
              color: '#71717a',
              textTransform: 'uppercase',
              letterSpacing: '0.15em'
            }}>
              {isPoweringUp ? 'System Online' : 'Idle State'}
            </span>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: isMobile ? '40px' : '60px',
          padding: isMobile ? '0 20px' : '0'
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: isMobile ? '.8rem' : '.9rem',
            color: 'var(--muted)',
            fontStyle: 'italic',
            lineHeight: 1.4
          }}>
            {isMobile ? 
              'Tap and hold to connect power' : 
              'Click and hold to connect the power source and activate the core system'
            }
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  )
}

export default TimepassSection
