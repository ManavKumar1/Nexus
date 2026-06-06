import { motion } from 'framer-motion'
import { testimonials } from '../data/content'

const avatarColors = {
  cyan:   { bg: 'rgba(0,245,255,0.12)',  text: '#00f5ff',  bgLight: 'rgba(0,180,255,0.1)',  textLight: '#0070c0' },
  violet: { bg: 'rgba(191,95,255,0.12)', text: '#bf5fff',  bgLight: 'rgba(139,92,246,0.1)', textLight: '#6d28d9' },
  lime:   { bg: 'rgba(198,241,53,0.12)', text: '#c6f135',  bgLight: 'rgba(77,124,15,0.1)',  textLight: '#3f6212' },
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 dark:bg-[#07070c] bg-gray-50/50 overflow-hidden">
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
            <span className="w-6 h-px bg-[#ff2d78]" />
            <span className="text-xs font-grotesk font-600 tracking-[0.2em] uppercase dark:text-white/40 text-black/50">
              What Clients Say
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-syne font-800 text-[clamp(2.5rem,5vw,4.5rem)] leading-tight dark:text-white text-black"
          >
            Partners, not
            <br />
            <span style={{ background: 'linear-gradient(135deg,#ff2d78,#bf5fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              vendors.
            </span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => {
            const c = avatarColors[t.color]
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl p-6 dark:bg-white/[0.025] bg-white border dark:border-white/5 border-black/6 hover:dark:border-white/10 hover:border-black/10 transition-colors duration-300"
              >
                {/* Quote mark */}
                <div className="text-5xl font-syne font-800 dark:text-white/5 text-black/5 leading-none mb-4 select-none">"</div>

                <p className="font-grotesk text-sm dark:text-white/70 text-black/70 leading-relaxed mb-6">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-syne font-700 text-sm dark:block hidden"
                    style={{ background: c.bg, color: c.text }}
                  >
                    {t.avatar}
                  </div>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-syne font-700 text-sm dark:hidden block"
                    style={{ background: c.bgLight, color: c.textLight }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-grotesk font-600 text-sm dark:text-white text-black">{t.name}</p>
                    <p className="font-grotesk text-xs dark:text-white/40 text-black/50">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
