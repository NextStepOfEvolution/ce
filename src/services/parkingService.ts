import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../config/api';
import type {
  ParkingZone,
  ParkingSession,
  GetZonesParams,
  GetNearbyZonesParams,
  StartSessionRequest,
  ParkingZonesListResponse,
  ParkingZoneResponse,
  ParkingSessionResponse,
  ParkingSessionsListResponse,
  NullableParkingSessionResponse,
} from '../types/parking';

export class ParkingService {
  /**
   * Get all parking zones with optional filters
   */
  static async getZones(params?: GetZonesParams): Promise<ParkingZone[]> {
    const response = await axiosInstance.get<ParkingZonesListResponse>(
      API_ENDPOINTS.PARKINGS.ZONES,
      { params }
    );
    return response.data.data;
  }

  /**
   * Get nearby parking zones
   */
  static async getNearbyZones(params: GetNearbyZonesParams): Promise<ParkingZone[]> {
    const response = await axiosInstance.get<ParkingZonesListResponse>(
      API_ENDPOINTS.PARKINGS.ZONES_NEARBY,
      { params }
    );
    return response.data.data;
  }

  /**
   * Get parking zone by ID
   */
  static async getZoneById(id: string): Promise<ParkingZone> {
    const response = await axiosInstance.get<ParkingZoneResponse>(
      API_ENDPOINTS.PARKINGS.ZONE_BY_ID(id)
    );
    return response.data.data;
  }

  /**
   * Start a new parking session
   */
  static async startSession(zoneId: string, vehicleNumber: string): Promise<ParkingSession> {
    const payload: StartSessionRequest = { zoneId, vehicleNumber };
    const response = await axiosInstance.post<ParkingSessionResponse>(
      API_ENDPOINTS.PARKINGS.START_SESSION,
      payload
    );
    return response.data.data;
  }

  /**
   * Get active parking session
   */
  static async getActiveSession(): Promise<ParkingSession | null> {
    const response = await axiosInstance.get<NullableParkingSessionResponse>(
      API_ENDPOINTS.PARKINGS.ACTIVE_SESSION
    );
    return response.data.data;
  }

  /**
   * Get parking session history
   */
  static async getSessionHistory(): Promise<ParkingSession[]> {
    const response = await axiosInstance.get<ParkingSessionsListResponse>(
      API_ENDPOINTS.PARKINGS.SESSION_HISTORY
    );
    return response.data.data;
  }

  /**
   * End a parking session
   */
  static async endSession(id: string): Promise<ParkingSession> {
    const response = await axiosInstance.post<ParkingSessionResponse>(
      API_ENDPOINTS.PARKINGS.END_SESSION(id)
    );
    return response.data.data;
  }

  /**
   * Get parking session by ID
   */
  static async getSessionById(id: string): Promise<ParkingSession> {
    const response = await axiosInstance.get<ParkingSessionResponse>(
      API_ENDPOINTS.PARKINGS.SESSION_BY_ID(id)
    );
    return response.data.data;
  }
}

export default ParkingService;
