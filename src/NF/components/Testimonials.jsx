import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const testimonials = [
  { initials:'AM', name:'Arjun Mehta', role:'CEO, Finvest', color:'#00f5ff',
    text:'Nexus delivered a full SaaS dashboard in 6 weeks. The quality was genuinely shocking — better than our previous agency who charged 3x more.' },
  { initials:'PN', name:'Priya Nair', role:'Founder, Loopstack', color:'#bf5fff',
    text:'They didn\'t just build what we asked for — they challenged our assumptions and shipped something 10x better. True partners, not vendors.' },
  { initials:'RO', name:'Rajan Oberoi', role:'CTO, Tradeflow', color:'#c6f135',
    text:'The AI integration was exceptional. They shipped a RAG system in 2 weeks that our in-house team estimated at 3 months.' },
]

export default function Testimonials() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })
  const rawY = useTransform(scrollYProgress,[0,1],['4%','-4%'])
  const y    = useSpring(rawY,{stiffness:45,damping:18})

  return (
    <section ref={ref} className="relative py-28 dark:bg-[#07070c] bg-gray-50/60 overflow-hidden">
      <motion.div style={{y}} className="absolute left-[-3%] top-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span className="font-syne font-800 dark:text-white/[0.018] text-black/[0.025]"
          style={{fontSize:'clamp(100px,18vw,220px)',lineHeight:1,display:'block'}}>LOVE</span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-5 h-px bg-[#ff2d78]"/>
            <span className="font-grotesk text-[11px] tracking-[0.22em] uppercase dark:text-white/35 text-black/45">What Clients Say</span>
          </div>
          <h2 className="font-syne font-800 dark:text-white text-black leading-[0.93] tracking-[-0.02em] mb-14"
            style={{fontSize:'clamp(2.4rem,5.5vw,5rem)'}}>
            Partners, not<br/>
            <span style={{background:'linear-gradient(135deg,#ff2d78,#bf5fff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              vendors.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t,i) => (
            <motion.div key={t.name}
              initial={{opacity:0,y:30}}
              whileInView={{opacity:1,y:0}}
              viewport={{once:true,margin:'-50px'}}
              transition={{duration:0.7,delay:i*0.1,ease:[0.16,1,0.3,1]}}
              className="relative rounded-2xl p-6 dark:bg-white/[0.025] bg-white border dark:border-white/5 border-black/6 overflow-hidden group hover:dark:border-white/10 hover:border-black/10 transition-colors duration-300">
              {/* Accent top line */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{background:`linear-gradient(90deg,transparent,${t.color}55,transparent)`}}/>

              <div className="font-syne font-800 text-5xl dark:text-white/[0.04] text-black/[0.05] leading-none mb-4 select-none">"</div>
              <p className="font-grotesk text-sm dark:text-white/65 text-black/65 leading-[1.8] mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-syne font-700 text-xs flex-shrink-0"
                  style={{background:`${t.color}18`,color:t.color}}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-grotesk font-600 text-sm dark:text-white text-black">{t.name}</p>
                  <p className="font-grotesk text-xs dark:text-white/38 text-black/45">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
