import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './lib/useAuth';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import StockIn from './pages/StockIn';
import StockOut from './pages/StockOut';
import Admin from './pages/Admin';
import Login from './pages/Login';

import Signup from './pages/Signup';
import TopHeader from './components/TopHeader';

function App() {
  const { session, role, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e74c3c]"></div></div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        {session && <TopHeader />}
        
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!session ? <Signup /> : <Navigate to="/" />} />
            
            {/* Protected Routes */}
            <Route path="/" element={session ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/stock-in" element={session ? <StockIn /> : <Navigate to="/login" />} />
            <Route path="/stock-out" element={session ? <StockOut /> : <Navigate to="/login" />} />
            <Route path="/admin" element={session ? <Admin /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
