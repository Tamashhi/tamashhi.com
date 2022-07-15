import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Staking from './Staking'
import Mint from './Mint'
import Layout from './Layout'


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="staking" element={<Staking />} />
            <Route path="mint" element={<Mint />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;