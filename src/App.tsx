import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import QuestLog from './components/QuestLog';
import Inventory from './components/Inventory';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <QuestLog />
        <Projects />
        <Skills />
        <Inventory />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
