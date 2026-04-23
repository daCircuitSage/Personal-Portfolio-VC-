import { useEffect, useRef, useState } from 'react'

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ projects: 0, skills: 0, years: 0, commitment: 0 })
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const animateCounter = (target, key, duration = 2000) => {
      const start = 0
      const increment = target / (duration / 30)
      let current = start

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }))
      }, 30)

      return timer
    }

    const timers = [
      animateCounter(20, 'projects'),
      animateCounter(15, 'skills'),
      animateCounter(1, 'years'),
      animateCounter(99, 'commitment')
    ]

    return () => timers.forEach(timer => clearInterval(timer))
  }, [isVisible])

  const stats = [
    { 
      key: 'projects', 
      target: 20, 
      label: 'Projects Shipped',
      suffix: '+',
      delay: 0
    },
    { 
      key: 'skills', 
      target: 15, 
      label: 'Skills Mastered',
      suffix: '+',
      delay: 100
    },
    { 
      key: 'years', 
      target: 1, 
      label: 'Years Experience',
      suffix: '+',
      delay: 200
    },
    { 
      key: 'commitment', 
      target: 99, 
      label: '% Commit Rate',
      suffix: '%',
      delay: 300
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)'
      }}
    >
      <div className="about-text">
        <div
          className="section-label"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '.72rem',
            color: 'var(--green)',
            letterSpacing: '.15em',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}
        >
          01 — About
        </div>
        
        <h2
          className="section-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-.02em',
            marginBottom: '16px'
          }}
        >
          Turning Ideas Into<br /><span className="green" style={{ color: 'var(--green)' }}>Scalable Systems</span>
        </h2>
        
        <p
          style={{
            color: 'var(--muted)',
            lineHeight: 1.85,
            marginBottom: '18px',
            fontSize: '1rem'
          }}
        >
          I'm a backend developer and AI automation engineer who obsesses over <strong style={{ color: 'var(--text)', fontWeight: 500 }}>clean architecture, fast APIs, and intelligent workflows</strong>. My code doesn't just work — it scales, adapts, and delivers measurable value.
        </p>
        
        <p
          style={{
            color: 'var(--muted)',
            lineHeight: 1.85,
            marginBottom: '18px',
            fontSize: '1rem'
          }}
        >
          Specialising in <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Python/Django ecosystems</strong> and cutting-edge AI tooling like LangChain, RAG pipelines, and n8n automation, I bridge the gap between raw technical capability and real-world business outcomes.
        </p>
        
        <p
          style={{
            color: 'var(--muted)',
            lineHeight: 1.85,
            marginBottom: '18px',
            fontSize: '1rem'
          }}
        >
          Whether it's building an LLM-powered assistant, an automated data pipeline, or a high-throughput REST API — <strong style={{ color: 'var(--text)', fontWeight: 500 }}>I treat every problem as a system design challenge</strong>.
        </p>
      </div>

      <div
        className="stats-grid reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)'
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={stat.key}
            className="stat-card"
            style={{
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '28px 24px',
              transition: 'border-color .25s, box-shadow .25s, transform .25s',
              opacity: 0,
              transform: 'translateY(20px)',
              animation: isVisible ? `fadeInUp 0.6s ${stat.delay}ms forwards` : 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--green)'
              e.target.style.boxShadow = '0 0 20px rgba(0,255,136,.12)'
              e.target.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'var(--border)'
              e.target.style.boxShadow = 'none'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            <div
              className="stat-number"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.8rem',
                fontWeight: 800,
                color: 'var(--green)',
                lineHeight: 1,
                marginBottom: '6px'
              }}
            >
              {counters[stat.key]}{stat.suffix}
            </div>
            <div
              className="stat-label"
              style={{
                fontSize: '.82rem',
                color: 'var(--muted)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '.06em'
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 768px) {
          section {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding: 60px 4% !important;
          }
          .about-text {
            order: 2 !important;
          }
          .stats-grid {
            order: 1 !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .stat-card {
            padding: 20px 16px !important;
          }
          .stat-number {
            font-size: 2rem !important;
          }
          .stat-label {
            font-size: .75rem !important;
          }
          .section-title {
            font-size: 2.2rem !important;
          }
        }
        @media (max-width: 480px) {
          section {
            gap: 24px !important;
            padding: 48px 3% !important;
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }
          .stat-card {
            padding: 16px 12px !important;
          }
          .stat-number {
            font-size: 1.8rem !important;
          }
          .stat-label {
            font-size: .7rem !important;
          }
          .section-title {
            font-size: 1.8rem !important;
          }
        }
        @media (max-width: 360px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .stat-card {
            padding: 14px 10px !important;
          }
          .stat-number {
            font-size: 1.6rem !important;
          }
          .section-title {
            font-size: 1.6rem !important;
          }
        }
      `}</style>
    </section>
  )
}

export default AboutSection
