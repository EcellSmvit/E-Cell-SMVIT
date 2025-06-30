
import './App.css'
import About from './components/About'
import Background from './components/Background';
import Navbar from './components/Navbar'
import Particles from './components/Particlesbackground';
import TextHome from './components/TextHome';
import ThreeScene from './components/ThreeScene';
import Section2 from './components/Section2';
import SmoothScrollWrapper from './components/SmoothScrollWrapper';
import Section3 from './components/Section3';


function App() {
  return (
    <div>
      {/* <SmoothScrollWrapper>

      </SmoothScrollWrapper> */}

      <Navbar/>
      
      <TextHome/>
      <Background/>
      <ThreeScene />
      <Section2/>
      <Section3/>
      <About/>
    </div>
    
  )
}

export default App
