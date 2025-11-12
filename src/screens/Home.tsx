import { useState } from 'react';
import { MapPin, ParkingSquare, Zap, MessageSquare, DoorOpen, Bell, Search, Car, CheckCircle2, Navigation } from 'lucide-react';
import { ServiceCard } from '../components/ServiceCard';
import { Button } from '../components/ui/button';
import type { Screen } from '../App';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  // Временно добавим мок активной парковки для демонстрации
  const [hasActiveParking] = useState(false); // Измените на true чтобы увидеть карточку

  const services = [
    {
      id: 'parking',
      icon: ParkingSquare,
      title: 'Парковки',
      description: '24 парковки рядом',
      color: 'bg-blue-500',
      screen: 'parking' as Screen,
    },
    {
      id: 'charging',
      icon: Zap,
      title: 'Зарядные станции',
      description: '8 станций доступны',
      color: 'bg-emerald-500',
      screen: 'charging' as Screen,
    },
    {
      id: 'cases',
      icon: MessageSquare,
      title: 'Заявки и обращения',
      description: '2 активные заявки',
      color: 'bg-orange-500',
      screen: 'cases' as Screen,
    },
    {
      id: 'access',
      icon: DoorOpen,
      title: 'Домофон',
      description: 'Доступ к подъезду',
      color: 'bg-purple-500',
      screen: 'access' as Screen,
    },
    {
      id: 'towing',
      icon: Car,
      title: 'Эвакуация и штрафы',
      description: 'Проверить автомобиль',
      color: 'bg-red-500',
      screen: 'cases' as Screen,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 pt-12 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-slate-900">Добро пожаловать</h1>
            <p className="text-slate-600">Ташкент, Яккасарайский район</p>
          </div>
          <button
            onClick={() => onNavigate('notifications')}
            className="relative w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <Bell className="w-6 h-6 text-slate-700" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#3BB273] rounded-full"></span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск услуг, адресов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-100 border-0 focus:outline-none focus:ring-2 focus:ring-[#3BB273] text-slate-900 placeholder-slate-500"
          />
        </div>
      </div>

      {/* Map View */}
      <div className="relative h-64 bg-slate-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600">Интерактивная карта</p>
            <p className="text-slate-500 text-sm">Парковки, зарядки, услуги</p>
          </div>
        </div>
        
        {/* Map pins mockup */}
        <div className="absolute top-16 left-12 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <ParkingSquare className="w-5 h-5 text-white" />
        </div>
        <div className="absolute top-20 right-16 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div className="absolute bottom-12 left-20 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <ParkingSquare className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Services */}
      <div className="px-4 py-6">
        <h2 className="text-slate-900 mb-4">Городские услуги</h2>
        
        {/* Active Parking Quick Access */}
        {hasActiveParking && (
          <div 
            onClick={() => onNavigate('parking')}
            className="bg-gradient-to-br from-[#3BB273] to-emerald-600 rounded-3xl p-5 mb-4 cursor-pointer shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-emerald-100 text-sm">Активная парковка</p>
                <h3 className="text-white">Amir Temur Square</h3>
              </div>
              <Navigation className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-emerald-100">Оплачено до 16:30</span>
              <span className="text-white">На парковке 1ч 23м</span>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              onClick={() => onNavigate(service.screen)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}