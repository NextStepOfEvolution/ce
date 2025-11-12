import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Building2 } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  const handleSendOTP = () => {
    if (phone.length >= 9) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 rounded-3xl bg-[#3BB273] flex items-center justify-center mb-4 shadow-lg">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-slate-900 mb-2">SmartCity Tashkent</h1>
          <p className="text-slate-600 text-center">
            Ваш единый сервис городских услуг
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl">
          {step === 'phone' ? (
            <>
              <h2 className="text-slate-900 mb-2">Вход</h2>
              <p className="text-slate-600 mb-6">
                Введите номер телефона
              </p>
              
              <div className="space-y-4">
                <div>
                  <Input
                    type="tel"
                    placeholder="+998 __ ___ __ __"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-14 rounded-2xl"
                  />
                </div>
                
                <Button
                  onClick={handleSendOTP}
                  className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl"
                  disabled={phone.length < 9}
                >
                  Получить код
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-slate-900 mb-2">Код подтверждения</h2>
              <p className="text-slate-600 mb-6">
                Введите код из SMS на номер {phone}
              </p>
              
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="______"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                    className="h-14 rounded-2xl text-center tracking-widest"
                    maxLength={6}
                  />
                </div>
                
                <Button
                  onClick={handleVerifyOTP}
                  className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl"
                  disabled={otp.length !== 6}
                >
                  Войти
                </Button>
                
                <button
                  onClick={() => setStep('phone')}
                  className="w-full text-slate-600 hover:text-slate-900"
                >
                  Изменить номер
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
