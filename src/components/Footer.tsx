
import Logo from "./Logo"
import PoweredBy from "./PoweredBy"

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] mt-[70px]">

      {/* ── Main body ── */}
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-9 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-8">

        {/* Left */}
        <div className="flex flex-col gap-5">
          {/* Logo + name */}
          <div className="flex items-center gap-3">
            <Logo src="/img1.png" />
            <span className="text-white text-[15px] font-semibold tracking-tight">
              Shuffler by Isla
            </span>
          </div>

          {/* Tagline */}
          <p className="text-[#666] text-[13px] leading-relaxed max-w-xs">
            True randomness sourced from orbital entropy.<br />
            Your playlist, ordered from orbit.
          </p>

          <PoweredBy />
        </div>

        {/* Right — social icons */}
        <div className="flex gap-3 items-center sm:mt-1 flex-shrink-0">
          {/* X / Twitter */}
          <a
            href="https://x.com/islathebuilder"
            className="w-[34px] h-[34px] rounded-lg border border-[#2a2a2a] flex items-center justify-center transition-all hover:bg-[#222] hover:border-[#444]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/manassehnnad1"
            className="w-[34px] h-[34px] rounded-lg border border-[#2a2a2a] flex items-center justify-center transition-all hover:bg-[#222] hover:border-[#444]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="h-px bg-[#1e1e1e]" />
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-2xl mx-auto px-6 py-5 flex justify-center">
        <p className="text-[#444] text-xs">
          © 2026 Shuffler by Isla. All rights reserved.
        </p>
      </div>

    </footer>
  )
}

export default Footer