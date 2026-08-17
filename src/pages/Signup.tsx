import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Croissant, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('blossombakes21@gmail.com');
  const [password, setPassword] = useState('Blossom@21');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // The database automatically creates the 'employee' profile via a SQL trigger, 
      // so we don't need to manually insert it here!

      // 3. Navigate to root (Dashboard) which will show employee view
      navigate('/');
    } catch (error: any) {
      setErrorMsg(error.message || 'An error occurred during signup.');
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Join Blossom Bakes</h2>
          <p className="text-center text-sm text-gray-500 mb-8">Create an employee account</p>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password (min 6 chars)"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>

            {errorMsg && (
              <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 text-white font-semibold py-4 rounded-xl hover:bg-pink-600 transition-colors shadow-md disabled:opacity-70 flex justify-center items-center"
            >
              <UserPlus className="mr-2" size={20} />
              {loading ? 'Signing up...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-pink-600 font-semibold hover:underline">
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
