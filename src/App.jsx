import { ThemeProvider } from './hooks/useTheme'
import { TransitionProvider } from './components/PageTransition'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import VideoSection from './components/VideoSection'
import ValueProps from './components/ValueProps'
import BrandSystem from './components/BrandSystem'
import DedicatedTeam from './components/DedicatedTeam'
import Work from './components/Work'
import Manifesto from './components/Manifesto'
import Testimonials from './components/Testimonials'
import Process from './components/Process'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Booking from './components/Booking'
import Footer from './components/Footer'

function AppContent() {
  return (
    <div className="noise-overlay">
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        {/* <VideoSection /> */}
        <ValueProps />
        <BrandSystem />
        <DedicatedTeam />
        <Work />
        <Manifesto />
        <Testimonials />
        <Process />
        {/* <Pricing /> */}
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <TransitionProvider>
        <AppContent />
      </TransitionProvider>
    </ThemeProvider>
  )
}