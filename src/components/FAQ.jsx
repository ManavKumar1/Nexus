import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  { q:'Do you only work on existing products?', a:'Not at all. Many of our best engagements start from scratch — zero to production. We help shape the product vision, not just execute someone else\'s spec.' },
  { q:'How quickly can you start?', a:'Typically within 3–5 business days of signing. For urgent projects, we can often do same-week starts. We keep our schedule intentionally lean so we can move when you do.' },
  { q:'What does the monthly retainer include?', a:'Design + development, weekly planning calls, async collaboration via Slack, bug fixes, and continuous feature delivery — all in one plan with no surprise invoices.' },
  { q:'Can I pause or cancel anytime?', a:'Yes. Monthly plans pause or cancel with 7 days notice. No lock-in, no penalty. We earn your trust month by month.' },
  { q:'Who owns the code and designs?', a:'You do. 100% IP ownership transfers on final payment. We set up your repos, your infra, your accounts — you own everything from day one if you prefer.' },
  { q:'Do you offer post-launch support?', a:'All projects include a 30-day support window. Ongoing maintenance retainers are available at a flat monthly rate.' },
]

function FAQItem({ faq, i }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{opacity:0,y:16}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      transition={{duration:0.5,delay:i*0.06}}
      className="border-b dark:border-white/5 border-black/5 last:border-0">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-6 text-left gap-4 group">
        <span className="font-syne font-600 dark:text-white text-black group-hover:dark:text-[#00f5ff] group-hover:text-[#0070c0] transition-colors duration-200"
          style={{fontSize:'clamp(0.95rem,1.5vw,1.1rem)'}}>
          {faq.q}
        </span>
        <motion.div animate={{rotate:open?45:0}} transition={{duration:0.3,ease:[0.16,1,0.3,1]}}
          className="flex-shrink-0 w-7 h-7 rounded-full dark:bg-white/5 bg-black/5 flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}
            transition={{duration:0.34,ease:[0.16,1,0.3,1]}} className="overflow-hidden">
            <p className="pb-6 font-grotesk text-sm dark:text-white/52 text-black/58 leading-[1.8] pr-10">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-28 dark:bg-[#07070c] bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-5 h-px bg-[#bf5fff]"/>
                <span className="font-grotesk text-[11px] tracking-[0.22em] uppercase dark:text-white/35 text-black/45">FAQ</span>
              </div>
              <h2 className="font-syne font-800 dark:text-white text-black leading-[0.93] tracking-[-0.02em] mb-5"
                style={{fontSize:'clamp(2.2rem,4.5vw,4rem)'}}>
                Still have<br/>
                <span style={{background:'linear-gradient(135deg,#bf5fff,#00f5ff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
                  questions?
                </span>
              </h2>
              <p className="font-grotesk text-sm dark:text-white/42 text-black/50 leading-relaxed mb-7 max-w-xs">
                If you can't find what you're looking for, schedule a call. No commitment, no pitch.
              </p>
              <motion.a href="#booking" whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00f5ff] text-black font-grotesk font-600 text-sm">
                Schedule a Call →
              </motion.a>
              {/* Verteal tip */}
              <p className="font-grotesk text-xs dark:text-white/25 text-black/35 mt-5">
                If you still have questions,{' '}
                <a href="#booking" className="underline underline-offset-2 dark:text-white/45 text-black/50">
                  schedule your call
                </a>
                , no compromise
              </p>
            </motion.div>
          </div>
          <div>
            {faqs.map((f,i) => <FAQItem key={f.q} faq={f} i={i}/>)}
          </div>
        </div>
      </div>
    </section>
  )
}
