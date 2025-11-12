import { ArrowLeft, Bell, AlertCircle, CheckCircle2, Info, MapPin, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

interface NotificationsProps {
  onBack: () => void;
}

type NotificationType = 'alert' | 'success' | 'info' | 'payment';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: 'alert',
    title: 'Внимание!',
    message: 'Временное ограничение движения на ул. Навои с 13:00 до 16:00',
    time: '15 мин назад',
    read: false,
  },
  {
    id: 2,
    type: 'success',
    title: 'Заявка решена',
    message: 'Ваша заявка №1243 "Неработающий фонарь" выполнена',
    time: '1 час назад',
    read: false,
  },
  {
    id: 3,
    type: 'payment',
    title: 'Оплата парковки',
    message: 'Списано 10 000 сум за парковку Amir Temur Square',
    time: '2 часа назад',
    read: true,
  },
  {
    id: 4,
    type: 'info',
    title: 'Событие в районе',
    message: 'Культурное мероприятие в парке Навои 15 ноября',
    time: 'Вчера',
    read: true,
  },
  {
    id: 5,
    type: 'success',
    title: 'Зарядка завершена',
    message: 'Зарядка электромобиля завершена. Слот освобожден.',
    time: 'Вчера',
    read: true,
  },
];

export function Notifications({ onBack }: NotificationsProps) {
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'alert':
        return { icon: AlertCircle, color: 'bg-red-500' };
      case 'success':
        return { icon: CheckCircle2, color: 'bg-[#3BB273]' };
      case 'info':
        return { icon: Info, color: 'bg-blue-500' };
      case 'payment':
        return { icon: DollarSign, color: 'bg-purple-500' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-4 py-12">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="w-6 h-6 text-slate-900" />
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-slate-900 mb-1">Уведомления</h1>
            <p className="text-slate-600">
              {notifications.filter(n => !n.read).length} новых
            </p>
          </div>
          <button className="text-[#3BB273] hover:text-[#2ea563]">
            Все прочитано
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {notifications.map((notification) => {
          const { icon: Icon, color } = getNotificationIcon(notification.type);
          
          return (
            <motion.div
              key={notification.id}
              whileTap={{ scale: 0.98 }}
              className={`bg-white rounded-3xl p-5 shadow-sm cursor-pointer transition-all ${
                !notification.read ? 'ring-2 ring-[#3BB273]/20' : ''
              }`}
            >
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-slate-900">{notification.title}</h3>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-[#3BB273] flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-slate-600 text-sm mb-2">{notification.message}</p>
                  <p className="text-slate-500 text-xs">{notification.time}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="p-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <Bell className="w-6 h-6 text-slate-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-slate-900 mb-2">Настройки уведомлений</h3>
              <p className="text-slate-600 text-sm mb-4">
                Управляйте типами уведомлений и способами их доставки
              </p>
              <button className="text-[#3BB273] hover:text-[#2ea563]">
                Настроить →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
