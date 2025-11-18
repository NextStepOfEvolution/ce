import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Building2, AlertCircle, Loader2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AuthService } from "../services";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [phone, setPhone] = useState("+998909751473");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Format phone number as user types
  const handlePhoneChange = (value: string) => {
    // Remove all non-digit characters except +
    let cleaned = value.replace(/[^\d+]/g, "");

    // Ensure it starts with +
    if (!cleaned.startsWith("+")) {
      cleaned = "+" + cleaned.replace(/\+/g, "");
    }

    setPhone(cleaned);
  };

  const handleSendOTP = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate phone number format
      if (!phone.startsWith("+")) {
        setError("Номер должен начинаться с +");
        return;
      }

      if (phone.length < 12) {
        setError("Введите полный номер телефона");
        return;
      }

      await AuthService.sendOtp(phone);
      setStep("otp");
    } catch (err: any) {
      console.error("Send OTP error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Ошибка отправки кода. Попробуйте снова.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      setError(null);

      if (otp.length !== 6) {
        setError("Код должен состоять из 6 цифр");
        return;
      }

      const response = await AuthService.verifyOtp(phone, otp);

      console.log("Login successful:", response.user);

      // Call onLogin to proceed to main app
      onLogin();
    } catch (err: any) {
      console.error("Verify OTP error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Неверный код. Попробуйте снова.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      setError(null);
      await AuthService.sendOtp(phone);
      setOtp("");
      setError(null);
    } catch (err: any) {
      console.error("Resend OTP error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Ошибка повторной отправки кода";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1587702068694-a909ef4aa346?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
        alt="Map"
        className="w-screen h-screen object-cover absolute -z-10"
      />
      <div className="w-full max-w-sm z-10">
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col items-center mb-12">
            <div className="w-20 h-20 rounded-3xl bg-[#3BB273] flex items-center justify-center mb-4 shadow-lg">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-slate-900 mb-2">
              SmartCity Tashkent
            </h1>
            <p className="text-slate-600 text-center">
              Ваш единый сервис городских услуг
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {step === "phone" ? (
            <>
              <h2 className="text-slate-900 mb-2">Вход</h2>
              <p className="text-slate-600 mb-6">
                Введите номер телефона
              </p>

              <div className="space-y-4">
                <div>
                  <Input
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="h-14 rounded-2xl"
                    disabled={loading}
                  />
                </div>

                <Button
                  onClick={handleSendOTP}
                  className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl"
                  disabled={phone.length < 12 || loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    "Получить код"
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-slate-900 mb-2">
                Код подтверждения
              </h2>
              <p className="text-slate-600 mb-6">
                Введите код из SMS на номер {phone}
              </p>

              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="______"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setOtp(value.slice(0, 6));
                      setError(null);
                    }}
                    className="h-14 rounded-2xl text-center tracking-widest text-2xl font-semibold"
                    maxLength={6}
                    disabled={loading}
                    autoFocus
                  />
                </div>

                <Button
                  onClick={handleVerifyOTP}
                  className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl"
                  disabled={otp.length !== 6 || loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Проверка...
                    </>
                  ) : (
                    "Войти"
                  )}
                </Button>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setStep("phone");
                      setOtp("");
                      setError(null);
                    }}
                    className="flex-1 text-slate-600 hover:text-slate-900 py-2"
                    disabled={loading}
                  >
                    Изменить номер
                  </button>
                  <button
                    onClick={handleResendOTP}
                    className="flex-1 text-[#3BB273] hover:text-[#2ea563] py-2"
                    disabled={loading}
                  >
                    {loading ? "Отправка..." : "Отправить снова"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}