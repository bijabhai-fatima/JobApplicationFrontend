import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ApplicationDetail from './pages/ApplicationDetail/ApplicationDetail';
import NewApplication from './pages/NewApplication/NewApplication';


function App() {
  return (
    <Router>
      <div class="background-bubbles">
  <div class="bubble bubble-1"></div>
  <div class="bubble bubble-2"></div>
  <div class="bubble bubble-3"></div>
  
  <div class="bubble bubble-4"></div>
  
  <div class="bubble bubble-5"></div>
  <div class="bubble bubble-6"></div>
</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/application/:id" element={<ApplicationDetail />} />
        <Route path="/newapplication" element={<NewApplication />} />
      </Routes>
    </Router>
  );
}

export default App;
