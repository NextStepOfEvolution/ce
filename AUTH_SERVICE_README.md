# Auth Service Documentation

Сервис авторизации для SmartCity Tashkent приложения с поддержкой OTP авторизации.

## Структура файлов

```
src/
├── config/
│   └── api.ts                    # API конфигурация и эндпоинты
├── types/
│   └── auth.ts                   # TypeScript типы для авторизации
├── utils/
│   └── tokenStorage.ts           # Утилиты для работы с токенами в localStorage
└── services/
    ├── axiosInstance.ts          # Настроенный axios с interceptors
    ├── authService.ts            # Основной сервис авторизации
    └── index.ts                  # Экспорты сервисов
```

## Установка

1. Установите зависимости:
```bash
npm install axios
```

2. Настройте переменные окружения в `.env`:
```env
VITE_API_BASE_URL=http://your-api-url.com
```

## API Эндпоинты

### 1. Отправка OTP кода

**POST** `/api/v1/auth/send-otp`

```typescript
import { AuthService } from './services';

try {
  const response = await AuthService.sendOtp('+998901234567');
  console.log(response); // { success: true, message: "OTP sent" }
} catch (error) {
  console.error('Ошибка отправки OTP:', error);
}
```

### 2. Верификация OTP кода

**POST** `/api/v1/auth/verify-otp`

```typescript
import { AuthService } from './services';

try {
  const response = await AuthService.verifyOtp('+998901234567', '398310');
  console.log(response);
  // {
  //   success: true,
  //   user: { id: "...", phone: "+998901234567", ... },
  //   accessToken: "eyJ...",
  //   refreshToken: "eyJ...",
  //   expiresIn: "7d"
  // }

  // Токены автоматически сохраняются в localStorage
} catch (error) {
  console.error('Ошибка верификации OTP:', error);
}
```

### 3. Обновление токена

**POST** `/api/v1/auth/refresh`

```typescript
import { AuthService } from './services';

try {
  const response = await AuthService.refreshToken();
  console.log(response);
  // {
  //   accessToken: "eyJ...",
  //   refreshToken: "eyJ...",
  //   expiresIn: "7d"
  // }

  // Новые токены автоматически сохраняются
} catch (error) {
  console.error('Ошибка обновления токена:', error);
}
```

### 4. Выход из системы

**POST** `/api/v1/auth/logout`

```typescript
import { AuthService } from './services';

try {
  await AuthService.logout();
  // Все токены и данные пользователя удалены из localStorage
} catch (error) {
  console.error('Ошибка выхода:', error);
}
```

### 5. Получение данных пользователя

**GET** `/api/v1/auth/me`

```typescript
import { AuthService } from './services';

try {
  const user = await AuthService.getMe();
  console.log(user);
  // {
  //   id: "cf6d97e0-0458-4128-b3c3-73bea9e60d87",
  //   phone: "+998901234567",
  //   firstName: null,
  //   lastName: null,
  //   email: null,
  //   balance: "0.00"
  // }
} catch (error) {
  console.error('Ошибка получения данных:', error);
}
```

## Вспомогательные методы

### Проверка авторизации

```typescript
import { AuthService } from './services';

const isAuth = AuthService.isAuthenticated();
console.log(isAuth); // true/false
```

### Получение текущего пользователя из localStorage

```typescript
import { AuthService } from './services';

const user = AuthService.getCurrentUser();
console.log(user); // User object or null
```

### Очистка данных авторизации

```typescript
import { AuthService } from './services';

AuthService.clearAuthData();
// Все токены и данные пользователя удалены
```

## Автоматическое обновление токенов

Axios interceptor автоматически обрабатывает истекшие токены:

1. Когда API возвращает 401 ошибку, interceptor автоматически пытается обновить токен
2. Если обновление успешно, оригинальный запрос повторяется с новым токеном
3. Если обновление не удалось, все данные очищаются и пользователь должен войти снова

Вам не нужно вручную обрабатывать истечение токенов!

## Пример использования в React компоненте

```typescript
import { useState } from 'react';
import { AuthService } from './services';

function LoginComponent() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOTP = async () => {
    try {
      setLoading(true);
      setError(null);
      await AuthService.sendOtp(phone);
      setStep('otp');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка отправки кода');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await AuthService.verifyOtp(phone, otp);
      console.log('Успешный вход:', response.user);
      // Переход на главную страницу
    } catch (err: any) {
      setError(err.response?.data?.message || 'Неверный код');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {step === 'phone' ? (
        <>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+998 __ ___ __ __"
          />
          <button onClick={handleSendOTP} disabled={loading}>
            {loading ? 'Отправка...' : 'Получить код'}
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Введите код"
            maxLength={6}
          />
          <button onClick={handleVerifyOTP} disabled={loading}>
            {loading ? 'Проверка...' : 'Войти'}
          </button>
        </>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
```

## Обработка ошибок

Все методы могут выбросить ошибку. Используйте try/catch для обработки:

```typescript
try {
  await AuthService.sendOtp(phone);
} catch (error: any) {
  if (error.response) {
    // Ошибка от сервера
    console.error('Статус:', error.response.status);
    console.error('Сообщение:', error.response.data.message);
  } else if (error.request) {
    // Запрос был отправлен, но ответа нет
    console.error('Нет ответа от сервера');
  } else {
    // Другая ошибка
    console.error('Ошибка:', error.message);
  }
}
```

## Token Storage API

Прямой доступ к localStorage (используйте только если нужно):

```typescript
import { tokenStorage } from './utils/tokenStorage';

// Получить токены
const accessToken = tokenStorage.getAccessToken();
const refreshToken = tokenStorage.getRefreshToken();

// Получить пользователя
const user = tokenStorage.getUser();

// Установить токены (обычно не нужно, AuthService делает это автоматически)
tokenStorage.setAccessToken('token');
tokenStorage.setRefreshToken('token');

// Проверить наличие токенов
const hasTokens = tokenStorage.hasTokens();

// Очистить все данные
tokenStorage.clearAll();
```

## TypeScript типы

Все типы доступны для импорта:

```typescript
import type {
  User,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  LogoutResponse,
  ApiError,
} from './types/auth';
```

## Примечания

1. Все номера телефонов должны начинаться с `+`
2. OTP код должен состоять из 6 цифр
3. Токены автоматически добавляются к каждому запросу через axios interceptor
4. При истечении access token, автоматически происходит попытка обновления
5. Все данные хранятся в localStorage браузера
