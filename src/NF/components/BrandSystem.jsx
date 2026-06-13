import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'

/**
 * Kerna "Brand Operating System" equivalent:
 * "The Product Operating System" — numbered deliverables
 * with an expanding accordion and parallax number.
 */

const pillars = [
  {
    num: '1',
    title: 'Discovery & Strategy',
    short: 'Positioning and architecture that opens doors.',
    body: 'We embed early — product vision sessions, architecture audits, competitor teardowns. We map where you are, where you need to be, and the fastest path between the two. No slide decks. Real strategic clarity.',
    tags: ['Product Vision','Tech Audit','Roadmapping','Competitive Analysis'],
    accent: '#00f5ff',
  },
  {
    num: '2',
    title: 'Design & Visual Identity',
    short: 'Interfaces that win before you say a word.',
    body: 'Component systems, motion languages, brand tokens, and UI that feels inevitable. Design isn\'t decoration — it\'s the first argument your product makes. We make sure that argument wins.',
    tags: ['UI/UX','Design System','Motion','Brand Identity'],
    accent: '#bf5fff',
  },
  {
    num: '3',
    title: 'Build & Ship',
    short: 'Production code. Weekly. Every sprint.',
    body: 'Full-stack engineering across web, mobile, and SaaS. React, Next.js, React Native, Node, Python — whatever the problem requires. We ship real, working software on a weekly cadence with live preview links.',
    tags: ['React','Next.js','React Native','Node.js','Python'],
    accent: '#c6f135',
  },
  {
    num: '4',
    title: 'Iterate & Scale',
    short: 'Ongoing partnership that compounds over time.',
    body: 'The longer we\'re in, the sharper we get. Every cycle, we understand your product deeper, move faster, and raise the bar on what we ship. Monthly retainers with no lock-in — we earn your trust every sprint.',
    tags: ['Retainer','CI/CD','Performance','Growth'],
    accent: '#ff2d78',
  },
]

function PillarRow({ pillar, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{opacity:0,y:20}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true,margin:'-40px'}}
      transition={{duration:0.6,delay:index*0.08}}
      className="border-b dark:border-white/5 border-black/5 group"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-6 py-8 text-left"
      >
        {/* Number */}
        <span className="font-syne font-800 text-sm w-8 flex-shrink-0 mt-0.5 dark:text-white/20 text-black/25 group-hover:text-[var(--a)] transition-colors"
          style={{'--a':pillar.accent}}>
          {pillar.num}
        </span>

        {/* Title + short */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-syne font-700 dark:text-white text-black leading-tight group-hover:transition-colors"
              style={{fontSize:'clamp(1.15rem,2.2vw,1.7rem)'}}>
              {pillar.title}
            </h3>
            {/* Plus / minus */}
            <motion.div
              animate={{rotate: open ? 45 : 0}}
              transition={{duration:0.3,ease:[0.16,1,0.3,1]}}
              className="flex-shrink-0 w-8 h-8 rounded-full dark:bg-white/5 bg-black/5 flex items-center justify-center"
              style={{color:open ? pillar.accent : undefined}}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </motion.div>
          </div>
          {!open && (
            <p className="font-grotesk text-sm dark:text-white/40 text-black/45 mt-1">{pillar.short}</p>
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{height:0,opacity:0}}
            animate={{height:'auto',opacity:1}}
            exit={{height:0,opacity:0}}
            transition={{duration:0.38,ease:[0.16,1,0.3,1]}}
            className="overflow-hidden"
          >
            <div className="pl-14 pb-8 pr-6">
              <p className="font-grotesk dark:text-white/55 text-black/60 leading-[1.8] max-w-2xl mb-5"
                style={{fontSize:'clamp(0.875rem,1.2vw,1rem)'}}>
                {pillar.body}
              </p>
              <div className="flex flex-wrap gap-2">
                {pillar.tags.map(t => (
                  <span key={t} className="tag-pill border text-[11px]"
                    style={{background:`${pillar.accent}12`,color:pillar.accent,borderColor:`${pillar.accent}28`}}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function BrandSystem() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })
  const rawY = useTransform(scrollYProgress,[0,1],['10%','-10%'])
  const y    = useSpring(rawY,{stiffness:40,damping:16})

  return (
    <section ref={ref} id="services" className="relative dark:bg-[#07070c] bg-gray-50/60 overflow-hidden">

      {/* Big background text — parallax */}
      <motion.div style={{y}}
        className="absolute right-[-4%] top-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span className="font-syne font-800 dark:text-white/[0.018] text-black/[0.025] leading-none block"
          style={{fontSize:'clamp(120px,20vw,260px)'}}>
          BUILD
        </span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-5 h-px bg-[#bf5fff]"/>
                <span className="font-grotesk text-[11px] tracking-[0.22em] uppercase dark:text-white/35 text-black/45">
                  How we operate
                </span>
              </div>
              <h2 className="font-syne font-800 dark:text-white text-black leading-[0.93] tracking-[-0.02em]"
                style={{fontSize:'clamp(2.4rem,5.5vw,5rem)'}}>
                The Product<br/>
                <span className="grad-violet">Operating System.</span>
              </h2>
            </motion.div>
          </div>
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.15}}
            className="flex items-end">
            <p className="font-grotesk dark:text-white/45 text-black/50 leading-[1.8]"
              style={{fontSize:'clamp(0.875rem,1.2vw,1rem)'}}>
              A complete, end-to-end product infrastructure — from first sketch to ongoing scale. Not a set of services. A system that compounds.
            </p>
          </motion.div>
        </div>

        {/* Accordion rows */}
        <div>
          {pillars.map((p,i) => <PillarRow key={p.num} pillar={p} index={i}/>)}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.3}}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl dark:bg-white/[0.025] bg-white border dark:border-white/5 border-black/6">
          <div>
            <p className="font-syne font-700 text-xl dark:text-white text-black mb-1">Ready to start building?</p>
            <p className="font-grotesk text-sm dark:text-white/45 text-black/50">No pitch decks. No fluff. A real conversation about your product.</p>
          </div>
          <motion.a href="#booking"
            whileHover={{scale:1.03,boxShadow:'0 0 40px rgba(0,245,255,0.25)'}}
            whileTap={{scale:0.97}}
            className="flex-shrink-0 px-7 py-3.5 rounded-full bg-[#00f5ff] text-black font-grotesk font-600 text-sm transition-all duration-200">
            Book Discovery Call →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
