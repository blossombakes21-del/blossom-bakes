import { useState } from 'react';
import { useAuth } from '../lib/useAuth';
import { Croissant, UserCheck, Shield } from 'lucide-react';

export default function Login() {
  const { loginMock } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = (role: 'admin' | 'employee') => {
    setLoading(true);
    setTimeout(() => {
      loginMock(role);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center p-6 bg-pink-50">
      <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-pink-100 p-4 rounded-full text-pink-500">
              <Croissant size={48} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Blossom Bakes</h2>
          <p className="text-center text-sm text-gray-500 mb-8">Select your role to continue</p>
          
          <div className="space-y-4">
            <button
              onClick={() => handleLogin('admin')}
              disabled={loading}
              className="w-full bg-pink-500 text-white font-semibold py-4 rounded-xl hover:bg-pink-600 transition-colors shadow-md disabled:opacity-70 flex justify-center items-center"
            >
              <Shield className="mr-2" size={20} />
              Login as Admin
            </button>
            <button
              onClick={() => handleLogin('employee')}
              disabled={loading}
              className="w-full bg-white text-pink-600 border-2 border-pink-500 font-semibold py-4 rounded-xl hover:bg-pink-50 transition-colors shadow-sm disabled:opacity-70 flex justify-center items-center"
            >
              <UserCheck className="mr-2" size={20} />
              Login as Employee
            </button>
          </div>
        </div>
        <div className="bg-gray-50 px-8 py-4 text-center text-xs text-gray-500">
          Secure Bakery Inventory Management
        </div>
      </div>
    </div>
  );
}
