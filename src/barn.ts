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
 * Note: stallCount is NOT set here - stalls are configured on edge device during setup
 */
export interface CreateBarnRequest {
  name: string;
  address?: string;
  location?: { lat: number; lng: number };
  timezone?: string;
  packageType: PackageType;
}

/**
 * Barn update request
 */
export interface UpdateBarnRequest {
  name?: string;
  address?: string;
  location?: { lat: number; lng: number };
  timezone?: string;
  logoUrl?: string | null;
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
