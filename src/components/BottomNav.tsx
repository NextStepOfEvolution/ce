import { Home, Wallet, User, MapPin } from 'lucide-react';
import type { Screen } from '../App';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Главная' },
    { id: 'cases' as Screen, icon: MapPin, label: 'Заявки' },
    { id: 'wallet' as Screen, icon: Wallet, label: 'Кошелек' },
    { id: 'profile' as Screen, icon: User, label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 safe-area-inset-bottom">
      <div className="max-w-2xl mx-auto px-2 py-2">
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-4 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-[#3BB273]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
