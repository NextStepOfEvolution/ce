import { useState } from 'react';
import { ArrowLeft, DoorOpen, QrCode, Video, UserPlus, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';

interface AccessProps {
  onBack: () => void;
}

export function Access({ onBack }: AccessProps) {
  const [showCall, setShowCall] = useState(false);
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const [guestQR, setGuestQR] = useState<string | null>(null);

  if (showQRGenerator) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200 px-4 py-12">
          <button onClick={() => setShowQRGenerator(false)} className="mb-4">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h1 className="text-slate-900">Гостевой QR-код</h1>
        </div>

        <div className="p-4 space-y-4">
          {!guestQR ? (
            <>
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="text-slate-900 mb-4">Параметры доступа</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-900 mb-2">Имя гостя</label>
                    <input
                      type="text"
                      placeholder="Введите имя"
                      className="w-full h-12 px-4 rounded-2xl bg-slate-50 border-0 focus:outline-none focus:ring-2 focus:ring-[#3BB273] text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-900 mb-2">Время действия</label>
                    <select className="w-full h-12 px-4 rounded-2xl bg-slate-50 border-0 focus:outline-none focus:ring-2 focus:ring-[#3BB273] text-slate-900">
                      <option>1 час</option>
                      <option>2 часа</option>
                      <option>6 часов</option>
                      <option>12 часов</option>
                      <option>24 часа</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-900 mb-2">Доступ к подъезду</label>
                    <select className="w-full h-12 px-4 rounded-2xl bg-slate-50 border-0 focus:outline-none focus:ring-2 focus:ring-[#3BB273] text-slate-900">
                      <option>Подъезд 1, кв. 42</option>
                      <option>Подъезд 2, кв. 15</option>
                    </select>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setGuestQR('generated')}
                className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl"
              >
                Создать QR-код
              </Button>
            </>
          ) : (
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12 text-[#3BB273]" />
              </div>
              
              <h3 className="text-slate-900 text-center mb-2">QR-код создан</h3>
              <p className="text-slate-600 text-center mb-6">Действителен 2 часа</p>

              <div className="w-64 h-64 mx-auto rounded-3xl bg-slate-100 flex items-center justify-center mb-6">
                <QrCode className="w-48 h-48 text-slate-400" />
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Гость</span>
                  <span className="text-slate-900">Иван Иванов</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Подъезд</span>
                  <span className="text-slate-900">1, кв. 42</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Действует до</span>
                  <span className="text-slate-900">18:30</span>
                </div>
              </div>

              <Button
                onClick={() => {
                  setGuestQR(null);
                  setShowQRGenerator(false);
                }}
                variant="outline"
                className="w-full h-12 rounded-2xl"
              >
                Закрыть
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showCall) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-slate-800 mx-auto mb-6 flex items-center justify-center">
              <Video className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-white mb-2">Входной вызов</h2>
            <p className="text-slate-400">Подъезд 1, кв. 42</p>
          </div>
        </div>

        <div className="p-8 space-y-4">
          <Button
            onClick={() => setShowCall(false)}
            className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl flex items-center justify-center gap-2"
          >
            <DoorOpen className="w-5 h-5" />
            Открыть дверь
          </Button>
          
          <Button
            onClick={() => setShowCall(false)}
            variant="outline"
            className="w-full h-14 rounded-2xl bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
          >
            Отклонить
          </Button>
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
        <h1 className="text-slate-900 mb-1">Домофон и доступ</h1>
        <p className="text-slate-600">Управление входом</p>
      </div>

      <div className="p-4 space-y-3">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCall(true)}
          className="w-full bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500 flex items-center justify-center">
              <Video className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-slate-900">Видеозвонок</h3>
              <p className="text-slate-600 text-sm">Принять вызов домофона</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowQRGenerator(true)}
          className="w-full bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center">
              <QrCode className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-slate-900">Гостевой QR-код</h3>
              <p className="text-slate-600 text-sm">Временный доступ для гостей</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center">
              <DoorOpen className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-slate-900">Открыть дверь</h3>
              <p className="text-slate-600 text-sm">Быстрый доступ</p>
            </div>
          </div>
        </motion.button>

        <div className="bg-white rounded-3xl p-6 shadow-sm mt-6">
          <h3 className="text-slate-900 mb-4">Мои адреса</h3>
          
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50">
              <p className="text-slate-900 mb-1">ул. Амира Темура, 15</p>
              <p className="text-slate-600 text-sm">Подъезд 1, кв. 42</p>
            </div>
            
            <div className="p-4 rounded-2xl bg-slate-50">
              <p className="text-slate-900 mb-1">пр. Бунёдкор, 32</p>
              <p className="text-slate-600 text-sm">Подъезд 2, кв. 15</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-slate-900 mb-4">История доступа</h3>
          
          <div className="space-y-3">
            {[
              { time: '14:32', action: 'Открыта дверь', date: 'Сегодня' },
              { time: '09:15', action: 'Гостевой доступ', date: 'Сегодня' },
              { time: '18:45', action: 'Видеозвонок', date: 'Вчера' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="text-slate-900">{item.action}</p>
                  <p className="text-slate-600 text-sm">{item.date}, {item.time}</p>
                </div>
                <Clock className="w-5 h-5 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
