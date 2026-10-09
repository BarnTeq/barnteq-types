/**
 * Historical video playback types.
 *
 * A playback session is a short-lived authorization bundle that lets the
 * frontend fetch HLS / MP4 for a specific camera + time range directly from
 * the edge BarnBox via its Cloudflare Tunnel HTTP ingress.
 *
 * Flow:
 *   1. Frontend POSTs CreatePlaybackSessionRequest to cloud.
 *   2. Cloud authenticates the user, checks stall-scoped camera access,
 *      generates an opaque random token, pushes it to edge via Pusher,
 *      and returns CreatePlaybackSessionResponse.
 *   3. Frontend attaches HLS.js (or native Safari HLS) to `playbackUrl` and
 *      offers a download via `downloadUrl`. URLs carry the token as
 *      `?t=<token>`; edge string-compares it against its local session row.
 *
 * Session kinds (v1.13.0):
 *   - absent (legacy): both URLs, window ≤ 15 min, short TTL.
 *   - 'hls': scrubbing session, window up to 2 h, `playbackUrl` + `segmentsUrl`,
 *     long TTL. The edge refuses `clip.mp4` for this kind.
 *   - 'clip': download session, window ≤ 15 min, `downloadUrl` only.
 */
export type PlaybackSessionKind = 'hls' | 'clip';
export interface PlaybackSession {
    /** Opaque session id (UUID). */
    sid: string;
    /** HLS master playlist URL, token included as `?t=`. Present for 'hls' and legacy. */
    playbackUrl?: string;
    /** Muxed MP4 download URL for the window, token included. Present for 'clip' and legacy. */
    downloadUrl?: string;
    /**
     * JSON list of the recorded segments inside the window
     * (`[{ startTs, durationSec }]`), token included. Present for 'hls'.
     * Media time in the HLS playlist is the concatenation of these segments,
     * so wall-clock ↔ media offset mapping must go through this list.
     */
    segmentsUrl?: string;
    /** Epoch ms at which the session (and its token) stops being valid. */
    expiresAt: number;
    /** Kind the cloud granted (absent for legacy sessions). Lets clients narrow which URLs exist. */
    kind?: PlaybackSessionKind;
    /** ISO8601 window the edge was actually told about. Can be shorter than the request (see `capabilityLimited`). */
    startTs?: string;
    endTs?: string;
    /**
     * True when the cloud capped an 'hls' request at the legacy 15-min window
     * because the barn's edge has not reported recording coverage yet (and so
     * cannot be assumed to enforce session kinds).
     */
    capabilityLimited?: boolean;
}
export interface CreatePlaybackSessionRequest {
    /** Cloud device UUID (`devices.id`) — NOT the Frigate camera name. */
    cameraId: string;
    /** ISO8601 start of the playback window. */
    startTs: string;
    /** ISO8601 end of the playback window. Must be ≥ startTs and within retention. */
    endTs: string;
    /** Session kind; absent means legacy behaviour (both URLs, 15-min cap). */
    kind?: PlaybackSessionKind;
}
export interface CreatePlaybackSessionResponse extends PlaybackSession {
    /** Raw token echoed back so callers can embed it in additional requests if needed. */
    token: string;
}
/** One recorded segment inside a session window, as served by the edge's `segmentsUrl`. */
export interface RecordingSegment {
    /** ISO8601 start of the segment. */
    startTs: string;
    /** Segment length in seconds; media time in the HLS playlist is the concatenation of these. */
    durationSec: number;
}
