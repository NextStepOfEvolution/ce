import { User, Home, Bell, CreditCard, Shield, HelpCircle, LogOut, ChevronRight, Settings } from 'lucide-react';
import { motion } from 'motion/react';

export function Profile() {
  const menuItems = [
    {
      id: 'personal',
      icon: User,
      title: 'Личные данные',
      description: 'ФИО, телефон, email',
    },
    {
      id: 'addresses',
      icon: Home,
      title: 'Мои адреса',
      description: '2 адреса',
    },
    {
      id: 'notifications',
      icon: Bell,
      title: 'Уведомления',
      description: 'Настройка оповещений',
    },
    {
      id: 'payment',
      icon: CreditCard,
      title: 'Способы оплаты',
      description: '1 карта',
    },
    {
      id: 'security',
      icon: Shield,
      title: 'Безопасность',
      description: 'Пароль и Face ID',
    },
    {
      id: 'settings',
      icon: Settings,
      title: 'Настройки',
      description: 'Язык, тема',
    },
    {
      id: 'help',
      icon: HelpCircle,
      title: 'Помощь и поддержка',
      description: 'FAQ, техподдержка',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-[#3BB273] to-emerald-600 px-4 pt-12 pb-8">
        <h1 className="text-white mb-6">Профиль</h1>
        
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <User className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-white">Азиз Саидов</h2>
            <p className="text-emerald-100">+998 90 123 45 67</p>
            <p className="text-emerald-100 text-sm">aziz.saidov@example.com</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-slate-700" />
                </div>
                
                <div className="flex-1 text-left">
                  <p className="text-slate-900">{item.title}</p>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
                
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </motion.button>
          );
        })}

        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow mt-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
              <LogOut className="w-6 h-6 text-red-600" />
            </div>
            
            <div className="flex-1 text-left">
              <p className="text-red-600">Выйти из аккаунта</p>
            </div>
          </div>
        </motion.button>

        <div className="text-center pt-6 pb-4">
          <p className="text-slate-500 text-sm">SmartCity Tashkent v1.0.0</p>
          <p className="text-slate-400 text-sm">© 2025 Хокимият Ташкента</p>
        </div>
      </div>
    </div>
  );
}
