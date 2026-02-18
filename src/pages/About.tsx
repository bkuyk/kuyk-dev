import { motion } from 'motion/react'
import PageTransition from '../components/PageTransition'

const stagger = {
  container: {
    animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  },
  item: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
  },
}

const sections = [
  {
    label: 'background',
    content:
      'Software engineer with a focus on frontend and product engineering.',
  },
  {
    label: 'this site',
    content:
      'Built with React, Vite, Motion, and Tailwind CSS. Deployed on Cloudflare Pages.',
  },
]

export default function About() {
  return (
    <PageTransition>
      <main
        style={{
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
              {'// about'}
            </span>
          </motion.div>

          <motion.h1
            variants={stagger.item}
            style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: '0.75rem 0 3rem',
              color: 'var(--color-text)',
            }}
          >
            a bit about me
          </motion.h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {sections.map(({ label, content }) => (
              <motion.div
                key={label}
                variants={stagger.item}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: '1.5rem',
                  alignItems: 'start',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
                    letterSpacing: '0.1em',
                    paddingTop: '0.2rem',
                  }}
                >
                  {label}
                </span>
                <p
                  style={{
                    margin: 0,
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    color: 'var(--color-text)',
                  }}
                >
                  {content}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </PageTransition>
  )
}
