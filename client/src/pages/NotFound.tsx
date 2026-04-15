import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'

export function NotFound() {
  return (
    <>
      <SEO title="Page Not Found | You're Invited" description="The page you're looking for doesn't exist." path="/404" />
      <section className="pt-[76px]">
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <p className="font-cormorant text-[6rem] font-light text-sage leading-none">404</p>
            <h1 className="font-cormorant text-[1.75rem] font-light text-charcoal mt-4">Page Not Found</h1>
            <p className="font-body text-taupe text-[0.9375rem] leading-relaxed mt-4">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/"
              className="inline-block mt-8 font-body text-[0.75rem] tracking-[0.15em] uppercase bg-sage text-white px-8 py-3 hover:bg-sage-dark transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
