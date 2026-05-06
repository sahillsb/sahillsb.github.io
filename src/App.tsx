import Navbar    from './components/Navbar';
import NameScreen from './components/NameScreen';
import Hero       from './components/Hero';
import About      from './components/About';
import QuestLog   from './components/QuestLog';
import Projects   from './components/Projects';
import Skills     from './components/Skills';
import Inventory  from './components/Inventory';
import Contact    from './components/Contact';
import Footer     from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main>
        <NameScreen />   {/* Full-screen intro: cycling title, particles, CTAs   */}
        <Hero />         {/* Character card: stats, skill bars, platforms         */}
        <About />        {/* Bio, quick stats, what I'm exploring                 */}
        <QuestLog />     {/* Work & education timeline                            */}
        <Projects />     {/* 6 projects — click any card to open detail modal     */}
        <Skills />       {/* Geometric skill tree with hover tooltips             */}
        <Inventory />    {/* Daily tools / gear                                   */}
        <Contact />      {/* Email · LinkedIn · Resume — no form                  */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
