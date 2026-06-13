import { motion } from 'framer-motion'
import { Globe, Smartphone, Layers, Cpu, Sparkles, Terminal, ArrowUpRight } from 'lucide-react'
import { services } from '../data/content'

const iconMap = { globe: Globe, smartphone: Smartphone, layers: Layers, cpu: Cpu, sparkles: Sparkles, terminal: Terminal }

const colorMap = {
  cyan:   { border: 'rgba(0,245,255,0.2)',   bg: 'rgba(0,245,255,0.06)',   text: '#00f5ff',   tag: 'rgba(0,245,255,0.1)' },
  violet: { border: 'rgba(191,95,255,0.2)',  bg: 'rgba(191,95,255,0.06)',  text: '#bf5fff',   tag: 'rgba(191,95,255,0.1)' },
  lime:   { border: 'rgba(198,241,53,0.2)',  bg: 'rgba(198,241,53,0.06)',  text: '#c6f135',   tag: 'rgba(198,241,53,0.1)' },
  pink:   { border: 'rgba(255,45,120,0.2)',  bg: 'rgba(255,45,120,0.06)',  text: '#ff2d78',   tag: 'rgba(255,45,120,0.1)' },
}

const lightColorMap = {
  cyan:   { border: 'rgba(0,180,255,0.2)',   bg: 'rgba(0,180,255,0.04)',   text: '#0070e0',   tag: 'rgba(0,140,255,0.08)' },
  violet: { border: 'rgba(139,92,246,0.2)',  bg: 'rgba(139,92,246,0.04)',  text: '#6d28d9',   tag: 'rgba(139,92,246,0.08)' },
  lime:   { border: 'rgba(77,124,15,0.2)',   bg: 'rgba(101,163,13,0.04)',  text: '#3f6212',   tag: 'rgba(77,124,15,0.08)' },
  pink:   { border: 'rgba(219,39,119,0.2)',  bg: 'rgba(219,39,119,0.04)',  text: '#9d174d',   tag: 'rgba(219,39,119,0.08)' },
}

function ServiceCard({ svc, index, dark }) {
  const Icon = iconMap[svc.icon]
  const c = dark ? colorMap[svc.color] : lightColorMap[svc.color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl p-6 cursor-default overflow-hidden transition-all duration-300"
      style={{
        border: `1px solid ${c.border}`,
        background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
      }}
    >
      {/* Hover glow bg */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: c.bg }}
      />

      <div className="relative z-10">
        {/* Icon + number row */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: c.bg, border: `1px solid ${c.border}` }}
          >
            <Icon size={22} style={{ color: c.text }} />
          </div>
          <span className="font-syne font-700 text-xs dark:text-white/15 text-black/20 tracking-widest">{svc.id}</span>
        </div>

        {/* Title */}
        <h3 className="font-syne font-700 text-xl dark:text-white text-black mb-2 group-hover:transition-colors duration-200">
          {svc.title}
        </h3>

        {/* Desc */}
        <p className="font-grotesk text-sm dark:text-white/50 text-black/55 leading-relaxed mb-5">
          {svc.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {svc.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs font-grotesk font-500 tracking-wide"
              style={{ background: c.tag, color: c.text }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-grotesk font-500" style={{ color: c.text }}>Learn more</span>
          <ArrowUpRight size={14} style={{ color: c.text }} />
        </div>
      </div>
    </motion.div>
  )
}

export default function Services({ dark }) {
  return (
    <section id="services" className="py-32 dark:bg-[#050508] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-6 h-px bg-[#00f5ff]" />
            <span className="text-xs font-grotesk font-600 tracking-[0.2em] uppercase dark:text-white/40 text-black/50">
              What We Build
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-syne font-800 text-[clamp(2.5rem,5vw,4.5rem)] leading-tight dark:text-white text-black max-w-2xl"
          >
            Every digital surface,
            <br />
            <span className="gradient-text-cyan">mastered.</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} dark={dark} />
          ))}
        </div>
      </div>
    </section>
  )
}
