import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useEffect } from 'react'
import PageTransition from '../components/PageTransition'

// Pre-computed random values so AnimatedGrid is pure
const ACCENT_COLORS = ['var(--color-accent)', 'var(--color-accent-teal)', 'var(--color-accent-warm)', 'var(--color-accent-teal)']
const BORDER_RADII = ['50%', '50%', '6px', '20px'] // circle, circle, square, pill

const ORBS = Array.from({ length: 14 }, (_, i) => ({
  dx: (Math.random() - 0.5) * 240,
  dy: (Math.random() - 0.5) * 240,
  duration: 5 + Math.random() * 5,
  repeatDelay: Math.random() * 8,
  left: 8 + Math.random() * 84,
  top: 8 + Math.random() * 84,
  size: [16, 24, 32, 20][i % 4],
  color: ACCENT_COLORS[i % 4],
  borderRadius: BORDER_RADII[i % 4],
}))

function GlowOrb({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const tx = useTransform(x, (v) => v - 350)
  const ty = useTransform(y, (v) => v - 350)
  return (
    <motion.div
      style={{
        x: tx,
        y: ty,
        position: 'fixed',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(244,243,242,0.03) 0%, rgba(244,243,242,0.01) 50%, transparent 70%)',
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
                letterSpacing: '0.15em',
                color: 'var(--color-text-muted)',
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
                whileHover={{ borderColor: 'var(--color-accent-teal)', color: 'var(--color-accent-teal)' }}
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
              whileHover={{ scale: 1.03, borderColor: 'var(--color-accent-teal)' }}
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
  const dotSpacing = 36

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 2 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, opacity: 0.18 }}
      >
        <defs>
          <pattern
            id="dots"
            width={dotSpacing}
            height={dotSpacing}
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="var(--color-accent-warm)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Floating shapes — circles, pills, squares */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            x: [0, orb.dx],
            y: [0, orb.dy],
          }}
          transition={{
            duration: orb.duration,
            delay: i * 0.9 + 1.2,
            repeat: Infinity,
            repeatDelay: orb.repeatDelay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            width: orb.borderRadius === '20px' ? orb.size * 2.5 : orb.size,
            height: orb.size,
            border: `1px solid ${orb.color}`,
            borderRadius: orb.borderRadius,
            boxShadow: `0 0 10px ${orb.color}55`,
          }}
        />
      ))}
    </motion.div>
  )
}
