"use strict";
/**
 * BarnConfig Type Definitions
 *
 * Flat devices array structure with location field.
 * Device UIDs use {type}_{uuid8} format.
 * Unified DeviceBindings for all device types.
 *
 * @see DATA_ARCH.md for complete specification
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEVICE_ENTITY_CLASSES = void 0;
exports.isEdgeConfig = isEdgeConfig;
exports.isStallLocation = isStallLocation;
// ============================================================================
// TYPE GUARDS
// ============================================================================
/**
 * Check if a config is valid EdgeConfig format
 */
function isEdgeConfig(config) {
    if (typeof config !== 'object' || config === null) {
        return false;
    }
    const obj = config;
    return (obj.version === '1.0' &&
        Array.isArray(obj.devices) &&
        Array.isArray(obj.stalls) &&
        typeof obj.barn === 'object');
}
/**
 * Check if a device location is a stall (vs barn)
 */
function isStallLocation(location) {
    return location !== 'barn' && /^stall_\d+$/.test(location);
}
// ============================================================================
// DEVICE TYPE TO ENTITY CLASSES MAPPING
// ============================================================================
/**
 * Maps device types to the HA entity classes they track
 */
exports.DEVICE_ENTITY_CLASSES = {
    camera: ['occupancy', 'motion'],
    gate_sensor: ['door', 'battery'],
    water_sensor: ['level', 'battery'],
    feed_sensor: ['level', 'battery'],
    climate_sensor: ['temperature', 'humidity', 'battery'],
    motion_sensor: ['motion', 'battery'],
    gps_tracker: [],
};
