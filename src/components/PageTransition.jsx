import { useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createContext, useContext, useState } from 'react'

/**
 * PageTransition — black squares sweep left-to-right across the full screen,
 * then retreat the same way. Works like a curtain crossing a road.
 * 
 * Usage:
 *   <TransitionLink href="#pricing" className="...">Pricing</TransitionLink>
 * 
 * Wrap your app in <TransitionProvider>.
 */

const TransitionCtx = createContext({ trigger: () => {} })
export const useTransition = () => useContext(TransitionCtx)

const COLS = 100   // number of square columns
const ROWS = 5   // number of square rows

export function TransitionProvider({ children }) {
  const [phase, setPhase] = useState('idle') // idle | enter | exit
  const pendingHref = useRef(null)

  const trigger = useCallback((href) => {
    if (phase !== 'idle') return
    pendingHref.current = href
    setPhase('enter')
  }, [phase])

  function onEnterComplete() {
    // Navigate (scroll to anchor)
    const href = pendingHref.current
    if (href && href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'instant' })
    }
    // Small pause, then sweep out
    setTimeout(() => setPhase('exit'), 120)
  }

  function onExitComplete() {
    setPhase('idle')
    pendingHref.current = null
  }

  return (
    <TransitionCtx.Provider value={{ trigger }}>
      {children}
      <AnimatePresence>
        {(phase === 'enter' || phase === 'exit') && (
          <SquareCurtain
            key={phase}
            direction={phase === 'enter' ? 'in' : 'out'}
            onComplete={phase === 'enter' ? onEnterComplete : onExitComplete}
          />
        )}
      </AnimatePresence>
    </TransitionCtx.Provider>
  )
}

function SquareCurtain({ direction, onComplete }) {
  const total = COLS * ROWS
  // Each square's delay: staggered column by column, left → right
  // direction 'in'  = squares slide IN  (scaleX 0→1)
  // direction 'out' = squares slide OUT (scaleX 1→0, right→left)

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const col = i % COLS
        const row = Math.floor(i / COLS)

        // Stagger by column (left→right for enter, right→left for exit)
        const staggerCol = direction === 'in' ? col : (COLS - 1 - col)
        // const colDelay = staggerCol * 0.035
        const colDelay = staggerCol * 0.0001
        // const rowDelay = row * 0.012
        const rowDelay = row * 0.0001
        const delay = colDelay + rowDelay

        const isLast = direction === 'in'
          ? i === total - 1
          : i === COLS * (ROWS - 1)  // last cell to animate out

        return (
          <motion.div
            key={i}
            style={{ originX: direction === 'in' ? 0 : 1 }}
            initial={{ scaleX: direction === 'in' ? 0 : 1 }}
            animate={{ scaleX: direction === 'in' ? 1 : 0 }}
            transition={{
              duration: 0.28,
              delay,
              // ease: [0.76, 0, 0.24, 1],
              ease: [0.1, 0, 0.1, 1],
            }}
            onAnimationComplete={isLast ? onComplete : undefined}
            className="dark:bg-[#100C0A] bg-[#16110D]"
          />
        )
      })}
    </div>
  )
}

/** Drop-in replacement for <a> that triggers the curtain */
export function TransitionLink({ href, children, className, onClick, ...props }) {
  const { trigger } = useTransition()

  function handleClick(e) {
    e.preventDefault()
    onClick?.()
    trigger(href)
  }

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  )
}