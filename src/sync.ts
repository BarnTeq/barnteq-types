/**
 * Sync Types - Edge device synchronization
 */

import type { Command } from './command';
import type { SyncHealthMetrics, SyncBufferStatus } from './barn';

/**
 * Event types from edge device
 */
export type EventLogType =
  | 'detection'
  | 'health_alert'
  | 'sensor_reading'
  | 'camera_detection'
  | 'system_event'
  | 'camera_offline'
  | 'camera_online';

/**
 * Event log from edge device
 */
export interface EventLog {
  eventType: EventLogType;
  sequenceNumber: number;
  timestamp: string; // ISO 8601
  horseId?: string;
  cameraId?: string;
  sensorId?: string;
  data?: Record<string, unknown>;
  mediaUrl?: string;
}

/**
 * Sync request from edge device
 */
export interface SyncRequest {
  healthMetrics?: SyncHealthMetrics;
  bufferStatus?: SyncBufferStatus;
  events?: EventLog[];
}

/**
 * Sync response to edge device
 */
export interface SyncResponse {
  success: boolean;
  timestamp: string;
  eventsProcessed: number;
  pendingCommands: Command[];
}

/**
 * Extended sync response with commands (legacy format)
 */
export interface SyncResponseLegacy {
  success: boolean;
  timestamp: string;
  eventsProcessed: number;
  pendingCommands: Array<{
    id: string;
    action: string;
    payload: Record<string, unknown>;
    idempotency_key?: string;
  }>;
}

/**
 * Sync payload from edge device (extended format)
 */
export interface SyncPayload {
  type: 'heartbeat' | 'data' | 'recovery';
  timestamp: string;
  sequenceNumber: number;
  chunkNumber?: number;
  totalChunks?: number;

  health?: SyncHealthMetrics;
  bufferStatus?: SyncBufferStatus;

  horses?: Array<unknown>;
  stalls?: Array<unknown>;
  sensors?: Array<unknown>;
  events?: Array<unknown>;
}

/**
 * Sync instructions from cloud to edge
 */
export interface SyncInstructions {
  chunkSize: number;
  priorityFilter: 'critical' | 'all' | null;
  delayBetweenChunks: number;
  syncIntervalMinutes: number;
}

/**
 * Extended sync response for recovery mode
 */
export interface SyncResponseExtended {
  syncId: string;
  syncMode: 'normal' | 'recovery';
  instructions: SyncInstructions;
  commands?: Array<{
    id: string;
    action: string;
    data: Record<string, unknown>;
  }>;
}

/**
 * Sync status for tracking
 */
export interface SyncStatus {
  syncId: string;
  barnId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  syncType: 'heartbeat' | 'data' | 'recovery';
  sequenceNumber: number;
  chunkNumber: number | null;
  totalChunks: number | null;

  receivedAt: string;
  processingStartedAt: string | null;
  completedAt: string | null;

  recordsProcessed: {
    horses?: number;
    stalls?: number;
    sensors?: number;
    events?: number;
  };
  errorMessage: string | null;
  retryCount: number;

  createdAt: string;
  updatedAt: string;
}

/**
 * Sync status response
 */
export interface SyncStatusResponse {
  syncId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  processedAt?: string;
  stats?: {
    horsesProcessed: number;
    stallsProcessed: number;
    sensorsProcessed: number;
    eventsProcessed: number;
  };
  commands?: Array<{
    id: string;
    action: string;
    data: Record<string, unknown>;
  }>;
  error?: string;
}

/**
 * Heartbeat request from edge device
 */
export interface HeartbeatRequest {
  websocketStatus: 'connected' | 'disconnected' | 'connecting' | 'error';
  uptime: number;
  eventQueueSize: number;
  memoryUsage?: number;
  cpuUsage?: number;
  diskUsage?: number;
  haConnected?: boolean;
  frigateConnected?: boolean;
}

/**
 * Heartbeat response
 */
export interface HeartbeatResponse {
  success: boolean;
}
