import './sass/main.scss';
import Navbar from "./components/Navbar";
import Person from "./components/Person";
import Footer from "./components/Footer"

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Person/>
      <Footer/>

    </div>
  );
}

export default App;
