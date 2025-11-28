/**
 * Transform Utilities - Convert between different representations
 */

// ============================================================
// Timestamp Conversions
// ============================================================

/**
 * Convert Unix timestamp (seconds) to ISO 8601 string
 */
export function unixToIso(unix: number): string {
  return new Date(unix * 1000).toISOString();
}

/**
 * Convert ISO 8601 string to Unix timestamp (seconds)
 */
export function isoToUnix(iso: string): number {
  return Math.floor(new Date(iso).getTime() / 1000);
}

/**
 * Convert Date object to ISO 8601 string
 */
export function dateToIso(date: Date): string {
  return date.toISOString();
}

/**
 * Convert ISO 8601 string to Date object
 */
export function isoToDate(iso: string): Date {
  return new Date(iso);
}

/**
 * Convert Unix timestamp (milliseconds) to ISO 8601 string
 */
export function unixMsToIso(unixMs: number): string {
  return new Date(unixMs).toISOString();
}

/**
 * Convert ISO 8601 string to Unix timestamp (milliseconds)
 */
export function isoToUnixMs(iso: string): number {
  return new Date(iso).getTime();
}

// ============================================================
// Time Unit Conversions
// ============================================================

/**
 * Convert minutes to seconds
 */
export function minutesToSeconds(minutes: number): number {
  return minutes * 60;
}

/**
 * Convert seconds to minutes
 */
export function secondsToMinutes(seconds: number): number {
  return Math.floor(seconds / 60);
}

/**
 * Convert hours to seconds
 */
export function hoursToSeconds(hours: number): number {
  return hours * 3600;
}

/**
 * Convert seconds to hours
 */
export function secondsToHours(seconds: number): number {
  return Math.floor(seconds / 3600);
}

// ============================================================
// Case Conversions
// ============================================================

/**
 * Convert snake_case string to camelCase
 */
export function snakeToCamelString(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Convert camelCase string to snake_case
 */
export function camelToSnakeString(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Convert object keys from snake_case to camelCase
 */
export function snakeToCamel<T extends Record<string, unknown>>(
  obj: Record<string, unknown>
): T {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const camelKey = snakeToCamelString(key);

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      result[camelKey] = snakeToCamel(value as Record<string, unknown>);
    } else if (Array.isArray(value)) {
      result[camelKey] = value.map((item) =>
        typeof item === 'object' && item !== null
          ? snakeToCamel(item as Record<string, unknown>)
          : item
      );
    } else {
      result[camelKey] = value;
    }
  }

  return result as T;
}

/**
 * Convert object keys from camelCase to snake_case
 */
export function camelToSnake<T extends Record<string, unknown>>(
  obj: Record<string, unknown>
): T {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = camelToSnakeString(key);

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      result[snakeKey] = camelToSnake(value as Record<string, unknown>);
    } else if (Array.isArray(value)) {
      result[snakeKey] = value.map((item) =>
        typeof item === 'object' && item !== null
          ? camelToSnake(item as Record<string, unknown>)
          : item
      );
    } else {
      result[snakeKey] = value;
    }
  }

  return result as T;
}

// ============================================================
// Age/BirthDate Conversions
// ============================================================

/**
 * Calculate age in years from birth date
 */
export function birthDateToAge(birthDate: string): number {
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
export function ageToBirthDate(age: number): string {
  const year = new Date().getFullYear() - age;
  return `${year}-01-01`;
}

// ============================================================
// Device Reading Transforms
// ============================================================

/**
 * Transform edge device reading to cloud format
 */
export function transformReadingToCloud(reading: {
  edgeDeviceId: string;
  readingType: string;
  valueText?: string;
  valueNumeric?: number;
  valueBoolean?: boolean;
  valueJson?: Record<string, unknown>;
  timestamp: number; // Unix seconds
}): {
  edgeDeviceId: string;
  readingType: string;
  valueText?: string;
  valueNumeric?: number;
  valueBoolean?: boolean;
  valueJson?: Record<string, unknown>;
  timestamp: string;
} {
  return {
    ...reading,
    timestamp: unixToIso(reading.timestamp),
  };
}

/**
 * Transform cloud device reading to edge format
 */
export function transformReadingToEdge(reading: {
  edgeDeviceId: string;
  readingType: string;
  valueText?: string;
  valueNumeric?: number;
  valueBoolean?: boolean;
  valueJson?: Record<string, unknown>;
  timestamp: string; // ISO 8601
}): {
  edgeDeviceId: string;
  readingType: string;
  valueText?: string;
  valueNumeric?: number;
  valueBoolean?: boolean;
  valueJson?: Record<string, unknown>;
  timestamp: number;
} {
  return {
    ...reading,
    timestamp: isoToUnix(reading.timestamp),
  };
}
