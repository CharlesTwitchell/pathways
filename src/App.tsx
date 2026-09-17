import { HashRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { JourneyDetail } from './pages/JourneyDetail';
import { StopDetail } from './pages/StopDetail';

function App() {
  return (
    <HashRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journey/:journeyId" element={<JourneyDetail />} />
          <Route path="/journey/:journeyId/stop/:stopId" element={<StopDetail />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
