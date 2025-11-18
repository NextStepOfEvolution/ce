export interface ParkingZone {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  capacity: number;
  availableSpots: number;
  pricePerHour: number;
  currency: string;
  isActive: boolean;
  description?: string;
  amenities?: string[];
  acceptedPaymentMethods?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ParkingSessionZone {
  id: string;
  name: string;
  description?: string;
  address?: string;
  districtId: string;
  latitude: number;
  longitude: number;
  hourlyRate: number;
  totalSpots: number;
  availableSpots: number;
  opensAt?: string;
  closesAt?: string;
  active: boolean;
  amenities?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ParkingSessionUser {
  id: string;
  phone: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  districtId?: string;
  balance?: number;
  language?: string;
  pushToken?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ParkingSession {
  id: string;
  userId: string;
  zoneId: string;
  vehicleNumber: string;
  startTime: string;
  endTime: string | null;
  pricePerHour?: number;
  totalCost: number;
  currency?: string;
  status: 'active' | 'completed' | 'cancelled';
  paymentId?: string | null;
  createdAt: string;
  updatedAt: string;
  zone?: ParkingSessionZone;
  user?: ParkingSessionUser;
}

export interface GetZonesParams {
  districtId?: string;
  activeOnly?: boolean;
  page?: number;
  limit?: number;
}

export interface GetNearbyZonesParams {
  latitude: number;
  longitude: number;
  radius?: number;
}

export interface StartSessionRequest {
  zoneId: string;
  vehicleNumber: string;
}

export interface ParkingZonesListResponse {
  success: boolean;
  data: ParkingZone[];
  total: number;
}

export interface ParkingZoneResponse {
  success: boolean;
  data: ParkingZone;
}

export interface ParkingSessionResponse {
  success: boolean;
  data: ParkingSession;
}

export interface ParkingSessionsListResponse {
  success: boolean;
  data: ParkingSession[];
  total: number;
}

export interface NullableParkingSessionResponse {
  success: boolean;
  data: ParkingSession | null;
}
