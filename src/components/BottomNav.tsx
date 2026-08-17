import { NavLink } from 'react-router-dom';
import { Home, ArrowDownToLine, ArrowUpFromLine, Settings } from 'lucide-react';
import { useAuth } from '../lib/useAuth';

export default function BottomNav() {
  const { role } = useAuth();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        <NavLink 
          to="/" 
          className={({ isActive }) => `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Home size={20} />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>
        <NavLink 
          to="/stock-in" 
          className={({ isActive }) => `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-green-500' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <ArrowDownToLine size={20} />
          <span className="text-[10px] font-medium">Stock In</span>
        </NavLink>
        <NavLink 
          to="/stock-out" 
          className={({ isActive }) => `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <ArrowUpFromLine size={20} />
          <span className="text-[10px] font-medium">Stock Out</span>
        </NavLink>
        {role === 'admin' && (
          <NavLink 
            to="/admin" 
            className={({ isActive }) => `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Settings size={20} />
            <span className="text-[10px] font-medium">Admin</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
}
