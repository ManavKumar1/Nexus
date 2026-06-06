import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const steps = [
  { num:'01', title:'Schedule your call', desc:'A quick, honest conversation — no pitch decks, no fluff. We learn your product, your goals, and where we can move the needle fastest.' },
  { num:'02', title:'Subscribe to a plan', desc:'Pick a plan that fits where you are today. No lock-in, no long contracts — we earn your trust month over month by actually delivering.' },
  { num:'03', title:'We ship in iterations', desc:'We embed, prioritise, and start moving fast. Weekly cycles, tight feedback loops, real output — not status updates and slide decks.' },
  { num:'04', title:'Repeat', desc:'The longer we\'re in, the sharper we get. Every cycle we understand your product deeper, move faster, and raise the bar on what we ship.' },
]

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })
  const rawY = useTransform(scrollYProgress,[0,1],['6%','-6%'])
  const y    = useSpring(rawY,{stiffness:40,damping:16})

  return (
    <section ref={ref} id="process" className="relative dark:bg-[#07070c] bg-gray-50/60 overflow-hidden py-28">

      {/* Bg number */}
      <motion.div style={{y}}
        className="absolute right-[-3%] top-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span className="font-syne font-800 dark:text-white/[0.018] text-black/[0.025]"
          style={{fontSize:'clamp(100px,18vw,240px)',lineHeight:1,display:'block'}}>HOW</span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-5 h-px bg-[#bf5fff]"/>
            <span className="font-grotesk text-[11px] tracking-[0.22em] uppercase dark:text-white/35 text-black/45">How We Work</span>
          </div>
          <h2 className="font-syne font-800 dark:text-white text-black leading-[0.93] tracking-[-0.02em] mb-20"
            style={{fontSize:'clamp(2.4rem,5.5vw,5rem)'}}>
            From idea to live<br/><span className="grad-violet">in four moves.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((s,i) => (
            <motion.div key={s.num}
              initial={{opacity:0,y:30}}
              whileInView={{opacity:1,y:0}}
              viewport={{once:true,margin:'-50px'}}
              transition={{duration:0.7,delay:i*0.1,ease:[0.16,1,0.3,1]}}
              className="relative px-0 lg:px-6 py-8 first:pl-0 last:pr-0 group border-b lg:border-b-0 lg:border-r dark:border-white/5 border-black/6 last:border-r-0">
              {/* Step number */}
              <div className="font-syne font-800 text-[11px] tracking-[0.2em] grad-cyan mb-5">{s.num}</div>
              <h3 className="font-syne font-700 dark:text-white text-black leading-tight mb-3"
                style={{fontSize:'clamp(1.05rem,1.8vw,1.4rem)'}}>
                {s.title}
              </h3>
              <p className="font-grotesk text-sm dark:text-white/45 text-black/52 leading-[1.75]">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.45}}
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-7 rounded-2xl dark:bg-white/[0.025] bg-white border dark:border-white/5 border-black/6">
          <div>
            <p className="font-syne font-700 text-xl dark:text-white text-black mb-1">Ready to start building?</p>
            <p className="font-grotesk text-sm dark:text-white/42 text-black/50">No pitch decks. No fluff. Just a real conversation about your product.</p>
          </div>
          <motion.a href="#booking" whileHover={{scale:1.03,boxShadow:'0 0 36px rgba(0,245,255,0.22)'}} whileTap={{scale:0.97}}
            className="flex-shrink-0 px-7 py-3.5 rounded-full bg-[#00f5ff] text-black font-grotesk font-600 text-sm">
            Book Discovery Call →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
