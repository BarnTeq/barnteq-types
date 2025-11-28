"use strict";
/**
 * Transform Utilities - Convert between different representations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.unixToIso = unixToIso;
exports.isoToUnix = isoToUnix;
exports.dateToIso = dateToIso;
exports.isoToDate = isoToDate;
exports.unixMsToIso = unixMsToIso;
exports.isoToUnixMs = isoToUnixMs;
exports.minutesToSeconds = minutesToSeconds;
exports.secondsToMinutes = secondsToMinutes;
exports.hoursToSeconds = hoursToSeconds;
exports.secondsToHours = secondsToHours;
exports.snakeToCamelString = snakeToCamelString;
exports.camelToSnakeString = camelToSnakeString;
exports.snakeToCamel = snakeToCamel;
exports.camelToSnake = camelToSnake;
exports.birthDateToAge = birthDateToAge;
exports.ageToBirthDate = ageToBirthDate;
exports.transformReadingToCloud = transformReadingToCloud;
exports.transformReadingToEdge = transformReadingToEdge;
// ============================================================
// Timestamp Conversions
// ============================================================
/**
 * Convert Unix timestamp (seconds) to ISO 8601 string
 */
function unixToIso(unix) {
    return new Date(unix * 1000).toISOString();
}
/**
 * Convert ISO 8601 string to Unix timestamp (seconds)
 */
function isoToUnix(iso) {
    return Math.floor(new Date(iso).getTime() / 1000);
}
/**
 * Convert Date object to ISO 8601 string
 */
function dateToIso(date) {
    return date.toISOString();
}
/**
 * Convert ISO 8601 string to Date object
 */
function isoToDate(iso) {
    return new Date(iso);
}
/**
 * Convert Unix timestamp (milliseconds) to ISO 8601 string
 */
function unixMsToIso(unixMs) {
    return new Date(unixMs).toISOString();
}
/**
 * Convert ISO 8601 string to Unix timestamp (milliseconds)
 */
function isoToUnixMs(iso) {
    return new Date(iso).getTime();
}
// ============================================================
// Time Unit Conversions
// ============================================================
/**
 * Convert minutes to seconds
 */
function minutesToSeconds(minutes) {
    return minutes * 60;
}
/**
 * Convert seconds to minutes
 */
function secondsToMinutes(seconds) {
    return Math.floor(seconds / 60);
}
/**
 * Convert hours to seconds
 */
function hoursToSeconds(hours) {
    return hours * 3600;
}
/**
 * Convert seconds to hours
 */
function secondsToHours(seconds) {
    return Math.floor(seconds / 3600);
}
// ============================================================
// Case Conversions
// ============================================================
/**
 * Convert snake_case string to camelCase
 */
function snakeToCamelString(str) {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
/**
 * Convert camelCase string to snake_case
 */
function camelToSnakeString(str) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
/**
 * Convert object keys from snake_case to camelCase
 */
function snakeToCamel(obj) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        const camelKey = snakeToCamelString(key);
        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
            result[camelKey] = snakeToCamel(value);
        }
        else if (Array.isArray(value)) {
            result[camelKey] = value.map((item) => typeof item === 'object' && item !== null
                ? snakeToCamel(item)
                : item);
        }
        else {
            result[camelKey] = value;
        }
    }
    return result;
}
/**
 * Convert object keys from camelCase to snake_case
 */
function camelToSnake(obj) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        const snakeKey = camelToSnakeString(key);
        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
            result[snakeKey] = camelToSnake(value);
        }
        else if (Array.isArray(value)) {
            result[snakeKey] = value.map((item) => typeof item === 'object' && item !== null
                ? camelToSnake(item)
                : item);
        }
        else {
            result[snakeKey] = value;
        }
    }
    return result;
}
// ============================================================
// Age/BirthDate Conversions
// ============================================================
/**
 * Calculate age in years from birth date
 */
function birthDateToAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}
/**
 * Estimate birth date from age (approximation - January 1st)
 */
function ageToBirthDate(age) {
    const year = new Date().getFullYear() - age;
    return `${year}-01-01`;
}
// ============================================================
// Device Reading Transforms
// ============================================================
/**
 * Transform edge device reading to cloud format
 */
function transformReadingToCloud(reading) {
    return {
        ...reading,
        timestamp: unixToIso(reading.timestamp),
    };
}
/**
 * Transform cloud device reading to edge format
 */
function transformReadingToEdge(reading) {
    return {
        ...reading,
        timestamp: isoToUnix(reading.timestamp),
    };
}
