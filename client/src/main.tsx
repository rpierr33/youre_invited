import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PageLayout } from './components/layout/PageLayout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Services } from './pages/Services'
import { Gallery } from './pages/Gallery'
import { Testimonials } from './pages/Testimonials'
import { Contact } from './pages/Contact'
import { Invitations } from './pages/Invitations'
import { Login } from './pages/Login'
import { Admin } from './pages/Admin'
import { ScrollToTop } from './components/layout/ScrollToTop'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
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
              </Routes>
            </PageLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
