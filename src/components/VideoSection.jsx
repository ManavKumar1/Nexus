import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * Verteal-style video showcase section.
 * Drop /public/work-reel.mp4 to activate the video.
 * Until then a cinematic animated gradient stands in.
 */
export default function VideoSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })

  const rawY    = useTransform(scrollYProgress,[0,1],['-8%','8%'])
  const rawS    = useTransform(scrollYProgress,[0,1],[1.06,1.0])
  const y       = useSpring(rawY,{stiffness:40,damping:16})
  const scale   = useSpring(rawS,{stiffness:40,damping:16})
  const opacity = useTransform(scrollYProgress,[0,0.15,0.85,1],[0,1,1,0])

  return (
    <section ref={ref} className="relative py-8 dark:bg-[#050508] bg-white overflow-hidden">
      <motion.div style={{opacity}} className="max-w-7xl mx-auto px-6">

        {/* Label row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="w-5 h-px bg-[#00f5ff]"/>
            <span className="font-grotesk text-[11px] tracking-[0.2em] uppercase dark:text-white/35 text-black/45">
              What we ship
            </span>
          </div>
          <span className="font-grotesk text-[11px] tracking-[0.15em] uppercase dark:text-white/20 text-black/30">
            Opinionated · Creative · Operators
          </span>
        </div>

        {/* Video frame */}
        <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio:'16/8' }}>
          <motion.div style={{ y, scale }} className="absolute inset-[-8%] origin-center">

            {/* VIDEO — place /public/work-reel.mp4 to activate */}
            {/* <video src="/work-reel.mp4" autoPlay muted loop playsInline
                  className="w-full h-full object-cover"/> */}

            {/* Animated gradient stand-in */}
            <div className="w-full h-full relative overflow-hidden dark:bg-[#0a0a14] bg-gray-100">
              <motion.div
                animate={{ x:['-20%','20%','-20%'], y:['-10%','10%','-10%'] }}
                transition={{ duration:18, repeat:Infinity, ease:'easeInOut' }}
                className="absolute inset-0"
                style={{ background:'radial-gradient(ellipse 70% 60% at 40% 50%,rgba(0,245,255,0.18) 0%,transparent 65%)' }}
              />
              <motion.div
                animate={{ x:['20%','-20%','20%'], y:['10%','-10%','10%'] }}
                transition={{ duration:22, repeat:Infinity, ease:'easeInOut', delay:3 }}
                className="absolute inset-0"
                style={{ background:'radial-gradient(ellipse 60% 55% at 65% 55%,rgba(191,95,255,0.14) 0%,transparent 65%)' }}
              />
              <motion.div
                animate={{ scale:[1,1.15,1], opacity:[0.5,0.9,0.5] }}
                transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }}
                className="absolute inset-0"
                style={{ background:'radial-gradient(ellipse 40% 40% at 50% 50%,rgba(198,241,53,0.07) 0%,transparent 70%)' }}
              />
              {/* Grid over gradient */}
              <div className="absolute inset-0 dark:grid-bg grid-bg-light opacity-40"/>

              {/* Centre text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <p className="font-grotesk text-[11px] tracking-[0.3em] uppercase dark:text-white/20 text-black/25">
                  Place /public/work-reel.mp4 here
                </p>
                <div className="w-14 h-14 rounded-full dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="dark:text-white/30 text-black/30 translate-x-0.5">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Overlay tint */}
          <div className="absolute inset-0 dark:bg-[#050508]/10 pointer-events-none"/>

          {/* Floating discipline tags over video */}
          {[
            { label:'SaaS', pos:'top-5 left-5' },
            { label:'Mobile', pos:'top-5 right-5' },
            { label:'Web', pos:'bottom-5 left-5' },
            { label:'Branding', pos:'bottom-5 right-5' },
          ].map(({label,pos},i) => (
            <motion.div key={label}
              initial={{opacity:0,scale:0.8}}
              whileInView={{opacity:1,scale:1}}
              viewport={{once:true}}
              transition={{delay:0.3+i*0.1}}
              className={`absolute ${pos} tag-pill dark:bg-black/50 bg-white/70 backdrop-blur-md dark:text-white/70 text-black/70 dark:border-white/10 border-black/10 border`}>
              {label}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
