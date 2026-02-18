import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'

const links = [
  { to: '/', label: 'home' },
  { to: '/blog', label: 'blog' },
  { to: '/about', label: 'about' },
]

export default function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 2rem',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'rgba(69,79,48,0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <NavLink
        to="/"
        style={{ textDecoration: 'none' }}
      >
        <motion.span
          whileHover={{ color: 'var(--color-accent-teal)' }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            color: 'var(--color-text)',
            letterSpacing: '0.05em',
          }}
        >
          kuyk.dev
        </motion.span>
      </NavLink>

      <nav style={{ display: 'flex', gap: '1.5rem' }}>
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <motion.span
                whileHover={{ color: 'var(--color-accent-teal)' }}
                style={{
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  color: isActive ? 'var(--color-accent-teal)' : 'var(--color-text-muted)',
                  transition: 'color 0.2s',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>
    </motion.header>
  )
}
