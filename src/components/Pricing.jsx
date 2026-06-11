import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Pricing — matches Verteal layout:
 *  Left: headline + sub + CTA
 *  Right: stacked cards — ON-GOING (light), EMBEDDED (dark), ONE-OFF (light)
 */

const plans = [
  {
    tag: 'ON-GOING',
    price: '€3,000',
    period: '/month',
    highlight: false,
    features: [
      'Design & development, every sprint',
      'Weekly planning & review call',
      'Async-first collaboration',
      'Iterative feature delivery',
      'Bug fixes & improvements',
      'Pause or cancel anytime',
    ],
    cta: 'Book your call',
  },
  {
    tag: 'EMBEDDED',
    price: '€5,000',
    period: '/month',
    highlight: true,
    features: [
      'Design & development, full throttle',
      'Priority queue — your work ships first',
      'Calls scheduled around the work',
      'Two parallel workstreams',
      '48h average turnaround',
      'Pause or cancel anytime',
    ],
    cta: 'Book your call',
  },
  {
    tag: 'ONE-OFF',
    price: 'Custom',
    period: '',
    highlight: false,
    features: [],
    cta: 'Book your call',
    isCustom: true,
  },
]

function ArrowIcon() {
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full ml-2 flex-shrink-0"
      style={{ background: '#e63000' }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  )
}

function PricingCard({ plan, i }) {
  const isCustom = plan.isCustom

  if (plan.highlight) {
    // Dark embedded card
    return (
      <motion.div
        initial={{ opacity:0, y:30 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true, margin:'-40px' }}
        transition={{ duration:0.6, delay:i*0.1, ease:[0.16,1,0.3,1] }}
        className="rounded-2xl p-8 flex flex-col"
        style={{
          background: 'linear-gradient(145deg, #1a0a00 0%, #0f0500 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="font-grotesk text-[10px] tracking-[0.25em] uppercase mb-4"
          style={{ color: 'rgba(255,255,255,0.35)' }}>
          {plan.tag}
        </div>

        <div className="mb-6">
          <span className="font-syne font-800 text-white" style={{ fontSize: 'clamp(2.4rem,4vw,3.2rem)' }}>
            {plan.price}
          </span>
          {plan.period && (
            <span className="font-grotesk text-sm ml-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {plan.period}
            </span>
          )}
        </div>

        <ul className="flex flex-col flex-1 mb-8">
          {plan.features.map((f, fi) => (
            <li key={f} className="flex items-center py-3 font-grotesk text-sm"
              style={{
                color: 'rgba(255,255,255,0.75)',
                borderBottom: fi < plan.features.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
              {f}
            </li>
          ))}
        </ul>

        <motion.a
          href="#booking"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-between w-full px-6 py-3.5 rounded-full font-grotesk font-600 text-sm transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.95)',
            color: '#0a0a0a',
          }}
        >
          {plan.cta}
          <ArrowIcon />
        </motion.a>
      </motion.div>
    )
  }

  if (isCustom) {
    // Custom / one-off card — minimal light
    return (
      <motion.div
        initial={{ opacity:0, y:30 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true, margin:'-40px' }}
        transition={{ duration:0.6, delay:i*0.1, ease:[0.16,1,0.3,1] }}
        className="rounded-2xl p-8 flex flex-col justify-between"
        style={{
          background: 'rgba(0,0,0,0.025)',
          border: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        <div>
          <div className="font-grotesk text-[10px] tracking-[0.25em] uppercase mb-4 dark:text-white/30 text-black/35">
            {plan.tag}
          </div>
          <div className="font-syne font-800 dark:text-white text-black mb-2"
            style={{ fontSize: 'clamp(2rem,3.5vw,2.8rem)' }}>
            {plan.price}
          </div>
        </div>

        <motion.a
          href="#booking"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-between w-full px-6 py-3.5 rounded-full font-grotesk font-600 text-sm transition-all duration-200 dark:bg-white/5 bg-black/5 dark:text-white text-black dark:border-white/8 border-black/8 border mt-6"
        >
          {plan.cta}
          <ArrowIcon />
        </motion.a>
      </motion.div>
    )
  }

  // Default light card (ON-GOING)
  return (
    <motion.div
      initial={{ opacity:0, y:30 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-40px' }}
      transition={{ duration:0.6, delay:i*0.1, ease:[0.16,1,0.3,1] }}
      className="rounded-2xl p-8 flex flex-col dark:bg-white/[0.025] bg-white"
      style={{ border: '1px solid rgba(0,0,0,0.07)' }}
    >
      <div className="font-grotesk text-[10px] tracking-[0.25em] uppercase mb-4 dark:text-white/30 text-black/35">
        {plan.tag}
      </div>

      <div className="mb-6">
        <span className="font-syne font-800 dark:text-white text-black" style={{ fontSize: 'clamp(2.4rem,4vw,3.2rem)' }}>
          {plan.price}
        </span>
        {plan.period && (
          <span className="font-grotesk text-sm dark:text-white/40 text-black/40 ml-1">{plan.period}</span>
        )}
      </div>

      <ul className="flex flex-col flex-1 mb-8">
        {plan.features.map((f, fi) => (
          <li key={f}
            className="flex items-center py-3 font-grotesk text-sm dark:text-white/65 text-black/65"
            style={{
              borderBottom: fi < plan.features.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
            }}>
            {f}
          </li>
        ))}
      </ul>

      <motion.a
        href="#booking"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center justify-between w-full px-6 py-3.5 rounded-full font-grotesk font-600 text-sm transition-all duration-200 dark:bg-white/5 bg-black/5 dark:text-white text-black dark:border-white/8 border-black/8 border"
      >
        {plan.cta}
        <ArrowIcon />
      </motion.a>
    </motion.div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 dark:bg-[#050508] bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-20 items-start">

          {/* ── Left: headline + CTA ── */}
          <motion.div
            initial={{ opacity:0, y:28 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7 }}
            className="lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-[#00f5ff]"/>
              <span className="font-grotesk text-[11px] tracking-[0.22em] uppercase dark:text-white/35 text-black/45">Pricing</span>
            </div>

            <h2
              className="font-syne font-800 dark:text-white text-black leading-[0.93] tracking-[-0.02em] mb-6"
              style={{ fontSize: 'clamp(2.4rem,5vw,4.2rem)' }}
            >
              Built for momentum,<br/>not contracts.
            </h2>

            <p className="font-grotesk text-sm dark:text-white/45 text-black/55 leading-[1.8] mb-8 max-w-xs">
              If you have a clear vision for your product, many partnerships start with a project and evolve into ongoing collaboration.
            </p>

            <motion.a
              href="#booking"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-grotesk font-700 text-sm dark:bg-white text-white dark:text-black bg-black transition-all duration-200"
            >
              Book 15 min call
              <ArrowIcon />
            </motion.a>
          </motion.div>

          {/* ── Right: plan cards ── */}
          <div className="flex flex-col gap-4">
            {plans.map((plan, i) => (
              <PricingCard key={plan.tag} plan={plan} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
