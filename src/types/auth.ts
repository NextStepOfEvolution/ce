export interface User {
  id: string;
  phone: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  balance: string;
}

export interface SendOtpRequest {
  phone: string;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
}
