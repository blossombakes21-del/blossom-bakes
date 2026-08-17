import { useState, useEffect } from 'react';
import { useAuth } from '../lib/useAuth';
import { LogOut, ShieldCheck, Users, Settings as SettingsIcon, Database, Bell, AlertTriangle } from 'lucide-react';
import { getLogs } from '../lib/audit';

export default function Admin() {
  const { logoutMock } = useAuth();
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
    setTimeout(() => {
        logoutMock();
    }, 500);
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
        {/* Audit Logs & Alerts */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 flex items-center">
              <AlertTriangle className="text-red-500 mr-2" size={18} />
              Recent Activity & Alerts
            </h2>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{logs.length} total</span>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-sm text-gray-500 p-4 text-center">No recent activity.</p>
            ) : (
              <ul className="divide-y divide-gray-50">
                {logs.slice(0, 20).map((log, idx) => (
                  <li key={idx} className={`p-4 ${log.action === 'DELETE_ATTEMPT' ? 'bg-red-50' : 'hover:bg-gray-50'} transition-colors`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${log.action.includes('DELETE') ? 'bg-red-100 text-red-600' : log.action === 'STOCK_IN' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                        {log.action}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800">{log.item_name} {log.quantity_changed ? `(${log.quantity_changed})` : ''}</p>
                    {log.details && <p className="text-xs text-gray-500 mt-1">{log.details}</p>}
                    <p className="text-[10px] text-gray-400 mt-1">User: {log.user}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

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
