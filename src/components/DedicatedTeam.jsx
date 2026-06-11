import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * DedicatedTeam — floating colorful role pill cloud,
 * matching the Verteal screenshot layout exactly.
 */

const roles = [
  { label: 'Web Developer',     color: '#3B82F6', x: 28,  y: 16 },
  { label: 'UI/UX Designer',    color: '#EC4899', x: 68,  y: 14 },
  { label: 'Product Designer',  color: '#F43F5E', x: 4,   y: 36 },
  { label: 'Brand Designer',    color: '#F59E0B', x: 88,  y: 32 },
  { label: 'Creative Director', color: '#EF4444', x: 6,   y: 62 },
  { label: 'Illustrator',       color: '#10B981', x: 86,  y: 60 },
  { label: 'Motion Designer',   color: '#F97316', x: 28,  y: 80 },
  { label: '3D Designer',       color: '#8B5CF6', x: 65,  y: 78 },
]

// Gentle floating animation — each pill gets unique offsets
const floatVariants = (i) => ({
  animate: {
    y: [0, -10 + (i % 3) * 4, 0],
    x: [0, (i % 2 === 0 ? 5 : -5), 0],
    transition: {
      duration: 4 + i * 0.7,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: i * 0.4,
    }
  }
})

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

      {/* ── Floating pill cloud ── */}
      <motion.div style={{ y, opacity }} className="relative max-w-5xl mx-auto px-6">
        <div className="relative" style={{ height: '420px' }}>

          {/* Centre headline */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-center"
            >
              <h3
                className="font-syne font-800 dark:text-white text-black leading-[1.05] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
              >
                A dedicated team,<br/>fully embedded
              </h3>
            </motion.div>
          </div>

          {/* Floating role pills */}
          {roles.map((role, i) => (
            <motion.div
              key={role.label}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              variants={floatVariants(i)}
              animate="animate"
              whileHover={{ scale: 1.08, zIndex: 10 }}
              className="absolute"
              style={{
                left: `${role.x}%`,
                top: `${role.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 5,
              }}
            >
              <div
                className="relative px-4 py-2 rounded-full font-grotesk font-600 text-sm whitespace-nowrap select-none"
                style={{
                  background: role.color,
                  color: '#fff',
                  boxShadow: `0 4px 20px ${role.color}40`,
                  fontSize: '13px',
                  letterSpacing: '0.01em',
                }}
              >
                {role.label}
              </div>
            </motion.div>
          ))}
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
