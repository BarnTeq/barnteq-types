/**
 * @barnteq/types - Shared TypeScript types for BarnTeq edge and cloud services
 *
 * This package provides unified type definitions to ensure consistency
 * between barnteq-edge and barnteq-cloud codebases.
 */
export { API_ERROR_CODES, type ApiError, type ApiErrorCode, } from './api';
export { type Barn, type BarnConfig, type BarnConfigCamera, type BarnConfigFloorplan, type BarnConfigStall, type BufferStatus, type CreateBarnRequest, type UpdateBarnRequest, type AdoptBarnRequest, type AdoptBarnResponse, type HealthMetrics, type PackageType, type SyncBufferStatus, type SyncHealthMetrics, type WebSocketStatus, } from './barn';
export { type HAEntityClass, type DeviceBindings, type FloorplanPosition, type FloorplanConfig, type ConfigDevice, type StallBindings, type ConfigStall, type BarnBindings, type ConfigBarn, type EdgeConfig, type ConfigSyncResult, isEdgeConfig, isStallLocation, DEVICE_ENTITY_CLASSES, } from './barnConfig';
export { type Command, type CloudCommand, type CommandAction, type CommandDeliveryMethod, type CommandPayloads, type CommandPriority, type CommandStatus, type CreateCommandRequest, type AcknowledgeCommandRequest, type SendCommandResponse, } from './command';
export { EDGE_SENSOR_TO_DEVICE_TYPE, type CriticalEvent, type Device, type DeviceReading, type DeviceReadingQuery, type DeviceStatus, type DeviceType, type ReadingType, } from './device';
export { type Horse, type HorseWithDevices, type HorseSex, type EdgeHorse, type BarnConfigHorse, type CreateHorseRequest, type UpdateHorseRequest, type AssignHorseToBarnRequest, type HorsesSyncResponse, type StallDevice, type DeviceLatestReading, } from './horse';
export { type EventLog, type EventLogType, type HeartbeatRequest, type HeartbeatResponse, type SyncInstructions, type SyncPayload, type SyncRequest, type SyncResponse, type SyncResponseExtended, type SyncStatus, type SyncStatusResponse, } from './sync';
export { unixToIso, isoToUnix, dateToIso, isoToDate, unixMsToIso, isoToUnixMs, minutesToSeconds, secondsToMinutes, hoursToSeconds, secondsToHours, snakeToCamelString, camelToSnakeString, snakeToCamel, camelToSnake, birthDateToAge, ageToBirthDate, } from './transforms';
