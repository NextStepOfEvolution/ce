import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../config/api';
import { tokenStorage } from '../utils/tokenStorage';
import type {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  LogoutResponse,
  User,
} from '../types/auth';

export class AuthService {
  /**
   * Send OTP to phone number
   */
  static async sendOtp(phone: string): Promise<SendOtpResponse> {
    const payload: SendOtpRequest = { phone };
    const response = await axiosInstance.post<SendOtpResponse>(
      API_ENDPOINTS.AUTH.SEND_OTP,
      payload
    );
    return response.data;
  }

  /**
   * Verify OTP code and get auth tokens
   */
  static async verifyOtp(phone: string, otp: string): Promise<AuthResponse> {
    const payload: VerifyOtpRequest = { phone, otp };
    const response = await axiosInstance.post<AuthResponse>(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      payload
    );

    const { accessToken, refreshToken, user } = response.data;

    // Save tokens and user data to localStorage
    tokenStorage.setAccessToken(accessToken);
    tokenStorage.setRefreshToken(refreshToken);
    tokenStorage.setUser(user);

    return response.data;
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshToken(): Promise<RefreshTokenResponse> {
    const refreshToken = tokenStorage.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const payload: RefreshTokenRequest = { refreshToken };
    const response = await axiosInstance.post<RefreshTokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      payload
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // Update tokens in localStorage
    tokenStorage.setAccessToken(accessToken);
    tokenStorage.setRefreshToken(newRefreshToken);

    return response.data;
  }

  /**
   * Logout and clear all stored data
   */
  static async logout(): Promise<LogoutResponse> {
    try {
      const response = await axiosInstance.post<LogoutResponse>(
        API_ENDPOINTS.AUTH.LOGOUT
      );

      // Clear all tokens and user data
      tokenStorage.clearAll();

      return response.data;
    } catch (error) {
      // Even if the API call fails, clear local data
      tokenStorage.clearAll();
      throw error;
    }
  }

  /**
   * Get current user data
   */
  static async getMe(): Promise<User> {
    const response = await axiosInstance.get<User>(API_ENDPOINTS.AUTH.ME);

    // Update user data in localStorage
    tokenStorage.setUser(response.data);

    return response.data;
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return tokenStorage.hasTokens();
  }

  /**
   * Get current user from localStorage
   */
  static getCurrentUser(): User | null {
    return tokenStorage.getUser();
  }

  /**
   * Clear all auth data (useful for forced logout)
   */
  static clearAuthData(): void {
    tokenStorage.clearAll();
  }
}

export default AuthService;
