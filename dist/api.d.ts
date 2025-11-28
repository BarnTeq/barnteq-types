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
export declare const API_ERROR_CODES: {
    readonly MISSING_AUTH: "MISSING_AUTH";
    readonly INVALID_TOKEN: "INVALID_TOKEN";
    readonly INVALID_API_KEY: "INVALID_API_KEY";
    readonly INVALID_ADOPTION_PIN: "INVALID_ADOPTION_PIN";
    readonly ADOPTION_PIN_ALREADY_USED: "ADOPTION_PIN_ALREADY_USED";
    readonly ADOPTION_PIN_EXPIRED: "ADOPTION_PIN_EXPIRED";
    readonly FORBIDDEN: "FORBIDDEN";
    readonly UNAUTHORIZED: "UNAUTHORIZED";
    readonly INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS";
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    readonly INVALID_REQUEST: "INVALID_REQUEST";
    readonly BARN_ALREADY_ADOPTED: "BARN_ALREADY_ADOPTED";
    readonly BARN_NOT_ADOPTED: "BARN_NOT_ADOPTED";
    readonly DASHBOARD_TOKEN_NOT_FOUND: "DASHBOARD_TOKEN_NOT_FOUND";
    readonly DECRYPTION_ERROR: "DECRYPTION_ERROR";
    readonly RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly BARN_NOT_FOUND: "BARN_NOT_FOUND";
    readonly HORSE_NOT_FOUND: "HORSE_NOT_FOUND";
    readonly COMMAND_NOT_FOUND: "COMMAND_NOT_FOUND";
    readonly MEDIA_NOT_FOUND: "MEDIA_NOT_FOUND";
    readonly SESSION_NOT_FOUND: "SESSION_NOT_FOUND";
    readonly RESOURCE_CONFLICT: "RESOURCE_CONFLICT";
    readonly DUPLICATE_RESOURCE: "DUPLICATE_RESOURCE";
    readonly RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED";
    readonly INTERNAL_ERROR: "INTERNAL_ERROR";
    readonly DATABASE_ERROR: "DATABASE_ERROR";
    readonly EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR";
    readonly SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE";
    readonly MAINTENANCE_MODE: "MAINTENANCE_MODE";
};
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
