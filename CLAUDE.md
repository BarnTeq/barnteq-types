# CLAUDE.md - @barnteq/types

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

**@barnteq/types** is a shared TypeScript types and transform utilities package used by both barnteq-edge and barnteq-cloud services.

**Primary responsibilities:**
- Define shared TypeScript interfaces and types
- Provide transform utilities (timestamps, case conversion, readings)
- Ensure type safety across edge/cloud boundary
- Map between different data representations

**Distribution:** GitHub npm package registry

## Quick Start

```bash
# Install dependencies
npm install

# Build
npm run build

# Output goes to dist/
```

## Source Files

```
src/
├── index.ts          # Main exports
├── api.ts            # API error types and codes
├── barn.ts           # Barn entity types
├── barnConfig.ts     # Barn configuration types
├── command.ts        # Command types and enums
├── device.ts         # Device and reading types
├── horse.ts          # Horse profile types
├── sync.ts           # Edge-cloud sync types
└── transforms.ts     # Transform utilities
```

## Exported Types

### Command Types
```typescript
Command          // Base command structure
CommandAction    // 'unlock_gate', 'lock_gate', 'toggle_light', etc.
CommandStatus    // 'pending', 'acknowledged', 'completed', 'failed'
CloudCommand     // Extended with delivery method
AcknowledgeCommandRequest
```

### Barn Configuration
```typescript
BarnConfig       // Full barn config
BarnConfigStall  // Stall configuration
BarnConfigHorse  // Horse profile
BarnConfigCamera // Camera configuration
BarnConfigFloorplan
```

### Sync Types
```typescript
SyncRequest      // Edge-to-cloud sync
SyncResponse     // Cloud-to-edge sync
HeartbeatRequest
HeartbeatResponse
```

### Device Types
```typescript
Device           // Device/sensor config
DeviceReading    // Sensor reading
ReadingType      // 'state', 'level', 'temperature', etc.
EDGE_SENSOR_TO_DEVICE_TYPE  // Mapping constant
```

### Error Types
```typescript
ApiError         // Standard API error
API_ERROR_CODES  // Error code constants
```

## Transform Utilities

### Timestamp Transforms
```typescript
unixToIso(1234567890);        // "2009-02-13T23:31:30.000Z"
isoToUnix("2009-02-13...");   // 1234567890
dateToIso(new Date());        // ISO string
isoToDate("2025-01-01...");   // Date object
```

### Case Transforms
```typescript
// Snake to camel
snakeToCamel({ barn_id: '123' });  // { barnId: '123' }

// Camel to snake
camelToSnake({ barnId: '123' });   // { barn_id: '123' }
```

### Reading Transforms
```typescript
// Edge → Cloud format
transformReadingToCloud({
  edgeDeviceId: 'stall_1_gates_1',
  readingType: 'state',
  valueText: 'open',
  timestamp: 1234567890
});

// Cloud → Edge format
transformReadingToEdge(cloudReading);
```

### Age/Birth Date
```typescript
birthDateToAge("2020-01-15");  // 5 (years)
ageToBirthDate(5);             // "2020-01-01"
```

## Consumer Projects

| Project | Usage |
|---------|-------|
| barnteq-cloud | API request/response types, transforms |
| barnteq-edge | Sync types, device mappings, transforms |

## Development Patterns

### Adding a New Type

1. Create or edit appropriate file in `src/`
2. Export from `src/index.ts`
3. Run `npm run build`
4. Bump version in `package.json`
5. Commit including `dist/` (required for git installs)

### Publishing Updates

**⚠️ CRITICAL:** Consumer projects (barnteq-cloud, barnteq-edge) use symlinks locally but install from GitHub npm registry on Vercel/production. You MUST publish before deploying consumers.

**Full publish workflow:**
```bash
# 1. Build
npm run build

# 2. Commit all changes (including dist/)
git add -A
git commit -m "feat: add new field to Horse type"

# 3. Bump version and publish
npm version patch -m "v%s"    # Creates version commit and tag
git push origin main --tags   # Push code and tag
npm publish                   # Publish to GitHub npm registry

# 4. Update consumers
cd ../barnteq-cloud
# Edit package.json to require new version (e.g., "^1.4.2")
git add package.json
git commit -m "chore: bump @barnteq/types to 1.4.2"
git push
```

**Common issue:** barnteq-cloud builds locally but fails on Vercel with "Property does not exist on type". This means you modified types locally but didn't publish. The symlink uses your local changes, but Vercel installs the old published version.

### Type Guidelines

- Use `interface` for object shapes (extendable)
- Use `type` for unions and simple aliases
- Use `enum` sparingly (prefer string unions)
- Document non-obvious fields with JSDoc comments

## Important Notes

### Git Dependencies Don't Run Scripts
npm doesn't run `prepublishOnly` for git dependencies, so `dist/` must be committed to the repo.

### Version Bumping
Always bump version when making changes:
- Patch (1.4.0 → 1.4.1): Bug fixes, internal changes
- Minor (1.4.0 → 1.5.0): New types/utilities (backward compatible)
- Major (1.4.0 → 2.0.0): Breaking changes to existing types

## See Also

- `../barnteq-cloud/CLAUDE.md` - Cloud consumer
- `../barnteq-edge/CLAUDE.md` - Edge consumer
- `../CLAUDE.md` - Workspace overview
