/**
 * Horse Types - Cloud is source of truth for horses
 */
/**
 * Horse sex options
 */
export type HorseSex = 'mare' | 'gelding' | 'stallion' | 'filly' | 'colt';
/**
 * Full horse record (cloud database)
 */
export interface Horse {
    id: string;
    barnId: string | null;
    ownerId: string | null;
    name: string;
    breed: string | null;
    color: string | null;
    sex: HorseSex | null;
    birthDate: string | null;
    ownerName: string | null;
    ownerContact: string | null;
    notes: string | null;
    profileImageUrl: string | null;
    vetContact: string | null;
    farrierContact: string | null;
    feedingInstructions: string | null;
    assignedStallId: string | null;
    settings: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
}
/**
 * Simplified horse for edge device sync
 * Edge receives only essential horse data
 */
export type EdgeHorse = Pick<Horse, 'id' | 'name' | 'breed' | 'color' | 'birthDate' | 'assignedStallId'>;
/**
 * Horse for barn config (sent to edge/dashboard)
 */
export interface BarnConfigHorse {
    id: string;
    name: string;
    assignedStall?: string;
}
/**
 * Horse creation request
 */
export interface CreateHorseRequest {
    name: string;
    breed?: string;
    color?: string;
    sex?: HorseSex;
    birthDate?: string;
    ownerName?: string;
    ownerContact?: string;
    notes?: string;
    profileImageUrl?: string;
    vetContact?: string;
    farrierContact?: string;
    feedingInstructions?: string;
    barnId?: string;
    assignedStallId?: string;
    settings?: Record<string, unknown>;
}
/**
 * Horse update request
 */
export interface UpdateHorseRequest {
    name?: string | null;
    breed?: string | null;
    color?: string | null;
    sex?: HorseSex | null;
    birthDate?: string | null;
    ownerName?: string | null;
    ownerContact?: string | null;
    notes?: string | null;
    profileImageUrl?: string | null;
    vetContact?: string | null;
    farrierContact?: string | null;
    feedingInstructions?: string | null;
    assignedStallId?: string | null;
    settings?: Record<string, unknown> | null;
}
/**
 * Assign horse to barn request
 */
export interface AssignHorseToBarnRequest {
    barnCode: string;
}
/**
 * Horses sync response for edge devices
 */
export interface HorsesSyncResponse {
    horses: Horse[];
    version: number;
}
/**
 * Horse with stall devices - used by dashboard to display horse's stall
 * Includes devices from the horse's assigned stall for camera/sensor display
 */
export interface HorseWithDevices extends Horse {
    stallDevices?: StallDevice[];
}
/**
 * Latest reading for a device sensor
 */
export interface DeviceLatestReading {
    readingType: string;
    valueNumeric?: number;
    valueText?: string;
    valueBoolean?: boolean;
    timestamp: string;
}
/**
 * Simplified device for horse stall display
 * Only includes fields needed by the dashboard StallCard
 */
export interface StallDevice {
    id: string;
    stallId: string | null;
    name: string;
    deviceType: DeviceType;
    status: DeviceStatus;
    edgeDeviceId?: string;
    metadata?: Record<string, unknown>;
    /** Latest sensor reading for this device (if available) */
    latestReading?: DeviceLatestReading;
}
import type { DeviceType, DeviceStatus } from './device';
