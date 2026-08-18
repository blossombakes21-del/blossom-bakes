import { LayoutDashboard, Clock, Grid } from 'lucide-react';

export default function NavigationTabs({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const tabs = [
    { id: 'inventory', label: 'Bakery Inventory', icon: LayoutDashboard, count: 5 },
    { id: 'logs', label: 'Blossom Daily Logs', icon: Clock, badge: 'Activity Feed' },
    { id: 'categories', label: 'Categories & Hub', icon: Grid }
  ];

  return (
    <div className="w-full border-b border-gray-100 bg-white px-4 pt-2 overflow-x-auto no-scrollbar">
      <div className="flex items-center space-x-8 min-w-max">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 pb-3 px-2 border-b-2 transition-colors relative
                ${isActive ? 'border-[#e74c3c] text-[#e74c3c]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
            >
              <Icon size={18} className={isActive ? 'text-[#e74c3c]' : 'text-gray-400'} />
              <span className="font-semibold text-[15px]">{tab.label}</span>
              
              {tab.count !== undefined && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ml-2
                  ${isActive ? 'bg-red-50 text-[#e74c3c]' : 'bg-gray-100 text-gray-500'}`}>
                  {tab.count}
                </span>
              )}

              {tab.badge && (
                <span className="text-[10px] uppercase font-bold tracking-wider bg-red-50 text-[#e74c3c] px-2 py-0.5 rounded-full ml-2">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
