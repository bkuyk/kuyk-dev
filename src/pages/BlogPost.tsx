import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { lazy, Suspense, type ReactNode } from 'react'
import PageTransition from '../components/PageTransition'
import { getPost } from '../data/posts'

const postComponents: Record<string, React.LazyExoticComponent<() => ReactNode>> = {
  'building-this-site-with-claude': lazy(() => import('../posts/building-this-site-with-claude')),
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const stagger = {
  container: {
    animate: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  },
  item: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
  },
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const meta = slug ? getPost(slug) : undefined
  const PostContent = slug ? postComponents[slug] : undefined

  if (!meta || !PostContent) return <Navigate to="/blog" replace />

  return (
    <PageTransition>
      <main
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '6rem 2rem 6rem',
        }}
      >
        <motion.div
          variants={stagger.container}
          initial="initial"
          animate="animate"
        >
          {/* Back link */}
          <motion.div variants={stagger.item}>
            <Link
              to="/blog"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginBottom: '2.5rem',
              }}
            >
              ← writing
            </Link>
          </motion.div>

          {/* Meta */}
          <motion.div
            variants={stagger.item}
            style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.05em',
              }}
            >
              {formatDate(meta.date)}
            </span>
            {meta.tags.map((tag) => (
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
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={stagger.item}
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              margin: '0 0 0.75rem',
              color: 'var(--color-text)',
            }}
          >
            {meta.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={stagger.item}
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.65,
              color: 'var(--color-text-muted)',
              margin: '0 0 3rem',
              paddingBottom: '2rem',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            {meta.description}
          </motion.p>

          {/* Post body */}
          <motion.div
            variants={stagger.item}
            style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'var(--color-text)',
            }}
          >
            <style>{`
              .post-body p {
                margin: 0 0 1.5rem;
              }
              .post-body h2 {
                font-size: 1.25rem;
                font-weight: 600;
                letter-spacing: -0.02em;
                margin: 2.75rem 0 1rem;
                color: var(--color-text);
              }
              .post-body a {
                color: var(--color-accent-teal);
                text-decoration: underline;
                text-underline-offset: 3px;
                text-decoration-color: color-mix(in srgb, var(--color-accent-teal) 40%, transparent);
              }
              .post-body a:hover {
                text-decoration-color: var(--color-accent-teal);
              }
              .post-body code {
                font-family: var(--font-mono);
                font-size: 0.85em;
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                padding: 0.1em 0.35em;
                border-radius: 3px;
                color: var(--color-accent-teal);
              }
              .post-body pre {
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: 6px;
                padding: 1.25rem 1.5rem;
                overflow-x: auto;
                margin: 1.5rem 0;
                font-family: var(--font-mono);
                font-size: 0.85rem;
                line-height: 1.6;
                color: var(--color-text);
              }
              .post-body pre code {
                background: none;
                border: none;
                padding: 0;
                color: inherit;
                font-size: inherit;
              }
              .post-body strong {
                font-weight: 600;
                color: var(--color-text);
              }
              .post-body em {
                color: var(--color-text-muted);
                font-style: italic;
              }
            `}</style>
            <div className="post-body">
              <Suspense fallback={null}>
                <PostContent />
              </Suspense>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </PageTransition>
  )
}
