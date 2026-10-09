/**
 * Recording coverage: what continuous video the BarnBox still holds, per
 * camera. Computed on the edge from Frigate's recordings summary and sent to
 * the cloud on the heartbeat (at most every ~5 min). The cloud stores the
 * latest report on the barn row and the app uses it to draw the history
 * gate (day strip, timeline holes) and to refuse playback windows before the
 * earliest recording.
 *
 * Granularity is one hour: an hour counts as covered when Frigate reports at
 * least 20 minutes of footage for it, so hours that only hold alert or
 * detection clips are NOT coverage. `earliestTs` is refined to the first
 * segment inside the first covered hour.
 */
export interface RecordingGap {
    /** ISO8601 start of a hole inside [earliestTs, latestTs]. */
    startTs: string;
    /** ISO8601 end of the hole. */
    endTs: string;
}
export interface CameraRecordingCoverage {
    /** Barn-config device uid — equals `devices.edge_device_id` in the cloud. */
    deviceUid: string;
    /** Frigate camera name the edge resolved for this device. */
    frigateName: string;
    /** ISO8601 start of the first continuous footage, or null when none. */
    earliestTs: string | null;
    /** ISO8601 end of the last covered hour (now when recording is live), or null. */
    latestTs: string | null;
    /** Merged hour-granularity holes between earliest and latest, oldest first. */
    gaps: RecordingGap[];
    /** True when more than the cap of merged holes existed and the oldest were dropped. */
    gapsTruncated: boolean;
    /** Average recording bitrate over the last hour (bytes per second), or null. */
    avgBytesPerSec: number | null;
    /**
     * ISO8601 time this entry was last successfully computed. When Frigate was
     * unreachable the edge resends its last good entry, so this can be older
     * than the report's `reportedAt`.
     */
    collectedAt: string;
}
export interface RecordingCoverageReport {
    /** ISO8601 time the edge assembled this report. Monotonic per barn. */
    reportedAt: string;
    cameras: CameraRecordingCoverage[];
}
/** Stall events the History timeline marks, derived from readings. */
export type CameraEventKind = 'lay_down' | 'stood_up' | 'eating' | 'left_stall' | 'back_in_stall' | 'door_open' | 'door_closed'
/** A drop of at least 1 kg between two consecutive bucket-present BTBucket readings. */
 | 'drink'
/** A rise of at least 3 kg while present, or the bucket re-hung at or above half full. */
 | 'water_filled';
export interface CameraEvent {
    /** ISO8601 time of the transition. */
    ts: string;
    kind: CameraEventKind;
    /** Short human label, e.g. "Lay down". */
    label: string;
}
