export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

export const posts: PostMeta[] = [
  {
    slug: 'building-this-site-with-claude',
    title: 'More coming soon',
    date: '2026-02-18',
    description:
      'Writing on software engineering, AI, full-stack development, and animation experiments. Stay tuned.',
    tags: ['software', 'ai', 'animation', 'full-stack'],
  },
]

export function getPost(slug: string): PostMeta | undefined {
  return posts.find((p) => p.slug === slug)
}
