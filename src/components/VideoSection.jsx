import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Verteal-style video showcase section.
 * Drop /public/work-reel.mp4 to activate the video.
 * Until then a cinematic animated gradient stands in.
 */
export default function VideoSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rawS = useTransform(scrollYProgress, [0, 1], [1.06, 1.0]);
  const y = useSpring(rawY, { stiffness: 40, damping: 16 });
  const scale = useSpring(rawS, { stiffness: 40, damping: 16 });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );

  return (
    <section
      ref={ref}
      className="relative py-8 dark:bg-[#050508] bg-white overflow-hidden"
    >
      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6">
        {/* Label row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="w-5 h-px bg-[#00f5ff]" />
            <span className="font-grotesk text-[11px] tracking-[0.2em] uppercase dark:text-white/35 text-black/45">
              What we ship
            </span>
          </div>
          <span className="font-grotesk text-[11px] tracking-[0.15em] uppercase dark:text-white/20 text-black/30">
            Opinionated · Creative · Operators
          </span>
        </div>

        {/* Video frame */}
        <div
          // className="relative rounded-2xl overflow-hidden"
          style={{ aspectRatio: "16/8" }}
        >
<div className="absolute inset-0">

  {/* Light mode atmosphere */}
  <div
    className="absolute inset-0 dark:hidden"
    style={{
      background:
        'radial-gradient(circle at center, rgba(6,182,212,.06), transparent 60%)',
    }}
  />

  {/* Light mode grid */}
  <div
    className="absolute inset-0 dark:hidden opacity-[0.35]"
    style={{
      backgroundImage: `
        linear-gradient(rgba(0,0,0,.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,.04) 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px',
    }}
  />

  {/* Ambient particles */}
  {Array.from({ length: 35 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full"
      style={{
        width: i % 6 === 0 ? 4 : 2,
        height: i % 6 === 0 ? 4 : 2,
        left: `${(i * 31) % 100}%`,
        top: `${(i * 53) % 100}%`,
        background:
          i % 3 === 0
            ? 'rgb(6 182 212)'
            : i % 3 === 1
            ? 'rgb(168 85 247)'
            : 'rgb(132 204 22)',
        opacity: 0.15,
      }}
      animate={{
        y: [-30, 30, -30],
        opacity: [0.1, 0.8, 0.1],
      }}
      transition={{
        duration: 8 + (i % 10),
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  ))}

  {/* Atmospheric Glow */}
  <motion.div
    animate={{
      scale: [1, 1.08, 1],
      rotate: [0, 360],
    }}
    transition={{
      scale: {
        duration: 12,
        repeat: Infinity,
      },
      rotate: {
        duration: 50,
        repeat: Infinity,
        ease: 'linear',
      },
    }}
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <div
      className="
        w-[900px]
        h-[900px]
        rounded-full
        dark:opacity-[0.16]
        opacity-[0.08]
      "
      style={{
        background:
          'conic-gradient(from 0deg,#00f5ff,#bf5fff,#c6f135,#00f5ff)',
        filter: 'blur(140px)',
      }}
    />
  </motion.div>

  {/* Orbit */}
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      duration: 70,
      repeat: Infinity,
      ease: 'linear',
    }}
    className="
      absolute
      left-1/2
      top-1/2
      -translate-x-1/2
      -translate-y-1/2
      w-[720px]
      h-[720px]
      rounded-full
      border
      dark:border-white/[0.04]
      border-black/[0.05]
    "
  />

  {/* Floating Tags */}
  <motion.div
    animate={{ y: [-8, 8, -8] }}
    transition={{ duration: 6, repeat: Infinity }}
    className="
      absolute
      left-[12%]
      top-[24%]
      tag-pill
      dark:bg-black/40
      bg-white/70
      backdrop-blur-xl
      border
      dark:border-white/10
      border-black/10
      dark:text-white/70
      text-black/70
    "
  >
    SaaS Platforms
  </motion.div>

  <motion.div
    animate={{ y: [8, -8, 8] }}
    transition={{ duration: 7, repeat: Infinity }}
    className="
      absolute
      right-[12%]
      top-[30%]
      tag-pill
      dark:bg-black/40
      bg-white/70
      backdrop-blur-xl
      border
      dark:border-white/10
      border-black/10
      dark:text-white/70
      text-black/70
    "
  >
    Mobile Apps
  </motion.div>

  <motion.div
    animate={{ y: [-10, 10, -10] }}
    transition={{ duration: 8, repeat: Infinity }}
    className="
      absolute
      left-[18%]
      bottom-[24%]
      tag-pill
      dark:bg-black/40
      bg-white/70
      backdrop-blur-xl
      border
      dark:border-white/10
      border-black/10
      dark:text-white/70
      text-black/70
    "
  >
    AI Products
  </motion.div>

  <motion.div
    animate={{ y: [10, -10, 10] }}
    transition={{ duration: 9, repeat: Infinity }}
    className="
      absolute
      right-[18%]
      bottom-[22%]
      tag-pill
      dark:bg-black/40
      bg-white/70
      backdrop-blur-xl
      border
      dark:border-white/10
      border-black/10
      dark:text-white/70
      text-black/70
    "
  >
    Internal Tools
  </motion.div>

  {/* Main Content */}
  <div
    className="
      absolute
      inset-0
      flex
      flex-col
      items-center
      justify-start
      pt-24
      text-center
      pointer-events-none
      px-8
    "
  >
    <span
      className="
        font-grotesk
        text-[11px]
        tracking-[0.35em]
        uppercase
        dark:text-white/35
        text-black/40
      "
    >
      Building systems that scale
    </span>

    <h2
      className="
        mt-5
        font-display
        font-black
        tracking-[-0.08em]
        leading-[0.88]
        dark:text-white
        text-black
      "
    >
      <span className="block text-[clamp(4rem,9vw,8rem)]">
        PRODUCTS
      </span>

      <span className="block text-[clamp(4rem,9vw,8rem)]">
        PEOPLE USE
      </span>
    </h2>

    <p
      className="
        max-w-2xl
        mt-8
        text-base
        md:text-lg
        leading-relaxed
        dark:text-white/45
        text-black/55
      "
    >
      We design, build and launch software that feels fast,
      intuitive and impossible to ignore. From SaaS platforms
      and AI products to mobile experiences used by millions.
    </p>
  </div>

  {/* Metrics */}
  <div className="absolute left-14 bottom-14">
    <div className="text-2xl font-bold dark:text-white text-black">
      40+
    </div>

    <div
      className="
        text-[10px]
        uppercase
        tracking-[0.25em]
        dark:text-white/35
        text-black/45
      "
    >
      Launches
    </div>
  </div>

  <div className="absolute right-14 bottom-14 text-right">
    <div className="text-2xl font-bold dark:text-white text-black">
      12M+
    </div>

    <div
      className="
        text-[10px]
        uppercase
        tracking-[0.25em]
        dark:text-white/35
        text-black/45
      "
    >
      Users Reached
    </div>
  </div>

</div>

          {/* Overlay tint */}
          <div className="absolute inset-0 dark:bg-[#050508]/10 pointer-events-none" />

        </div>
      </motion.div>
    </section>
  );
}
