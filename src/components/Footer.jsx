const Footer = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '28px 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        '@media (max-width: 480px)': {
          flexDirection: 'column',
          textAlign: 'center',
          gap: '8px'
        }
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '.72rem',
          color: 'var(--muted2)',
          letterSpacing: '.06em',
          margin: 0
        }}
      >
        © 2025 <span style={{ color: 'var(--green)' }}>Alex Rahman</span>. Built with precision and caffeine.
      </p>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '.72rem',
          color: 'var(--muted2)',
          letterSpacing: '.06em',
          margin: 0
        }}
      >
        All rights reserved · <span style={{ color: 'var(--green)' }}>Backend Dev & AI Engineer</span>
      </p>
    </footer>
  )
}

export default Footer
