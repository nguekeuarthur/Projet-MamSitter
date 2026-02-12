import { useEffect, useState } from 'react'
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import BecomeSitter from './components/BecomeSitter';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import AuthLogin from './components/AuthLogin';
import AuthRegister from './components/AuthRegister';
import ForgotPasswordPage from './pages/ForgotPassword';
import ResetPasswordPage from './pages/ResetPassword';
import AuthTestPage from './pages/AuthTestPage';
import VerifyEmail from './pages/VerifyEmail';

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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
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
