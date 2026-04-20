"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
