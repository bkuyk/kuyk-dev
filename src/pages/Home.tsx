import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useEffect } from 'react'
import PageTransition from '../components/PageTransition'

// Pre-computed random values so AnimatedGrid is pure
const ORBS = Array.from({ length: 8 }, () => ({
  dx: (Math.random() - 0.5) * 200,
  dy: (Math.random() - 0.5) * 200,
  duration: 4 + Math.random() * 4,
  repeatDelay: Math.random() * 6,
  left: 10 + Math.random() * 80,
  top: 10 + Math.random() * 80,
}))

function GlowOrb({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const tx = useTransform(x, (v) => v - 300)
  const ty = useTransform(y, (v) => v - 300)
  return (
    <motion.div
      style={{
        x: tx,
        y: ty,
        position: 'fixed',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,255,120,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

const stagger = {
  container: {
    animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  },
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
  },
}

const tags = ['react', 'typescript', 'design systems', 'animation', 'dx']

export default function Home() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <PageTransition>
      <GlowOrb x={springX} y={springY} />

      <main
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '680px',
          margin: '0 auto',
          padding: '6rem 2rem 4rem',
        }}
      >
        <motion.div
          variants={stagger.container}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={stagger.item}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--color-accent)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {'// hello world'}
            </span>
          </motion.div>

          <motion.h1
            variants={stagger.item}
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '0.75rem 0 1.5rem',
              color: 'var(--color-text)',
            }}
          >
            kuyk.dev
          </motion.h1>

          <motion.div
            variants={stagger.item}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}
          >
            {tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  padding: '0.3rem 0.7rem',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.05em',
                  cursor: 'default',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            variants={stagger.item}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <motion.a
              href="https://github.com/bkuyk"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, borderColor: 'var(--color-accent)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                padding: '0.6rem 1.25rem',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                color: 'var(--color-text)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                display: 'inline-block',
              }}
            >
              github
            </motion.a>
          </motion.div>
        </motion.div>

        <AnimatedGrid />
      </main>
    </PageTransition>
  )
}

function AnimatedGrid() {
  const size = 32

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, opacity: 0.25 }}
      >
        <defs>
          <pattern
            id="grid"
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${size} 0 L 0 0 0 ${size}`}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            x: [0, orb.dx],
            y: [0, orb.dy],
          }}
          transition={{
            duration: orb.duration,
            delay: i * 0.8 + 1.5,
            repeat: Infinity,
            repeatDelay: orb.repeatDelay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            width: size,
            height: size,
            border: '1px solid var(--color-accent)',
            borderRadius: '2px',
            boxShadow: '0 0 8px var(--color-accent)',
          }}
        />
      ))}
    </motion.div>
  )
}
