import { TIMELINE_STEPS, NOTIFICATION_STATUS } from "../constants";

// ── Helpers ──────────────────────────────────────────────────

const getStepState = (stepId, statusHistory, currentStatus) => {
  const order = TIMELINE_STEPS.map((s) => s.id);
  const currentIdx = order.indexOf(currentStatus);
  const stepIdx    = order.indexOf(stepId);

  const reached = statusHistory.some((s) => s.status === stepId);

  if (reached) {
    // It's the current active one
    if (stepId === currentStatus &&
        currentStatus !== NOTIFICATION_STATUS.DELIVERED &&
        currentStatus !== NOTIFICATION_STATUS.FAILED &&
        currentStatus !== NOTIFICATION_STATUS.DLQ) {
      return "active";
    }
    return "done";
  }

  return "pending";
};

const getTimestamp = (stepId, statusHistory) => {
  const entry = statusHistory.find((s) => s.status === stepId);
  if (!entry) return null;
  const d = new Date(entry.timestamp);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
};

// ── Node circle ───────────────────────────────────────────────

const TimelineNode = ({ state, icon }) => {
  const base = "w-9 h-9 rounded-full border-2 flex items-center justify-center text-base flex-shrink-0 transition-all duration-500 z-10";

  const styles = {
    done:    "bg-green-400/15 border-green-400 shadow-[0_0_10px_rgba(16,185,129,0.25)]",
    active:  "bg-accent/20 border-accent shadow-[0_0_14px_rgba(99,102,241,0.35)] animate-pulse",
    pending: "bg-surface2 border-border opacity-40",
    failed:  "bg-red-400/15 border-red-400",
    dlq:     "bg-red-400/15 border-red-400",
  };

  return (
    <div className={`${base} ${styles[state] ?? styles.pending}`}>
      {state === "active" ? (
        <svg
          className="w-4 h-4 text-accent animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      ) : (
        <span>{icon}</span>
      )}
    </div>
  );
};

// ── Connector line between nodes ──────────────────────────────

const ConnectorLine = ({ topState, bottomState }) => {
  const filled = topState === "done" || topState === "active";
  return (
    <div className="w-px h-10 mx-auto relative overflow-hidden bg-border">
      <div
        className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out
          ${filled ? "h-full" : "h-0"}
          ${topState === "active"
            ? "bg-gradient-to-b from-accent to-border"
            : "bg-green-400"
          }`}
      />
    </div>
  );
};

// ── Single timeline row ───────────────────────────────────────

const TimelineRow = ({ step, state, timestamp, isLast }) => {
  const labelStyles = {
    done:    "text-white",
    active:  "text-accent2",
    pending: "text-muted",
    failed:  "text-red-400",
    dlq:     "text-red-400",
  };

  return (
    <div className="flex gap-4">
      {/* Left: node + connector */}
      <div className="flex flex-col items-center">
        <TimelineNode state={state} icon={step.icon} />
        {!isLast && <ConnectorLine topState={state} />}
      </div>

      {/* Right: content */}
      <div className={`pb-8 pt-1 transition-all duration-300 ${isLast ? "pb-0" : ""}`}>
        <p className={`text-sm font-semibold transition-colors duration-300 ${labelStyles[state] ?? labelStyles.pending}`}>
          {step.label}
        </p>
        <p className="text-xs text-muted mt-0.5">{step.sub}</p>

        {/* Kafka topic badge */}
        <span className="inline-block mt-1.5 text-[10px] font-mono text-amber-400 bg-amber-400/8 border border-amber-400/20 px-2 py-0.5 rounded">
          {step.topic}
        </span>

        {/* Timestamp or spinner */}
        {state === "active" && (
          <p className="text-[11px] font-mono text-accent mt-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping inline-block" />
            Processing…
          </p>
        )}
        {state === "done" && timestamp && (
          <p className="text-[11px] font-mono text-green-400 mt-1.5">
            ✓ {timestamp}
          </p>
        )}
        {state === "pending" && (
          <p className="text-[11px] font-mono text-muted mt-1.5">
            Waiting…
          </p>
        )}
      </div>
    </div>
  );
};

// ── Failed / DLQ banners ──────────────────────────────────────

const FailedBanner = ({ isDLQ }) => (
  <div className="mt-4 flex items-start gap-3 bg-red-400/10 border border-red-400/25 rounded-lg px-4 py-3">
    <span className="text-lg">⚠️</span>
    <div>
      <p className="text-sm font-semibold text-red-400">
        {isDLQ ? "Moved to Dead Letter Queue" : "Delivery failed"}
      </p>
      <p className="text-xs text-muted mt-0.5">
        {isDLQ
          ? "This notification failed 3 times and has been moved to DLQ."
          : "Delivery failed. Notiq will retry automatically (up to 3 times)."}
      </p>
    </div>
  </div>
);

// ── Empty state ───────────────────────────────────────────────

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-14 gap-3 text-center">
    <span className="text-4xl opacity-25">📭</span>
    <p className="text-sm text-muted">No notification sent yet.</p>
    <p className="text-xs text-muted opacity-60">
      Fill the form and hit send to watch<br />the live pipeline.
    </p>
  </div>
);

// ── Main component ────────────────────────────────────────────

const DeliveryTimeline = ({ eventId, statusHistory, currentStatus, isConnected, error }) => {
  if (!eventId) return <EmptyState />;

  const isFailed = currentStatus === NOTIFICATION_STATUS.FAILED;
  const isDLQ    = currentStatus === NOTIFICATION_STATUS.DLQ;

  return (
    <div>
      {/* EventId badge */}
      <div className="mb-5 flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
          Event ID
        </span>
        <code className="text-[11px] font-mono text-accent2 bg-surface2 border border-border px-2 py-0.5 rounded">
          {eventId}
        </code>
      </div>

      {/* Steps */}
      <div>
        {TIMELINE_STEPS.map((step, i) => {
          const state     = getStepState(step.id, statusHistory, currentStatus);
          const timestamp = getTimestamp(step.id, statusHistory);
          const isLast    = i === TIMELINE_STEPS.length - 1;

          return (
            <TimelineRow
              key={step.id}
              step={step}
              state={state}
              timestamp={timestamp}
              isLast={isLast}
            />
          );
        })}
      </div>

      {/* Error from WS */}
      {error && (
        <div className="mt-4 text-xs text-red-400 font-mono bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {/* Failure / DLQ banner */}
      {(isFailed || isDLQ) && <FailedBanner isDLQ={isDLQ} />}

      {/* Delivered celebration */}
      {currentStatus === NOTIFICATION_STATUS.DELIVERED && (
        <div className="mt-4 flex items-start gap-3 bg-green-400/10 border border-green-400/25 rounded-lg px-4 py-3">
          <span className="text-lg">🎉</span>
          <div>
            <p className="text-sm font-semibold text-green-400">
              Notification delivered!
            </p>
            <p className="text-xs text-muted mt-0.5">
              Your message was successfully delivered to the recipient.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryTimeline;