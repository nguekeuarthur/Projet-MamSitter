import { useEffect, useState } from 'react'
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import BecomeSitter from './components/BecomeSitter';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import HeaderBanner from './components/HeaderBanner';
import AuthLogin from './components/AuthLogin';
import AuthRegister from './components/AuthRegister';
import ForgotPasswordPage from './pages/ForgotPassword';
import ResetPasswordPage from './pages/ResetPassword';
import AuthTestPage from './pages/AuthTestPage';
import VerifyEmail from './pages/VerifyEmail';
import ServicesPage from './pages/ServicesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BecomeSitterPage from './pages/BecomeSitterPage';
import FindSitterPage from './pages/FindSitterPage';
import PackagesEurPage from './pages/PackagesEurPage';
import PackagesChfPage from './pages/PackagesChfPage';

function App() {
  const [route, setRoute] = useState<string>(
    window.location.hash.split('?')[0].replace('#', '') || '/'
  )

  useEffect(() => {
    function onHash() {
      setRoute(window.location.hash.split('?')[0].replace('#', '') || '/')
    }

    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // simple hash routing: '/', '/login', '/register', '/forgot-password'
  if (route === '/login') {
    return (
      <>
        <Navigation />
        <AuthLogin />
      </>
    )
  }

  if (route === '/register') {
    return (
      <>
        <Navigation />
        <AuthRegister />
      </>
    )
  }

  if (route === '/forgot-password') {
    return (
      <>
        <Navigation />
        <ForgotPasswordPage />
      </>
    )
  }

  if (route === '/reset-password') {
    return (
      <>
        <Navigation />
        <ResetPasswordPage />
      </>
    )
  }

  if (route === '/verify-email') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-28">
          <VerifyEmail />
        </main>
      </div>
    )
  }

  if (route === '/auth-test') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-28">
          <AuthTestPage />
        </main>
      </div>
    )
  }

  if (route === '/services') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <HeaderBanner />
        <ServicesPage />
        <Footer />
      </div>
    )
  }

  if (route === '/how-it-works') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <HeaderBanner />
        <HowItWorksPage />
        <Footer />
      </div>
    )
  }

  if (route === '/testimonials') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <HeaderBanner />
        <TestimonialsPage />
        <Footer />
      </div>
    )
  }

  if (route === '/become-sitter') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <HeaderBanner />
        <BecomeSitterPage />
        <Footer />
      </div>
    )
  }

  if (route === '/find-sitter') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <HeaderBanner />
        <FindSitterPage />
        <Footer />
      </div>
    )
  }

  if (route === '/packages-eur') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <HeaderBanner />
        <PackagesEurPage />
        <Footer />
      </div>
    )
  }

  if (route === '/packages-chf') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <HeaderBanner />
        <PackagesChfPage />
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeaderBanner />
      <Hero />
      <Services />
      <HowItWorks />
      <Testimonials />
      <BecomeSitter />
      <Footer />
    </div>
  )
}

export default App;
