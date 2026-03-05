import { useState, useRef } from 'react'
import LogoStack from "./LogoStack"
import CardRow from "./CardRow"
import { fetchPlaylist, type Video } from '../lib/youtube'
import { cosmicShuffle } from '../lib/shuffle'


type Proof = {
  src: string
  hex: string | null
  signature: object | null
}

const HeroSection = () => {
  const [showInput, setShowInput] = useState(false)
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [videos, setVideos] = useState<Video[] | null>(null)
  const [proof, setProof] = useState<Proof | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleShowInput = () => {
    setShowInput(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleFetch = async () => {
    if (!url.trim()) return
    setLoading(true)
    setError(null)
    setProof(null)
    setVideos(null)

    try {
      const ytKey = import.meta.env.VITE_YT_API_KEY
      if (!ytKey) throw new Error('Add VITE_YT_API_KEY to your .env file')

      // 1. fetch playlist from YouTube
      const fetched = await fetchPlaylist(url, ytKey)
      if (!fetched.length) throw new Error('Playlist is empty or all videos are private')

      // 2. shuffle using cTRNG — captures proof
      const { shuffled, proof: cosmicProof } = await cosmicShuffle(fetched)

      // 3. set state
      setVideos(shuffled)
      setProof(cosmicProof as Proof)

      // 4. scroll down to cards
      setTimeout(() => {
        document.getElementById('card-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="flex flex-col items-center pt-16 pb-12 text-center mt-50 md:mt-30 mb-95 md:mb-60">
        <LogoStack />

        <h1 className="mt-10 text-3xl md:text-5xl text-black">
          Your playlist. Ordered from orbit.
        </h1>

        <p className="mt-4 text-black/40 text-base">
          Enjoy your videos in the order that understands you.
        </p>

        {!showInput ? (
          <button
            onClick={handleShowInput}
            className="mt-8 px-7 py-3 rounded-xl bg-amber-300 text-black font-medium cursor-pointer text-sm shadow-lg shadow-amber-400/20 hover:bg-amber-200 transition-colors"
          >
            Watch Now <img src="/circle-play.svg" className="inline-block h-4" alt="" />
          </button>
        ) : (
          <div
            className="mt-8 flex items-center gap-2"
            style={{ animation: 'slideUp 0.25s cubic-bezier(0.16,1,0.3,1)' }}
          >
            <input
              ref={inputRef}
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleFetch()}
              placeholder="Paste playlist link..."
              className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-black transition-colors"
              style={{ width: 280 }}
            />
            <button
              onClick={handleFetch}
              disabled={loading || !url.trim()}
              className="px-6 py-3 rounded-xl bg-amber-300 text-black text-sm font-medium cursor-pointer hover:bg-amber-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? '...' : 'Shuffle'}
            </button>
          </div>
        )}
        

        {/* Error */}
        {error && (
          <p className="mt-3 text-sm text-red-400 max-w-sm">{error}</p>
        )}

        {/* Proof badge — shows after shuffle */}
        {proof && (
          <div
            className="mt-6 px-4 py-3 rounded-xl border border-amber-200 bg-amber-50 text-left max-w-sm w-full"
            style={{ animation: 'slideUp 0.3s ease' }}
          >
            <p className="text-[11px] font-semibold tracking-widest uppercase text-amber-600 mb-1">
              ✦ Cosmic Entropy Proof
            </p>
            <p className="text-[12px] text-gray-500 break-all">
              Source: {proof.src}
            </p>
            {proof.hex && (
              <p className="text-[11px] text-gray-400  break-all mt-0.5">
                {proof.hex.slice(0, 32)}…
              </p>
            )}
          </div>
        )}

        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* CardRow — only appears after shuffle */}
      {videos && videos.length > 0 && (
        <section id="card-section" style={{ animation: 'fadeUp 0.5s ease' }}>
          <CardRow videos={videos} />
        </section>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}

export default HeroSection