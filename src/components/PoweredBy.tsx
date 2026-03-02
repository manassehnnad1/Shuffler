const PoweredBy = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ color: '#444', fontSize: 13, letterSpacing: '0.01em', whiteSpace: 'nowrap' }}>
        powered by
      </span>

      {/* SpaceComputer badge */}
      <a href="https://spacecomputer.io" target="_blank" rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
      >
        <span style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 30,
          height: 30,
          borderRadius: 8,
          background: 'linear-gradient(145deg, #2a2400 0%, #1a1600 100%)',
          boxShadow: `
            0 4px 16px rgba(255, 200, 0, 0.2),
            0 1px 4px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,210,0,0.25),
            inset 0 -1px 0 rgba(0,0,0,0.3)
          `,
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          {/* SpaceComputer yellow orbital icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="5" fill="#FFD000"/>
            <rect x="2" y="10.5" width="20" height="3" rx="1.5" fill="#FFD000"/>
            {/* mask to create orbital cut */}
            <circle cx="12" cy="12" r="5" fill="#FFD000"/>
            <rect x="8" y="10.5" width="8" height="3" fill="#1a1600"/>
          </svg>
          {/* glare */}
          <span style={{
            position: 'absolute', inset: 0, borderRadius: 'inherit',
            background: 'linear-gradient(135deg, rgba(255,210,0,0.18) 0%, transparent 55%)',
            pointerEvents: 'none',
          }}/>
          <span style={{
            position: 'absolute', inset: 0, borderRadius: 'inherit',
            boxShadow: 'inset 0 0 0 1px rgba(255,210,0,0.2)',
            pointerEvents: 'none',
          }}/>
        </span>
        <span style={{ color: '#666', fontSize: 13, letterSpacing: '-0.01em', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#FFD000')}
          onMouseLeave={e => (e.currentTarget.style.color = '#666')}
        >
          SpaceComputer
        </span>
      </a>

      {/* divider dot */}
      <span style={{ color: '#2e2e2e', fontSize: 16 }}>·</span>

      {/* YouTube badge */}
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
      >
        <span style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 30,
          height: 30,
          borderRadius: 8,
          background: 'linear-gradient(145deg, #2a0000 0%, #1a0000 100%)',
          boxShadow: `
            0 4px 16px rgba(255, 0, 0, 0.2),
            0 1px 4px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,80,80,0.2),
            inset 0 -1px 0 rgba(0,0,0,0.3)
          `,
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          {/* YouTube play icon */}
          <svg width="17" height="13" viewBox="0 0 28 20" fill="none">
            <rect width="28" height="20" rx="5" fill="#FF0000"/>
            <polygon points="11,5 11,15 20,10" fill="white"/>
          </svg>
          {/* glare */}
          <span style={{
            position: 'absolute', inset: 0, borderRadius: 'inherit',
            background: 'linear-gradient(135deg, rgba(255,80,80,0.2) 0%, transparent 55%)',
            pointerEvents: 'none',
          }}/>
          <span style={{
            position: 'absolute', inset: 0, borderRadius: 'inherit',
            boxShadow: 'inset 0 0 0 1px rgba(255,60,60,0.2)',
            pointerEvents: 'none',
          }}/>
        </span>
        <span style={{ color: '#666', fontSize: 13, letterSpacing: '-0.01em', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#FF4444')}
          onMouseLeave={e => (e.currentTarget.style.color = '#666')}
        >
          YouTube
        </span>
      </a>
    </div>
  )
}

export default PoweredBy