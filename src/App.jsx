
import Navbar from './common/Navbar/Navbar';
import Hero from './common/Hero/Hero';
import Highlights from './common/Highlights/Highlights';
import Model from './common/Model/Model';
import Features from './common/Features/Features';
import HowItWorks from './common/HowItWorks/HowItWorks';
import Footer from './common/Footer/Footer';

const App = () => {

  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}

export default App
