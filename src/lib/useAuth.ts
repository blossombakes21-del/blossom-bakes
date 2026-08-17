import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export function useAuth() {
  const [session, setSession] = useState<any>(null);
  const [role, setRole] = useState<'admin' | 'employee' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mock role first for demonstration
    const mockRole = localStorage.getItem('mock_role') as 'admin' | 'employee' | null;
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session && mockRole) {
         setRole(mockRole);
      } else if (session) {
         // In real DB, fetch from profiles:
         // supabase.from('profiles').select('role').eq('id', session.user.id)...
         setRole('employee'); // Default
      } else if (mockRole) {
         // Mock session
         setSession({ user: { email: 'mock@blossom.com' } });
         setRole(mockRole);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
          const storedRole = localStorage.getItem('mock_role') as 'admin' | 'employee' | null;
          setRole(storedRole || 'employee');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginMock = (selectedRole: 'admin' | 'employee') => {
      localStorage.setItem('mock_role', selectedRole);
      setSession({ user: { email: 'mock@blossom.com' } });
      setRole(selectedRole);
  };

  const logoutMock = () => {
      localStorage.removeItem('mock_role');
      setSession(null);
      setRole(null);
  }

  return { session, role, loading, loginMock, logoutMock };
}
