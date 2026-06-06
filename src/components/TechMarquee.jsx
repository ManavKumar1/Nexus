import { motion } from 'framer-motion'

const techStack = [
  'React','Next.js','TypeScript','Node.js','Python',
  'React Native','Flutter','PostgreSQL','Redis','Stripe',
  'AWS','Vercel','Docker','OpenAI','LangChain',
  'Figma','Framer','TailwindCSS','GraphQL','Supabase',
]

export default function TechMarquee() {
  const items = [...techStack, ...techStack]
  return (
    <section className="py-5 dark:bg-[#050508] bg-white border-y dark:border-white/5 border-black/5 overflow-hidden">
      <div className="marquee-wrap">
        <div className="marquee-inner">
          {items.map((tech, i) => (
            <div key={i} className="flex items-center gap-3 px-5 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] opacity-60 flex-shrink-0"/>
              <span className="font-grotesk text-[11px] tracking-[0.18em] uppercase dark:text-white/35 text-black/42 whitespace-nowrap">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
