import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * Demo images via Unsplash — each picked to match the project type.
 * Wide cards (col-span-2) use a landscape crop, square cards use portrait/square.
 */
const projects = [
  {
    num: '01',
    title: 'Finvest Dashboard',
    cat: 'SaaS · Web App',
    desc: 'Real-time portfolio tracker with AI insights, live charts, and Stripe billing. Shipped in 6 weeks.',
    tags: ['Next.js', 'PostgreSQL', 'OpenAI'],
    accent: '#00f5ff',
    col: 'lg:col-span-2',
    // finance / dark dashboard screenshot feel
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&fit=crop',
    imgAlt: 'Finance dashboard with charts',
  },
  {
    num: '02',
    title: 'Loopstack Mobile',
    cat: 'iOS & Android',
    desc: 'Offline-first task app with team collaboration and real-time sync.',
    tags: ['React Native', 'Supabase'],
    accent: '#bf5fff',
    col: '',
    // mobile app UI feel
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&fit=crop',
    imgAlt: 'Mobile app interface',
  },
  {
    num: '03',
    title: 'Tradeflow AI',
    cat: 'AI Platform',
    desc: 'LLM-powered trade signals using RAG pipelines and vector search.',
    tags: ['Python', 'LangChain'],
    accent: '#c6f135',
    col: '',
    // data / AI / code feel
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80&fit=crop',
    imgAlt: 'AI data visualization',
  },
  {
    num: '04',
    title: 'BrandKit Identity',
    cat: 'Branding · Design System',
    desc: 'Full identity system — logo, motion tokens, 200+ component library.',
    tags: ['Figma', 'Motion'],
    accent: '#ff2d78',
    col: 'lg:col-span-2',
    // branding / design feel
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&q=80&fit=crop',
    imgAlt: 'Brand design system',
  },
]

function ProjectCard({ p, i }) {
  const ref = useRef(null)
  const [imgLoaded, setImgLoaded] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawY  = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const y     = useSpring(rawY, { stiffness: 50, damping: 18 })

  const isWide = p.col === 'lg:col-span-2'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className={`group relative rounded-2xl overflow-hidden border dark:border-white/5 border-black/6 dark:bg-white/[0.018] bg-black/[0.01] transition-all duration-400 cursor-default ${p.col}`}
    >
      {/* ── Image area with parallax ── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: isWide ? '21/8' : '4/3' }}>

        {/* Skeleton shimmer while loading */}
        <div className={`absolute inset-0 dark:bg-[#0d0d1a] bg-gray-100 transition-opacity duration-500 ${imgLoaded ? 'opacity-0' : 'opacity-100'}`}>
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r dark:from-transparent dark:via-white/[0.04] dark:to-transparent from-transparent via-black/[0.03] to-transparent"
          />
        </div>

        {/* Parallax image */}
        <motion.div style={{ y }} className="absolute inset-0 scale-[1.12]">
          <img
            src={p.img}
            alt={p.imgAlt}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </motion.div>

        {/* Dark overlay gradient — stronger at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t dark:from-[#050508]/90 from-white/90 dark:via-[#050508]/20 via-white/10 to-transparent pointer-events-none" />

        {/* Accent colour tint on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${p.accent}18 0%, transparent 70%)` }}
        />

        {/* Number watermark */}
        <div
          className="absolute bottom-3 right-4 font-syne font-800 leading-none select-none pointer-events-none opacity-20"
          style={{ fontSize: 'clamp(48px,8vw,96px)', color: p.accent }}
        >
          {p.num}
        </div>

        {/* Category label — top-left badge */}
        <div className="absolute top-4 left-4">
          <span
            className="font-grotesk text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full backdrop-blur-sm"
            style={{ background: `${p.accent}22`, color: p.accent, border: `1px solid ${p.accent}40` }}
          >
            {p.cat}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-syne font-700 text-lg dark:text-white text-black">{p.title}</h3>
          <motion.div
            initial={{ opacity: 0, rotate: -45 }}
            whileHover={{ opacity: 1, rotate: 0 }}
            className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full border dark:border-white/10 border-black/10 flex items-center justify-center dark:text-white/60 text-black/60 transition-all duration-200 flex-shrink-0 ml-3 mt-0.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </motion.div>
        </div>
        <p className="font-grotesk text-sm dark:text-white/45 text-black/52 leading-relaxed mb-3">{p.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map(t => (
            <span key={t} className="tag-pill text-[10px] dark:bg-white/[0.04] bg-black/[0.04] dark:text-white/35 text-black/45">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Work() {
  return (
    <section id="work" className="py-28 dark:bg-[#050508] bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-5 h-px bg-[#c6f135]" />
                <span className="font-grotesk text-[11px] tracking-[0.22em] uppercase dark:text-white/35 text-black/45">Selected Work</span>
              </div>
              <h2
                className="font-syne font-800 dark:text-white text-black leading-[0.93] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2.4rem,5.5vw,5rem)' }}
              >
                Results speak<br /><span className="grad-lime">for themselves.</span>
              </h2>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="font-grotesk text-sm dark:text-white/38 text-black/45 max-w-[260px] leading-relaxed md:text-right"
          >
            Many ongoing SaaS and dashboard projects remain under NDA.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => <ProjectCard key={p.num} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}