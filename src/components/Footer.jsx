import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * Kerna + Verteal hybrid footer:
 * — Full-width marquee CTA headline
 * — Editorial two-col layout
 * — Minimal link list
 * — Parallax headline text
 */

function XIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}
function LinkedinIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

const navCols = [
  { head: 'Work with us', links: [{ label:'hello@nexus.agency', href:'mailto:hello@nexus.agency' }] },
  { head: 'Navigate', links: [
    {label:'Services',href:'#services'},
    {label:'Process',href:'#process'},
    {label:'Work',href:'#work'},
    {label:'Pricing',href:'#pricing'},
    {label:'Book a Call',href:'#booking'},
  ]},
  { head: 'Connect', links: [
    {label:'LinkedIn',href:'#'},
    {label:'X / Twitter',href:'#'},
    {label:'GitHub',href:'#'},
  ]},
]

const teamMembers = [
  { role:'Founder', name:'Your Name' },
  { role:'Lead Developer', name:'Senior Dev' },
  { role:'Creative Director', name:'Art Director' },
]

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end end'] })
  const rawY = useTransform(scrollYProgress,[0,1],['-6%','0%'])
  const y    = useSpring(rawY,{stiffness:35,damping:16})

  /* Marquee headline text */
  const headline = 'Start Compounding Your Product Equity — '
  const repeated = Array(6).fill(headline).join('')

  return (
    <footer ref={ref} className="relative dark:bg-[#07070c] bg-gray-50/80 overflow-hidden border-t dark:border-white/5 border-black/6">

      {/* ── Marquee CTA headline ── */}
      <div className="py-16 border-b dark:border-white/5 border-black/6 overflow-hidden">
        <motion.div style={{y}} className="marquee-wrap">
          <div className="marquee-inner">
            {[...Array(2)].map((_,ri) => (
              <span key={ri} className="font-syne font-800 dark:text-white text-black whitespace-nowrap pr-0"
                style={{fontSize:'clamp(2rem,5vw,4.5rem)',letterSpacing:'-0.02em'}}>
                {Array(8).fill(null).map((_,i) => (
                  <span key={i}>
                    {headline.trim()}
                    <span className="grad-cyan mx-4">·</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Editorial CTA block ── */}
      <div className="max-w-7xl mx-auto px-6 py-20 border-b dark:border-white/5 border-black/6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2
              initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{duration:0.8,ease:[0.16,1,0.3,1]}}
              className="font-syne font-800 dark:text-white text-black leading-[0.93] tracking-[-0.02em]"
              style={{fontSize:'clamp(2.2rem,5vw,4.5rem)'}}>
              Great products come from<br/>teams that are close enough<br/>
              <span className="grad-cyan">to care.</span>
            </motion.h2>
          </div>
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.15}}
            className="flex flex-col gap-5">
            <p className="font-grotesk dark:text-white/45 text-black/52 leading-[1.8] text-sm">
              2 spots available for new partnerships this month. We work with founders and teams who care about craft — and want a team that does too.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a href="#booking"
                whileHover={{scale:1.03,boxShadow:'0 0 40px rgba(0,245,255,0.25)'}}
                whileTap={{scale:0.97}}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#00f5ff] text-black font-grotesk font-600 text-sm transition-all duration-200">
                Let's work together →
              </motion.a>
              <motion.a href="mailto:hello@nexus.agency"
                whileHover={{scale:1.02}}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border dark:border-white/10 border-black/10 dark:text-white text-black font-grotesk font-600 text-sm transition-all duration-200">
                hello@nexus.agency
              </motion.a>
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-2 pt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5ff] opacity-60"/>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f5ff]"/>
              </span>
              <span className="font-grotesk text-xs dark:text-white/35 text-black/45">
                2 spots left for ongoing partnerships
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Links grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-16 border-b dark:border-white/5 border-black/6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00f5ff] to-[#bf5fff] flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="black"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <span className="font-syne font-800 text-lg dark:text-white text-black tracking-tight">
                NEXUS<span className="grad-cyan">.</span>
              </span>
            </a>
            <p className="font-grotesk text-sm dark:text-white/38 text-black/48 leading-[1.7] mb-5 max-w-[200px]">
              Embedded digital team for SaaS, mobile, web & branding.
            </p>
            <div className="flex gap-3">
              {[{Icon:LinkedinIcon},{Icon:XIcon}].map(({Icon},i) => (
                <a key={i} href="#"
                  className="w-8 h-8 rounded-full dark:bg-white/5 bg-black/5 border dark:border-white/8 border-black/8 flex items-center justify-center dark:text-white/40 text-black/45 dark:hover:text-white hover:text-black transition-colors">
                  <Icon size={13}/>
                </a>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {navCols.map(col => (
            <div key={col.head}>
              <h4 className="font-syne font-700 text-[10px] tracking-[0.2em] uppercase dark:text-white/25 text-black/35 mb-4">
                {col.head}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <a href={l.href}
                      className="font-grotesk text-sm dark:text-white/50 text-black/55 dark:hover:text-white hover:text-black transition-colors duration-150">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Team credits — Kerna style ── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Left: team */}
          <div className="flex flex-col sm:flex-row gap-8">
            {teamMembers.map(m => (
              <div key={m.role}>
                <p className="font-grotesk text-[10px] tracking-[0.15em] uppercase dark:text-white/22 text-black/28 mb-0.5">{m.role}</p>
                <p className="font-grotesk text-sm dark:text-white/55 text-black/60">{m.name}</p>
              </div>
            ))}
          </div>

          {/* Right: copyright */}
          <p className="font-grotesk text-[11px] dark:text-white/22 text-black/30">
            © 2025 Nexus Agency
          </p>
        </div>
      </div>
    </footer>
  )
}
