import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { PageLayout } from './components/layout/PageLayout'
import { Home } from './pages/Home'
import { ScrollToTop } from './components/layout/ScrollToTop'
import './styles/index.css'

// Lazy-load non-critical pages for faster initial load
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })))
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })))
const Gallery = lazy(() => import('./pages/Gallery').then(m => ({ default: m.Gallery })))
const Testimonials = lazy(() => import('./pages/Testimonials').then(m => ({ default: m.Testimonials })))
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })))
const Invitations = lazy(() => import('./pages/Invitations').then(m => ({ default: m.Invitations })))
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })))
const Admin = lazy(() => import('./pages/Admin').then(m => ({ default: m.Admin })))
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })))

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-sage border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="*"
          element={
            <PageLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/invitations" element={<Invitations />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageLayout>
          }
        />
      </Routes>
      </Suspense>
    </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
