import { useState, useEffect, useRef } from 'react'

const DemoModal = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const [currentTitle, setCurrentTitle] = useState('')
  const [statusMessage, setStatusMessage] = useState('Ready')
  
  const iframeRef = useRef(null)
  const loadTimerRef = useRef(null)
  const blockedTimerRef = useRef(null)

  useEffect(() => {
    const handleOpenDemo = (event) => {
      const { url, title, description } = event.detail
      openModal(url, title, description)
    }

    window.addEventListener('openDemoModal', handleOpenDemo)
    return () => window.removeEventListener('openDemoModal', handleOpenDemo)
  }, [])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const showLoader = () => {
    setIsLoading(true)
    setIsBlocked(false)
    if (iframeRef.current) {
      iframeRef.current.style.opacity = '0'
    }
    setStatusMessage('Loading preview...')
  }

  const showIframe = () => {
    setIsLoading(false)
    setIsBlocked(false)
    if (iframeRef.current) {
      iframeRef.current.style.opacity = '1'
    }
    setStatusMessage('Preview loaded')
  }

  const showBlocked = () => {
    setIsLoading(false)
    setIsBlocked(true)
    if (iframeRef.current) {
      iframeRef.current.style.opacity = '0'
    }
    setStatusMessage('Preview blocked by remote server')
  }

  const blockedEmbedDomains = [
    'google.com',
    'youtube.com',
    'wikipedia.org',
    'stackoverflow.com',
    'twitter.com',
    'facebook.com',
    'linkedin.com',
    'instagram.com',
    'github.com'
  ]

  const isEmbedBlockedDomain = (url) => {
    return blockedEmbedDomains.some((domain) => url.includes(domain))
  }

  const setupLoadDetection = (url) => {
    if (loadTimerRef.current) clearTimeout(loadTimerRef.current)
    if (blockedTimerRef.current) clearTimeout(blockedTimerRef.current)

    showLoader()

    const iframe = iframeRef.current
    if (!iframe) return

    iframe.onload = () => {
      setTimeout(() => {
        let blocked = false
        try {
          const doc = iframe.contentDocument || iframe.contentWindow.document
          if (!doc || doc.body === null || doc.body.innerHTML.trim() === '') {
            blocked = true
          }
        } catch (e) {
          // Cross-origin SecurityError means the page loaded cross-origin.
          // We still want to show the iframe unless we explicitly know the domain is blocked.
          blocked = false
        }
        
        if (blocked) {
          showBlocked()
        } else {
          showIframe()
        }
        
        if (blockedTimerRef.current) clearTimeout(blockedTimerRef.current)
      }, 800)
    }

    iframe.onerror = () => {
      // This handles X-Frame-Options: DENY and other blocking errors
      showBlocked()
      if (blockedTimerRef.current) clearTimeout(blockedTimerRef.current)
    }

    // Hard fallback: if nothing happens in 8s, assume blocked
    blockedTimerRef.current = setTimeout(() => {
      if (isLoading) showBlocked()
    }, 8000)
  }

  const openModal = (url, title, description) => {
    setCurrentUrl(url)
    setCurrentTitle(title)
    
    const isBlockedDomain = isEmbedBlockedDomain(url)

    // Reset states
    setIsBlocked(false)
    setIsLoading(!isBlockedDomain)
    setIsMounted(true)
    document.body.style.overflow = 'hidden'

    setTimeout(() => {
      setIsOpen(true)
      setStatusMessage('Connecting to ' + url.replace(/^https?:\/\//, '').split('/')[0] + '...')

      if (isBlockedDomain) {
        setIsBlocked(true)
        setIsLoading(false)
        return
      }

      setupLoadDetection(url)
      if (iframeRef.current) {
        iframeRef.current.src = url
      }
    }, 20)
  }

  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = ''

    // Clear iframe after transition to free resources and unmount
    setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.src = 'about:blank'
        iframeRef.current.onload = null
        iframeRef.current.onerror = null
      }
      if (loadTimerRef.current) clearTimeout(loadTimerRef.current)
      if (blockedTimerRef.current) clearTimeout(blockedTimerRef.current)
      showLoader()
      setIsMounted(false)
    }, 420)
  }

  const reloadIframe = () => {
    if (!currentUrl) return
    showLoader()
    if (iframeRef.current) {
      iframeRef.current.src = 'about:blank'
      setTimeout(() => {
        setupLoadDetection(currentUrl)
        iframeRef.current.src = currentUrl
      }, 100)
    }
  }

  const openInNewTab = () => {
    if (currentUrl) {
      window.open(currentUrl, '_blank', 'noopener')
    }
  }

  if (!isMounted) return null

  return (
    <div
      id="demo-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Project Demo Preview"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 8000,
        background: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(18px) saturate(0.6)',
        WebkitBackdropFilter: 'blur(18px) saturate(0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        transition: 'opacity .35s cubic-bezier(.4,0,.2,1), visibility .35s cubic-bezier(.4,0,.2,1)',
        '@media (max-width: 768px)': {
          padding: 0,
          alignItems: 'stretch'
        }
      }}
    >
      <div
        id="demo-modal"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1080px',
          height: '90vh',
          maxHeight: '820px',
          background: 'rgba(14, 14, 14, 0.95)',
          border: '1px solid rgba(0, 255, 136, 0.25)',
          borderRadius: '20px',
          boxShadow: `
            0 0 0 1px rgba(0,255,136,.08),
            0 0 60px rgba(0,255,136,.12),
            0 40px 100px rgba(0,0,0,.7)
          `,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(20px)',
          transition: 'transform .4s cubic-bezier(.34,1.3,.64,1)',
          willChange: 'transform',
          '@media (max-width: 768px)': {
            maxWidth: '100%',
            maxHeight: '100%',
            height: '100%',
            borderRadius: 0,
            border: 'none'
          }
        }}
      >
        {/* Browser chrome header */}
        <div
          id="demo-header"
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            height: '52px',
            background: 'rgba(8,8,8,.98)',
            borderBottom: '1px solid rgba(0,255,136,.12)',
            flexShrink: 0,
            padding: '0 16px',
            userSelect: 'none',
            '@media (max-width: 480px)': {
              padding: '0 10px',
              gap: 0,
              height: '48px'
            }
          }}
        >
          {/* Traffic lights */}
          <div
            className="demo-traffic"
            aria-hidden="true"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              marginRight: '14px',
              flexShrink: 0,
              '@media (max-width: 480px)': {
                marginRight: '8px',
                gap: '5px'
              }
            }}
          >
            <span
              onClick={closeModal}
              title="Close"
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                display: 'block',
                background: '#ff5f57',
                boxShadow: '0 0 6px #ff5f5760',
                transition: 'filter .2s',
                cursor: 'pointer',
                '@media (max-width: 480px)': {
                  width: '10px',
                  height: '10px'
                }
              }}
            />
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                display: 'block',
                background: '#febc2e',
                boxShadow: '0 0 6px #febc2e60',
                transition: 'filter .2s',
                '@media (max-width: 480px)': {
                  width: '10px',
                  height: '10px'
                }
              }}
            />
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                display: 'block',
                background: '#28c840',
                boxShadow: '0 0 6px #28c84060',
                transition: 'filter .2s',
                '@media (max-width: 480px)': {
                  width: '10px',
                  height: '10px'
                }
              }}
            />
          </div>

          {/* URL bar */}
          <div
            className="demo-urlbar"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.07)',
              borderRadius: '8px',
              padding: '0 12px',
              height: '30px',
              maxWidth: '500px',
              margin: '0 auto',
              overflow: 'hidden',
              '@media (max-width: 768px)': {
                maxWidth: '160px'
              },
              '@media (max-width: 480px)': {
                maxWidth: '120px',
                padding: '0 8px'
              }
            }}
          >
            <span
              className="demo-urlbar-icon"
              style={{
                flexShrink: 0,
                color: 'var(--green)',
                fontSize: '.7rem',
                opacity: '.7'
              }}
            >
              🔒
            </span>
            <span
              className="demo-urlbar-text"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '.68rem',
                color: 'var(--muted)',
                letterSpacing: '.03em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                '@media (max-width: 480px)': {
                  fontSize: '.6rem'
                }
              }}
            >
              {currentUrl.replace(/^https?:\/\//, '')}
            </span>
          </div>

          {/* Title + actions area */}
          <div
            className="demo-title-area"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginLeft: '14px',
              flexShrink: 0,
              '@media (max-width: 480px)': {
                marginLeft: '8px',
                gap: '8px'
              }
            }}
          >
            <span
              className="demo-project-title"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '.72rem',
                color: 'var(--text)',
                letterSpacing: '.06em',
                whiteSpace: 'nowrap',
                maxWidth: '160px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                '@media (max-width: 768px)': {
                  maxWidth: '90px',
                  fontSize: '.65rem'
                }
              }}
            >
              {currentTitle}
            </span>
            
            <div
              className="demo-actions"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginLeft: '10px',
                flexShrink: 0,
                '@media (max-width: 768px)': {
                  display: 'none'
                }
              }}
            >
              <button
                onClick={reloadIframe}
                className="demo-action-btn"
                title="Reload preview"
                aria-label="Reload"
                style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,.07)',
                  borderRadius: '7px',
                  cursor: 'pointer',
                  color: 'var(--muted2)',
                  fontSize: '.85rem',
                  transition: 'background .2s, color .2s, border-color .2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(0,255,136,.08)'
                  e.target.style.borderColor = 'rgba(0,255,136,.25)'
                  e.target.style.color = 'var(--green)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent'
                  e.target.style.borderColor = 'rgba(255,255,255,.07)'
                  e.target.style.color = 'var(--muted2)'
                }}
              >
                ↻
              </button>
              
              <button
                onClick={openInNewTab}
                className="demo-action-btn"
                title="Open in new tab"
                aria-label="Open in new tab"
                style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,.07)',
                  borderRadius: '7px',
                  cursor: 'pointer',
                  color: 'var(--muted2)',
                  fontSize: '.85rem',
                  transition: 'background .2s, color .2s, border-color .2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(0,255,136,.08)'
                  e.target.style.borderColor = 'rgba(0,255,136,.25)'
                  e.target.style.color = 'var(--green)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent'
                  e.target.style.borderColor = 'rgba(255,255,255,.07)'
                  e.target.style.color = 'var(--muted2)'
                }}
              >
                ↗
              </button>
            </div>
            
            <button
              id="demo-close"
              onClick={closeModal}
              aria-label="Close demo preview"
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.08)',
                borderRadius: '8px',
                cursor: 'pointer',
                color: 'var(--muted)',
                fontSize: '1.1rem',
                lineHeight: 1,
                transition: 'background .2s, color .2s, border-color .2s, transform .15s',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 80, 80, .15)'
                e.target.style.borderColor = 'rgba(255,80,80,.4)'
                e.target.style.color = '#ff6060'
                e.target.style.transform = 'scale(1.08)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,.04)'
                e.target.style.borderColor = 'rgba(255,255,255,.08)'
                e.target.style.color = 'var(--muted)'
                e.target.style.transform = 'scale(1)'
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* iframe container */}
        <div
          id="demo-iframe-wrap"
          style={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            background: '#fff',
            overflow: 'hidden'
          }}
        >
          {/* Loading spinner */}
          {isLoading && (
            <div
              id="demo-loader"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '18px',
                background: 'var(--bg)',
                zIndex: 10,
                transition: 'opacity .3s'
              }}
            >
              <div
                className="demo-spinner"
                style={{
                  width: '44px',
                  height: '44px',
                  border: '2px solid var(--border2)',
                  borderTopColor: 'var(--green)',
                  borderRadius: '50%',
                  animation: 'spin 0.9s linear infinite',
                  boxShadow: '0 0 16px rgba(0,255,136,.2)'
                }}
              />
              <div
                className="demo-loader-text"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '.72rem',
                  color: 'var(--muted)',
                  letterSpacing: '.1em',
                  animation: 'blink 1.4s step-end infinite'
                }}
              >
                LOADING PREVIEW...
              </div>
            </div>
          )}

          {/* Blocked state */}
          {isBlocked && (
            <div
              id="demo-blocked"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                background: 'var(--bg)',
                padding: '40px 24px',
                textAlign: 'center',
                zIndex: 11
              }}
            >
              <div
                className="demo-blocked-icon"
                style={{
                  fontSize: '3rem',
                  filter: 'grayscale(.4)',
                  marginBottom: '4px'
                }}
              >
                🚫
              </div>
              <div
                className="demo-blocked-title"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  marginBottom: '4px'
                }}
              >
                Preview Unavailable
              </div>
              <p
                className="demo-blocked-msg"
                style={{
                  fontSize: '.9rem',
                  color: 'var(--muted)',
                  maxWidth: '380px',
                  lineHeight: 1.65,
                  marginBottom: '8px'
                }}
              >
                This site has restricted embedding (<code style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--green)',
                  fontSize: '.82em'
                }}>X-Frame-Options</code>). You can still view the live demo by opening it directly.
              </p>
              <div
                className="demo-blocked-btns"
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                <a
                  href={currentUrl}
                  target="_blank"
                  rel="noopener"
                  className="demo-ext-btn primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '.78rem',
                    letterSpacing: '.07em',
                    padding: '11px 22px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'var(--green)',
                    color: 'var(--black)',
                    fontWeight: 700,
                    transition: 'box-shadow .25s, transform .2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = 'var(--glow)'
                    e.target.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = 'none'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  Open Live Demo ↗
                </a>
                <button
                  onClick={closeModal}
                  className="demo-ext-btn secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '.78rem',
                    letterSpacing: '.07em',
                    padding: '11px 22px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    background: 'transparent',
                    color: 'var(--muted)',
                    border: '1px solid var(--border2)',
                    transition: 'border-color .2s, color .2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = 'var(--green)'
                    e.target.style.color = 'var(--green)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = 'var(--border2)'
                    e.target.style.color = 'var(--muted)'
                  }}
                >
                  Back to Portfolio
                </button>
              </div>
            </div>
          )}

          <iframe
            ref={iframeRef}
            id="demo-iframe"
            src="about:blank"
            title="Project Preview"
            allow="fullscreen; autoplay; clipboard-read; clipboard-write; encrypted-media; geolocation; microphone; camera"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
              transition: 'opacity .3s'
            }}
          />
        </div>

        {/* Status bar */}
        <div
          id="demo-statusbar"
          style={{
            position: 'relative',
            zIndex: 2,
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            background: 'rgba(6,6,6,.98)',
            borderTop: '1px solid rgba(0,255,136,.08)',
            flexShrink: 0
          }}
        >
          <div
            className="demo-status-left"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <div
              className="demo-status-dot"
              style={{
                width: '6px',
                height: '6px',
                background: 'var(--green)',
                borderRadius: '50%',
                boxShadow: '0 0 6px var(--green)',
                animation: 'blink 2s ease-in-out infinite'
              }}
            />
            <span
              className="demo-status-text"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '.62rem',
                color: 'var(--muted2)',
                letterSpacing: '.08em'
              }}
            >
              {statusMessage}
            </span>
          </div>
          <span
            className="demo-status-right"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '.62rem',
              color: 'var(--muted2)',
              letterSpacing: '.06em'
            }}
          >
            {currentTitle}
          </span>
        </div>
      </div>
    </div>
  )
}

export default DemoModal
