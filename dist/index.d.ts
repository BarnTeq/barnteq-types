/**
 * @barnteq/types - Shared TypeScript types for BarnTeq edge and cloud services
 *
 * This package provides unified type definitions to ensure consistency
 * between barnteq-edge and barnteq-cloud codebases.
 */
export { API_ERROR_CODES, type ApiError, type ApiErrorCode, type PaginatedResponse, type PaginationParams, type AsyncJobResponse, } from './api';
export { type Barn, type BarnConfig, type BarnConfigCamera, type BarnConfigFloorplan, type BarnConfigStall, type BufferStatus, type ConfigSyncResult, type CreateBarnRequest, type UpdateBarnRequest, type AdoptBarnRequest, type AdoptBarnResponse, type HealthMetrics, type PackageType, type SyncBufferStatus, type SyncHealthMetrics, type WebSocketStatus, type EdgeBarn, type EdgeBarnConfig, type EdgeBarnSensors, type EdgeCamera, type EdgeConfigHorse, type EdgeFloorplan, type EdgeFloorplanPosition, type EdgeSensor, type EdgeStall, type EdgeStallSensors, } from './barn';
export { type Command, type CloudCommand, type CommandAction, type CommandDeliveryMethod, type CommandPayloads, type CommandPriority, type CommandStatus, type CreateCommandRequest, type AcknowledgeCommandRequest, type SendCommandResponse, } from './command';
export { EDGE_SENSOR_TO_DEVICE_TYPE, type CriticalEvent, type Device, type DeviceReading, type DeviceReadingQuery, type DeviceStatus, type DeviceType, type ReadingType, } from './device';
export { type Horse, type HorseSex, type EdgeHorse, type BarnConfigHorse, type CreateHorseRequest, type UpdateHorseRequest, type AssignHorseToBarnRequest, type HorsesSyncResponse, } from './horse';
export { type EventLog, type EventLogType, type HeartbeatRequest, type HeartbeatResponse, type SyncInstructions, type SyncPayload, type SyncRequest, type SyncResponse, type SyncResponseExtended, type SyncResponseLegacy, type SyncStatus, type SyncStatusResponse, } from './sync';
export { unixToIso, isoToUnix, dateToIso, isoToDate, unixMsToIso, isoToUnixMs, minutesToSeconds, secondsToMinutes, hoursToSeconds, secondsToHours, snakeToCamelString, camelToSnakeString, snakeToCamel, camelToSnake, birthDateToAge, ageToBirthDate, transformReadingToCloud, transformReadingToEdge, } from './transforms';
