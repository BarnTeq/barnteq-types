/**
 * Historical video playback types.
 *
 * A playback session is a short-lived (~15 min) authorization bundle that
 * lets the frontend fetch HLS / MP4 for a specific camera + time range
 * directly from the edge BarnBox via its Cloudflare Tunnel HTTP ingress.
 *
 * Flow:
 *   1. Frontend POSTs CreatePlaybackSessionRequest to cloud.
 *   2. Cloud authenticates the user, checks stall-scoped camera access,
 *      generates an opaque random token, pushes it to edge via Pusher,
 *      and returns CreatePlaybackSessionResponse.
 *   3. Frontend attaches HLS.js (or native Safari HLS) to `playbackUrl` and
 *      offers a download via `downloadUrl`. Both URLs carry the token as
 *      `?t=<token>`; edge string-compares it against its local session row.
 */

export interface PlaybackSession {
  /** Opaque session id (UUID). */
  sid: string;
  /** HLS master playlist URL, token included as `?t=`. */
  playbackUrl: string;
  /** Muxed MP4 download URL for the same window, token included. */
  downloadUrl: string;
  /** Epoch ms at which the session (and its token) stops being valid. */
  expiresAt: number;
}

export interface CreatePlaybackSessionRequest {
  /** Cloud device UUID (`devices.id`) — NOT the Frigate camera name. */
  cameraId: string;
  /** ISO8601 start of the playback window. */
  startTs: string;
  /** ISO8601 end of the playback window. Must be ≥ startTs and within retention. */
  endTs: string;
}

export interface CreatePlaybackSessionResponse extends PlaybackSession {
  /** Raw token echoed back so callers can embed it in additional requests if needed. */
  token: string;
}
