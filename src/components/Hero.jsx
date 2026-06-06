import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

const words = ['Web Apps', 'Mobile Apps', 'SaaS Products', 'AI Systems', 'Bold Brands']

function AnimatedWord() {
  const [index, setIndex] = [0, () => {}]
  return null
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden dark:bg-[#050508] bg-white"
    >
      {/* Grid background */}
      <div className="absolute inset-0 dark:grid-bg light-grid-bg opacity-60" />

      {/* Radial glow — dark */}
      <div className="absolute inset-0 dark:block hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, rgba(191,95,255,0.04) 40%, transparent 70%)' }}
        />
      </div>
      {/* Radial glow — light */}
      <div className="absolute inset-0 block dark:hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)' }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -25, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] right-[12%] w-64 h-64 rounded-full dark:opacity-100 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[20%] left-[8%] w-72 h-72 rounded-full dark:opacity-100 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(191,95,255,0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[60%] right-[25%] w-40 h-40 rounded-full dark:opacity-100 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(198,241,53,0.2) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse" />
              <span className="text-sm font-grotesk dark:text-white/70 text-black/70 tracking-widest uppercase">
                Available for new projects
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-syne font-800 text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight dark:text-white text-black mb-6"
          >
            We Build Digital
            <br />
            <span className="gradient-text-cyan">Products</span> That
            <br />
            <span className="italic font-syne" style={{ fontStyle: 'italic' }}>Actually</span> Ship.
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={itemVariants}
            className="font-grotesk text-[clamp(1rem,2vw,1.25rem)] dark:text-white/50 text-black/55 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            From zero to production — web apps, mobile, SaaS, AI integrations, and brand identities.
            One embedded team. Zero fluff. Real output every week.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(0,245,255,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-grotesk font-600 text-black bg-[#00f5ff] transition-all duration-200"
            >
              Book a Free Call
              <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#work"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-grotesk font-600 dark:text-white text-black dark:border-white/15 border-black/15 border dark:hover:border-white/30 hover:border-black/30 transition-all duration-200"
            >
              <Play size={16} className="fill-current" />
              See Our Work
            </motion.a>
          </motion.div>

          {/* Scroll stats */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px dark:bg-white/5 bg-black/5 rounded-2xl overflow-hidden border dark:border-white/5 border-black/5"
          >
            {[
              { v: '120+', l: 'Projects Shipped' },
              { v: '$40M+', l: 'Revenue Generated' },
              { v: '98%', l: 'Client Retention' },
              { v: '4 Days', l: 'First Delivery' },
            ].map((s, i) => (
              <div
                key={i}
                className="dark:bg-[#050508] bg-white px-6 py-8 text-center hover:dark:bg-white/[0.02] hover:bg-black/[0.01] transition-colors"
              >
                <div className="font-syne font-800 text-3xl md:text-4xl gradient-text-cyan mb-1">{s.v}</div>
                <div className="text-sm font-grotesk dark:text-white/40 text-black/45">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 dark:bg-gradient-to-t dark:from-[#050508] to-transparent bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
