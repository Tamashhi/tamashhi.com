import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Staking from './Staking'
import Mint from './Mint'
import Layout from './Layout'
import Roadmap from './Roadmap'
import NotFound from './NotFound'
import Soon from './Soon'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="staking" element={<Staking />} />
            <Route path="mint" element={<Mint />} />
            <Route path="roadmap" element={<Roadmap/>} />
            <Route path="*" element={<NotFound/>}/>
          </Route>
          <Route path="Soon" element={<Soon/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;