import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'

/**
 * ValueProps — "Compound your product equity"
 * Replaced stacked image/text panels with a single interactive
 * accordion-style selector: click a proposition and its detail
 * expands with a live animated visual. Clean, no photos needed.
 */

const props = [
  {
    num: '01',
    tag: 'For Founders',
    title: 'Secure investor conviction.',
    body: 'Walk into every pitch with a product that speaks before you do. Polished UI, airtight architecture, and a demo that shifts rooms — built by a team that understands what investors actually scrutinise.',
    accent: '#00f5ff',
    visual: 'pitch',
  },
  {
    num: '02',
    tag: 'For Growth Teams',
    title: 'Turn users into ambassadors.',
    body: 'Distinctive products create word-of-mouth no ad budget can replicate. We build the flows and micro-interactions that make users reach for their phones to show friends unprompted.',
    accent: '#bf5fff',
    visual: 'growth',
  },
  {
    num: '03',
    tag: 'For Hiring Teams',
    title: 'Attract the elite talent.',
    body: 'The best engineers and designers have options. A product that looks and feels exceptional signals a future worth betting careers on — the thing people brag about working on.',
    accent: '#c6f135',
    visual: 'talent',
  },
]

/* Animated visual panels — no photos, all code */
function PitchVisual({ accent }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Animated bar chart */}
      <div className="flex items-end gap-3 h-28">
        {[55,72,45,88,65,95,78].map((h, i) => (
          <motion.div key={i}
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16,1,0.3,1] }}
            style={{
              width: 18, height: `${h}%`,
              background: i === 5
                ? accent
                : `rgba(${accent === '#00f5ff' ? '0,245,255' : '0,245,255'},${0.12 + i * 0.04})`,
              borderRadius: 4,
              transformOrigin: 'bottom',
            }}
          />
        ))}
      </div>
      {/* Trend line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 120">
        <motion.path
          d="M20 90 C60 75, 90 55, 120 50 C150 45, 180 30, 220 20"
          stroke={accent} strokeWidth="1.5" fill="none" strokeLinecap="round"
          strokeDasharray="200" initial={{ strokeDashoffset: 200 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
        />
        <motion.circle cx="220" cy="20" r="3" fill={accent}
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: 'spring' }} />
      </svg>
      <div className="absolute top-4 left-4 font-grotesk text-[11px] tracking-[0.2em] uppercase" style={{ color: accent, opacity: 0.7 }}>
        MRR Growth
      </div>
    </div>
  )
}

function GrowthVisual({ accent }) {
  const nodes = [
    { x: 50, y: 50, r: 20, main: true },
    { x: 20, y: 20, r: 10 }, { x: 80, y: 18, r: 8 },
    { x: 15, y: 65, r: 9  }, { x: 82, y: 70, r: 11 },
    { x: 50, y: 85, r: 8  }, { x: 35, y: 40, r: 6  },
    { x: 68, y: 38, r: 7  },
  ]
  return (
    <div className="relative w-full h-full">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {nodes.slice(1).map((n, i) => (
          <motion.line key={i}
            x1="50" y1="50" x2={n.x} y2={n.y}
            stroke={accent} strokeWidth="0.4" strokeOpacity="0.35"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }} />
        ))}
        {nodes.map((n, i) => (
          <motion.circle key={i} cx={n.x} cy={n.y} r={n.r * 0.4}
            fill={n.main ? accent : `${accent}55`}
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
            style={{ transformOrigin: `${n.x}% ${n.y}%` }} />
        ))}
      </svg>
      <div className="absolute bottom-4 right-4 font-grotesk text-[11px] tracking-[0.2em] uppercase" style={{ color: accent, opacity: 0.7 }}>
        Referral Graph
      </div>
    </div>
  )
}

function TalentVisual({ accent }) {
  const words = ['Figma', 'React', 'Swift', 'Rust', 'Next.js', 'Postgres', 'k8s', 'GPT-4']
  return (
    <div className="relative w-full h-full flex flex-wrap items-center justify-center gap-2 p-6">
      {words.map((w, i) => (
        <motion.div key={w}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16,1,0.3,1] }}
          className="px-3 py-1 rounded-full border font-grotesk text-xs font-500"
          style={{
            borderColor: `${accent}40`,
            color: i % 3 === 0 ? accent : `${accent}88`,
            background: `${accent}08`,
          }}>
          {w}
        </motion.div>
      ))}
      <div className="absolute bottom-4 right-4 font-grotesk text-[11px] tracking-[0.2em] uppercase" style={{ color: accent, opacity: 0.7 }}>
        Stack Depth
      </div>
    </div>
  )
}

const VISUALS = { pitch: PitchVisual, growth: GrowthVisual, talent: TalentVisual }

export default function ValueProps() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  const activeProp = props[active]
  const Visual = VISUALS[activeProp.visual]

  return (
    <section ref={ref} id="why" className="dark:bg-[#050508] bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-24 border-b dark:border-white/5 border-black/5">
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-5 h-px bg-[#00f5ff]"/>
            <span className="font-grotesk text-[11px] tracking-[0.22em] uppercase dark:text-white/35 text-black/45">Why it matters</span>
          </div>
          <h2 className="font-syne font-800 dark:text-white text-black leading-[0.94] tracking-[-0.02em]"
            style={{fontSize:'clamp(2.6rem,6vw,5.5rem)'}}>
            Compound your<br/>
            <span className="grad-cyan">product equity.</span>
          </h2>
        </motion.div>
      </div>

      {/* Interactive accordion + live visual */}
      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">

          {/* Left: accordion list */}
          <div className="flex flex-col divide-y dark:divide-white/5 divide-black/5">
            {props.map((p, i) => {
              const isOpen = active === i
              return (
                <motion.div key={p.num}
                  onClick={() => setActive(i)}
                  className="py-6 cursor-pointer group"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <div className="flex items-center justify-between gap-4 mb-0">
                    <div className="flex items-center gap-4">
                      <span
                        className="font-syne font-800 text-[11px] tracking-[0.2em] transition-colors duration-200"
                        style={{ color: isOpen ? p.accent : 'transparent',
                          WebkitTextStroke: isOpen ? '0' : '1px rgba(128,128,128,0.3)' }}
                      >
                        {p.num}
                      </span>
                      <h3
                        className="font-syne font-800 transition-colors duration-200"
                        style={{
                          fontSize: 'clamp(1.3rem,2.5vw,1.9rem)',
                          color: isOpen ? (document.documentElement.classList.contains('dark') ? 'white' : 'black') : undefined,
                        }}
                      >
                        <span className={isOpen ? 'dark:text-white text-black' : 'dark:text-white/40 text-black/40'}>
                          {p.title}
                        </span>
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="w-6 h-6 rounded-full border dark:border-white/15 border-black/15 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: isOpen ? `${p.accent}60` : undefined }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <path d="M5 1V9M1 5H9" stroke={isOpen ? p.accent : 'currentColor'} strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pl-10">
                          <p className="font-grotesk dark:text-white/52 text-black/55 leading-[1.8] text-sm max-w-md mb-4">
                            {p.body}
                          </p>
                          <a href="#booking"
                            className="inline-flex items-center gap-2 font-grotesk font-500 text-sm"
                            style={{ color: p.accent }}>
                            Start a project
                            <motion.span animate={{ x:[0,4,0] }} transition={{ duration:1.5, repeat:Infinity }}>→</motion.span>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          {/* Right: animated visual panel */}
          <div className="lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <motion.div key={activeProp.visual}
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
                className="relative rounded-2xl overflow-hidden dark:bg-[#0a0a14] bg-gray-50"
                style={{
                  aspectRatio: '1 / 1',
                  border: `1px solid ${activeProp.accent}22`,
                  boxShadow: `0 0 60px ${activeProp.accent}0a`,
                }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-12 h-px" style={{background:`linear-gradient(90deg,${activeProp.accent},transparent)`}}/>
                <div className="absolute top-0 left-0 w-px h-12" style={{background:`linear-gradient(180deg,${activeProp.accent},transparent)`}}/>
                <div className="absolute bottom-0 right-0 w-12 h-px" style={{background:`linear-gradient(270deg,${activeProp.accent},transparent)`}}/>
                <div className="absolute bottom-0 right-0 w-px h-12" style={{background:`linear-gradient(0deg,${activeProp.accent},transparent)`}}/>

                {/* Tag label */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="font-grotesk text-[10px] tracking-[0.22em] uppercase px-2.5 py-1 rounded-full"
                    style={{ background:`${activeProp.accent}18`, color: activeProp.accent }}>
                    {activeProp.tag}
                  </span>
                </div>

                {/* Live visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Visual accent={activeProp.accent} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  )
}