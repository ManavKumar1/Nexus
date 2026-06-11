import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { TransitionLink } from './PageTransition'

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
function GithubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}
function ArrowUpRight({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function HummingbirdIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 6 C17 6 11 12 11 19 C11 25 15 29 20 30 L20 36 C20 37.1 20.9 38 22 38 L26 38 C27.1 38 28 37.1 28 36 L28 31 C33 30 38 25 38 19 C38 12 32 6 25 6 Z" fill="rgba(255,255,255,0.85)"/>
      <path d="M11 19 C6 15 2 10 5 6 C7 3 12 7 14 12" fill="rgba(255,255,255,0.55)"/>
      <path d="M38 19 C43 15 47 10 45 6 C43 3 38 7 36 12" fill="rgba(255,255,255,0.55)"/>
      <circle cx="22" cy="16" r="2" fill="rgba(255,60,10,0.6)"/>
    </svg>
  )
}

const navCols = [
  {
    head: 'Company',
    links: [
      { label: 'Services',     href: '#services' },
      { label: 'Our Process',  href: '#process' },
      { label: 'Work',         href: '#work',      transition: true },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'FAQ',          href: '#faq' },
    ],
  },
  {
    head: 'Get started',
    links: [
      { label: 'Pricing',      href: '#pricing',   transition: true },
      { label: 'Book a call',  href: '#booking',   transition: true },
      { label: 'hello@nexus.agency', href: 'mailto:hello@nexus.agency' },
    ],
  },
  {
    head: 'Connect',
    links: [
      { label: 'LinkedIn',  href: '#' },
      { label: 'X / Twitter', href: '#' },
      { label: 'GitHub',    href: '#' },
      { label: 'Dribbble',  href: '#' },
    ],
  },
]

const teamMembers = [
  { role: 'Founder',           name: 'Your Name' },
  { role: 'Lead Developer',    name: 'Senior Dev' },
  { role: 'Creative Director', name: 'Art Director' },
]

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end end'] })
  const rawY = useTransform(scrollYProgress,[0,1],['-4%','0%'])
  const y    = useSpring(rawY,{stiffness:35,damping:16})

  return (
    <footer ref={ref} className="relative overflow-hidden">

      {/* ── Pre-footer CTA strip ── */}
      <div className="dark:bg-[#07070c] bg-gray-50/80 border-t dark:border-white/5 border-black/6">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
            <p className="font-grotesk text-sm dark:text-white/42 text-black/50 mb-3">
              2 spots left for recurring partnerships
            </p>
            <TransitionLink href="#booking"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-grotesk font-600 text-sm dark:bg-white/5 bg-black/5 dark:text-white text-black dark:border-white/10 border-black/10 border">
              Let's work together
              <span className="w-6 h-6 rounded-full bg-black dark:bg-white flex items-center justify-center">
                <ArrowUpRight size={10} />
              </span>
            </TransitionLink>
          </motion.div>

          <motion.h2
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8,delay:0.1}}
            className="font-syne font-800 dark:text-white text-black leading-[0.93] tracking-[-0.02em] max-w-xl lg:text-right"
            style={{ fontSize:'clamp(1.6rem,3.5vw,3rem)' }}
          >
            Great products come from teams that are close enough to care — and opinionated enough to change things.
          </motion.h2>
        </div>
      </div>

      {/* ── Links grid ── */}
      <div className="dark:bg-[#07070c] bg-gray-50/80 border-t dark:border-white/5 border-black/6">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12">

            {/* Brand col */}
            <div className="col-span-2 md:col-span-2">
              <a href="#" className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00f5ff] to-[#bf5fff] flex items-center justify-center">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="black"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <span className="font-syne font-800 text-lg dark:text-white text-black tracking-tight">
                  NEXUS<span className="grad-cyan">.</span>
                </span>
              </a>
              <p className="font-grotesk text-sm dark:text-white/38 text-black/48 leading-[1.7] mb-5 max-w-[220px]">
                Embedded digital team for SaaS, mobile, web & branding. Ship faster. Build smarter.
              </p>
              <div className="flex gap-3 mb-8">
                {[{ Icon:LinkedinIcon }, { Icon:XIcon }, { Icon:GithubIcon }].map(({Icon},i) => (
                  <a key={i} href="#"
                    className="w-8 h-8 rounded-full dark:bg-white/5 bg-black/5 border dark:border-white/8 border-black/8 flex items-center justify-center dark:text-white/40 text-black/45 dark:hover:text-white hover:text-black transition-colors">
                    <Icon size={13}/>
                  </a>
                ))}
              </div>
              {/* Availability badge */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5ff] opacity-60"/>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f5ff]"/>
                </span>
                <span className="font-grotesk text-xs dark:text-white/35 text-black/45">
                  Accepting 2 new partners
                </span>
              </div>
            </div>

            {/* Nav cols */}
            {navCols.map(col => (
              <div key={col.head}>
                <h4 className="font-syne font-700 text-[10px] tracking-[0.2em] uppercase dark:text-white/25 text-black/35 mb-4">
                  {col.head}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map(l => l.transition ? (
                    <li key={l.label}>
                      <TransitionLink href={l.href}
                        className="font-grotesk text-sm dark:text-white/50 text-black/55 dark:hover:text-white hover:text-black transition-colors duration-150">
                        {l.label}
                      </TransitionLink>
                    </li>
                  ) : (
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
      </div>

      {/* ── Main brand footer (Verteal red style) ── */}
      <div className="relative overflow-hidden" style={{ background:'#FF2400' }}>

        {/* Top bar */}
        <div className="relative z-10 px-8 pt-8 pb-4 flex items-start justify-between">
          {/* Nav */}
          <nav className="flex flex-col gap-1">
            {[
              { label:'Work',    href:'#work',    transition:true },
              { label:'Approach',href:'#process', transition:false },
              { label:'Why Us',  href:'#services',transition:false },
              { label:'Pricing', href:'#pricing', transition:true },
            ].map(l => l.transition ? (
              <TransitionLink key={l.label} href={l.href}
                className="font-grotesk text-sm font-500 hover:opacity-70 transition-opacity"
                style={{ color:'rgba(255,255,255,0.85)' }}>
                {l.label}
              </TransitionLink>
            ) : (
              <a key={l.label} href={l.href}
                className="font-grotesk text-sm font-500 hover:opacity-70 transition-opacity"
                style={{ color:'rgba(255,255,255,0.85)' }}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* Center hummingbird */}
          <div className="absolute left-1/2 top-8 -translate-x-1/2">
            <motion.div animate={{ y:[0,-6,0] }} transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}>
              <HummingbirdIcon size={36} />
            </motion.div>
          </div>

          {/* Right: copyright + CTA + email */}
          <div className="flex flex-col items-end gap-3">
            <span className="font-grotesk text-xs" style={{ color:'rgba(255,255,255,0.55)' }}>
              © 2026 nexus
            </span>
            <TransitionLink href="#booking"
              className="inline-flex items-center gap-2 pl-5 pr-2 py-2 rounded-full font-grotesk font-600 text-sm"
              style={{ background:'white', color:'#0a0a0a' }}>
              Schedule your call
              <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background:'#FF2400' }}>
                <ArrowUpRight size={11} />
              </span>
            </TransitionLink>
            <a href="mailto:hello@nexus.agency"
              className="font-grotesk text-xs hover:opacity-70 transition-opacity"
              style={{ color:'rgba(255,255,255,0.6)' }}>
              hello@nexus.agency
            </a>
          </div>
        </div>

        {/* Large wordmark */}
        <div className="overflow-hidden px-4 mt-8">
          <motion.div style={{ y }}>
            <p className="font-syne font-800 select-none leading-none w-full"
              style={{ fontSize:'clamp(10vw,16vw,18vw)', color:'rgba(255,60,10,0.55)', letterSpacing:'-0.02em', lineHeight:0.85, paddingBottom:'0.05em' }}>
              nexus<span style={{ color:'rgba(255,80,30,0.5)' }}>®</span>
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 px-8 py-5 flex items-center justify-between border-t" style={{ borderColor:'rgba(255,255,255,0.12)' }}>
          <div className="flex gap-3">
            {[{Icon:LinkedinIcon},{Icon:XIcon},{Icon:GithubIcon}].map(({Icon},i)=>(
              <a key={i} href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
                style={{ background:'rgba(255,255,255,0.15)', color:'white' }}>
                <Icon size={13}/>
              </a>
            ))}
          </div>
          <p className="font-grotesk text-[11px]" style={{ color:'rgba(255,255,255,0.45)' }}>
            Embedded digital team for SaaS, mobile, web & branding.
          </p>
        </div>
      </div>
    </footer>
  )
}