import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './components/Navbar.jsx';

//pages and components
import Home from './pages/Home.jsx';
import WorkoutManager from './pages/WorkoutManager.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';

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
      <Route path="/workout-manager" element={user ? <WorkoutManager /> : <Navigate to="/login" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/workout-manager" />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/workout-manager" />} />
    </Routes>
  );
}

function App() {
  const { user } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <div className="pages">
          <AppRoutes user={user} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;