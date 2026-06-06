import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'Finvest Dashboard',
    category: 'SaaS · Web App',
    desc: 'Real-time investment portfolio tracker with AI-powered insights and Stripe billing.',
    tags: ['Next.js', 'PostgreSQL', 'OpenAI'],
    color: '#00f5ff',
    bg: 'from-[#00f5ff]/10 to-[#bf5fff]/10',
    dark_bg: 'from-[#00f5ff]/8 to-[#bf5fff]/8',
    size: 'large',
  },
  {
    title: 'Loopstack Mobile',
    category: 'Mobile App · iOS & Android',
    desc: 'Task management app with offline-first sync and team collaboration.',
    tags: ['React Native', 'Supabase'],
    color: '#bf5fff',
    bg: 'from-[#bf5fff]/10 to-[#ff2d78]/10',
    dark_bg: 'from-[#bf5fff]/8 to-[#ff2d78]/8',
    size: 'small',
  },
  {
    title: 'Tradeflow AI',
    category: 'AI Platform',
    desc: 'Trade signal generation engine using RAG pipelines and LLM analysis.',
    tags: ['Python', 'LangChain', 'FastAPI'],
    color: '#c6f135',
    bg: 'from-[#c6f135]/10 to-[#00f5ff]/10',
    dark_bg: 'from-[#c6f135]/8 to-[#00f5ff]/8',
    size: 'small',
  },
  {
    title: 'BrandKit Identity',
    category: 'Branding · Design System',
    desc: 'Full brand identity — logo, motion guidelines, and a 200+ component design system.',
    tags: ['Figma', 'Motion', 'Brand'],
    color: '#ff2d78',
    bg: 'from-[#ff2d78]/10 to-[#bf5fff]/10',
    dark_bg: 'from-[#ff2d78]/8 to-[#bf5fff]/8',
    size: 'large',
  },
]

export default function Work() {
  return (
    <section id="work" className="py-32 dark:bg-[#050508] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-6 h-px bg-[#c6f135]" />
              <span className="text-xs font-grotesk font-600 tracking-[0.2em] uppercase dark:text-white/40 text-black/50">
                Selected Work
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-syne font-800 text-[clamp(2.5rem,5vw,4.5rem)] leading-tight dark:text-white text-black"
            >
              Results speak
              <br />
              <span className="gradient-text-lime">for themselves.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-grotesk text-sm dark:text-white/40 text-black/50 max-w-xs leading-relaxed md:text-right"
          >
            A curated selection of recent projects. Many ongoing dashboards and SaaS platforms remain under NDA.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className={`group relative rounded-2xl overflow-hidden border dark:border-white/5 border-black/6 dark:bg-white/[0.02] bg-black/[0.01] cursor-default transition-all duration-300 ${
                p.size === 'large' ? 'md:col-span-1' : ''
              }`}
            >
              {/* Gradient header area */}
              <div
                className={`h-52 w-full bg-gradient-to-br ${p.dark_bg} dark:block hidden relative overflow-hidden`}
              >
                {/* Decorative circles */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-20 blur-3xl"
                  style={{ background: p.color }}
                />
                <div className="absolute bottom-4 right-4 font-syne font-700 text-[80px] leading-none opacity-[0.04] text-white select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              <div
                className={`h-52 w-full bg-gradient-to-br ${p.bg} hidden dark:hidden block relative overflow-hidden`}
              >
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-10 blur-3xl"
                  style={{ background: p.color }}
                />
                <div className="absolute bottom-4 right-4 font-syne font-700 text-[80px] leading-none opacity-[0.04] text-black select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              {/* Light mode gradient (always on, dark hidden above overrides) */}
              <div className={`h-52 w-full bg-gradient-to-br ${p.bg} relative overflow-hidden dark:hidden`}>
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-15 blur-3xl"
                  style={{ background: p.color }}
                />
                <div className="absolute bottom-4 right-4 font-syne font-700 text-[80px] leading-none opacity-[0.06] text-black select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-grotesk font-500 tracking-widest uppercase mb-1 block" style={{ color: p.color }}>
                      {p.category}
                    </span>
                    <h3 className="font-syne font-700 text-xl dark:text-white text-black">{p.title}</h3>
                  </div>
                  <div
                    className="w-9 h-9 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:border-white/10 border-black/10"
                  >
                    <ArrowUpRight size={16} className="dark:text-white text-black" />
                  </div>
                </div>
                <p className="font-grotesk text-sm dark:text-white/50 text-black/55 leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(t => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-xs font-grotesk dark:bg-white/5 bg-black/5 dark:text-white/40 text-black/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
