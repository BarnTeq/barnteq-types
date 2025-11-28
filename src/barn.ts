/**
 * Barn Types - Barn configuration and metadata
 */

import type { BarnConfigHorse } from './horse';

/**
 * Package types
 */
export type PackageType = 'full_barn' | 'stall_only';

/**
 * WebSocket connection status
 */
export type WebSocketStatus = 'connected' | 'disconnected' | 'reconnecting';

/**
 * Health metrics stored in barn record
 */
export interface HealthMetrics {
  cpu: number;
  memory: number;
  disk: number;
  uptime: number;
}

/**
 * Health metrics sent in sync requests from edge
 */
export interface SyncHealthMetrics {
  cpuUsage?: number;
  memoryUsage?: number;
  diskUsage?: number;
  gpuUsage?: number;
  temperature?: number;
}

/**
 * Buffer status stored in barn record
 */
export interface BufferStatus {
  totalRecords: number;
  oldestRecord: string | null;
  newestRecord: string | null;
  sizeBytes: number;
  criticalEvents: number;
}

/**
 * Buffer status sent in sync requests from edge
 */
export interface SyncBufferStatus {
  eventsQueued?: number;
  mediaQueued?: number;
  oldestQueuedTimestamp?: string;
}

/**
 * Full barn record (cloud database)
 */
export interface Barn {
  id: string;
  name: string;
  address: string | null;
  location: { lat: number; lng: number } | null;
  timezone: string;
  ownerId: string;
  packageType: PackageType;

  // Stall configuration
  stallCount: number;
  barnCode: string;
  logoUrl: string | null;

  // Integration
  haUrl: string | null;
  apiKeyHash: string;
  adoptedAt: string | null;

  // Cloudflare Tunnel
  cfTunnelId: string | null;
  cfTunnelHostname: string | null;
  cfTunnelCreatedAt: string | null;

  // Sync tracking
  lastSyncAt: string | null;
  syncIntervalMinutes: number;

  // WebSocket tracking
  pusherSocketId: string | null;
  websocketStatus: WebSocketStatus;
  lastWebsocketConnect: string | null;
  lastWebsocketDisconnect: string | null;
  lastHeartbeat: string | null;

  // Health monitoring
  healthMetrics: HealthMetrics;
  bufferStatus: BufferStatus;

  // Version tracking
  horsesVersion: number;

  // Settings
  settings: Record<string, unknown>;

  createdAt: string;
  updatedAt: string;
}

/**
 * Barn creation request
 */
export interface CreateBarnRequest {
  name: string;
  address?: string;
  location?: { lat: number; lng: number };
  timezone?: string;
  packageType: PackageType;
  stallCount: number;
}

/**
 * Barn update request
 */
export interface UpdateBarnRequest {
  name?: string;
  address?: string;
  location?: { lat: number; lng: number };
  timezone?: string;
  settings?: Record<string, unknown>;
}

/**
 * Barn adoption request from edge device
 */
export interface AdoptBarnRequest {
  adoptionToken: string;
  haUrl?: string;
}

/**
 * Barn adoption response
 */
export interface AdoptBarnResponse {
  barnId: string;
  apiKey: string;
  barn: Barn;
  horses: Array<{ id: string; name: string }>;
  pusherConfig: {
    key: string;
    cluster: string;
    channel: string;
  };
}

// ============================================================
// Edge-to-Cloud Config Types (sent during adoption/sync)
// ============================================================

/**
 * Floorplan position coordinates
 */
export interface EdgeFloorplanPosition {
  x: number;
  y: number;
}

/**
 * Floorplan configuration
 */
export interface EdgeFloorplan {
  image: string;
  width: number;
  height: number;
}

/**
 * Camera configuration from edge
 */
export interface EdgeCamera {
  label: string;
  frigate_name: string;
  ip: string;
  device_id: string;
  floorplan?: EdgeFloorplanPosition;
}

/**
 * Sensor configuration from edge
 */
export interface EdgeSensor {
  id: string;
  index: number;
  label: string;
  device_id: string;
  zwave_node_id?: number;
  floorplan?: EdgeFloorplanPosition;
}

/**
 * Barn-level sensors
 */
export interface EdgeBarnSensors {
  temperature: EdgeSensor[];
  smoke: EdgeSensor[];
  co: EdgeSensor[];
  gps: EdgeSensor[];
}

/**
 * Stall-level sensors
 */
export interface EdgeStallSensors {
  gates: EdgeSensor[];
  water: EdgeSensor[];
  feed: EdgeSensor[];
  temperature: EdgeSensor[];
  smoke: EdgeSensor[];
  co: EdgeSensor[];
  gps: EdgeSensor[];
}

/**
 * Barn configuration from edge
 */
export interface EdgeBarn {
  name: string;
  stall_count: number;
  area_id: string;
  floorplan: EdgeFloorplan;
  cameras: EdgeCamera[];
  sensors: EdgeBarnSensors;
}

/**
 * Stall configuration from edge
 */
export interface EdgeStall {
  id: string;
  number: number;
  name: string;
  area_id: string;
  camera: EdgeCamera;
  sensors: EdgeStallSensors;
}

/**
 * Horse in edge config (cached from cloud)
 */
export interface EdgeConfigHorse {
  id: string;
  name: string;
  breed: string;
  color: string;
  age: number;
  stall_id: string;
  notes: string;
}

/**
 * Complete barn config sent FROM edge TO cloud
 */
export interface EdgeBarnConfig {
  version: string;
  created: string;
  last_modified: string;
  barn: EdgeBarn;
  stalls: EdgeStall[];
  horses: EdgeConfigHorse[];
}

// ============================================================
// Cloud-to-Edge Config Types (sent for display/sync)
// ============================================================

/**
 * Stall config sent to edge/dashboard
 */
export interface BarnConfigStall {
  id: string;
  name: string;
  sensors: {
    door?: string;
    motion?: string;
    temperature?: string;
  };
  camera?: string;
}

/**
 * Camera config sent to edge/dashboard
 */
export interface BarnConfigCamera {
  name: string;
  ip: string;
  enabled: boolean;
}

/**
 * Floorplan config sent to edge/dashboard
 */
export interface BarnConfigFloorplan {
  imageUrl: string;
  devices: Array<{
    deviceId: string;
    x: number;
    y: number;
  }>;
}

/**
 * Complete barn config sent FROM cloud TO edge/dashboard
 */
export interface BarnConfig {
  barn: {
    id?: string;
    name: string;
    timezone: string;
    address?: string;
  };
  stalls: BarnConfigStall[];
  horses: BarnConfigHorse[];
  cameras: BarnConfigCamera[];
  floorplan?: BarnConfigFloorplan;
  syncIntervalSeconds?: number;
}

/**
 * Config sync result
 */
export interface ConfigSyncResult {
  stallsCreated: number;
  stallsUpdated: number;
  devicesCreated: number;
  devicesUpdated: number;
}
