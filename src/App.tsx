import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import BecomeSitter from './components/BecomeSitter';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

function App() {
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
  );
}

export default App;
