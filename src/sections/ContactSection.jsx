import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    // Initialize EmailJS v4 with public key from environment
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_USER_ID,
    });

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
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const testEmailJS = async () => {
    try {
      console.log('🧪 Testing EmailJS...')
      console.log('EmailJS object:', emailjs)
      
      // Test if EmailJS is properly initialized
      const testResult = await emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, {
        from_name: 'Test User',
        from_email: 'test@example.com',
        message: 'This is a test message'
      })
      
      console.log('✅ EmailJS test passed:', testResult)
      return true
    } catch (error) {
      console.error('❌ EmailJS test failed:', error)
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      // EmailJS configuration from environment variables
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

      console.log('📧 Attempting to send email...')
      console.log('Service ID:', serviceID)
      console.log('Template ID:', templateID)
      console.log('Form data:', formData)

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      }

      const result = await emailjs.send(serviceID, templateID, templateParams)
      
      console.log('✅ Email sent successfully:', result)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('❌ Email send failed:', error)
      console.error('Error type:', typeof error)
      console.error('Error string:', JSON.stringify(error, null, 2))
      
      // Try to extract meaningful error
      const errorMessage = error.text || error.message || error.toString() || 'Unknown error'
      alert(`Failed to send message: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactDetails = [
    {
      icon: '📧',
      label: 'EMAIL',
      content: import.meta.env.VITE_EMAILJS_TO_EMAIL || 'your-email@example.com'
    },
    {
      icon: '📍',
      label: 'LOCATION',
      content: 'Dhaka, Bangladesh — Remote Worldwide',
      type: 'text'
    },
    {
      icon: '⏰',
      label: 'AVAILABILITY',
      content: 'Open to freelance & full-time roles',
      type: 'text'
    }
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      href: '#'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      href: '#'
    },
    {
      name: 'Email',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      href: `mailto:${import.meta.env.VITE_EMAILJS_TO_EMAIL || 'your-email@example.com'}`
    },
    {
      name: 'Twitter/X',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      href: '#'
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)'
      }}
    >
      <div
        className="contact-inner"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '80px',
          alignItems: 'start'
        }}
      >
        <div
          className="contact-info reveal"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
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
            05 — Contact
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
            Let's Build<br /><span className="green" style={{ color: 'var(--green)' }}>Together</span>
          </h2>
          
          <p
            className="section-sub"
            style={{
              color: 'var(--muted)',
              fontSize: '1rem',
              maxWidth: '480px',
              lineHeight: 1.7,
              marginBottom: '40px'
            }}
          >
            Have a project in mind? An idea that needs intelligent systems? Let's talk.
          </p>

          {/* Contact Details */}
          {contactDetails.map((detail, index) => (
            <div
              key={index}
              className="contact-detail"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '20px'
              }}
            >
              <div
                className="contact-icon"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(0,255,136,.06)',
                  border: '1px solid var(--green-dim)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  flexShrink: 0
                }}
              >
                {detail.icon}
              </div>
              <div
                className="contact-detail-text"
                style={{
                  display: 'block'
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '.68rem',
                    color: 'var(--muted2)',
                    letterSpacing: '.08em',
                    marginBottom: '2px'
                  }}
                >
                  {detail.label}
                </span>
                {detail.type === 'email' ? (
                  <a
                    href={`mailto:${detail.content}`}
                    style={{
                      color: 'var(--text)',
                      fontSize: '.9rem',
                      textDecoration: 'none',
                      transition: 'color .2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--green)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'var(--text)'
                    }}
                  >
                    {detail.content}
                  </a>
                ) : (
                  <p
                    style={{
                      color: 'var(--text)',
                      fontSize: '.9rem',
                      margin: 0
                    }}
                  >
                    {detail.content}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Social Links */}
          <div
            className="socials"
            style={{
              display: 'flex',
              gap: '14px',
              marginTop: '36px'
            }}
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="social-btn"
                title={social.name}
                style={{
                  width: '42px',
                  height: '42px',
                  background: 'var(--bg3)',
                  border: '1px solid var(--border2)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  transition: 'border-color .2s, color .2s, box-shadow .2s, transform .2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'var(--green)'
                  e.target.style.color = 'var(--green)'
                  e.target.style.boxShadow = '0 0 12px rgba(0,255,136,.2)'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'var(--border2)'
                  e.target.style.color = 'var(--muted)'
                  e.target.style.boxShadow = 'none'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div
          className="reveal reveal-delay-1"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity .7s cubic-bezier(.22,1,.36,1) .1s, transform .7s cubic-bezier(.22,1,.36,1) .1s'
          }}
        >
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div
              className="form-group"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <label
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '.7rem',
                  color: 'var(--muted)',
                  letterSpacing: '.1em',
                  textTransform: 'uppercase'
                }}
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Alex Johnson"
                style={{
                  background: 'var(--bg3)',
                  border: '1px solid var(--border2)',
                  borderRadius: 'var(--radius)',
                  padding: '14px 18px',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '.95rem',
                  outline: 'none',
                  transition: 'border-color .25s, box-shadow .25s',
                  resize: 'none',
                  cursor: 'text'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--green)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(0,255,136,.08)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border2)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            <div
              className="form-group"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <label
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '.7rem',
                  color: 'var(--muted)',
                  letterSpacing: '.1em',
                  textTransform: 'uppercase'
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="alex@company.com"
                style={{
                  background: 'var(--bg3)',
                  border: '1px solid var(--border2)',
                  borderRadius: 'var(--radius)',
                  padding: '14px 18px',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '.95rem',
                  outline: 'none',
                  transition: 'border-color .25s, box-shadow .25s',
                  resize: 'none',
                  cursor: 'text'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--green)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(0,255,136,.08)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border2)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            <div
              className="form-group"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <label
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '.7rem',
                  color: 'var(--muted)',
                  letterSpacing: '.1em',
                  textTransform: 'uppercase'
                }}
              >
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project…"
                rows={6}
                style={{
                  background: 'var(--bg3)',
                  border: '1px solid var(--border2)',
                  borderRadius: 'var(--radius)',
                  padding: '14px 18px',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '.95rem',
                  outline: 'none',
                  transition: 'border-color .25s, box-shadow .25s',
                  resize: 'none',
                  cursor: 'text',
                  height: '140px'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--green)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(0,255,136,.08)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border2)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {!isSubmitted ? (
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                  style={{
                    background: isSubmitting ? 'var(--border)' : 'var(--green)',
                    color: isSubmitting ? 'var(--muted)' : 'var(--black)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '.85rem',
                    fontWeight: 700,
                    letterSpacing: '.1em',
                    padding: '16px 32px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all .3s ease',
                    width: '100%'
                  }}
                >
                  {isSubmitting ? 'SENDING...' : isSubmitted ? '✓ MESSAGE SENT' : 'SEND MESSAGE'}
                </button>
                <button
                  type="button"
                  onClick={testEmailJS}
                  style={{
                    background: 'var(--bg2)',
                    color: 'var(--green)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '.75rem',
                    fontWeight: 700,
                    letterSpacing: '.1em',
                    padding: '16px 20px',
                    borderRadius: '10px',
                    border: '1px solid var(--green)',
                    cursor: 'pointer',
                    transition: 'all .3s ease'
                  }}
                >
                  🧪 TEST
                </button>
              </div>
            ) : (
              <div
                className="form-success"
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  background: 'rgba(0,255,136,.06)',
                  border: '1px solid var(--green-dim)',
                  borderRadius: 'var(--radius)',
                  color: 'var(--green)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '.85rem',
                  letterSpacing: '.06em'
                }}
              >
                ✓ Message sent! I'll reply within 24 hours.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
