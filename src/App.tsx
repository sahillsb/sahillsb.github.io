import Background  from './components/Background';
import Shapes      from './components/Shapes';
import Cursor      from './components/Cursor';
import Navbar      from './components/Navbar';
import NameScreen  from './components/NameScreen';
import Hero        from './components/Hero';
import About       from './components/About';
import QuestLog    from './components/QuestLog';
import Projects    from './components/Projects';
import Skills      from './components/Skills';
import Inventory   from './components/Inventory';
import Contact     from './components/Contact';
import Footer      from './components/Footer';

function App() {
  return (
    // bg-slate-950 on root so the fixed Background shows through all sections
    <div className="min-h-screen text-gray-100 selection:bg-indigo-500 selection:text-white relative">
      <Background />
      <Shapes />
      <Cursor />
      <Navbar />
      <main>
        <NameScreen />
        <Hero />
        <About />
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
