/**
 * API Types - Shared between cloud and edge
 */

/**
 * Standard API error response
 */
export interface ApiError {
  error: string;
  code?: string;
  details?: unknown;
  requestId?: string;
}

/**
 * API error codes
 */
export const API_ERROR_CODES = {
  // Authentication errors (401)
  MISSING_AUTH: 'MISSING_AUTH',
  INVALID_TOKEN: 'INVALID_TOKEN',
  INVALID_API_KEY: 'INVALID_API_KEY',
  INVALID_ADOPTION_PIN: 'INVALID_ADOPTION_PIN',
  ADOPTION_PIN_ALREADY_USED: 'ADOPTION_PIN_ALREADY_USED',
  ADOPTION_PIN_EXPIRED: 'ADOPTION_PIN_EXPIRED',

  // Authorization errors (403)
  FORBIDDEN: 'FORBIDDEN',
  UNAUTHORIZED: 'UNAUTHORIZED',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',

  // Validation errors (400)
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_REQUEST: 'INVALID_REQUEST',
  BARN_ALREADY_ADOPTED: 'BARN_ALREADY_ADOPTED',
  BARN_NOT_ADOPTED: 'BARN_NOT_ADOPTED',
  DASHBOARD_TOKEN_NOT_FOUND: 'DASHBOARD_TOKEN_NOT_FOUND',
  DECRYPTION_ERROR: 'DECRYPTION_ERROR',

  // Not found errors (404)
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  NOT_FOUND: 'NOT_FOUND',
  BARN_NOT_FOUND: 'BARN_NOT_FOUND',
  HORSE_NOT_FOUND: 'HORSE_NOT_FOUND',
  COMMAND_NOT_FOUND: 'COMMAND_NOT_FOUND',
  MEDIA_NOT_FOUND: 'MEDIA_NOT_FOUND',
  SESSION_NOT_FOUND: 'SESSION_NOT_FOUND',

  // Conflict errors (409)
  RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',
  DUPLICATE_RESOURCE: 'DUPLICATE_RESOURCE',

  // Rate limiting (429)
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',

  // Server errors (500)
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',

  // Service unavailable (503)
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  MAINTENANCE_MODE: 'MAINTENANCE_MODE',
} as const;

export type ApiErrorCode = keyof typeof API_ERROR_CODES;

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

/**
 * Pagination request parameters
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

/**
 * Async job response (202 Accepted)
 */
export interface AsyncJobResponse {
  jobId: string;
  status: 'queued' | 'processing';
  statusUrl: string;
  estimatedDuration?: string;
}
