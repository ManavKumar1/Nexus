import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const projects = [
  { num:'01', title:'Finvest Dashboard', cat:'SaaS · Web App', desc:'Real-time portfolio tracker with AI insights, live charts, and Stripe billing. Shipped in 6 weeks.', tags:['Next.js','PostgreSQL','OpenAI'], accent:'#00f5ff', col:'lg:col-span-2' },
  { num:'02', title:'Loopstack Mobile', cat:'iOS & Android', desc:'Offline-first task app with team collaboration and real-time sync.', tags:['React Native','Supabase'], accent:'#bf5fff', col:'' },
  { num:'03', title:'Tradeflow AI', cat:'AI Platform', desc:'LLM-powered trade signals using RAG pipelines and vector search.', tags:['Python','LangChain'], accent:'#c6f135', col:'' },
  { num:'04', title:'BrandKit Identity', cat:'Branding · Design System', desc:'Full identity system — logo, motion tokens, 200+ component library.', tags:['Figma','Motion'], accent:'#ff2d78', col:'lg:col-span-2' },
]

function ProjectCard({ p, i }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] })
  const rawY = useTransform(scrollYProgress,[0,1],['4%','-4%'])
  const y = useSpring(rawY,{stiffness:50,damping:18})

  return (
    <motion.div ref={ref}
      initial={{opacity:0,y:40}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true,margin:'-60px'}}
      transition={{duration:0.7,delay:i*0.08,ease:[0.16,1,0.3,1]}}
      whileHover={{y:-5}}
      className={`group relative rounded-2xl overflow-hidden border dark:border-white/5 border-black/6 dark:bg-white/[0.018] bg-black/[0.01] transition-all duration-400 cursor-default ${p.col}`}
    >
      {/* Visual area with parallax */}
      <motion.div style={{y}} className="relative overflow-hidden" style={{aspectRatio: p.col ? '21/8' : '4/3'}}>
        <div className="absolute inset-0 dark:bg-[#0a0a14] bg-gray-100">
          {/* Animated gradient */}
          <motion.div
            animate={{x:['-15%','15%','-15%'],y:['-10%','10%','-10%']}}
            transition={{duration:16,repeat:Infinity,ease:'easeInOut'}}
            className="absolute inset-0"
            style={{background:`radial-gradient(ellipse 65% 65% at 40% 50%,${p.accent}18 0%,transparent 65%)`}}
          />
          <motion.div
            animate={{x:['10%','-10%','10%'],y:['8%','-8%','8%']}}
            transition={{duration:20,repeat:Infinity,ease:'easeInOut',delay:3}}
            className="absolute inset-0"
            style={{background:`radial-gradient(ellipse 50% 50% at 65% 55%,${p.accent}0e 0%,transparent 65%)`}}
          />
          <div className="absolute inset-0 dark:grid-bg grid-bg-light opacity-35"/>
          {/* Big num watermark */}
          <div className="absolute bottom-4 right-5 font-syne font-800 dark:text-white/[0.04] text-black/[0.05] leading-none select-none"
            style={{fontSize:'clamp(60px,10vw,120px)'}}>
            {p.num}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="font-grotesk text-[10px] tracking-[0.2em] uppercase mb-1 block" style={{color:p.accent}}>{p.cat}</span>
            <h3 className="font-syne font-700 text-lg dark:text-white text-black">{p.title}</h3>
          </div>
          <motion.div
            initial={{opacity:0,rotate:-45}} whileHover={{opacity:1,rotate:0}}
            className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full border dark:border-white/10 border-black/10 flex items-center justify-center dark:text-white/60 text-black/60 transition-all duration-200 flex-shrink-0 mt-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </motion.div>
        </div>
        <p className="font-grotesk text-sm dark:text-white/45 text-black/52 leading-relaxed mb-3">{p.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map(t => (
            <span key={t} className="tag-pill text-[10px] dark:bg-white/[0.04] bg-black/[0.04] dark:text-white/35 text-black/45">{t}</span>
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-5 h-px bg-[#c6f135]"/>
                <span className="font-grotesk text-[11px] tracking-[0.22em] uppercase dark:text-white/35 text-black/45">Selected Work</span>
              </div>
              <h2 className="font-syne font-800 dark:text-white text-black leading-[0.93] tracking-[-0.02em]"
                style={{fontSize:'clamp(2.4rem,5.5vw,5rem)'}}>
                Results speak<br/><span className="grad-lime">for themselves.</span>
              </h2>
            </motion.div>
          </div>
          <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:0.6,delay:0.2}}
            className="font-grotesk text-sm dark:text-white/38 text-black/45 max-w-[260px] leading-relaxed md:text-right">
            Many ongoing SaaS and dashboard projects remain under NDA.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p,i) => <ProjectCard key={p.num} p={p} i={i}/>)}
        </div>
      </div>
    </section>
  )
}
