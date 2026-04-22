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
      demoUrl: 'https://anythingchatbot.onrender.com',
      githubUrl: 'https://github.com/daCircuitSage/RAG-Document-Assistant',
      type: 'internal-preview',
      bgGradient: 'radial-gradient(circle at 40% 60%,#00ff8830,transparent 70%)'
    },
    {
      id: 2,
      emoji: '⚡',
      title: 'E-Commerce API Platform',
      description: 'Scalable REST API serving 50k+ products with async order processing, JWT auth, payment webhooks, and sub-100ms response times.',
      stack: ['Django', 'DRF', 'Celery'],
      demoUrl: 'https://thepacificmart.onrender.com',
      githubUrl: 'https://github.com/daCircuitSage/PACIFICMART',
      type: 'internal-preview',
      bgGradient: 'radial-gradient(circle at 60% 40%,#00ffcc25,transparent 70%)'
    },
    {
      id: 3,
      emoji: '🔄',
      title: 'MovieSummeryAI',
      description: 'An AI-powered movie analysis and summarization platform using LangChain, Mistral AI, and Streamlit.',
      stack: ['LangChain', 'Python', 'Mistral-AI', 'LLM'],
      demoUrl: 'https://dont-have-live-link.com',
      githubUrl: 'https://github.com/daCircuitSage/MovieSummeryAI',
      type: 'internal-preview',
      bgGradient: 'radial-gradient(circle at 50% 50%,#00ff8820,transparent 70%)'
    },
    {
      id: 4,
      emoji: '📊',
      title: 'E-Commerce Backed API Project',
      description: 'Fully working backed of an E-commerce system.',
      stack: ['REST API', 'Django', 'Python'],
      demoUrl: 'https://www.dont-have-live-link.com',
      githubUrl: 'https://github.com/daCircuitSage/DRF-Ecommerce-API',
      type: 'internal-preview',
      bgGradient: 'radial-gradient(circle at 30% 70%,#00ff8828,transparent 70%)'
    },
    {
      id: 5,
      emoji: '🧠',
      title: 'JWT Authentication',
      description: 'This project is basically on Jwt authentication only.',
      stack: ['REST API', 'Django', 'Python'],
      demoUrl: 'https://www.dont-have-live-link.org',
      githubUrl: 'https://github.com/daCircuitSage/E-commerce-REST-API-Project',
      type: 'internal-preview',
      bgGradient: 'radial-gradient(circle at 70% 30%,#00ffcc20,transparent 70%)'
    },
    {
      id: 6,
      emoji: '🔐',
      title: 'Auth & Permissions Engine (Coming soon — currently in learning phase)',
      description: 'Enterprise-grade auth system with role-based access, OAuth2 social login, MFA, and audit logging — drop-in for any Django project.',
      stack: ['Django', 'JWT', 'OAuth2', 'DRF'],
      demoUrl: 'https://stackoverflow.com',
      githubUrl: '#',
      type: 'internal-preview',
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
    const url = project.demoUrl.startsWith('http') ? project.demoUrl : `https://${project.demoUrl}`

    const event = new CustomEvent('openDemoModal', {
      detail: {
        url,
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
          gap: '24px'
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
      <style jsx>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
          }
          .project-card {
            border-radius: 12px !important;
          }
          .project-thumb {
            height: 140px !important;
          }
          .project-content {
            padding: 16px !important;
          }
          .project-title {
            font-size: .95rem !important;
            margin-bottom: 8px !important;
          }
          .project-desc {
            font-size: .8rem !important;
            margin-bottom: 12px !important;
          }
          .project-tags {
            gap: 4px !important;
            margin-bottom: 12px !important;
          }
          .project-tag {
            font-size: .6rem !important;
            padding: 2px 6px !important;
          }
          .project-links {
            gap: 8px !important;
          }
          .project-link {
            padding: 6px 12px !important;
            font-size: .7rem !important;
            min-height: 32px !important;
          }
        }
        @media (max-width: 480px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .project-thumb {
            height: 160px !important;
          }
          .project-content {
            padding: 16px !important;
          }
          .project-title {
            font-size: 1rem !important;
          }
          .project-desc {
            font-size: .85rem !important;
          }
          .project-tag {
            font-size: .65rem !important;
            padding: 3px 8px !important;
          }
          .project-link {
            padding: 8px 14px !important;
            font-size: .75rem !important;
            min-height: 36px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default ProjectsSection
