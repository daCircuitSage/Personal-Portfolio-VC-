const Footer = () => {
  return (
    <>
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: '28px 5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
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
          © 2025 <span style={{ color: 'var(--green)' }}>Shihabul Abedin Shimul</span>. Built with precision and caffeine.
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
      <style jsx>{`
        @media (max-width: 768px) {
          footer {
            padding: 20px 4% !important;
            gap: 10px !important;
          }
        }
        @media (max-width: 480px) {
          footer {
            flex-direction: column !important;
            text-align: center !important;
            gap: 8px !important;
            padding: 16px 3% !important;
          }
          footer p {
            font-size: .65rem !important;
          }
        }
      `}</style>
    </>
  )
}

export default Footer
