/**
 * BarnConfig Type Definitions
 *
 * Flat devices array structure with location field.
 * Device UIDs use {type}_{uuid8} format.
 * Unified DeviceBindings for all device types.
 *
 * @see DATA_ARCH.md for complete specification
 */
import type { DeviceType } from './device';
/**
 * Home Assistant device_class values that BarnTeq tracks
 */
export type HAEntityClass = 'door' | 'temperature' | 'humidity' | 'battery' | 'smoke' | 'carbon_monoxide' | 'motion' | 'occupancy';
/**
 * Device bindings - device type determines which fields are used.
 * All fields are optional; presence depends on device type.
 */
export interface DeviceBindings {
    /** Frigate camera name (cameras only) */
    frigate_name?: string;
    /** Camera IP address (cameras only) */
    ip?: string;
    /** Home Assistant device registry ID */
    ha_device_id?: string;
    /** Z-Wave node ID (Z-Wave sensors) */
    zwave_node_id?: number;
    /** Home Assistant entity selection map */
    ha_entities?: Partial<Record<HAEntityClass, string | null>>;
}
/**
 * Floorplan position coordinates (percentage-based, 0-100)
 */
export interface FloorplanPosition {
    x: number;
    y: number;
}
/**
 * Floorplan image configuration
 */
export interface FloorplanConfig {
    image: string;
    width: number;
    height: number;
}
/**
 * Device in flat array structure.
 * UID format: "{type}_{uuid8}" e.g., "camera_a1b2c3d4"
 */
export interface ConfigDevice {
    /** Unique device ID in format {type}_{uuid8} */
    uid: string;
    /** Device type */
    type: DeviceType;
    /** Human-readable device label */
    label: string;
    /** Location: "barn" or stall ID (e.g., "stall_1") */
    location: string;
    /** Position on floorplan */
    floorplan?: FloorplanPosition;
    /** Device-specific bindings */
    bindings: DeviceBindings;
}
/**
 * Stall bindings for Home Assistant integration
 */
export interface StallBindings {
    ha_area_id: string;
}
/**
 * Stall configuration
 */
export interface ConfigStall {
    /** Stall ID (e.g., "stall_1") */
    id: string;
    /** Stall number (1-indexed) */
    number: number;
    /** Stall display name */
    name: string;
    /** Position on barn floorplan */
    floorplan?: FloorplanPosition;
    /** Integration bindings */
    bindings: StallBindings;
}
/**
 * Barn bindings for Home Assistant integration
 */
export interface BarnBindings {
    ha_area_id: string;
}
/**
 * Barn-level configuration
 */
export interface ConfigBarn {
    name: string;
    stall_count: number;
    floorplan: FloorplanConfig;
    bindings: BarnBindings;
}
/**
 * Complete barn configuration from edge device
 */
export interface EdgeConfig {
    version: '1.0';
    created: string;
    last_modified: string;
    barn: ConfigBarn;
    stalls: ConfigStall[];
    devices: ConfigDevice[];
}
/**
 * Result from syncing config to cloud
 */
export interface ConfigSyncResult {
    stallsCreated: number;
    stallsUpdated: number;
    devicesCreated: number;
    devicesUpdated: number;
    /** Edge stall ID → cloud stall UUID */
    stallMappings: Record<string, string>;
    /** Cloud device UUID → edge device UID */
    deviceMappings: Record<string, string>;
}
/**
 * Check if a config is valid EdgeConfig format
 */
export declare function isEdgeConfig(config: unknown): config is EdgeConfig;
/**
 * Check if a device location is a stall (vs barn)
 */
export declare function isStallLocation(location: string): boolean;
/**
 * Maps device types to the HA entity classes they track
 */
export declare const DEVICE_ENTITY_CLASSES: Record<DeviceType, HAEntityClass[]>;
