import { useRef, useState, useEffect } from 'react'
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
        <motion.span
          key={idx}
          initial={{ y:'100%', opacity:0 }}
          animate={{ y:'0%',   opacity:1 }}
          exit={{   y:'-100%', opacity:0 }}
          transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
          className="grad-cyan"
          style={{ display:'block' }}
        >
          {WORDS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start','end start'] })

  /* parallax values */
  const bgY     = useSpring(useTransform(scrollYProgress,[0,1],['0%','28%']),  {stiffness:50,damping:18})
  const bgScale = useSpring(useTransform(scrollYProgress,[0,1],[1,1.1]),       {stiffness:50,damping:18})
  const textY   = useSpring(useTransform(scrollYProgress,[0,1],['0%','14%']), {stiffness:70,damping:22})
  const opacity = useTransform(scrollYProgress,[0,0.65],[1,0])

  const tags = ['SaaS','Mobile','Web','Branding','AI']

  const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.09, delayChildren:0.35 } } }
  const fadeUp  = { hidden:{ opacity:0, y:36 }, show:{ opacity:1, y:0, transition:{ duration:0.75, ease:[0.16,1,0.3,1] } } }

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden dark:bg-[#050508] bg-white flex flex-col">

      {/* ── PARALLAX BG LAYER ── */}
      <motion.div style={{ y:bgY, scale:bgScale }} className="absolute inset-0 z-0 origin-center">

        {/* VIDEO SLOT — drop your .mp4 here as /public/hero.mp4 */}
        {/* <video src="/hero.mp4" autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter:'saturate(0.5) brightness(0.28)' }} /> */}

        {/* Animated orbs substitute video mood */}
        <motion.div
          animate={{ x:[0,70,-40,0], y:[0,-55,35,0] }}
          transition={{ duration:20, repeat:Infinity, ease:'easeInOut' }}
          className="absolute top-[18%] left-[12%] w-[600px] h-[600px] rounded-full"
          style={{ background:'radial-gradient(circle,rgba(0,245,255,0.13) 0%,transparent 65%)', filter:'blur(70px)' }}
        />
        <motion.div
          animate={{ x:[0,-55,75,0], y:[0,45,-35,0] }}
          transition={{ duration:26, repeat:Infinity, ease:'easeInOut', delay:4 }}
          className="absolute bottom-[5%] right-[8%] w-[700px] h-[700px] rounded-full"
          style={{ background:'radial-gradient(circle,rgba(191,95,255,0.1) 0%,transparent 65%)', filter:'blur(90px)' }}
        />
        <motion.div
          animate={{ x:[0,35,-55,0], y:[0,-28,55,0] }}
          transition={{ duration:17, repeat:Infinity, ease:'easeInOut', delay:8 }}
          className="absolute top-[52%] left-[52%] w-[400px] h-[400px] rounded-full"
          style={{ background:'radial-gradient(circle,rgba(198,241,53,0.07) 0%,transparent 65%)', filter:'blur(55px)' }}
        />

        {/* Grid */}
        <div className="absolute inset-0 dark:grid-bg grid-bg-light opacity-60" />

        {/* Radial vignette */}
        <div className="absolute inset-0 dark:block hidden"
          style={{ background:'radial-gradient(ellipse at center,transparent 35%,rgba(5,5,8,0.92) 100%)' }} />
        <div className="absolute inset-0 dark:hidden block"
          style={{ background:'radial-gradient(ellipse at center,transparent 35%,rgba(255,255,255,0.88) 100%)' }} />
      </motion.div>

      {/* ── CONTENT ── */}
      <motion.div
        style={{ y:textY, opacity }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-24 max-w-7xl mx-auto w-full"
      >
        <motion.div variants={stagger} initial="hidden" animate="show" className="text-center w-full">

          {/* Status pill */}
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

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-syne font-800 dark:text-white text-black leading-[0.90] tracking-[-0.02em] mb-6"
            style={{ fontSize:'clamp(3rem,9.5vw,8.5rem)' }}
          >
            We build digital<br/>
            <span style={{ display:'inline-block', overflow:'hidden', height:'1.05em', verticalAlign:'bottom' }}>
              <CyclingWord />
            </span>
            <br/>that <em className="not-italic relative">
              actually
              <svg className="absolute -bottom-1 left-0 w-full" height="5" viewBox="0 0 200 5" preserveAspectRatio="none">
                <motion.path d="M0 3 Q50 0.5 100 3 Q150 5.5 200 3"
                  stroke="url(#heroUL)" strokeWidth="3" fill="none" strokeLinecap="round"
                  initial={{pathLength:0}} animate={{pathLength:1}} transition={{delay:1.4,duration:0.9,ease:'easeOut'}}/>
                <defs><linearGradient id="heroUL" x1="0" x2="1"><stop stopColor="#00f5ff"/><stop offset="1" stopColor="#bf5fff"/></linearGradient></defs>
              </svg>
            </em>{' '}ship.
          </motion.h1>

          {/* Sub */}
          <motion.p variants={fadeUp}
            className="font-grotesk dark:text-white/48 text-black/52 max-w-[520px] mx-auto leading-[1.75] mb-10"
            style={{ fontSize:'clamp(0.95rem,1.5vw,1.15rem)' }}>
            We don't work <em>for</em> your team — we become part of it.
            Then we ship, refine, and evolve your product from the inside out.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
            <motion.a href="#booking"
              whileHover={{ scale:1.04, boxShadow:'0 0 50px rgba(0,245,255,0.28)' }}
              whileTap={{ scale:0.97 }}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-grotesk font-600 text-black bg-[#00f5ff] transition-all duration-200"
            >
              Book a Call <ArrowRight size={15}/>
            </motion.a>
            <motion.a href="#work"
              whileHover={{ scale:1.02 }}
              whileTap={{ scale:0.97 }}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-grotesk font-600 dark:text-white text-black border dark:border-white/12 border-black/12 dark:hover:border-white/28 hover:border-black/28 backdrop-blur-sm transition-all duration-200"
            >
              See Our Work
            </motion.a>
          </motion.div>

          {/* Discipline tags */}
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

      {/* Scroll indicator */}
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
