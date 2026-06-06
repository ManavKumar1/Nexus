import { ThemeProvider, useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import Services from './components/Services'
import Process from './components/Process'
import Work from './components/Work'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Booking from './components/Booking'
import Footer from './components/Footer'

function AppContent() {
  const { dark } = useTheme()
  return (
    <div className="noise">
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Services dark={dark} />
        <Process />
        <Work />
        <Testimonials />
        <Pricing />
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
      <AppContent />
    </ThemeProvider>
  )
}
