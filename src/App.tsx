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
import MentionsLegales from './pages/MentionsLegales';
import CGV from './pages/CGV';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import Concept from './pages/Concept';
import MamaSitters from './pages/MamaSitters';
import Contact from './pages/Contact';
import MamaSitterSearch from './pages/MamaSitterSearch';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Messages from './pages/Messages';
import ServicesPage from './pages/Services';
import BookingSuccess from './pages/BookingSuccess';
import BecomeMamaSitter from './pages/BecomeMamaSitter';
import About from './pages/About';

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

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])

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

  if (route === '/mentions-legales') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
        <Navigation />
        <main className="flex-grow pt-32 pb-12">
          <MentionsLegales />
        </main>
        <Footer />
      </div>
    )
  }

  if (route === '/cgv') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
        <Navigation />
        <main className="flex-grow pt-32 pb-12">
          <CGV />
        </main>
        <Footer />
      </div>
    )
  }

  if (route === '/politique-confidentialite') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
        <Navigation />
        <main className="flex-grow pt-32 pb-12">
          <PolitiqueConfidentialite />
        </main>
        <Footer />
      </div>
    )
  }

  if (route === '/concept') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
        <Navigation />
        <main className="flex-grow pt-32 pb-12">
          <Concept />
        </main>
        <Footer />
      </div>
    )
  }

  if (route === '/mamasitters') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
        <Navigation />
        <main className="flex-grow pt-32 pb-12">
          <MamaSitters />
        </main>
        <Footer />
      </div>
    )
  }

  if (route === '/contact') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
        <Navigation />
        <main className="flex-grow pt-32 pb-12">
          <Contact />
        </main>
        <Footer />
      </div>
    )
  }

  if (route === '/search') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
        <Navigation />
        <main className="flex-grow pt-32 pb-12">
          <MamaSitterSearch />
        </main>
        <Footer />
      </div>
    )
  }

  if (route === '/profile') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
        <Navigation />
        <main className="flex-grow pt-32 pb-12">
          <Profile />
        </main>
        <Footer />
      </div>
    )
  }

  if (route === '/admin') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
        <Navigation />
        <main className="flex-grow pt-32 pb-12">
          <AdminDashboard />
        </main>
        <Footer />
      </div>
    )
  }

  if (route === '/messages') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
        <Navigation />
        <main className="flex-grow pt-32 pb-12">
          <Messages />
        </main>
        <Footer />
      </div>
    )
  }

  if (route === '/booking-success') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <BookingSuccess />
        </main>
        <Footer />
      </div>
    )
  }

  if (route === '/services') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <ServicesPage />
        </main>
        <Footer />
      </div>
    )
  }

  if (route === '/devenir-mamasitter') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navigation />
        <main className="flex-grow pt-20">
          <BecomeMamaSitter />
        </main>
        <Footer />
      </div>
    )
  }

  if (route === '/about') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navigation />
        <main className="flex-grow pt-20">
          <About />
        </main>
        <Footer />
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
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
