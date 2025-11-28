/**
 * Command Types - Commands sent from cloud to edge devices
 */
/**
 * Command actions supported by edge devices
 */
export type CommandAction = 'force_sync' | 'adjust_sync_interval' | 'start_webrtc_polling' | 'update_config' | 'clear_cache' | 'emergency_stop';
/**
 * Command status
 */
export type CommandStatus = 'pending' | 'sent' | 'acknowledged' | 'failed';
/**
 * Command priority
 */
export type CommandPriority = 'normal' | 'high' | 'urgent';
/**
 * Command delivery method
 */
export type CommandDeliveryMethod = 'websocket' | 'queued';
/**
 * Base command interface - what edge devices receive and process
 */
export interface Command {
    id: string;
    barnId: string;
    action: CommandAction;
    data: Record<string, unknown>;
    status: CommandStatus;
    createdAt: string;
}
/**
 * Extended command interface - full tracking info stored in cloud
 */
export interface CloudCommand extends Command {
    priority: CommandPriority;
    deliveryMethod: CommandDeliveryMethod;
    sentAt: string | null;
    acknowledgedAt: string | null;
    errorMessage: string | null;
    expiresAt: string;
    idempotencyKey: string | null;
}
/**
 * Command data payloads for each action
 */
export interface CommandPayloads {
    force_sync: {
        priority?: 'all' | 'critical';
        includeMedia?: boolean;
    };
    adjust_sync_interval: {
        intervalMinutes: number;
        durationMinutes?: number;
    };
    start_webrtc_polling: {
        durationSeconds: number;
        reason: string;
    };
    update_config: {
        setting: string;
        value: unknown;
    };
    clear_cache: {
        cacheType: 'horses' | 'media' | 'all';
    };
    emergency_stop: {
        reason: string;
        components?: string[];
    };
}
/**
 * Command creation request
 */
export interface CreateCommandRequest {
    barnId: string;
    action: CommandAction;
    data: Record<string, unknown>;
    priority?: CommandPriority;
    idempotencyKey?: string;
}
/**
 * Command acknowledgment from edge device
 */
export interface AcknowledgeCommandRequest {
    success: boolean;
    error?: string;
    result?: Record<string, unknown>;
}
/**
 * Command send response
 */
export interface SendCommandResponse {
    commandId: string;
    delivery: CommandDeliveryMethod;
    estimatedLatency?: string;
    barnStatus?: 'online' | 'offline';
    note?: string;
}
