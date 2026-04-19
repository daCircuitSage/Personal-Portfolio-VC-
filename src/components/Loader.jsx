const Loader = () => {
  return (
    <div
      id="loader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9990,
        background: 'var(--black)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        transition: 'opacity .5s, visibility .5s'
      }}
    >
      <div
        className="loader-logo"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.4rem',
          color: 'var(--green)',
          letterSpacing: '.2em',
          animation: 'blink 1.2s step-end infinite'
        }}
      >
        &lt; DEV /&gt;
      </div>
      <div
        className="loader-bar"
        style={{
          width: '180px',
          height: '2px',
          background: 'var(--border2)',
          borderRadius: '99px',
          overflow: 'hidden'
        }}
      >
        <div
          className="loader-fill"
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--green), var(--green2))',
            animation: 'loadfill 1.6s ease forwards',
            boxShadow: 'var(--glow-sm)'
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        @keyframes loadfill {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  )
}

export default Loader
