/**
 * @barnteq/types - Shared TypeScript types for BarnTeq edge and cloud services
 *
 * This package provides unified type definitions to ensure consistency
 * between barnteq-edge and barnteq-cloud codebases.
 */

// API Types
export {
  API_ERROR_CODES,
  type ApiError,
  type ApiErrorCode,
  type PaginatedResponse,
  type PaginationParams,
  type AsyncJobResponse,
} from './api';

// Barn Types
export {
  type Barn,
  type BarnConfig,
  type BarnConfigCamera,
  type BarnConfigFloorplan,
  type BarnConfigStall,
  type BufferStatus,
  type CreateBarnRequest,
  type UpdateBarnRequest,
  type AdoptBarnRequest,
  type AdoptBarnResponse,
  type HealthMetrics,
  type PackageType,
  type SyncBufferStatus,
  type SyncHealthMetrics,
  type WebSocketStatus,
  // Edge config types
  type EdgeBarn,
  type EdgeBarnConfig,
  type EdgeBarnSensors,
  type EdgeCamera,
  type EdgeConfigHorse,
  type EdgeFloorplan,
  type EdgeFloorplanPosition,
  type EdgeSensor,
  type EdgeStall,
  type EdgeStallSensors,
} from './barn';

// Edge Config Types (flat devices array structure)
export {
  type HAEntityClass,
  type DeviceBindings,
  type FloorplanPosition,
  type FloorplanConfig,
  type ConfigDevice,
  type StallBindings,
  type ConfigStall,
  type BarnBindings,
  type ConfigBarn,
  type EdgeConfig,
  type ConfigSyncResult,
  isEdgeConfig,
  isStallLocation,
  DEVICE_ENTITY_CLASSES,
} from './barnConfig';

// Command Types
export {
  type Command,
  type CloudCommand,
  type CommandAction,
  type CommandDeliveryMethod,
  type CommandPayloads,
  type CommandPriority,
  type CommandStatus,
  type CreateCommandRequest,
  type AcknowledgeCommandRequest,
  type SendCommandResponse,
} from './command';

// Device Types
export {
  EDGE_SENSOR_TO_DEVICE_TYPE,
  type CriticalEvent,
  type Device,
  type DeviceReading,
  type DeviceReadingQuery,
  type DeviceStatus,
  type DeviceType,
  type ReadingType,
} from './device';

// Horse Types
export {
  type Horse,
  type HorseWithDevices,
  type HorseSex,
  type EdgeHorse,
  type BarnConfigHorse,
  type CreateHorseRequest,
  type UpdateHorseRequest,
  type AssignHorseToBarnRequest,
  type HorsesSyncResponse,
  type StallDevice,
  type DeviceLatestReading,
} from './horse';

// Sync Types
export {
  type EventLog,
  type EventLogType,
  type HeartbeatRequest,
  type HeartbeatResponse,
  type SyncInstructions,
  type SyncPayload,
  type SyncRequest,
  type SyncResponse,
  type SyncResponseExtended,
  type SyncResponseLegacy,
  type SyncStatus,
  type SyncStatusResponse,
} from './sync';

// Transform Utilities
export {
  // Timestamp conversions
  unixToIso,
  isoToUnix,
  dateToIso,
  isoToDate,
  unixMsToIso,
  isoToUnixMs,
  // Time unit conversions
  minutesToSeconds,
  secondsToMinutes,
  hoursToSeconds,
  secondsToHours,
  // Case conversions
  snakeToCamelString,
  camelToSnakeString,
  snakeToCamel,
  camelToSnake,
  // Age/BirthDate conversions
  birthDateToAge,
  ageToBirthDate,
  // Device reading transforms
  transformReadingToCloud,
  transformReadingToEdge,
} from './transforms';
