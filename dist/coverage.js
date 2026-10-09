"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
