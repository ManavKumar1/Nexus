import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * Kerna-style "Compound your Brand Equity" section.
 * Three stacked full-width panels:
 *   01 — Secure investor conviction
 *   02 — Turn users into ambassadors
 *   03 — Attract elite talent
 * Each has a massive bg number, parallax text, and a pinned image zone.
 */

const panels = [
  {
    num:   '01',
    tag:   'For Founders & Investors',
    title: 'Secure investor\nconviction.',
    body:  'Walk into every pitch with a product that speaks before you do. Polished UI, airtight architecture, and a demo that shifts rooms in your favour — built by a team that understands what investors actually scrutinise.',
    accent: '#00f5ff',
    grad: 'from-[#00f5ff]/8 to-transparent',
    gradLight: 'from-[#00aaff]/6 to-transparent',
  },
  {
    num:   '02',
    tag:   'For Growth Teams',
    title: 'Turn users into\nambassadors.',
    body:  'Distinctive products create word-of-mouth no ad budget can replicate. We build the interfaces, flows, and micro-interactions that make users reach for their phones to show friends unprompted.',
    accent: '#bf5fff',
    grad: 'from-[#bf5fff]/8 to-transparent',
    gradLight: 'from-[#9333ea]/6 to-transparent',
  },
  {
    num:   '03',
    tag:   'For Hiring Teams',
    title: 'Attract the\nelite talent.',
    body:  'The best engineers and designers have options. A product that looks and feels exceptional signals a future worth betting careers on. We build the thing people brag about working on.',
    accent: '#c6f135',
    grad: 'from-[#c6f135]/8 to-transparent',
    gradLight: 'from-[#84cc16]/6 to-transparent',
  },
]

function Panel({ panel, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })

  const rawY   = useTransform(scrollYProgress,[0,1],['6%','-6%'])
  const numY   = useTransform(scrollYProgress,[0,1],['12%','-12%'])
  const imgY   = useTransform(scrollYProgress,[0,1],['8%','-8%'])
  const y      = useSpring(rawY,{stiffness:45,damping:18})
  const ny     = useSpring(numY,{stiffness:35,damping:16})
  const iy     = useSpring(imgY,{stiffness:40,damping:17})
  const opacity = useTransform(scrollYProgress,[0,0.12,0.88,1],[0,1,1,0])

  const isOdd = index % 2 !== 0

  return (
    <motion.div ref={ref} style={{opacity}}
      className="relative min-h-[85vh] flex items-center border-b dark:border-white/5 border-black/5 overflow-hidden">

      {/* Huge background number */}
      <motion.div style={{y:ny}}
        className={`absolute ${isOdd ? 'right-[-2%]' : 'left-[-2%]'} top-1/2 -translate-y-1/2 select-none pointer-events-none z-0`}>
        <span className="font-syne font-800 dark:text-white/[0.025] text-black/[0.03]"
          style={{ fontSize:'clamp(140px,22vw,280px)', lineHeight:1, display:'block' }}>
          {panel.num}
        </span>
      </motion.div>

      {/* Gradient wash */}
      <div className={`absolute inset-0 z-0 bg-gradient-to-${isOdd?'l':'r'} ${panel.grad} dark:block hidden`}/>
      <div className={`absolute inset-0 z-0 bg-gradient-to-${isOdd?'l':'r'} ${panel.gradLight} dark:hidden block`}/>

      <div className={`relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center py-24 ${isOdd ? 'lg:grid-flow-dense' : ''}`}>

        {/* Text side */}
        <motion.div style={{y}} className={isOdd ? 'lg:col-start-2' : ''}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-syne font-700"
              style={{borderColor:`${panel.accent}44`, color:panel.accent}}>
              {panel.num}
            </div>
            <span className="font-grotesk text-[11px] tracking-[0.2em] uppercase dark:text-white/35 text-black/45">
              {panel.tag}
            </span>
          </div>

          <h2 className="font-syne font-800 dark:text-white text-black leading-[0.95] tracking-[-0.02em] mb-8 whitespace-pre-line"
            style={{ fontSize:'clamp(2.4rem,5.5vw,5rem)' }}>
            {panel.title}
          </h2>

          <p className="font-grotesk dark:text-white/50 text-black/55 leading-[1.8] max-w-md"
            style={{ fontSize:'clamp(0.9rem,1.2vw,1.05rem)' }}>
            {panel.body}
          </p>

          <motion.a href="#booking"
            whileHover={{x:4}} transition={{type:'spring',stiffness:300}}
            className="inline-flex items-center gap-2 mt-8 font-grotesk font-500 text-sm group"
            style={{color:panel.accent}}>
            Start a project
            <motion.span animate={{x:[0,4,0]}} transition={{duration:1.5,repeat:Infinity}}>→</motion.span>
          </motion.a>
        </motion.div>

        {/* Visual side */}
        <motion.div style={{y:iy}} className={`${isOdd ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
          <div className="relative rounded-2xl overflow-hidden" style={{aspectRatio:'4/3'}}>
            {/* Animated visual card */}
            <div className="absolute inset-0 dark:bg-[#0d0d18] bg-gray-50 flex items-center justify-center">
              <motion.div
                animate={{ rotate:[0,360] }} transition={{ duration:30,repeat:Infinity,ease:'linear' }}
                className="absolute inset-[-20%] rounded-full opacity-30"
                style={{ background:`conic-gradient(from 0deg,${panel.accent}22,transparent,${panel.accent}11,transparent)` }}
              />
              <motion.div
                animate={{ scale:[0.95,1.05,0.95],opacity:[0.4,0.7,0.4] }}
                transition={{ duration:5,repeat:Infinity,ease:'easeInOut' }}
                className="w-24 h-24 rounded-full"
                style={{ background:`radial-gradient(circle,${panel.accent}33 0%,transparent 70%)`, filter:'blur(20px)' }}
              />
              {/* Grid inside card */}
              <div className="absolute inset-0 dark:grid-bg grid-bg-light opacity-50"/>
              {/* Label */}
              <div className="relative z-10 text-center px-6">
                <div className="font-syne font-800 text-[11px] tracking-[0.3em] uppercase mb-2" style={{color:panel.accent}}>
                  {panel.tag}
                </div>
                <div className="font-grotesk text-xs dark:text-white/25 text-black/30">
                  Replace with project screenshot or video
                </div>
              </div>
            </div>

            {/* Corner accent line */}
            <div className="absolute top-0 left-0 w-16 h-px" style={{background:`linear-gradient(90deg,${panel.accent},transparent)`}}/>
            <div className="absolute top-0 left-0 w-px h-16" style={{background:`linear-gradient(180deg,${panel.accent},transparent)`}}/>
            <div className="absolute bottom-0 right-0 w-16 h-px" style={{background:`linear-gradient(270deg,${panel.accent},transparent)`}}/>
            <div className="absolute bottom-0 right-0 w-px h-16" style={{background:`linear-gradient(0deg,${panel.accent},transparent)`}}/>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ValueProps() {
  return (
    <section id="why" className="dark:bg-[#050508] bg-white">
      {/* Intro header */}
      <div className="max-w-7xl mx-auto px-6 py-24 border-b dark:border-white/5 border-black/5">
        <motion.div
          initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
          viewport={{once:true}} transition={{duration:0.7}}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-5 h-px bg-[#00f5ff]"/>
            <span className="font-grotesk text-[11px] tracking-[0.22em] uppercase dark:text-white/35 text-black/45">
              Why it matters
            </span>
          </div>
          <h2 className="font-syne font-800 dark:text-white text-black leading-[0.94] tracking-[-0.02em]"
            style={{fontSize:'clamp(2.6rem,6vw,5.5rem)'}}>
            Compound your<br/>
            <span className="grad-cyan">product equity.</span>
          </h2>
        </motion.div>
      </div>

      {/* Stacked panels */}
      {panels.map((panel,i) => <Panel key={panel.num} panel={panel} index={i}/>)}
    </section>
  )
}
