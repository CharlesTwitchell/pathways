import { HashRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Home } from './pages/Home';
import { JourneyDetail } from './pages/JourneyDetail';
import { JourneyEditor } from './pages/JourneyEditor';
import { Profile } from './pages/Profile';
import { StopDetail } from './pages/StopDetail';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="app-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<JourneyEditor />} />
            <Route path="/journey/:journeySlug" element={<JourneyDetail />} />
            <Route path="/journey/:journeySlug/edit" element={<JourneyEditor />} />
            <Route path="/journey/:journeySlug/stop/:stopPosition" element={<StopDetail />} />
          </Routes>
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
