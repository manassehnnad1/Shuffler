import { useState, useRef } from 'react'
import LogoStack from "./LogoStack"

const HeroSection = () => {
  const [showInput, setShowInput] = useState(false)
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleShowInput = () => {
    setShowInput(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleFetch = async () => {
    if (!url.trim()) return
    setLoading(true)
    // your fetch logic goes here later
    setLoading(false)
  }

  return (
    <section className="flex flex-col items-center pt-16 pb-12 text-center mt-30">
      <LogoStack />

      <h1 className="mt-10 text-3xl md:text-5xl text-black">
        Your playlist. Ordered from orbit.
      </h1>

      <p className="mt-4 text-black/40 text-base">
        Enjoy your videos in the order that understands you.
      </p>

      {/* CTA — swaps to input on click */}
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

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

export default HeroSection