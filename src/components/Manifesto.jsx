import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * Kerna "Our Manifesto" style section —
 * full-width editorial text with word-reveal animation.
 */

const MANIFESTO = `We watched agencies promise the world and deliver slide decks. We watched outsourced teams vanish after kickoff, leaving founders holding broken code and missed deadlines.\n\nThe world deserves a different kind of digital team.\n\nNot vendors. Not consultants. Builders — embedded, accountable, and genuinely invested in what you're creating.\n\nAt Nexus, we reject the agency playbook: the bloated retainers, the account managers who've never shipped a line, the endless revision rounds that go nowhere. We operate from inside your product. We take ownership. We move fast.\n\nBecause the best digital products aren't made at arm's length. They're made by teams close enough to care — and opinionated enough to change things.`

function WordReveal({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start 0.85','end 0.4'] })

  const words = text.split(/(\s+)/)

  return (
    <p ref={ref} className="font-syne font-700 dark:text-white text-black leading-[1.15] tracking-[-0.01em]"
      style={{fontSize:'clamp(1.5rem,3.5vw,3.2rem)'}}>
      {words.map((word, i) => {
        if (/^\s+$/.test(word)) return word
        const start = i / words.length
        const end = start + 1.4 / words.length
        return (
          <WordSpan key={i} word={word} scrollYProgress={scrollYProgress} start={start} end={Math.min(end,1)} />
        )
      })}
    </p>
  )
}

function WordSpan({ word, scrollYProgress, start, end }) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1])
  const y = useTransform(scrollYProgress, [start, end], [8, 0])
  const sp = useSpring(y, { stiffness:120, damping:24 })
  return (
    <motion.span style={{ opacity, y:sp, display:'inline-block' }}>
      {word}&nbsp;
    </motion.span>
  )
}

export default function Manifesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })
  const rawY = useTransform(scrollYProgress,[0,1],['5%','-5%'])
  const y    = useSpring(rawY,{stiffness:40,damping:16})

  const paragraphs = MANIFESTO.split('\n\n')

  return (
    <section ref={ref} className="relative dark:bg-[#07070c] bg-gray-50/70 overflow-hidden py-32">

      {/* Big background text */}
      <motion.div style={{y}}
        className="absolute left-[-3%] bottom-[-5%] pointer-events-none select-none z-0">
        <span className="font-syne font-800 dark:text-white/[0.018] text-black/[0.025] leading-none block"
          style={{fontSize:'clamp(100px,18vw,240px)'}}>
          WE
        </span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Label */}
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}
          className="flex items-center gap-3 mb-16">
          <span className="w-5 h-px bg-[#ff2d78]"/>
          <span className="font-grotesk text-[11px] tracking-[0.22em] uppercase dark:text-white/35 text-black/45">
            Our Manifesto
          </span>
        </motion.div>

        {/* Word-by-word reveal — first paragraph */}
        <div className="max-w-5xl mb-16">
          <WordReveal text={paragraphs[0]} />
        </div>

        {/* Remaining paragraphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {paragraphs.slice(1).map((p, i) => (
            <motion.p key={i}
              initial={{opacity:0,y:24}}
              whileInView={{opacity:1,y:0}}
              viewport={{once:true,margin:'-40px'}}
              transition={{duration:0.7,delay:i*0.1}}
              className="font-grotesk dark:text-white/50 text-black/55 leading-[1.85]"
              style={{fontSize:'clamp(0.9rem,1.15vw,1.05rem)'}}>
              {p}
            </motion.p>
          ))}
        </div>

        {/* Signature */}
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.4}}
          className="mt-16 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#bf5fff] flex items-center justify-center font-syne font-800 text-black text-sm">
            N
          </div>
          <div>
            <p className="font-syne font-700 text-base dark:text-white text-black">Nexus Team</p>
            <p className="font-grotesk text-xs dark:text-white/35 text-black/45">Founders & Builders</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
