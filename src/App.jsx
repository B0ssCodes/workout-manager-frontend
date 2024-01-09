import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

//pages and components
import Home from './pages/Home.jsx';
import WorkoutManager from './pages/WorkoutManager.jsx';
import Navbar from './components/Navbar.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';


function App() {

  const {user} = useAuthContext()

  return (
    <div data-bs-theme="dark">
      <BrowserRouter>
      <Navbar />
       <div className="pages">
        <Routes>
          <Route 
          path="/"
          element={<Home />}
          />
          
          <Route
          path="/workout-manager"
          element={user ? <WorkoutManager /> : <Navigate to="/login"/>}
          />

          <Route 
          path="/login"
          element={!user ? <Login /> : <Navigate to="/workout-manager"/>}
          />

          <Route 
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/workout-manager"/>}
          />
          </Routes>
          </div>
          </BrowserRouter>
      
    </div>
  );
}

export default App
