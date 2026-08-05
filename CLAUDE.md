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
├── command.ts        # Command types and enums (housekeeping queue — NOT control)
├── control.ts        # Cloud→edge device actuation contract (Pusher-delivered)
├── device.ts         # Device and reading types
├── horse.ts          # Horse profile types
├── sync.ts           # Edge-cloud sync types
└── transforms.ts     # Transform utilities
```

## Exported Types

### Command Types
```typescript
Command          // Base command structure
CommandAction    // 'force_sync' | 'adjust_sync_interval'  — that is the whole union
CommandStatus    // 'pending' | 'sent' | 'acknowledged' | 'failed'
CloudCommand     // Extended with delivery method
AcknowledgeCommandRequest
```

⚠️ This previously documented `CommandAction` as `'unlock_gate', 'lock_gate',
'toggle_light', etc.` — none of which ever existed. Actuator commands were
imagined for this table and never built. **Do not add device control here:**
`commands` is a durable store-and-forward queue, correct for housekeeping and
wrong for interactive control. See `src/control.ts`.

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
ReadingType      // 'state', 'level', 'temperature', 'motion', 'water_level',
                 // 'feed_level', 'stall_occupancy', 'feed_status',
                 // 'waste_detected', 'horse_pose', 'bedding_condition',
                 // 'stall_state_raw', 'stall_activity_score', etc.
                 // (full list in src/device.ts)
EDGE_SENSOR_TO_DEVICE_TYPE  // Mapping constant
```

**v1.6.0 (motion-only pivot):** Added four VLM-derived `ReadingType` members
(`waste_detected`, `horse_pose`, `bedding_condition`, `stall_state_raw`)
to support edge's `vision-client` fan-out from the cloud
`/api/v1/barns/{id}/vision/analyze` response. `stall_occupancy` was already
present but is now written by `vision-client.ts` instead of being derived
from Frigate zone-gated YOLO events. See
`barnbox/barnteq-installer/docs/OPERATIONAL-LESSONS.md` #9.

**v1.7.0 (commands schema alignment):** Renamed
`SyncResponse.pendingCommands[].payload` → `data` (and same for
`SyncResponseLegacy`) to align with the `commands.data` DB column
(renamed from `payload` in cloud migration 038) and the `Command.data`
field already used everywhere else. The `payload` field was unused by
edge consumers (which fetch commands via a separate `/commands` endpoint),
so this rename is breaking in shape but a no-op in practice.

**v1.8.0 (spatial activity):** Added `stall_activity_score` to the
`ReadingType` union. Emitted by edge `stall-monitor.service.ts` each
VLM fire with `displacement_sum_15min` + `area_variance_15min` computed
from the per-camera `spatialHistory` ring buffer (VLM-reported
`horse_area_fraction` + `horse_center_x/y` over the last ~15 min).
Replaces the v2.1.1 motion-duty-cycle activity metric, which was
unreliable in sunlit barns where Frigate motion pins ON continuously.
**Required cloud changes:** migration `043_add_stall_activity_score_reading_type.sql`
applied to Supabase (new Postgres enum value) + cloud Zod enum + edge
`DeviceReadingInput`/vision-client Zod schemas. See root `CLAUDE.md`
Learnings "Adding a new `ReadingType` requires FIVE synchronized updates".

**v1.9.0 (historical video playback):** Added `PlaybackSession`,
`CreatePlaybackSessionRequest`, and `CreatePlaybackSessionResponse` to
support the new historical-playback feature. Cloud issues short-lived
random tokens via Pusher; edge proxies to Frigate's native `/vod` (HLS)
and `/api` (clip.mp4) endpoints via Cloudflare Tunnel HTTP ingress.
Additive — no changes to existing types.

**v1.11.0 (fan controller — first actuator):** Added `fan_controller` to
`DeviceType` and `switch_state` / `power_watts` to `ReadingType`, for the Zooz
ZEN15 800LR stall fan switch. `power_watts` is the interesting one: a relay only
reports what it was *commanded*, while draw distinguishes that from what is
*actually happening* — commanded ON at 0 W means unplugged, seized, or a tripped
breaker.

⚠️ `DEVICE_ENTITY_CLASSES` in `barnConfig.ts` is a `Record<DeviceType, …>`
**inside this package**, so a new `DeviceType` fails *this* package's build until
that map gains an entry. Not deferrable to a consumer repo.

Added `src/control.ts` — the cloud→edge actuation contract. Control does **not**
use the `commands` table: that is store-and-forward, right for housekeeping and
wrong for an interactive signal that should work now or fail visibly. Delivery is
Pusher, mirroring WebRTC signalling — cloud publishes, edge acts, edge reports
back over its own authenticated channel, so no cloud→edge credential exists or is
needed. `SwitchCommandEvent.createdAt` is load-bearing: Pusher ordering is not
guaranteed across reconnects, and a replayed on/off pair on a relay is worse than
a dropped one.

**Required consumer changes:** Postgres enum migrations for the new
`device_type` and two `reading_type` values, applied to Supabase **before** any
edge deploy that emits them — `process_sensor_readings` is atomic, so one unknown
enum value rolls back the entire batch, not just the new reading. Plus the cloud
Zod tuple + exhaustiveness check, two hand-maintained `DeviceType` Zod enums in
the cloud's `config` and `adopt` routes (which fail the *whole* device array on
one bad element), and the app's `DeviceType` union plus three exhaustive
`Record<DeviceType, …>` maps in `floorplanUtils.ts`.

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
