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

/**
 * Pusher event: cloud → edge, on `presence-barn-{barnId}`.
 */
export interface SwitchCommandEvent {
  /** Correlates the eventual result back to the originating request. */
  requestId: string;
  /** Device uid from barn-config — the edge's identifier, not the cloud UUID. */
  edgeDeviceId: string;
  /**
   * Desired relay position. Absolute state, never a toggle, so a duplicate
   * delivery is a no-op and no idempotency key is required.
   */
  state: boolean;
  /**
   * Epoch ms. Pusher ordering is not guaranteed across reconnects, so the edge
   * drops any event older than the last one it processed for this device — a
   * replayed on/off pair on a relay is worse than a dropped one.
   */
  createdAt: number;
}

/** Why a switch write did not take effect. */
export type SwitchFailureReason =
  /** uid not present in barn-config */
  | 'unknown_device'
  /** device exists but is not a `fan_controller` */
  | 'not_controllable'
  /** no `zwave_node_id` bound in barn-config */
  | 'no_node_binding'
  /** Z-Wave rejected the write */
  | 'write_failed'
  /** no correlated ack within the deadline — outcome genuinely unknown */
  | 'write_timeout'
  /** a newer command for this device was processed first */
  | 'superseded';

/**
 * Edge → cloud, reporting what actually happened.
 *
 * Sent for successes as well as failures. A success is independently confirmed
 * when the `switch_state` reading lands, but an explicit result is easier to
 * reason about than an inferred one — and a failure produces no reading at all.
 */
export interface SwitchResultRequest {
  requestId: string;
  edgeDeviceId: string;
  success: boolean;
  /** Relay position the device reported after the write, when known. */
  state?: boolean;
  reason?: SwitchFailureReason;
  /** Human-readable detail for logs and UI. */
  error?: string;
}

/** Pusher event: cloud → app. Same shape the edge reported. */
export type SwitchResultEvent = SwitchResultRequest;

/** App → cloud request body. */
export interface SetSwitchRequest {
  state: boolean;
}

/**
 * Cloud → app. Accepted, not completed — the outcome arrives on the
 * `switch-result` Pusher event, correlated by `requestId`.
 */
export interface SetSwitchResponse {
  requestId: string;
}
