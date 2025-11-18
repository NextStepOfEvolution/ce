// В режиме разработки используем пустую строку для прокси через Vite dev server
// В продакшене установите VITE_API_BASE_URL в полный URL
export const API_BASE_URL = import.meta.env.MODE === 'production'
  ? (import.meta.env.VITE_API_BASE_URL || '')
  : '';

export const API_ENDPOINTS = {
  AUTH: {
    SEND_OTP: '/api/v1/auth/send-otp',
    VERIFY_OTP: '/api/v1/auth/verify-otp',
    REFRESH: '/api/v1/auth/refresh',
    LOGOUT: '/api/v1/auth/logout',
    ME: '/api/v1/auth/me',
  },
  PARKINGS: {
    ZONES: '/api/v1/parkings/zones',
    ZONES_NEARBY: '/api/v1/parkings/zones/nearby',
    ZONE_BY_ID: (id: string) => `/api/v1/parkings/zones/${id}`,
    START_SESSION: '/api/v1/parkings/sessions/start',
    ACTIVE_SESSION: '/api/v1/parkings/sessions/active',
    SESSION_HISTORY: '/api/v1/parkings/sessions/history',
    END_SESSION: (id: string) => `/api/v1/parkings/sessions/${id}/end`,
    SESSION_BY_ID: (id: string) => `/api/v1/parkings/sessions/${id}`,
  },
} as const;
