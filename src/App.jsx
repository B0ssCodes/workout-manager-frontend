import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import { useAuthContext } from './hooks/useAuthContext';
import Navigation from './components/Navigation.jsx';

//pages and components
import Home from './pages/Home';
import WorkoutManager from './pages/WorkoutManager';
import Signup from './pages/Signup';
import Login from './pages/Login';
import BenchProgram from './pages/BenchProgram';
import Dashboard from './pages/Dashboard';
import PRCalculator from './pages/PRCalculator';
import WorkoutAdder from './pages/WorkoutAdder';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppRoutes({ user }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bench-program" element={user ? <BenchProgram /> : <Navigate to="/login" />} />
      <Route path="/pr-calculator" element={user ? <PRCalculator /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/workout-manager" element={user ? <WorkoutManager /> : <Navigate to="/login" />} />
      <Route path="/workout-adder" element={user ? <WorkoutAdder /> : <Navigate to="/login" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboord" />} />
    </Routes>
  );
}

function App() {
  const { user } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <ScrollToTop />
        <div className="pages">
          <AppRoutes user={user} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;