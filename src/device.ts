/**
 * Device Types - Sensors, cameras, and device readings
 */

/**
 * Device types supported by the system
 */
export type DeviceType =
  | 'camera'
  | 'gate_sensor'
  | 'water_sensor'
  | 'gps_tracker'
  | 'climate_sensor'
  | 'motion_sensor';

/**
 * Device connection status
 */
export type DeviceStatus = 'online' | 'offline' | 'unknown';

/**
 * Types of readings devices can report
 */
export type ReadingType =
  | 'state'
  | 'level'
  | 'temperature'
  | 'humidity'
  | 'battery'
  | 'location'
  | 'motion'
  | 'motion_detected'
  | 'online_status'
  | 'smoke'
  | 'co'
  | 'water_level'
  | 'feed_level';

/**
 * Device record (cloud database schema)
 */
export interface Device {
  id: string;
  barnId: string;
  stallId: string | null;
  name: string;
  deviceType: DeviceType;
  description?: string;
  edgeDeviceId?: string;
  status: DeviceStatus;
  lastSeen?: string;
  batteryLevel?: number;
  signalStrength?: number;
  floorplanX?: number;
  floorplanY?: number;
  isPlaceholder: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Device reading - unified type using ISO strings for timestamps
 *
 * Note: Edge uses Unix timestamps internally, cloud uses Date objects.
 * This shared type uses ISO 8601 strings for portability.
 * Use transform utilities for conversion.
 */
export interface DeviceReading {
  id?: string;
  edgeDeviceId: string;
  deviceId?: string;
  barnId?: string;
  readingType: ReadingType;
  valueText?: string;
  valueNumeric?: number;
  valueBoolean?: boolean;
  valueJson?: Record<string, unknown>;
  timestamp: string; // ISO 8601
  createdAt?: string; // ISO 8601
}

/**
 * Query parameters for device readings
 */
export interface DeviceReadingQuery {
  deviceId: string;
  readingType?: ReadingType;
  startTime?: string;
  endTime?: string;
  limit?: number;
}

/**
 * Critical event sent from edge for immediate notification
 */
export interface CriticalEvent {
  edgeDeviceId: string;
  sensorType: string;
  readingType: string;
  value: string | number | boolean;
  timestamp: string; // ISO 8601
}

/**
 * Mapping from edge sensor type to cloud device type
 */
export const EDGE_SENSOR_TO_DEVICE_TYPE: Record<string, DeviceType> = {
  gates: 'gate_sensor',
  water: 'water_sensor',
  feed: 'water_sensor',
  temperature: 'climate_sensor',
  smoke: 'climate_sensor',
  co: 'climate_sensor',
  gps: 'gps_tracker',
  camera: 'camera',
};
