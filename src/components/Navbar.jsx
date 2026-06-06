import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Zap } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'dark:bg-[#050508]/90 bg-white/90 backdrop-blur-xl border-b dark:border-white/5 border-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f5ff] to-[#bf5fff] flex items-center justify-center">
              <Zap size={16} className="text-black fill-black" />
            </div>
            <span className="font-syne font-800 text-xl tracking-tight dark:text-white text-black">
              NEXUS<span className="gradient-text-cyan">.</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-grotesk font-500 dark:text-white/60 text-black/60 hover:dark:text-white hover:text-black transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggle}
              className="w-9 h-9 rounded-full dark:bg-white/5 bg-black/5 flex items-center justify-center dark:text-white/60 text-black/60 hover:dark:text-white hover:text-black transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={dark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {dark ? <Sun size={16} /> : <Moon size={16} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <motion.a
              href="#booking"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-grotesk font-600 text-black bg-[#00f5ff] hover:bg-[#00f5ff]/90 transition-all duration-200"
            >
              Book a Call
              <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 6.5L6.5 1.5M6.5 1.5H2.5M6.5 1.5V5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </motion.a>

            {/* Mobile menu btn */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden w-9 h-9 flex items-center justify-center dark:text-white text-black"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 dark:bg-[#050508] bg-white flex flex-col pt-[70px]"
          >
            <div className="flex flex-col gap-2 p-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="font-syne font-700 text-4xl dark:text-white text-black py-2 border-b dark:border-white/5 border-black/5"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-6 text-center py-4 rounded-full text-lg font-grotesk font-600 text-black bg-[#00f5ff]"
              >
                Book a Call
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
