import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Events from './pages/Events';
import Register from './pages/Register';
import OrganizerDashboard from './pages/OrganizerDashboard';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import Welcome from './pages/Welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} /> {/* Ruta para manejar 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;