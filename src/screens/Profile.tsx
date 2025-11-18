import { useState } from 'react';
import { User, Home, Bell, CreditCard, Shield, HelpCircle, LogOut, ChevronRight, Settings, MapPin, X, Phone, Mail, Edit2, Globe, Moon, Sun, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { AuthService } from '../services';

interface ProfileProps {
  onLogout: () => void;
}

export function Profile({ onLogout }: ProfileProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'ru' | 'uz' | 'en'>('ru');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const addresses = [
    {
      id: 1,
      title: 'Дом',
      address: 'ул. Амира Темура, 15',
      apartment: 'Подъезд 1, кв. 42',
      isDefault: true,
    },
    {
      id: 2,
      title: 'Работа',
      address: 'пр. Бунёдкор, 32',
      apartment: 'Подъезд 2, кв. 15',
      isDefault: false,
    },
  ];

  const personalData = {
    fullName: 'Азиз Саидов',
    phone: '+998 90 123 45 67',
    email: 'aziz.saidov@example.com',
    birthDate: '15.03.1990',
    passport: 'AA 1234567',
  };

  const languages = [
    { code: 'ru' as const, name: 'Русский', nativeName: 'Русский' },
    { code: 'uz' as const, name: 'Uzbek', nativeName: 'O\'zbekcha' },
    { code: 'en' as const, name: 'English', nativeName: 'English' },
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await AuthService.logout();
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, clear local data and logout
      AuthService.clearAuthData();
      onLogout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-[#3BB273] to-emerald-600 px-4 pt-12 pb-8">
        <h1 className="text-slate-50 mb-6">Профиль</h1>
        
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-slate-50/20 backdrop-blur-sm flex items-center justify-center border border-slate-50/30">
            <User className="w-10 h-10 text-slate-50 stroke-[2]" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-slate-50">{personalData.fullName}</h2>
            <p className="text-emerald-100">{personalData.phone}</p>
            <p className="text-emerald-100 text-sm">{personalData.email}</p>
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
              onClick={() => setSelectedSection(item.id)}
              className="w-full bg-slate-50 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-slate-700 stroke-[2]" />
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
          onClick={() => setSelectedSection('logout')}
          className="w-full bg-slate-50 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow mt-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
              <LogOut className="w-6 h-6 text-red-600 stroke-[2]" />
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

      {/* Personal Data Modal */}
      <AnimatePresence>
        {selectedSection === 'personal' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSection(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-slate-50 rounded-t-3xl p-6 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-slate-900">Личные данные</h2>
                <button
                  onClick={() => setSelectedSection(null)}
                  className="w-10 h-10 rounded-xl bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-100 rounded-2xl p-4 space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-slate-600 text-sm mb-1">Полное имя</p>
                      <p className="text-slate-900">{personalData.fullName}</p>
                    </div>
                    <button className="w-9 h-9 rounded-lg bg-slate-50 hover:bg-slate-200 flex items-center justify-center transition-colors">
                      <Edit2 className="w-4 h-4 text-slate-700" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-600" />
                      <div>
                        <p className="text-slate-600 text-sm mb-1">Телефон</p>
                        <p className="text-slate-900">{personalData.phone}</p>
                      </div>
                    </div>
                    <button className="w-9 h-9 rounded-lg bg-slate-50 hover:bg-slate-200 flex items-center justify-center transition-colors">
                      <Edit2 className="w-4 h-4 text-slate-700" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-600" />
                      <div>
                        <p className="text-slate-600 text-sm mb-1">Email</p>
                        <p className="text-slate-900">{personalData.email}</p>
                      </div>
                    </div>
                    <button className="w-9 h-9 rounded-lg bg-slate-50 hover:bg-slate-200 flex items-center justify-center transition-colors">
                      <Edit2 className="w-4 h-4 text-slate-700" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-slate-200">
                    <div>
                      <p className="text-slate-600 text-sm mb-1">Дата рождения</p>
                      <p className="text-slate-900">{personalData.birthDate}</p>
                    </div>
                    <button className="w-9 h-9 rounded-lg bg-slate-50 hover:bg-slate-200 flex items-center justify-center transition-colors">
                      <Edit2 className="w-4 h-4 text-slate-700" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-slate-200">
                    <div>
                      <p className="text-slate-600 text-sm mb-1">Паспорт</p>
                      <p className="text-slate-900">{personalData.passport}</p>
                    </div>
                    <button className="w-9 h-9 rounded-lg bg-slate-50 hover:bg-slate-200 flex items-center justify-center transition-colors">
                      <Edit2 className="w-4 h-4 text-slate-700" />
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-blue-900 mb-1">Защита данных</p>
                      <p className="text-blue-700">
                        Ваши личные данные защищены и используются только для работы сервиса
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Addresses Modal */}
      <AnimatePresence>
        {selectedSection === 'addresses' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSection(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-slate-50 rounded-t-3xl p-6 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-slate-900">Мои адреса</h2>
                <button
                  onClick={() => setSelectedSection(null)}
                  className="w-10 h-10 rounded-xl bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                {addresses.map((address) => (
                  <motion.div
                    key={address.id}
                    whileTap={{ scale: 0.98 }}
                    className={`relative overflow-hidden rounded-2xl p-4 cursor-pointer transition-all ${
                      address.isDefault
                        ? 'bg-gradient-to-br from-[#3BB273] to-emerald-600 text-slate-50'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    {address.isDefault && (
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-slate-50/20 backdrop-blur-sm border border-slate-50/30">
                        <span className="text-xs text-slate-50">По умолчанию</span>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3 pr-20">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        address.isDefault ? 'bg-slate-50/20' : 'bg-slate-200'
                      }`}>
                        <Home className={`w-5 h-5 ${address.isDefault ? 'text-slate-50' : 'text-slate-700'} stroke-[2]`} />
                      </div>
                      <div className="flex-1">
                        <p className={`mb-1 ${address.isDefault ? 'text-slate-50' : 'text-slate-900'}`}>
                          {address.title}
                        </p>
                        <p className={`text-sm mb-1 ${address.isDefault ? 'text-emerald-100' : 'text-slate-600'}`}>
                          {address.address}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className={`w-3.5 h-3.5 ${address.isDefault ? 'text-emerald-100' : 'text-slate-500'}`} />
                          <span className={address.isDefault ? 'text-emerald-100' : 'text-slate-500'}>
                            {address.apartment}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] text-slate-50 rounded-2xl">
                <Home className="w-5 h-5 mr-2" />
                Добавить адрес
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {selectedSection === 'settings' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSection(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-slate-50 rounded-t-3xl p-6 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-slate-900">Настройки</h2>
                <button
                  onClick={() => setSelectedSection(null)}
                  className="w-10 h-10 rounded-xl bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Language Selection */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-5 h-5 text-slate-700" />
                    <h3 className="text-slate-900">Язык приложения</h3>
                  </div>
                  <div className="space-y-2">
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedLanguage(lang.code)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                          selectedLanguage === lang.code
                            ? 'bg-gradient-to-br from-[#3BB273] to-emerald-600 text-slate-50'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            selectedLanguage === lang.code ? 'bg-slate-50/20' : 'bg-slate-200'
                          }`}>
                            <Globe className={`w-5 h-5 ${
                              selectedLanguage === lang.code ? 'text-slate-50' : 'text-slate-700'
                            } stroke-[2]`} />
                          </div>
                          <div className="text-left">
                            <p className={selectedLanguage === lang.code ? 'text-slate-50' : 'text-slate-900'}>
                              {lang.nativeName}
                            </p>
                            <p className={`text-sm ${
                              selectedLanguage === lang.code ? 'text-emerald-100' : 'text-slate-600'
                            }`}>
                              {lang.name}
                            </p>
                          </div>
                        </div>
                        {selectedLanguage === lang.code && (
                          <div className="w-6 h-6 rounded-full bg-slate-50/20 backdrop-blur-sm flex items-center justify-center">
                            <Check className="w-4 h-4 text-slate-50 stroke-[3]" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Theme Selection */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    {isDarkMode ? (
                      <Moon className="w-5 h-5 text-slate-700" />
                    ) : (
                      <Sun className="w-5 h-5 text-slate-700" />
                    )}
                    <h3 className="text-slate-900">Тема оформления</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {/* Light Theme */}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsDarkMode(false)}
                      className={`relative overflow-hidden rounded-2xl p-4 transition-all ${
                        !isDarkMode
                          ? 'bg-gradient-to-br from-[#3BB273] to-emerald-600 text-slate-50 ring-2 ring-[#3BB273] ring-offset-2'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                          !isDarkMode ? 'bg-slate-50/20' : 'bg-slate-200'
                        }`}>
                          <Sun className={`w-8 h-8 ${
                            !isDarkMode ? 'text-slate-50' : 'text-slate-700'
                          } stroke-[2]`} />
                        </div>
                        <div className="text-center">
                          <p className={!isDarkMode ? 'text-slate-50' : 'text-slate-900'}>
                            Светлая
                          </p>
                        </div>
                        {!isDarkMode && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-50/20 backdrop-blur-sm flex items-center justify-center">
                            <Check className="w-4 h-4 text-slate-50 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </motion.button>

                    {/* Dark Theme */}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsDarkMode(true)}
                      className={`relative overflow-hidden rounded-2xl p-4 transition-all ${
                        isDarkMode
                          ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-slate-50 ring-2 ring-slate-900 ring-offset-2'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                          isDarkMode ? 'bg-slate-50/10' : 'bg-slate-200'
                        }`}>
                          <Moon className={`w-8 h-8 ${
                            isDarkMode ? 'text-slate-50' : 'text-slate-700'
                          } stroke-[2]`} />
                        </div>
                        <div className="text-center">
                          <p className={isDarkMode ? 'text-slate-50' : 'text-slate-900'}>
                            Темная
                          </p>
                        </div>
                        {isDarkMode && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-50/20 backdrop-blur-sm flex items-center justify-center">
                            <Check className="w-4 h-4 text-slate-50 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  </div>

                  <div className="mt-4 bg-amber-50 rounded-2xl p-4 border border-amber-200">
                    <div className="flex items-start gap-3">
                      <Sun className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="text-amber-900 mb-1">Автоматическая тема</p>
                        <p className="text-amber-700">
                          Тема будет меняться автоматически в зависимости от времени суток
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <Button
                  onClick={() => setSelectedSection(null)}
                  className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] text-slate-50 rounded-2xl"
                >
                  Сохранить изменения
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {selectedSection === 'logout' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSection(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-slate-50 rounded-3xl p-6 z-50"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center mb-4">
                  <LogOut className="w-10 h-10 text-red-600 stroke-[2]" />
                </div>

                <h2 className="text-slate-900 mb-2">Выйти из аккаунта?</h2>
                <p className="text-slate-600 mb-6">
                  Вы уверены, что хотите выйти из своего аккаунта?
                </p>

                <div className="flex gap-3 w-full">
                  <Button
                    onClick={() => setSelectedSection(null)}
                    disabled={isLoggingOut}
                    className="flex-1 h-14 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-2xl"
                  >
                    Отмена
                  </Button>
                  <Button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex-1 h-14 bg-red-600 hover:bg-red-700 text-slate-50 rounded-2xl"
                  >
                    {isLoggingOut ? 'Выход...' : 'Выйти'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}