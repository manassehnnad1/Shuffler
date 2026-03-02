import Footer from "./components/Footer"
import HeroSection from "./components/HeroSection"
import CardRow from "./components/CardRow"

const App = () => {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <CardRow />
      <Footer />
    </main>
  )
}

export default App