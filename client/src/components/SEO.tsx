import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  path: string
  type?: string
  image?: string
}

const SITE_URL = 'https://youreinvited-three.vercel.app'
const SITE_NAME = "You're Invited"
const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=630&fit=crop&q=80'

export function SEO({ title, description, path, type = 'website', image }: SEOProps) {
  const url = `${SITE_URL}${path}`
  const ogImage = image || DEFAULT_OG_IMAGE

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
