import { motion } from 'framer-motion'
import { process } from '../data/content'

export default function Process() {
  return (
    <section id="process" className="py-32 dark:bg-[#07070c] bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-6 h-px bg-[#bf5fff]" />
            <span className="text-xs font-grotesk font-600 tracking-[0.2em] uppercase dark:text-white/40 text-black/50">
              How We Work
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-syne font-800 text-[clamp(2.5rem,5vw,4.5rem)] leading-tight dark:text-white text-black max-w-2xl"
          >
            From idea to live
            <br />
            <span style={{ background: 'linear-gradient(135deg,#bf5fff,#00f5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              in four moves.
            </span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px dark:bg-white/5 bg-black/8 z-0" />

          {process.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 px-6 py-8 group"
            >
              {/* Step bubble */}
              <div className="w-12 h-12 rounded-2xl dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 flex items-center justify-center mb-6 group-hover:border-[#00f5ff]/50 transition-colors duration-300">
                <span className="font-syne font-700 text-sm gradient-text-cyan">{step.step}</span>
              </div>

              <h3 className="font-syne font-700 text-xl dark:text-white text-black mb-3">
                {step.title}
              </h3>
              <p className="font-grotesk text-sm dark:text-white/50 text-black/55 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 flex flex-col sm:flex-row items-center gap-6 p-8 rounded-2xl dark:bg-white/[0.03] bg-black/[0.02] border dark:border-white/5 border-black/5"
        >
          <div className="flex-1">
            <p className="font-syne font-700 text-2xl dark:text-white text-black mb-1">
              Ready to start building?
            </p>
            <p className="font-grotesk text-sm dark:text-white/50 text-black/55">
              No pitch decks. No fluff. Just a real conversation about your product.
            </p>
          </div>
          <motion.a
            href="#booking"
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(0,245,255,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full font-grotesk font-600 text-black bg-[#00f5ff] whitespace-nowrap transition-all duration-200"
          >
            Book Discovery Call →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
