import React, { useState, useRef, useEffect } from 'react'

type Video = {
  id: string
  title: string
  channel: string
  description: string
  thumb: string
  duration: number
}

type CardRowProps = {
  videos: Video[]
}



function formatTime(s: number) {
  if (!s) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

const YTIcon = () => (
  <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
    <rect width="28" height="20" rx="5" fill="#FF0000"/>
    <polygon points="11,5 11,15 20,10" fill="white"/>
  </svg>
)

const FullscreenIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9"/>
    <polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/>
    <line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
)

type VideoCardProps = { video: Video }

const VideoCard = ({ video }: VideoCardProps) => {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const elapsed = Math.round(progress * video.duration)

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 1) { setPlaying(false); return 1 }
          return p + 1 / video.duration
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [playing, video.duration])

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setProgress(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)))
  }

  const skip = (dir: 'back' | 'forward') => {
    setProgress(p => Math.max(0, Math.min(1, p + (dir === 'forward' ? 10 : -10) / video.duration)))
  }

  const handleFullscreen = () => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen()
    else document.exitFullscreen()
  }

  return (
    // w-full + maxWidth: fluid on mobile, capped at 360 on desktop
    <div
      ref={containerRef}
      className="w-full rounded-3xl overflow-hidden"
      style={{
        maxWidth: 360,
        background: '#ffffff',
        boxShadow: '0 2px 32px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      {/* ── Thumbnail — aspect ratio keeps height proportional ── */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={video.thumb}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.5) 100%)' }} />

        <button
          onClick={handleFullscreen}
          className="absolute top-3 right-3 flex items-center justify-center rounded-full"
          style={{ width: 28, height: 28, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)', color: 'white' }}
        >
          <FullscreenIcon />
        </button>

        <div
          className="absolute bottom-3 right-3 px-1.5 py-0.5 rounded text-white text-[10px] font-medium"
          style={{ background: 'rgba(0,0,0,0.65)' }}
        >
          {formatTime(video.duration)}
        </div>
      </div>

      {/* ── Info ── */}
      <div className="px-4 pt-4 pb-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold tracking-widest uppercase truncate mr-2" style={{ color: '#aaa' }}>
            {video.channel}
          </span>
          <YTIcon />
        </div>
        <h2 className="font-bold text-[17px] leading-snug tracking-tight" style={{ color: '#0f0f0f' }}>
          {video.title}
        </h2>
        <p
          className="text-[13px] leading-relaxed mt-1.5"
          style={{
            color: '#606060',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {video.description}
        </p>
      </div>

      {/* ── Progress ── */}
      <div className="px-4 mt-3">
        <div
          className="relative h-[3px] rounded-full cursor-pointer"
          style={{ background: '#e9e9e9' }}
          onClick={seek}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{ width: `${progress * 100}%`, background: '#FF0000', transition: 'width 0.5s linear' }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-md"
            style={{ left: `calc(${progress * 100}% - 6px)`, background: '#FF0000' }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] tabular-nums" style={{ color: '#bbb' }}>{formatTime(elapsed)}</span>
          <span className="text-[10px] tabular-nums" style={{ color: '#bbb' }}>{formatTime(video.duration)}</span>
        </div>
      </div>

      {/* ── Stats + Controls ── */}
      <div className="flex items-center justify-between px-4 pb-5 mt-2 gap-2">
        <div className="flex gap-4 flex-shrink-0">
          <div>
            <p className="text-[15px] font-bold" style={{ color: '#0f0f0f' }}>{Math.round(progress * 100)}%</p>
            <p className="text-[10px] mt-0.5" style={{ color: '#bbb' }}>Progress</p>
          </div>
          <div>
            <p className="text-[15px] font-bold" style={{ color: '#0f0f0f' }}>{formatTime(elapsed)}</p>
            <p className="text-[10px] mt-0.5" style={{ color: '#bbb' }}>Watched</p>
          </div>
        </div>

        <div className="flex items-center gap-0.5 rounded-full px-2 py-1.5 flex-shrink-0" style={{ background: '#f2f2f2' }}>
          <button onClick={() => skip('back')} className="p-2 rounded-full transition-colors hover:bg-white" style={{ color: '#222' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 19l-9-7 9-7v14zm11 0l-9-7 9-7v14z"/>
            </svg>
          </button>

          <button
            onClick={() => setPlaying(p => !p)}
            className="flex items-center justify-center rounded-full mx-1 transition-transform active:scale-90"
            style={{ width: 40, height: 40, background: '#0f0f0f', color: 'white' }}
          >
            {playing ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1.5"/>
                <rect x="14" y="4" width="4" height="16" rx="1.5"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            )}
          </button>

          <button onClick={() => skip('forward')} className="p-2 rounded-full transition-colors hover:bg-white" style={{ color: '#222' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 19V5l9 7-9 7zM2 19V5l9 7-9 7z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

const CardRow = ({ videos }: CardRowProps) => {
  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4 w-full">
      {videos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}

export default CardRow