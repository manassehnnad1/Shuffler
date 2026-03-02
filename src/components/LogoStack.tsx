import Logo from "./Logo"

const LogoStack = () => {
  return (
    <div className="relative inline-flex items-center" style={{ width: "140px", height: "80px" }}>
      <div className="absolute opacity-60 scale-90" style={{ left: "0px", top: "8px" }}>
        <Logo src="/img3.jpg" />
      </div>
      <div className="absolute opacity-80 scale-95" style={{ left: "40px", top: "4px" }}>
        <Logo src="/img2.jpg" />
      </div>
      <div className="absolute" style={{ left: "80px", top: "0px" }}>
        <Logo src="/img5.jpg" />
      </div>
    </div>
  )
}

export default LogoStack