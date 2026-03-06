import { useState, useEffect, useRef, useCallback } from 'react'
import type { Video } from '../lib/youtube'

type CardRowProps = {
  videos: Video[]
}

// ── YouTube IFrame hook ───────────────────────────────────────────────────────
function useYTPlayer(containerId: string, onEnded: () => void) {
  const playerRef = useRef<any>(null)
  const readyRef = useRef(false)
  const pendingRef = useRef<string | null>(null)

  useEffect(() => {
    function initPlayer() {
      playerRef.current = new (window as any).YT.Player(containerId, {
        height: '100%',
        width: '100%',
        playerVars: { autoplay: 1, controls: 1, rel: 0, modestbranding: 1 },
        events: {
          onReady: () => {
            readyRef.current = true
            if (pendingRef.current) {
              playerRef.current.loadVideoById(pendingRef.current)
              pendingRef.current = null
            }
          },
          onStateChange: (e: any) => {
            if (e.data === (window as any).YT.PlayerState.ENDED) onEnded()
          },
        },
      })
    }

    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer()
    } else {
      const prev = (window as any).onYouTubeIframeAPIReady
      ;(window as any).onYouTubeIframeAPIReady = () => {
        if (prev) prev()
        initPlayer()
      }
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
    }

    return () => {
      try { playerRef.current?.destroy() } catch {}
    }
  }, [])

  return useCallback((videoId: string) => {
    if (readyRef.current && playerRef.current) {
      playerRef.current.loadVideoById(videoId)
    } else {
      pendingRef.current = videoId
    }
  }, [])
}

// ── Icons ─────────────────────────────────────────────────────────────────────
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

// ── CardRow ───────────────────────────────────────────────────────────────────
const CardRow = ({ videos }: CardRowProps) => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const playNext = useCallback(() => {
    setCurrentIdx(i => (i < videos.length - 1 ? i + 1 : i))
  }, [videos.length])

  const loadVideo = useYTPlayer('yt-player', playNext)

  // load video whenever currentIdx changes
  useEffect(() => {
    if (videos[currentIdx]) {
      loadVideo(videos[currentIdx].id)
    }
  }, [currentIdx, videos])

  const current = videos[currentIdx]
  const hasPrev = currentIdx > 0
  const hasNext = currentIdx < videos.length - 1

  const handleFullscreen = () => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen()
    else document.exitFullscreen()
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4 w-full">
      <div
        ref={containerRef}
        className="w-full rounded-3xl overflow-hidden"
        style={{
          maxWidth: 360,
          background: '#ffffff',
          boxShadow: '0 2px 32px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)',
        }}
      >
        {/* ── YouTube IFrame embed ── */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9', background: '#000' }}>
          <div id="yt-player" className="absolute inset-0 w-full h-full" />

          {/* Fullscreen button */}
          <button
            onClick={handleFullscreen}
            className="absolute top-3 right-3 z-10 flex items-center justify-center rounded-full"
            style={{ width: 28, height: 28, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)', color: 'white' }}
          >
            <FullscreenIcon />
          </button>
        </div>

        {/* ── Info ── */}
        <div className="px-4 pt-4 pb-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold tracking-widest uppercase truncate mr-2" style={{ color: '#aaa' }}>
              {current.channel}
            </span>
            <YTIcon />
          </div>
          <h2 className="font-bold text-[17px] leading-snug tracking-tight" style={{ color: '#0f0f0f' }}>
            {current.title}
          </h2>
          {current.description && (
            <p
              className="text-[13px] leading-relaxed mt-1.5"
              style={{
                color: '#606060',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {current.description}
            </p>
          )}
        </div>

        {/* ── Queue position + Controls ── */}
        <div className="flex items-center justify-between px-4 pb-5 mt-3 gap-2">
          {/* Position indicator */}
          <div>
            <p className="text-[15px] font-bold" style={{ color: '#0f0f0f' }}>
              {currentIdx + 1}
              <span className="text-[12px] font-normal text-[#bbb]"> / {videos.length}</span>
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: '#bbb' }}>In queue</p>
          </div>

          {/* Prev / Next controls */}
          <div className="flex items-center gap-0.5 rounded-full px-2 py-1.5 flex-shrink-0" style={{ background: '#f2f2f2' }}>
            {/* Prev */}
            <button
              onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}
              disabled={!hasPrev}
              className="p-2 rounded-full transition-colors hover:bg-white disabled:opacity-30"
              style={{ color: '#222' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 19l-9-7 9-7v14zm11 0l-9-7 9-7v14z"/>
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={() => setCurrentIdx(i => Math.min(videos.length - 1, i + 1))}
              disabled={!hasNext}
              className="p-2 rounded-full transition-colors hover:bg-white disabled:opacity-30"
              style={{ color: '#222' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 19V5l9 7-9 7zM2 19V5l9 7-9 7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardRow