import { Inbox, Send, Settings, CheckCircle2, AlertTriangle, Mailbox } from "lucide-react";
import { TIMELINE_STEPS, NOTIFICATION_STATUS } from "../constants";
import { KafkaIcon } from "./icons/KafkaIcon";

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
  const base = "w-9 h-9 rounded-full border flex items-center justify-center text-sm flex-shrink-0 transition-all duration-500 z-10";

  const styles = {
    done:    "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]",
    active:  "bg-accent/15 border-accent text-accent animate-pulse shadow-[0_0_14px_rgba(99,102,241,0.25)]",
    pending: "bg-surface2/60 border-border text-slate-600 opacity-55",
    failed:  "bg-rose-500/10 border-rose-500 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.15)]",
    dlq:     "bg-rose-500/10 border-rose-500 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.15)]",
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
        <span>
          {icon === "inbox" && <Inbox className="w-4 h-4" />}
          {icon === "send" && <Send className="w-4 h-4" />}
          {icon === "settings" && <Settings className="w-4 h-4" />}
          {icon === "check-circle" && <CheckCircle2 className="w-4 h-4" />}
        </span>
      )}
    </div>
  );
};

// ── Connector line between nodes ──────────────────────────────

const ConnectorLine = ({ topState, bottomState }) => {
  const filled = topState === "done" || topState === "active";
  return (
    <div className="w-[1px] h-10 mx-auto relative overflow-hidden bg-border">
      <div
        className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out
          ${filled ? "h-full" : "h-0"}
          ${topState === "active"
            ? "bg-gradient-to-b from-accent to-border"
            : "bg-emerald-500"
          }`}
      />
    </div>
  );
};

// ── Single timeline row ───────────────────────────────────────

const TimelineRow = ({ step, state, timestamp, isLast }) => {
  const labelStyles = {
    done:    "text-green-400 font-semibold",
    active:  "text-accent2 font-bold",
    pending: "text-muted font-medium",
    failed:  "text-rose-400 font-bold",
    dlq:     "text-rose-400 font-bold",
  };

  return (
    <div className="flex gap-4">
      {/* Left: node + connector */}
      <div className="flex flex-col items-center">
        <TimelineNode state={state} icon={step.icon} />
        {!isLast && <ConnectorLine topState={state} />}
      </div>

      {/* Right: content */}
      <div className={`pb-8 pt-0.5 transition-all duration-300 ${isLast ? "pb-0" : ""}`}>
        <p className={`text-xs transition-colors duration-300 ${labelStyles[state] ?? labelStyles.pending}`}>
          {step.label}
        </p>
        <p className="text-[11px] text-muted mt-0.5 leading-relaxed">{step.sub}</p>

        {/* Kafka topic badge */}
        <span className="inline-flex items-center gap-1.5 mt-2 text-[9px] font-mono font-semibold text-amber-400 bg-amber-500/5 border border-amber-500/20 px-2 py-0.5 rounded">
          <KafkaIcon className="w-3 h-3 text-amber-400" />
          {step.topic}
        </span>

        {/* Timestamp or spinner */}
        {state === "active" && (
          <p className="text-[10px] font-mono text-accent mt-2 flex items-center gap-1.5 font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping inline-block" />
            Processing…
          </p>
        )}
        {state === "done" && timestamp && (
          <p className="text-[10px] font-mono text-emerald-400 mt-2 font-bold">
            ✓ {timestamp}
          </p>
        )}
        {state === "pending" && (
          <p className="text-[10px] font-mono text-muted mt-2 font-bold uppercase tracking-wider">
            Waiting…
          </p>
        )}
      </div>
    </div>
  );
};

// ── Failed / DLQ banners ──────────────────────────────────────

const FailedBanner = ({ isDLQ }) => (
  <div className="mt-5 flex items-start gap-3 bg-rose-500/5 border border-rose-500/20 rounded-xl px-4 py-3.5">
    <span className="text-base text-rose-400 mt-0.5">
      <AlertTriangle className="w-5 h-5" />
    </span>
    <div>
      <p className="text-xs font-bold font-heading text-rose-400">
        {isDLQ ? "Moved to Dead Letter Queue" : "Delivery Failed"}
      </p>
      <p className="text-[11px] text-muted mt-1 leading-relaxed">
        {isDLQ
          ? "This notification failed 3 times and has been moved to DLQ."
          : "Delivery failed. Notiq will retry automatically (up to 3 times)."}
      </p>
    </div>
  </div>
);

// ── Empty state ───────────────────────────────────────────────

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 gap-3 text-center select-none">
    <span className="text-muted opacity-40">
      <Mailbox className="w-10 h-10" />
    </span>
    <p className="text-xs font-semibold text-muted">No notification sent yet.</p>
    <p className="text-[11px] text-muted opacity-60 leading-relaxed">
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
      <div className="mb-6 flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-bold font-mono text-muted uppercase tracking-wider">
          Event ID
        </span>
        <code className="text-[11px] font-mono text-accent2 bg-surface2 border border-border px-2 py-0.5 rounded select-all font-semibold">
          {eventId}
        </code>
      </div>

      {/* Steps */}
      <div className="space-y-1">
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
        <div className="mt-5 text-xs text-rose-400 font-mono bg-rose-500/5 border border-rose-500/20 rounded-lg px-3 py-2.5">
          {error}
        </div>
      )}

      {/* Failure / DLQ banner */}
      {(isFailed || isDLQ) && <FailedBanner isDLQ={isDLQ} />}

      {/* Delivered celebration */}
      {currentStatus === NOTIFICATION_STATUS.DELIVERED && (
        <div className="mt-5 flex items-start gap-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-4 py-3.5">
          <span className="text-base">🎉</span>
          <div>
            <p className="text-xs font-bold font-heading text-emerald-400">
              Notification Delivered!
            </p>
            <p className="text-[11px] text-muted mt-1 leading-relaxed">
              Your message was successfully delivered to the recipient.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryTimeline;