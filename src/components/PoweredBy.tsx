const PoweredBy = () => {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="text-[#444] text-[13px] tracking-wide">
        powered by
      </span>

      {/* SpaceComputer badge */}
      <a
        href="https://spacecomputer.io"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 no-underline group"
      >
        <span
          className="relative inline-flex items-center justify-center w-[30px] h-[30px] rounded-lg overflow-hidden flex-shrink-0"
          style={{
            background: 'linear-gradient(145deg, #2a2400 0%, #1a1600 100%)',
            boxShadow: '0 4px 16px rgba(255,200,0,0.2), 0 1px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,210,0,0.25), inset 0 -1px 0 rgba(0,0,0,0.3)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="5" fill="#FFD000"/>
            <rect x="2" y="10.5" width="20" height="3" rx="1.5" fill="#FFD000"/>
            <circle cx="12" cy="12" r="5" fill="#FFD000"/>
            <rect x="8" y="10.5" width="8" height="3" fill="#1a1600"/>
          </svg>
          <span className="absolute inset-0 rounded-[inherit] pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(255,210,0,0.18) 0%, transparent 55%)' }}/>
          <span className="absolute inset-0 rounded-[inherit] pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,210,0,0.2)' }}/>
        </span>
        <span className="text-[#666] text-[13px] tracking-tight transition-colors duration-200 group-hover:text-[#FFD000]">
          SpaceComputer
        </span>
      </a>

      {/* divider */}
      <span className="text-[#2e2e2e] text-base">·</span>

      {/* YouTube badge */}
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 no-underline group"
      >
        <span
          className="relative inline-flex items-center justify-center w-[30px] h-[30px] rounded-lg overflow-hidden flex-shrink-0"
          style={{
            background: 'linear-gradient(145deg, #2a0000 0%, #1a0000 100%)',
            boxShadow: '0 4px 16px rgba(255,0,0,0.2), 0 1px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,80,80,0.2), inset 0 -1px 0 rgba(0,0,0,0.3)',
          }}
        >
          <svg width="17" height="13" viewBox="0 0 28 20" fill="none">
            <rect width="28" height="20" rx="5" fill="#FF0000"/>
            <polygon points="11,5 11,15 20,10" fill="white"/>
          </svg>
          <span className="absolute inset-0 rounded-[inherit] pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(255,80,80,0.2) 0%, transparent 55%)' }}/>
          <span className="absolute inset-0 rounded-[inherit] pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,60,60,0.2)' }}/>
        </span>
        <span className="text-[#666] text-[13px] tracking-tight transition-colors duration-200 group-hover:text-[#FF4444]">
          YouTube
        </span>
      </a>
    </div>
  )
}

export default PoweredBy