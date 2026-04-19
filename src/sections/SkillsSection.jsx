import { useEffect, useRef, useState } from 'react'

const SkillsSection = () => {
  const [visibleCategories, setVisibleCategories] = useState(new Set())
  const [animatedBars, setAnimatedBars] = useState(new Set())
  const sectionRef = useRef(null)

  const skillsData = [
    {
      icon: '🐍',
      name: 'Backend Development',
      description: 'Robust server-side systems built for scale, security, and developer sanity.',
      tags: ['Python', 'Django', 'DRF', 'FastAPI', 'PostgreSQL', 'Redis'],
      skills: [
        { name: 'Python', level: 95 },
        { name: 'Django / DRF', level: 90 },
        { name: 'FastAPI', level: 80 }
      ]
    },
    {
      icon: '🤖',
      name: 'AI & Automation',
      description: 'LLM orchestration, autonomous agents, and RAG systems that think and act.',
      tags: ['LangChain', 'OpenAI API', 'RAG', 'n8n', 'Embeddings', 'Agents'],
      skills: [
        { name: 'LangChain', level: 88 },
        { name: 'RAG Pipelines', level: 85 },
        { name: 'n8n Automation', level: 80 }
      ]
    },
    {
      icon: '🛠',
      name: 'DevOps & Tools',
      description: 'Modern toolchains for shipping fast, safely, and with confidence.',
      tags: ['Docker', 'Git', 'GitHub', 'Postman', 'Linux', 'Celery'],
      skills: [
        { name: 'Git / GitHub', level: 92 },
        { name: 'Docker', level: 75 },
        { name: 'Celery / Redis', level: 82 }
      ]
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const categoryId = entry.target.dataset.categoryId
            if (categoryId && !visibleCategories.has(categoryId)) {
              setVisibleCategories(prev => new Set([...prev, categoryId]))
              
              // Animate skill bars after a short delay
              setTimeout(() => {
                setAnimatedBars(prev => new Set([...prev, categoryId]))
              }, 300)
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    const categories = sectionRef.current?.querySelectorAll('.skill-cat')
    categories?.forEach((cat) => observer.observe(cat))

    return () => {
      categories?.forEach((cat) => observer.unobserve(cat))
    }
  }, [visibleCategories])

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        background: 'var(--bg)'
      }}
    >
      <div
        className="skills-header"
        style={{
          textAlign: 'center',
          marginBottom: '60px'
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
            marginBottom: '16px',
            justifyContent: 'center'
          }}
        >
          02 — Capabilities
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
          What I <span className="green" style={{ color: 'var(--green)' }}>Build With</span>
        </h2>
        
        <p
          className="section-sub"
          style={{
            color: 'var(--muted)',
            fontSize: '1rem',
            maxWidth: '480px',
            lineHeight: 1.7,
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          A curated stack built for performance, intelligence, and production-grade reliability.
        </p>
      </div>

      <div
        className="skills-cats"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}
      >
        {skillsData.map((category, index) => (
          <div
            key={category.name}
            className="skill-cat reveal"
            data-category-id={category.name}
            style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px 28px',
              transition: 'border-color .3s, box-shadow .3s, transform .3s',
              opacity: visibleCategories.has(category.name) ? 1 : 0,
              transform: visibleCategories.has(category.name) ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: `${index * 100}ms`,
              '@media (max-width: 480px)': {
                padding: '24px 20px'
              }
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--green)'
              e.target.style.boxShadow = '0 0 30px rgba(0,255,136,.08)'
              e.target.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'var(--border)'
              e.target.style.boxShadow = 'none'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            <div
              className="skill-cat-icon"
              style={{
                width: '44px',
                height: '44px',
                background: 'rgba(0,255,136,.08)',
                border: '1px solid var(--green-dim)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                marginBottom: '18px'
              }}
            >
              {category.icon}
            </div>
            
            <div
              className="skill-cat-name"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '6px'
              }}
            >
              {category.name}
            </div>
            
            <div
              className="skill-cat-desc"
              style={{
                fontSize: '.82rem',
                color: 'var(--muted)',
                marginBottom: '22px',
                lineHeight: 1.6
              }}
            >
              {category.description}
            </div>
            
            <div
              className="skill-tags"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '24px'
              }}
            >
              {category.tags.map((tag) => (
                <span
                  key={tag}
                  className="skill-tag"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '.68rem',
                    color: 'var(--green)',
                    border: '1px solid var(--green-dim)',
                    padding: '5px 12px',
                    borderRadius: '99px',
                    background: 'rgba(0,255,136,.04)',
                    letterSpacing: '.06em',
                    transition: 'background .2s, box-shadow .2s',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(0,255,136,.12)'
                    e.target.style.boxShadow = '0 0 10px rgba(0,255,136,.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(0,255,136,.04)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              className="skill-bar-list"
              style={{
                marginTop: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-bar-item"
                >
                  <div
                    className="skill-bar-meta"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '6px'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '.72rem',
                        color: 'var(--text)',
                        letterSpacing: '.04em'
                      }}
                    >
                      {skill.name}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '.68rem',
                        color: 'var(--green)'
                      }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div
                    className="skill-bar-track"
                    style={{
                      height: '3px',
                      background: 'var(--border2)',
                      borderRadius: '99px',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      className="skill-bar-fill"
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--green), var(--green2))',
                        borderRadius: '99px',
                        width: animatedBars.has(category.name) ? `${skill.level}%` : '0%',
                        transition: 'width 1.5s cubic-bezier(.22,1,.36,1)',
                        boxShadow: '0 0 6px var(--green)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection
