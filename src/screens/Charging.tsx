import { useState } from 'react';
import { ArrowLeft, Zap, MapPin, Clock, Battery, Navigation, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';

interface ChargingProps {
  onBack: () => void;
}

const chargingStations = [
  {
    id: 1,
    name: 'EVpoint Yunusabad',
    address: 'ул. Шахрисабз, 25',
    distance: '0.5 км',
    available: 3,
    total: 4,
    power: '50 кВт',
    rate: '1500 сум/мин',
    rating: 4.9,
    type: 'Type 2 / CCS',
  },
  {
    id: 2,
    name: 'EVpoint Sergeli',
    address: 'пр. Бунёдкор, 45',
    distance: '1.1 км',
    available: 2,
    total: 6,
    power: '120 кВт',
    rate: '2500 сум/мин',
    rating: 4.7,
    type: 'Type 2 / CCS / CHAdeMO',
  },
  {
    id: 3,
    name: 'EVpoint Chilanzar',
    address: 'ул. Катартал, 12',
    distance: '1.8 км',
    available: 5,
    total: 8,
    power: '22 кВт',
    rate: '800 сум/мин',
    rating: 4.8,
    type: 'Type 2',
  },
];

export function Charging({ onBack }: ChargingProps) {
  const [selectedStation, setSelectedStation] = useState<number | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  const selected = chargingStations.find(s => s.id === selectedStation);

  if (showBooking && selected) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200 px-4 py-12">
          <button onClick={() => setShowBooking(false)} className="mb-4">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h1 className="text-slate-900">Бронирование слота</h1>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900">{selected.name}</h3>
                <p className="text-slate-600 text-sm">{selected.address}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Тип разъема</span>
                <span className="text-slate-900">{selected.type}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Мощность</span>
                <span className="text-slate-900">{selected.power}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Тариф</span>
                <span className="text-slate-900">{selected.rate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Время слота</span>
                <span className="text-slate-900">30 минут</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-900">Резерв</span>
                <span className="text-slate-900">45 000 сум</span>
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-amber-900">Слот на 30 минут</p>
                  <p className="text-amber-700">При превышении времени — доплата по тарифу</p>
                </div>
              </div>
            </div>

            <Button className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl">
              Забронировать за 45 000 сум
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
        <h1 className="text-slate-900 mb-1">Зарядные станции</h1>
        <p className="text-slate-600">Доступно {chargingStations.length} станций</p>
      </div>

      <div className="relative h-48 bg-slate-200 border-b border-slate-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className="w-8 h-8 text-slate-400" />
        </div>
      </div>

      <div className="p-4 space-y-3">
        {chargingStations.map((station) => (
          <motion.div
            key={station.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedStation(station.id)}
            className={`bg-white rounded-3xl p-5 shadow-sm cursor-pointer transition-all ${
              selectedStation === station.id ? 'ring-2 ring-[#3BB273]' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">{station.name}</h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {station.distance}
                  </span>
                  <span className="text-slate-600 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {station.rating}
                  </span>
                </div>
              </div>
              <button className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            <p className="text-slate-600 text-sm mb-3">{station.address}</p>

            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-sm">
                {station.type}
              </span>
              <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm flex items-center gap-1">
                <Battery className="w-4 h-4" />
                {station.power}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <p className="text-slate-600 text-sm">Свободно</p>
                <p className="text-slate-900">
                  {station.available} из {station.total}
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-600 text-sm">Тариф</p>
                <p className="text-slate-900">{station.rate}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedStation && (
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <Button
            onClick={() => setShowBooking(true)}
            className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl shadow-lg"
          >
            Забронировать слот
          </Button>
        </div>
      )}
    </div>
  );
}
