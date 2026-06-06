import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * Verteal "A dedicated team, fully embedded" section.
 * Orbiting ring of role labels + centre animated core.
 * Parallax on scroll.
 */

const innerRoles = [
  'Web Developer','UI/UX Designer','Brand Designer',
  'Motion Designer','React Native Dev',
]
const outerRoles = [
  'Creative Director','Product Designer','3D Designer',
  'AI Engineer','Backend Engineer','Illustrator',
]

function RoleOrbit({ roles, radius, duration, reverse = false, accent = '#00f5ff' }) {
  const count = roles.length
  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0"
      style={{ transformOrigin: 'center center' }}
    >
      {roles.map((role, i) => {
        const angle = (i / count) * 2 * Math.PI - Math.PI / 2
        const x = 50 + (radius * Math.cos(angle))
        const y = 50 + (radius * Math.sin(angle))
        return (
          <motion.div
            key={role}
            animate={{ rotate: reverse ? 360 : -360 }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
            className="absolute"
            style={{
              left: `${x}%`, top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className="tag-pill border dark:bg-[#0a0a14]/90 bg-white/90 backdrop-blur-md whitespace-nowrap font-grotesk"
              style={{
                color: accent,
                borderColor: `${accent}30`,
                fontSize: '11px',
                padding: '5px 12px',
              }}
            >
              {role}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default function DedicatedTeam() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawY   = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const y      = useSpring(rawY, { stiffness: 45, damping: 18 })
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} className="relative dark:bg-[#050508] bg-white overflow-hidden py-28">

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-5 h-px bg-[#c6f135]"/>
            <span className="font-grotesk text-[11px] tracking-[0.22em] uppercase dark:text-white/35 text-black/45">
              The Team
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="font-syne font-800 dark:text-white text-black leading-[0.93] tracking-[-0.02em]"
              style={{fontSize:'clamp(2.4rem,5.5vw,5rem)'}}>
              A dedicated team,<br/>
              <span className="grad-lime">fully embedded.</span>
            </h2>
            <p className="font-grotesk dark:text-white/45 text-black/50 max-w-sm leading-[1.8] text-sm lg:text-right">
              Every discipline you need, none of the hiring overhead. We plug in as an extension of your team — accountable, aligned, and shipping from week one.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Orbit diagram */}
      <motion.div style={{ y, opacity }} className="relative max-w-3xl mx-auto px-6">
        <div className="relative" style={{ paddingBottom: '100%' }}>
          <div className="absolute inset-0 flex items-center justify-center">

            {/* Outer ring */}
            <div className="absolute inset-0">
              <RoleOrbit roles={outerRoles} radius={43} duration={38} accent="#bf5fff" />
            </div>

            {/* Inner ring */}
            <div className="absolute inset-[10%]">
              <RoleOrbit roles={innerRoles} radius={45} duration={28} reverse accent="#00f5ff" />
            </div>

            {/* Orbit circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute rounded-full border dark:border-white/5 border-black/6"
                style={{width:'86%',height:'86%'}}/>
              <div className="absolute rounded-full border dark:border-white/4 border-black/5"
                style={{width:'62%',height:'62%'}}/>
            </div>

            {/* Core */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center"
              style={{width:'28%',height:'28%'}}>
              <motion.div
                animate={{scale:[0.95,1.05,0.95]}}
                transition={{duration:5,repeat:Infinity,ease:'easeInOut'}}
                className="absolute inset-0 rounded-full"
                style={{background:'radial-gradient(circle,rgba(0,245,255,0.15) 0%,rgba(191,95,255,0.08) 60%,transparent 100%)',filter:'blur(12px)'}}
              />
              <div className="relative z-10 w-14 h-14 rounded-full dark:bg-white/[0.04] bg-black/[0.04] border dark:border-white/10 border-black/10 flex items-center justify-center mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-syne font-800 text-[10px] tracking-[0.15em] uppercase dark:text-white/50 text-black/50">Nexus</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
        viewport={{once:true}} transition={{duration:0.7,delay:0.2}}
        className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-2 md:grid-cols-4 gap-px dark:bg-white/5 bg-black/5 rounded-2xl overflow-hidden border dark:border-white/5 border-black/5"
      >
        {[
          {v:'No hiring',l:'Overhead eliminated'},
          {v:'Week 1',l:'First delivery'},
          {v:'8 roles',l:'In one subscription'},
          {v:'Pause',l:'Anytime, no penalty'},
        ].map(s => (
          <div key={s.l} className="dark:bg-[#050508] bg-white px-6 py-8 text-center">
            <div className="font-syne font-800 text-2xl grad-cyan mb-1">{s.v}</div>
            <div className="font-grotesk text-xs dark:text-white/35 text-black/45">{s.l}</div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
