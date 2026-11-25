import Navbar from './Navbar.jsx';
import Hero from './Hero.jsx';
import './App.css';


function App(){
  return (
      <div>
        {/*Using navbar component*/}
        <Navbar />

      {/*  using main section*/}
        <Hero />
      </div>
  );
}

export  default App;