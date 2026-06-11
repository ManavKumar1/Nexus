import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const WORDS = ['Web Apps', 'Mobile Apps', 'SaaS Products', 'AI Systems', 'Bold Brands']

function CyclingWord() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % WORDS.length), 2800)
    return () => clearInterval(t)
  }, [])
  return (
    <span style={{ display:'inline-block', overflow:'hidden', verticalAlign:'bottom' }}>
      <AnimatePresence mode="wait">
        <motion.span key={idx}
          initial={{ y:'100%', opacity:0 }} animate={{ y:'0%', opacity:1 }} exit={{ y:'-100%', opacity:0 }}
          transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
          className="grad-cyan" style={{ display:'block' }}>
          {WORDS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* ── Interactive Grid with hover-trail effect ── */
function GridBackground() {
  const containerRef = useRef(null)
  const [cells, setCells] = useState({}) // key -> { brightness, ts }
  const [dims, setDims] = useState({ cols: 0, rows: 0 })
  const rafRef = useRef(null)
  const CELL_SIZE = 36
  const FADE_DURATION = 800 // ms until cell fully fades

  useEffect(() => {
    function measure() {
      if (!containerRef.current) return
      const w = containerRef.current.offsetWidth
      const h = containerRef.current.offsetHeight
      setDims({ cols: Math.ceil(w / CELL_SIZE) + 1, rows: Math.ceil(h / CELL_SIZE) + 1 })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Decay loop — runs every frame, fades out cells over time
  useEffect(() => {
    let running = true
    function tick() {
      if (!running) return
      const now = Date.now()
      setCells(prev => {
        const next = {}
        let changed = false
        for (const [k, v] of Object.entries(prev)) {
          const age = now - v.ts
          if (age < FADE_DURATION) {
            next[k] = v
          } else {
            changed = true // drop expired cell
          }
        }
        return changed ? next : prev
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { running = false; cancelAnimationFrame(rafRef.current) }
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const col = Math.floor(x / CELL_SIZE)
    const row = Math.floor(y / CELL_SIZE)
    const now = Date.now()
    // Light up hovered cell + 1 cell radius neighbours for a soft glow trail
    const toLight = []
    for (let dc = -1; dc <= 1; dc++) {
      for (let dr = -1; dr <= 1; dr++) {
        const dist = Math.sqrt(dc*dc + dr*dr)
        toLight.push({ key:`${col+dc}-${row+dr}`, brightness: dist === 0 ? 1 : 0.35 - dist*0.1 })
      }
    }
    setCells(prev => {
      const next = { ...prev }
      const ts = now
      toLight.forEach(({ key, brightness }) => {
        // Only update if new entry is brighter or cell has started to fade
        const existing = prev[key]
        if (!existing || brightness > existing.brightness || (now - existing.ts) > 200) {
          next[key] = { brightness, ts }
        }
      })
      return next
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    // Let cells naturally fade out via the decay loop
  }, [])

  const totalCells = dims.cols * dims.rows

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="absolute inset-0 z-0 overflow-hidden">

      {/* Grid cells */}
      {totalCells > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${dims.cols}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${dims.rows}, ${CELL_SIZE}px)`,
          position: 'absolute', inset: 0,
        }}>
          {Array.from({ length: totalCells }).map((_, idx) => {
            const col = idx % dims.cols
            const row = Math.floor(idx / dims.cols)
            const key = `${col}-${row}`
            const cell = cells[key]
            const now = Date.now()
            const fade = cell ? Math.max(0, 1 - (now - cell.ts) / FADE_DURATION) : 0
            const b = cell ? cell.brightness * fade : 0

            return (
              <div key={key} style={{
                width: CELL_SIZE, height: CELL_SIZE,
                border: '0.5px solid',
                borderColor: b > 0.05
                  ? `rgba(0,245,255,${0.08 + b * 0.5})`
                  : 'rgba(0,245,255,0.04)',
                background: b > 0.1
                  ? `rgba(0,245,255,${b * 0.07})`
                  : 'transparent',
                // No CSS transition — we handle timing ourselves via RAF
              }} />
            )
          })}
        </div>
      )}

      {/* Ambient orbs */}
      <motion.div animate={{ x:[0,70,-40,0], y:[0,-55,35,0] }} transition={{ duration:20, repeat:Infinity, ease:'easeInOut' }}
        className="absolute top-[18%] left-[12%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(0,245,255,0.08) 0%,transparent 65%)', filter:'blur(70px)' }} />
      <motion.div animate={{ x:[0,-55,75,0], y:[0,45,-35,0] }} transition={{ duration:26, repeat:Infinity, ease:'easeInOut', delay:4 }}
        className="absolute bottom-[5%] right-[8%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(191,95,255,0.06) 0%,transparent 65%)', filter:'blur(90px)' }} />

      {/* Vignette */}
      <div className="absolute inset-0 dark:block hidden pointer-events-none"
        style={{ background:'radial-gradient(ellipse at center,transparent 20%,rgba(5,5,8,0.95) 100%)' }} />
      <div className="absolute inset-0 dark:hidden block pointer-events-none"
        style={{ background:'radial-gradient(ellipse at center,transparent 25%,rgba(255,255,255,0.93) 100%)' }} />
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start','end start'] })
  const textY   = useSpring(useTransform(scrollYProgress,[0,1],['0%','14%']), {stiffness:70,damping:22})
  const opacity = useTransform(scrollYProgress,[0,0.65],[1,0])
  const tags = ['SaaS','Mobile','Web','Branding','AI']
  const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.09, delayChildren:0.35 } } }
  const fadeUp  = { hidden:{ opacity:0, y:36 }, show:{ opacity:1, y:0, transition:{ duration:0.75, ease:[0.16,1,0.3,1] } } }

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden dark:bg-[#050508] bg-white flex flex-col">
      <GridBackground />
      <motion.div style={{ y:textY, opacity }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-24 max-w-7xl mx-auto w-full">
        <motion.div variants={stagger} initial="hidden" animate="show" className="text-center w-full">
          <motion.div variants={fadeUp} className="flex justify-center mb-9">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full dark:bg-white/[0.045] bg-black/[0.04] border dark:border-white/8 border-black/8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5ff] opacity-60"/>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f5ff]"/>
              </span>
              <span className="font-grotesk text-[11px] dark:text-white/55 text-black/55 tracking-[0.18em] uppercase">Available — 2 spots open</span>
              <span className="dark:text-white/15 text-black/20 text-xs">·</span>
              <span className="font-grotesk text-[11px] dark:text-white/35 text-black/40">Remote Worldwide</span>
            </div>
          </motion.div>
          <motion.h1 variants={fadeUp}
            className="font-syne font-800 dark:text-white text-black leading-[0.90] tracking-[-0.02em] mb-6"
            style={{ fontSize:'clamp(3rem,9.5vw,8.5rem)' }}>
            We build digital<br/>
            <span style={{ display:'inline-block', overflow:'hidden', height:'1.05em', verticalAlign:'bottom' }}>
              <CyclingWord />
            </span>
            <br/>that <em className="not-italic relative">
              actually
              <svg className="absolute -bottom-1 left-0 w-full" height="5" viewBox="0 0 200 5" preserveAspectRatio="none">
                <motion.path d="M0 3 Q50 0.5 100 3 Q150 5.5 200 3" stroke="url(#heroUL)" strokeWidth="3" fill="none" strokeLinecap="round"
                  initial={{pathLength:0}} animate={{pathLength:1}} transition={{delay:1.4,duration:0.9,ease:'easeOut'}}/>
                <defs><linearGradient id="heroUL" x1="0" x2="1"><stop stopColor="#00f5ff"/><stop offset="1" stopColor="#bf5fff"/></linearGradient></defs>
              </svg>
            </em>{' '}ship.
          </motion.h1>
          <motion.p variants={fadeUp}
            className="font-grotesk dark:text-white/48 text-black/52 max-w-[520px] mx-auto leading-[1.75] mb-10"
            style={{ fontSize:'clamp(0.95rem,1.5vw,1.15rem)' }}>
            We don't work <em>for</em> your team — we become part of it.
            Then we ship, refine, and evolve your product from the inside out.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
            <motion.a href="#booking" whileHover={{ scale:1.04, boxShadow:'0 0 50px rgba(0,245,255,0.28)' }} whileTap={{ scale:0.97 }}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-grotesk font-600 text-black bg-[#00f5ff] transition-all duration-200">
              Book a Call <ArrowRight size={15}/>
            </motion.a>
            <motion.a href="#work" whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-grotesk font-600 dark:text-white text-black border dark:border-white/12 border-black/12 dark:hover:border-white/28 hover:border-black/28 backdrop-blur-sm transition-all duration-200">
              See Our Work
            </motion.a>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2">
            {tags.map((t,i) => (
              <motion.span key={t} initial={{opacity:0,scale:0.85}} animate={{opacity:1,scale:1}}
                transition={{delay:1+i*0.07,duration:0.4}}
                className="tag-pill dark:bg-white/[0.04] bg-black/[0.04] dark:text-white/40 text-black/45 dark:border-white/7 border-black/8 border">
                {t}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.2}}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase dark:text-white/22 text-black/28">Scroll</span>
        <motion.div animate={{y:[0,8,0]}} transition={{duration:1.6,repeat:Infinity,ease:'easeInOut'}}>
          <div className="w-px h-8 bg-gradient-to-b from-[#00f5ff] to-transparent"/>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[2] dark:bg-gradient-to-t dark:from-[#050508] bg-gradient-to-t from-white to-transparent pointer-events-none"/>
    </section>
  )
}