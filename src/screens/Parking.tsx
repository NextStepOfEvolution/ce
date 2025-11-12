import { useState } from 'react';
import { ArrowLeft, MapPin, Clock, CreditCard, Navigation, Star, CheckCircle2, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';

interface ParkingProps {
  onBack: () => void;
}

interface ActiveParking {
  lot: typeof parkingLots[0];
  startTime: Date;
  duration: number; // в часах
  totalCost: number;
}

const parkingLots = [
  {
    id: 1,
    name: 'Паркинг Amir Temur Square',
    address: 'ул. Амира Темура, 1',
    distance: '0.3 км',
    available: 24,
    total: 100,
    rate: '5000 сум/час',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Паркинг Magic City',
    address: 'пр. Бунёдкор, 17',
    distance: '0.8 км',
    available: 12,
    total: 80,
    rate: '4000 сум/час',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Паркинг Samarkand Darvoza',
    address: 'ул. Бабура, 32',
    distance: '1.2 км',
    available: 45,
    total: 120,
    rate: '3000 сум/час',
    rating: 4.9,
  },
];

export function Parking({ onBack }: ParkingProps) {
  const [selectedParking, setSelectedParking] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [activeParking, setActiveParking] = useState<ActiveParking | null>(null);

  const selected = parkingLots.find(p => p.id === selectedParking);

  const handlePayment = () => {
    if (selected) {
      setActiveParking({
        lot: selected,
        startTime: new Date(),
        duration: 2,
        totalCost: 10000,
      });
      setShowPayment(false);
      setSelectedParking(null);
    }
  };

  const handleEndParking = () => {
    setActiveParking(null);
  };

  const getElapsedTime = () => {
    if (!activeParking) return '';
    const elapsed = Math.floor((new Date().getTime() - activeParking.startTime.getTime()) / 1000 / 60);
    const hours = Math.floor(elapsed / 60);
    const minutes = elapsed % 60;
    return `${hours}ч ${minutes}м`;
  };

  if (showPayment && selected) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200 px-4 py-12">
          <button onClick={() => setShowPayment(false)} className="mb-4">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h1 className="text-slate-900">Оплата парковки</h1>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900">{selected.name}</h3>
                <p className="text-slate-600 text-sm">{selected.address}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Тариф</span>
                <span className="text-slate-900">{selected.rate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Предоплата</span>
                <span className="text-slate-900">2 часа</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-900">Итого</span>
                <span className="text-slate-900">10 000 сум</span>
              </div>
            </div>

            <Button className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl" onClick={handlePayment}>
              Оплатить 10 000 сум
            </Button>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-slate-900 mb-4">Способ оплаты</h3>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50">
              <CreditCard className="w-6 h-6 text-slate-600" />
              <div className="flex-1">
                <p className="text-slate-900">•••• 4321</p>
                <p className="text-slate-600 text-sm">Uzcard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeParking) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200 px-4 py-12">
          <button onClick={handleEndParking} className="mb-4">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h1 className="text-slate-900">Активная парковка</h1>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900">{activeParking.lot.name}</h3>
                <p className="text-slate-600 text-sm">{activeParking.lot.address}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Тариф</span>
                <span className="text-slate-900">{activeParking.lot.rate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Время начала</span>
                <span className="text-slate-900">{activeParking.startTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-900">Прошло времени</span>
                <span className="text-slate-900">{getElapsedTime()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-900">Итого</span>
                <span className="text-slate-900">{activeParking.totalCost} сум</span>
              </div>
            </div>

            <Button className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl" onClick={handleEndParking}>
              Завершить парковку
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-4 py-12">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="w-6 h-6 text-slate-900" />
        </button>
        <h1 className="text-slate-900 mb-1">Парковки рядом</h1>
        <p className="text-slate-600">Найдено {parkingLots.length} парковок</p>
      </div>

      {/* Map preview */}
      <div className="relative h-48 bg-slate-200 border-b border-slate-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="w-8 h-8 text-slate-400" />
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Active Parking Card */}
        {activeParking && (
          <div className="bg-gradient-to-br from-[#3BB273] to-emerald-600 rounded-3xl p-6 shadow-lg mb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-white" />
                <h3 className="text-white">Активная парковка</h3>
              </div>
              <button 
                onClick={handleEndParking}
                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-white/20">
              <h4 className="text-white mb-1">{activeParking.lot.name}</h4>
              <p className="text-emerald-100 text-sm mb-3">{activeParking.lot.address}</p>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-emerald-100 text-xs mb-1">Время на парковке</p>
                  <p className="text-white">{getElapsedTime()}</p>
                </div>
                <div>
                  <p className="text-emerald-100 text-xs mb-1">Оплачено до</p>
                  <p className="text-white">
                    {new Date(activeParking.startTime.getTime() + activeParking.duration * 60 * 60 * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/20">
                <p className="text-emerald-100 text-xs mb-1">Оплачено</p>
                <p className="text-white">{activeParking.totalCost.toLocaleString()} сум</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleEndParking}
                className="flex-1 h-12 bg-white hover:bg-emerald-50 text-[#3BB273] rounded-2xl"
              >
                Завершить
              </Button>
              <Button 
                className="flex-1 h-12 bg-white/20 hover:bg-white/30 text-white rounded-2xl backdrop-blur-sm border border-white/20"
              >
                Продлить
              </Button>
            </div>
          </div>
        )}

        {parkingLots.map((lot) => (
          <motion.div
            key={lot.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedParking(lot.id)}
            className={`bg-white rounded-3xl p-5 shadow-sm cursor-pointer transition-all ${
              selectedParking === lot.id ? 'ring-2 ring-[#3BB273]' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">{lot.name}</h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {lot.distance}
                  </span>
                  <span className="text-slate-600 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {lot.rating}
                  </span>
                </div>
              </div>
              <button className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            <p className="text-slate-600 text-sm mb-3">{lot.address}</p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <p className="text-slate-600 text-sm">Свободно мест</p>
                <p className="text-slate-900">
                  {lot.available} из {lot.total}
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-600 text-sm">Тариф</p>
                <p className="text-slate-900">{lot.rate}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedParking && (
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <Button
            onClick={() => setShowPayment(true)}
            className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl shadow-lg"
          >
            Забронировать место
          </Button>
        </div>
      )}
    </div>
  );
}