import { useState, useEffect } from 'react';
import { useAuth } from '../lib/useAuth';
import { LogOut, ShieldCheck, Users, Settings as SettingsIcon, Database, Bell, AlertTriangle } from 'lucide-react';
import { getLogs } from '../lib/audit';

export default function Admin() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    // Poll for logs every few seconds for demonstration
    const fetchLogs = () => {
      setLogs(getLogs());
    };
    fetchLogs();
    const interval = setInterval(fetchLogs, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
  };

  const deleteAttempts = logs.filter(log => log.action === 'DELETE_ATTEMPT');

  return (
    <div className="min-h-screen bg-pink-50 p-4 pt-8 pb-20">
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <ShieldCheck className="mr-2 text-pink-500" />
            Admin Panel
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage system settings and users</p>
        </div>
        
        {/* Notification Bell */}
        <div className="relative">
          <div className="bg-white p-2 rounded-full shadow-sm">
            <Bell className="text-gray-600" size={24} />
          </div>
          {deleteAttempts.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {deleteAttempts.length}
            </span>
          )}
        </div>
      </header>

      <div className="space-y-4">

        {/* Admin Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-800">Management</h2>
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-50">
            <button className="p-6 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 transition-colors">
              <Users className="text-blue-500" size={24} />
              <span className="text-sm font-medium text-gray-700">Staff Users</span>
            </button>
            <button className="p-6 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 transition-colors">
              <Database className="text-purple-500" size={24} />
              <span className="text-sm font-medium text-gray-700">Categories</span>
            </button>
          </div>
        </div>

        {/* System */}
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-800">System</h2>
          </div>
          <ul className="divide-y divide-gray-50">
            <li>
              <button className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left">
                <div className="flex items-center">
                  <SettingsIcon className="text-gray-400 mr-3" size={20} />
                  <span className="text-sm font-medium text-gray-700">App Settings</span>
                </div>
                <span className="text-gray-300">→</span>
              </button>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                disabled={loading}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-red-50 transition-colors text-left"
              >
                <div className="flex items-center">
                  <LogOut className="text-red-500 mr-3" size={20} />
                  <span className="text-sm font-medium text-red-600">Sign Out</span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
