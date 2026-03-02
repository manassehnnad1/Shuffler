type LogoProps = {
  src: string
}


const Logo = ({ src }: LogoProps) => {
  return (
    <div
      className="relative inline-block w-16 h-16 rounded-2xl overflow-hidden rotate-[-15deg]"
      style={{
        boxShadow: `0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.08)`,
      }}
    >
     <img src={src} alt="Logo" className="absolute inset-0 w-full h-full object-cover" />
      <span className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 35%, transparent 60%)" }} />
      <span className="absolute inset-0.5 rounded-xl pointer-events-none" style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.22) 0%, transparent 50%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }} />
      <span className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.12), transparent)" }} />
      <span className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.6)" }} />
    </div>
  )
}

export default Logo