"use strict";
/**
 * Control Types — cloud → edge device actuation
 *
 * Control signals deliberately do NOT use the `commands` table. That is a
 * durable store-and-forward queue, right for housekeeping (`force_sync`,
 * `adjust_sync_interval`) where "deliver whenever the barn reconnects" is the
 * desired behaviour. A fan toggle is interactive: it works now or it fails
 * visibly, and firing a relay hours after the operator asked is worse than
 * doing nothing.
 *
 * Delivery is Pusher, mirroring WebRTC signalling — the cloud publishes on
 * `presence-barn-{barnId}`, the edge acts, and the edge reports back over its
 * own outbound authenticated channel. The cloud never calls the edge, so no
 * cloud→edge credential is needed.
 */
Object.defineProperty(exports, "__esModule", { value: true });
