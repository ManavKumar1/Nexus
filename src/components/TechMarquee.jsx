import { techStack } from '../data/content'

export default function TechMarquee() {
  const doubled = [...techStack, ...techStack]

  return (
    <section className="py-10 dark:bg-[#050508] bg-white border-y dark:border-white/5 border-black/5 overflow-hidden">
      <div className="marquee-track">
        <div className="marquee-inner">
          {doubled.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-6 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] flex-shrink-0" />
              <span className="font-grotesk font-500 text-sm dark:text-white/40 text-black/45 tracking-wider uppercase">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
