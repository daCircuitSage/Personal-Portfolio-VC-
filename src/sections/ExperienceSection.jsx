import { useEffect, useRef, useState } from 'react'

const ExperienceSection = () => {
  const [visibleItems, setVisibleItems] = useState(new Set())
  const sectionRef = useRef(null)

  const timelineData = [
    {
      date: '2025',
      role: 'Software Engineering Intern',
      company: 'BDCaLLing',
      description: 'Contributed to client-based projects, assisted in backend development, API integration, and team collaboration.',
      tags: ['Python', 'OOP', 'Django', 'REST APIs']
    },
    {
      date: 'Oct 2025',
      role: 'Team Project (Client Work)',
      company: 'Django + REST APIs',
      description: 'Worked with a team to build a portfolio website for BroEditz agency based on client requirements, focusing on development and collaboration.',
      tags: ['Django', 'DRF', 'PostgreSQL', 'Celery']
    },
    {
      date: '2026',
      role: 'Self-Learning – AI Automation & Backend Development',
      company: 'Freelance / Open Source',
      description: 'Continuously learning AI automation and backend technologies with a focus on Python-based tools and workflow automation. Built foundational understanding of APIs, automation logic, and AI-assisted development practices through self-study and practical experimentation in small projects.',
      tags: ['LangChain', 'RAG', 'OpenAI', 'Agents']
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.dataset.itemId
            if (itemId && !visibleItems.has(itemId)) {
              setVisibleItems(prev => new Set([...prev, itemId]))
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    const items = sectionRef.current?.querySelectorAll('.tl-item')
    items?.forEach((item, index) => {
      item.dataset.itemId = `item-${index}`
      item.style.transitionDelay = `${index * 0.12}s`
      observer.observe(item)
    })

    return () => {
      items?.forEach((item) => observer.unobserve(item))
    }
  }, [visibleItems])

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)'
      }}
    >
      <div
        className="reveal"
        style={{
          opacity: visibleItems.size > 0 ? 1 : 0,
          transform: visibleItems.size > 0 ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)'
        }}
      >
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
          04 — Journey
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
          The <span className="green" style={{ color: 'var(--green)' }}>Timeline</span>
        </h2>
      </div>

      <div
        className="timeline"
        style={{
          position: 'relative',
          maxWidth: '760px',
          margin: '56px auto 0',
          paddingLeft: '32px',
          '@media (max-width: 768px)': {
            paddingLeft: '28px',
            marginTop: '40px'
          },
          '@media (max-width: 480px)': {
            paddingLeft: '24px'
          }
        }}
      >
        {/* Timeline line */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, var(--green), transparent)'
          }}
        />

        {timelineData.map((item, index) => (
          <div
            key={index}
            className="tl-item"
            data-item-id={`item-${index}`}
            style={{
              position: 'relative',
              marginBottom: '52px',
              opacity: visibleItems.has(`item-${index}`) ? 1 : 0,
              transform: visibleItems.has(`item-${index}`) ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'opacity .6s, transform .6s',
              transitionDelay: `${index * 0.12}s`
            }}
          >
            {/* Timeline dot */}
            <div
              className="tl-dot"
              style={{
                position: 'absolute',
                left: '-38px',
                top: '4px',
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                background: 'var(--bg)',
                border: '2px solid var(--green)',
                boxShadow: 'var(--glow-sm)',
                '@media (max-width: 768px)': {
                  left: '-34px'
                },
                '@media (max-width: 480px)': {
                  left: '-30px',
                  width: '11px',
                  height: '11px'
                }
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '3px',
                  background: 'var(--green)',
                  borderRadius: '50%'
                }}
              />
            </div>

            {/* Date */}
            <div
              className="tl-date"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '.68rem',
                color: 'var(--green)',
                letterSpacing: '.1em',
                marginBottom: '8px'
              }}
            >
              {item.date}
            </div>

            {/* Role */}
            <div
              className="tl-role"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                marginBottom: '4px',
                '@media (max-width: 480px)': {
                  fontSize: '1.05rem'
                }
              }}
            >
              {item.role}
            </div>

            {/* Company */}
            <div
              className="tl-company"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '.78rem',
                color: 'var(--muted)',
                marginBottom: '12px',
                letterSpacing: '.04em'
              }}
            >
              {item.company}
            </div>

            {/* Description */}
            <p
              className="tl-desc"
              style={{
                fontSize: '.9rem',
                color: 'var(--muted)',
                lineHeight: 1.75
              }}
            >
              {item.description}
            </p>

            {/* Tags */}
            <div
              className="tl-tags"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: '14px'
              }}
            >
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="tl-tag"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '.64rem',
                    color: 'var(--muted2)',
                    border: '1px solid var(--border)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    letterSpacing: '.04em'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .timeline {
            gap: 24px !important;
          }
          .tl-item {
            gap: 16px !important;
            flex-direction: column !important;
          }
          .tl-date {
            min-width: auto !important;
            font-size: .75rem !important;
            margin-bottom: 8px !important;
          }
          .tl-content {
            padding: 16px !important;
          }
          .tl-title {
            font-size: 1rem !important;
            margin-bottom: 6px !important;
          }
          .tl-desc {
            font-size: .85rem !important;
            margin-bottom: 12px !important;
          }
          .tl-tags {
            flex-wrap: wrap !important;
            gap: 6px !important;
          }
          .tl-tag {
            font-size: .6rem !important;
            padding: 3px 8px !important;
          }
        }
        @media (max-width: 480px) {
          .timeline {
            gap: 20px !important;
          }
          .tl-date {
            font-size: .7rem !important;
          }
          .tl-content {
            padding: 14px !important;
          }
          .tl-title {
            font-size: .95rem !important;
          }
          .tl-desc {
            font-size: .8rem !important;
          }
          .tl-tag {
            font-size: .55rem !important;
            padding: 2px 6px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default ExperienceSection
