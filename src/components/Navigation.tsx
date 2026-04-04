import { LayoutDashboard, Timer, Trophy, ListChecks } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
    { id: 'timer', label: 'Modo Off', icon: Timer },
    { id: 'challenges', label: 'Desafíos', icon: ListChecks },
    { id: 'achievements', label: 'Logros', icon: Trophy },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-emerald-100 px-4 py-2 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 relative ${
                isActive ? 'text-emerald-600' : 'text-gray-400'
              }`}
            >
              <Icon size={24} className={isActive ? 'scale-110' : 'scale-100'} />
              <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-2 w-1 h-1 bg-emerald-600 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
