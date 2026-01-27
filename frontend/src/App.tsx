import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Wizard } from './components/Wizard';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wizard" element={<Wizard />} />
    </Routes>
  );
}

export default App;
