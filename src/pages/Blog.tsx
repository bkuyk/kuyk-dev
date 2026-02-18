import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import PageTransition from '../components/PageTransition'
import { posts } from '../data/posts'

const stagger = {
  container: {
    animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  },
  item: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Blog() {
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
                letterSpacing: '0.15em',
                color: 'var(--color-text-muted)',
              }}
            >
              {'// writing'}
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
            blog
          </motion.h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {posts.map((post) => (
              <motion.div key={post.slug} variants={stagger.item}>
                <Link
                  to={`/blog/${post.slug}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <motion.article
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                      padding: '1.75rem 0',
                      borderBottom: '1px solid var(--color-border)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '1rem',
                        marginBottom: '0.5rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: 'var(--color-text-muted)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {formatDate(post.date)}
                      </span>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.65rem',
                              padding: '0.1rem 0.45rem',
                              borderRadius: '3px',
                              border: '1px solid var(--color-border)',
                              color: 'var(--color-text-muted)',
                              letterSpacing: '0.05em',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h2
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        margin: '0 0 0.5rem',
                        color: 'var(--color-text)',
                      }}
                    >
                      {post.title}
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {post.description}
                    </p>
                  </motion.article>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </PageTransition>
  )
}
