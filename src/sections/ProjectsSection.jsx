import { useEffect, useRef, useState } from 'react'

const ProjectsSection = () => {
  const [visibleProjects, setVisibleProjects] = useState(new Set())
  const sectionRef = useRef(null)

  const projectsData = [
    {
      id: 1,
      emoji: '🤖',
      title: 'AI Document Assistant',
      description: 'RAG-powered chatbot that ingests PDFs and answers complex queries with cited sources — built on LangChain + FAISS with a DRF backend.',
      stack: ['Python', 'LangChain', 'RAG', 'OpenAI'],
      demoUrl: 'https://example.com',
      githubUrl: '#',
      bgGradient: 'radial-gradient(circle at 40% 60%,#00ff8830,transparent 70%)'
    },
    {
      id: 2,
      emoji: '⚡',
      title: 'E-Commerce API Platform',
      description: 'Scalable REST API serving 50k+ products with async order processing, JWT auth, payment webhooks, and sub-100ms response times.',
      stack: ['Django', 'DRF', 'Celery', 'Redis'],
      demoUrl: 'https://example.com',
      githubUrl: '#',
      bgGradient: 'radial-gradient(circle at 60% 40%,#00ffcc25,transparent 70%)'
    },
    {
      id: 3,
      emoji: '🔄',
      title: 'n8n Automation Suite',
      description: 'A collection of 20+ production automation workflows: lead scoring, AI email triage, CRM sync, and Slack alert bots. Zero code, full power.',
      stack: ['n8n', 'Python', 'OpenAI', 'Webhooks'],
      demoUrl: 'https://example.com',
      githubUrl: '#',
      bgGradient: 'radial-gradient(circle at 50% 50%,#00ff8820,transparent 70%)'
    },
    {
      id: 4,
      emoji: '📊',
      title: 'Analytics Microservice',
      description: 'High-throughput event ingestion service processing 1M+ events/day with real-time aggregation, alerting, and a query API.',
      stack: ['FastAPI', 'PostgreSQL', 'Docker'],
      demoUrl: 'https://example.com',
      githubUrl: '#',
      bgGradient: 'radial-gradient(circle at 30% 70%,#00ff8828,transparent 70%)'
    },
    {
      id: 5,
      emoji: '🧠',
      title: 'Autonomous AI Agent',
      description: 'Multi-step reasoning agent that plans, uses tools (search, code interpreter, APIs), and executes complex tasks with minimal human input.',
      stack: ['LangChain', 'Agents', 'Tools'],
      demoUrl: 'https://example.com',
      githubUrl: '#',
      bgGradient: 'radial-gradient(circle at 70% 30%,#00ffcc20,transparent 70%)'
    },
    {
      id: 6,
      emoji: '🔐',
      title: 'Auth & Permissions Engine',
      description: 'Enterprise-grade auth system with role-based access, OAuth2 social login, MFA, and audit logging — drop-in for any Django project.',
      stack: ['Django', 'JWT', 'OAuth2', 'DRF'],
      demoUrl: 'https://example.com',
      githubUrl: '#',
      bgGradient: 'radial-gradient(circle at 50% 80%,#00ff8822,transparent 70%)'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = entry.target.dataset.projectId
            if (projectId && !visibleProjects.has(projectId)) {
              setVisibleProjects(prev => new Set([...prev, projectId]))
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    const projectCards = sectionRef.current?.querySelectorAll('.project-card')
    projectCards?.forEach((card) => observer.observe(card))

    return () => {
      projectCards?.forEach((card) => observer.unobserve(card))
    }
  }, [visibleProjects])

  const handleDemoClick = (project) => {
    // This will trigger the global demo modal
    const event = new CustomEvent('openDemoModal', {
      detail: {
        url: project.demoUrl,
        title: project.title,
        description: project.description
      }
    })
    window.dispatchEvent(event)
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)'
      }}
    >
      <div
        className="projects-header reveal"
        style={{
          marginBottom: '56px',
          opacity: visibleProjects.size > 0 ? 1 : 0,
          transform: visibleProjects.size > 0 ? 'translateY(0)' : 'translateY(24px)',
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
          03 — Projects
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
          Things I've <span className="green" style={{ color: 'var(--green)' }}>Built</span>
        </h2>
        
        <p
          className="section-sub"
          style={{
            color: 'var(--muted)',
            fontSize: '1rem',
            maxWidth: '480px',
            lineHeight: 1.7
          }}
        >
          Real-world systems solving real-world problems.
        </p>
      </div>

      <div
        className="projects-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          '@media (max-width: 1024px)': {
            gridTemplateColumns: '1fr 1fr'
          },
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr'
          }
        }}
      >
        {projectsData.map((project, index) => (
          <div
            key={project.id}
            className="project-card reveal"
            data-project-id={project.id}
            data-demo-url={project.demoUrl}
            data-demo-title={project.title}
            data-demo-desc={project.description}
            style={{
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              transition: 'transform .35s cubic-bezier(.22,1,.36,1), border-color .3s, box-shadow .3s',
              display: 'flex',
              flexDirection: 'column',
              opacity: visibleProjects.has(project.id.toString()) ? 1 : 0,
              transform: visibleProjects.has(project.id.toString()) ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: `${index * 100}ms`
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-6px)'
              e.target.style.borderColor = 'var(--green)'
              e.target.style.boxShadow = '0 20px 50px rgba(0,0,0,.5), 0 0 20px rgba(0,255,136,.12)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.borderColor = 'var(--border)'
              e.target.style.boxShadow = 'none'
            }}
          >
            <div
              className="project-thumb"
              style={{
                height: '180px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3.5rem'
              }}
            >
              <div
                className="project-thumb-bg"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: project.bgGradient,
                  opacity: '.5',
                  transition: 'transform .6s'
                }}
              />
              <div
                className="project-thumb-emoji"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  filter: 'drop-shadow(0 0 20px rgba(0,255,136,.4))'
                }}
              >
                {project.emoji}
              </div>
            </div>
            
            <div
              className="project-body"
              style={{
                padding: '24px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                className="project-stack"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginBottom: '14px'
                }}
              >
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '.62rem',
                      color: 'var(--muted2)',
                      border: '1px solid var(--border2)',
                      padding: '3px 10px',
                      borderRadius: '99px',
                      letterSpacing: '.05em'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div
                className="project-title"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  marginBottom: '8px',
                  lineHeight: 1.2
                }}
              >
                {project.title}
              </div>
              
              <p
                className="project-desc"
                style={{
                  fontSize: '.88rem',
                  color: 'var(--muted)',
                  lineHeight: 1.65,
                  flex: 1,
                  marginBottom: '22px'
                }}
              >
                {project.description}
              </p>
              
              <div
                className="project-links"
                style={{
                  display: 'flex',
                  gap: '10px'
                }}
              >
                <button
                  className="btn-ghost green-ghost demo-trigger"
                  onClick={() => handleDemoClick(project)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '.7rem',
                    letterSpacing: '.06em',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: '.2s',
                    cursor: 'pointer',
                    background: 'rgba(0,255,136,.08)',
                    border: '1px solid var(--green-dim)',
                    color: 'var(--green)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(0,255,136,.18)'
                    e.target.style.boxShadow = 'var(--glow-sm)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(0,255,136,.08)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  <span className="demo-btn-icon" style={{ transition: 'transform .25s cubic-bezier(.34,1.56,.64,1)' }}>
                    ▶
                  </span>{' '}
                  Live Demo
                </button>
                
                <a
                  href={project.githubUrl}
                  className="btn-ghost plain-ghost"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '.7rem',
                    letterSpacing: '.06em',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: '.2s',
                    cursor: 'pointer',
                    background: 'transparent',
                    border: '1px solid var(--border2)',
                    color: 'var(--muted)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = 'var(--muted)'
                    e.target.style.color = 'var(--text)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = 'var(--border2)'
                    e.target.style.color = 'var(--muted)'
                  }}
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection
