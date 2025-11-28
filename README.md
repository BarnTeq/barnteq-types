# @barnteq/types

Shared TypeScript types and transform utilities for BarnTeq edge and cloud services.

## Installation

```bash
npm install github:BarnTeq/barnteq-types#v1.0.2
```

## Usage

```typescript
import {
  // Types
  type Command,
  type BarnConfig,
  type SyncRequest,
  type DeviceReading,

  // Transform utilities
  unixToIso,
  isoToUnix,
  snakeToCamel,
  camelToSnake,
} from '@barnteq/types';
```

## Exported Types

### Command Types
- `Command` - Base command structure
- `CommandAction` - Command action enum ('unlock_gate', 'lock_gate', 'toggle_light', etc.)
- `CommandStatus` - Command status enum ('pending', 'acknowledged', 'completed', 'failed')
- `AcknowledgeCommandRequest` - Request to acknowledge command completion
- `CloudCommand` - Extended command with delivery method

### Barn Configuration
- `BarnConfig` - Full barn configuration
- `BarnConfigStall` - Stall configuration
- `BarnConfigHorse` - Horse profile
- `BarnConfigCamera` - Camera configuration
- `BarnConfigFloorplan` - Floorplan with device positions

### Sync Types
- `SyncRequest` - Edge-to-cloud sync request
- `SyncResponse` - Cloud-to-edge sync response
- `HeartbeatRequest` - Edge heartbeat request
- `HeartbeatResponse` - Cloud heartbeat response

### Device Types
- `Device` - Device/sensor configuration
- `DeviceReading` - Sensor reading data
- `ReadingType` - Reading type enum ('state', 'level', 'temperature', etc.)
- `EDGE_SENSOR_TO_DEVICE_TYPE` - Mapping from edge sensor types to cloud device types

### Event Types
- `EventLog` - Event log entry
- `EventLogType` - Event type enum

### Error Types
- `ApiError` - Standard API error structure
- `API_ERROR_CODES` - Error code constants

## Transform Utilities

### Timestamp Transforms
```typescript
// Unix timestamp (seconds) to ISO string
unixToIso(1234567890); // "2009-02-13T23:31:30.000Z"

// ISO string to Unix timestamp (seconds)
isoToUnix("2009-02-13T23:31:30.000Z"); // 1234567890

// Date to ISO string
dateToIso(new Date()); // "2025-01-01T00:00:00.000Z"

// ISO string to Date
isoToDate("2025-01-01T00:00:00.000Z"); // Date object
```

### Unit Transforms
```typescript
// Minutes to seconds
minutesToSeconds(5); // 300

// Seconds to minutes
secondsToMinutes(300); // 5
```

### Case Transforms
```typescript
// Snake case to camel case
snakeToCamel({ barn_id: '123', device_type: 'sensor' });
// { barnId: '123', deviceType: 'sensor' }

// Camel case to snake case
camelToSnake({ barnId: '123', deviceType: 'sensor' });
// { barn_id: '123', device_type: 'sensor' }
```

### Age/Birth Date Transforms
```typescript
// Birth date to age in years
birthDateToAge("2020-01-15"); // 5 (as of 2025)

// Age to approximate birth date
ageToBirthDate(5); // "2020-01-01"
```

### Reading Transforms
```typescript
// Transform edge reading for cloud API
transformReadingToCloud({
  edgeDeviceId: 'stall_1_gates_1',
  readingType: 'state',
  valueText: 'open',
  timestamp: 1234567890
});

// Transform cloud reading for edge storage
transformReadingToEdge(cloudReading);
```

## Related Packages

- **barnteq-edge** - Edge service for NVIDIA Jetson devices
- **barnteq-cloud** - Cloud backend (Next.js)

## Development

```bash
# Install dependencies
npm install

# Build
npm run build
```

## Note on Git Dependencies

This package is installed via git URL. Since git dependencies don't run npm scripts, the `dist/` directory is committed to the repository.

## License

UNLICENSED - BarnTeq Inc.
