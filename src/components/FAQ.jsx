import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { faqs } from '../data/content'

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border-b dark:border-white/5 border-black/6 last:border-b-0"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-6 text-left gap-4 group"
      >
        <span className="font-syne font-600 text-base dark:text-white text-black group-hover:dark:text-[#00f5ff] group-hover:text-[#0070e0] transition-colors duration-200">
          {faq.q}
        </span>
        <div className="flex-shrink-0 w-7 h-7 rounded-full dark:bg-white/5 bg-black/5 flex items-center justify-center dark:text-white/60 text-black/60">
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 font-grotesk text-sm dark:text-white/55 text-black/60 leading-relaxed pr-10">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-32 dark:bg-[#07070c] bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-6 h-px bg-[#bf5fff]" />
              <span className="text-xs font-grotesk font-600 tracking-[0.2em] uppercase dark:text-white/40 text-black/50">
                FAQ
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-syne font-800 text-[clamp(2.5rem,4vw,3.5rem)] leading-tight dark:text-white text-black mb-6"
            >
              Still have
              <br />
              <span style={{ background: 'linear-gradient(135deg,#bf5fff,#00f5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                questions?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-grotesk text-sm dark:text-white/50 text-black/55 leading-relaxed mb-8"
            >
              If you can't find what you're looking for, just schedule a call. No commitment, no pitch.
            </motion.p>
            <motion.a
              href="#booking"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(0,245,255,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00f5ff] text-black font-grotesk font-600 text-sm"
            >
              Schedule a Call →
            </motion.a>
          </div>

          {/* Right — accordion */}
          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
