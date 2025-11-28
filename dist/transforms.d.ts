/**
 * Transform Utilities - Convert between different representations
 */
/**
 * Convert Unix timestamp (seconds) to ISO 8601 string
 */
export declare function unixToIso(unix: number): string;
/**
 * Convert ISO 8601 string to Unix timestamp (seconds)
 */
export declare function isoToUnix(iso: string): number;
/**
 * Convert Date object to ISO 8601 string
 */
export declare function dateToIso(date: Date): string;
/**
 * Convert ISO 8601 string to Date object
 */
export declare function isoToDate(iso: string): Date;
/**
 * Convert Unix timestamp (milliseconds) to ISO 8601 string
 */
export declare function unixMsToIso(unixMs: number): string;
/**
 * Convert ISO 8601 string to Unix timestamp (milliseconds)
 */
export declare function isoToUnixMs(iso: string): number;
/**
 * Convert minutes to seconds
 */
export declare function minutesToSeconds(minutes: number): number;
/**
 * Convert seconds to minutes
 */
export declare function secondsToMinutes(seconds: number): number;
/**
 * Convert hours to seconds
 */
export declare function hoursToSeconds(hours: number): number;
/**
 * Convert seconds to hours
 */
export declare function secondsToHours(seconds: number): number;
/**
 * Convert snake_case string to camelCase
 */
export declare function snakeToCamelString(str: string): string;
/**
 * Convert camelCase string to snake_case
 */
export declare function camelToSnakeString(str: string): string;
/**
 * Convert object keys from snake_case to camelCase
 */
export declare function snakeToCamel<T extends Record<string, unknown>>(obj: Record<string, unknown>): T;
/**
 * Convert object keys from camelCase to snake_case
 */
export declare function camelToSnake<T extends Record<string, unknown>>(obj: Record<string, unknown>): T;
/**
 * Calculate age in years from birth date
 */
export declare function birthDateToAge(birthDate: string): number;
/**
 * Estimate birth date from age (approximation - January 1st)
 */
export declare function ageToBirthDate(age: number): string;
/**
 * Transform edge device reading to cloud format
 */
export declare function transformReadingToCloud(reading: {
    edgeDeviceId: string;
    readingType: string;
    valueText?: string;
    valueNumeric?: number;
    valueBoolean?: boolean;
    valueJson?: Record<string, unknown>;
    timestamp: number;
}): {
    edgeDeviceId: string;
    readingType: string;
    valueText?: string;
    valueNumeric?: number;
    valueBoolean?: boolean;
    valueJson?: Record<string, unknown>;
    timestamp: string;
};
/**
 * Transform cloud device reading to edge format
 */
export declare function transformReadingToEdge(reading: {
    edgeDeviceId: string;
    readingType: string;
    valueText?: string;
    valueNumeric?: number;
    valueBoolean?: boolean;
    valueJson?: Record<string, unknown>;
    timestamp: string;
}): {
    edgeDeviceId: string;
    readingType: string;
    valueText?: string;
    valueNumeric?: number;
    valueBoolean?: boolean;
    valueJson?: Record<string, unknown>;
    timestamp: number;
};
