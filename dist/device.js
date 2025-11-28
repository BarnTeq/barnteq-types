"use strict";
/**
 * Device Types - Sensors, cameras, and device readings
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EDGE_SENSOR_TO_DEVICE_TYPE = void 0;
/**
 * Mapping from edge sensor type to cloud device type
 */
exports.EDGE_SENSOR_TO_DEVICE_TYPE = {
    gates: 'gate_sensor',
    water: 'water_sensor',
    feed: 'water_sensor',
    temperature: 'climate_sensor',
    smoke: 'climate_sensor',
    co: 'climate_sensor',
    gps: 'gps_tracker',
    camera: 'camera',
};
