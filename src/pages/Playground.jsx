import { useState } from "react";
import { sendNotification } from "../api/notification";
import { PRIORITY_OPTIONS, CHANNEL_OPTIONS } from "../constants";
import { useNotificationSocket } from "../hooks/useNotificationSocket";
import DeliveryTimeline from "../components/DeliveryTimeline";

// ── Small reusable field components ──────────────────────────

const FormLabel = ({ children }) => (
  <label className="block text-[11px] font-mono text-muted uppercase tracking-wider mb-1.5">
    {children}
  </label>
);

const FormInput = ({ ...props }) => (
  <input
    {...props}
    className="w-full bg-surface2 border border-border rounded-md px-3 py-2 text-sm text-white placeholder-muted outline-none focus:border-accent transition-colors duration-150"
  />
);

const FormSelect = ({ children, ...props }) => (
  <select
    {...props}
    className="w-full bg-surface2 border border-border rounded-md px-3 py-2 text-sm text-white outline-none focus:border-accent transition-colors duration-150 cursor-pointer appearance-none"
  >
    {children}
  </select>
);

// ── Key-value payload builder ─────────────────────────────────

const PayloadBuilder = ({ pairs, onChange }) => {
  const addRow = () => onChange([...pairs, { key: "", value: "" }]);
  const removeRow = (i) => onChange(pairs.filter((_, idx) => idx !== i));
  const updateRow = (i, field, val) => {
    const updated = pairs.map((p, idx) =>
      idx === i ? { ...p, [field]: val } : p
    );
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      {pairs.map((pair, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            placeholder="key"
            value={pair.key}
            onChange={(e) => updateRow(i, "key", e.target.value)}
            className="flex-1 bg-surface2 border border-border rounded-md px-3 py-2 text-sm text-white placeholder-muted outline-none focus:border-accent transition-colors font-mono"
          />
          <span className="text-muted text-xs font-mono">:</span>
          <input
            placeholder="value"
            value={pair.value}
            onChange={(e) => updateRow(i, "value", e.target.value)}
            className="flex-1 bg-surface2 border border-border rounded-md px-3 py-2 text-sm text-white placeholder-muted outline-none focus:border-accent transition-colors font-mono"
          />
          <button
            onClick={() => removeRow(i)}
            className="text-muted hover:text-red-400 transition-colors p-1"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ))}
      <button
        onClick={addRow}
        className="flex items-center gap-1.5 text-xs text-accent2 hover:text-white transition-colors mt-1"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add field
      </button>
    </div>
  );
};

// ── Request preview ───────────────────────────────────────────

const RequestPreview = ({ payload }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
          Request preview
        </span>
        <button
          onClick={copy}
          className="text-[10px] font-mono text-muted hover:text-accent2 transition-colors flex items-center gap-1"
        >
          {copied ? (
            <span className="text-green-400">✓ Copied</span>
          ) : (
            <>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="bg-[#0d1424] border border-border rounded-lg p-3 text-xs font-mono text-slate-300 overflow-x-auto max-h-40 leading-relaxed">
        {JSON.stringify(payload, null, 2)}
      </pre>
    </div>
  );
};

// ── Main Playground page ──────────────────────────────────────

const Playground = () => {
  const [eventType, setEventType] = useState("USER_REGISTERED");
  const [recipient, setRecipient] = useState("");
  const [channel,   setChannel]   = useState("EMAIL");
  const [priority,  setPriority]  = useState("HIGH");
  const [pairs,     setPairs]     = useState([{ key: "username", value: "" }]);

  const [eventId,   setEventId]   = useState(null);
  const [sending,   setSending]   = useState(false);
  const [sendError, setSendError] = useState(null);

  const { statusHistory, currentStatus, isConnected, error: wsError } =
    useNotificationSocket(eventId);

  const buildPayload = () =>
    pairs.reduce((acc, { key, value }) => {
      if (key.trim()) acc[key.trim()] = value;
      return acc;
    }, {});

  const requestBody = {
    eventType,
    recipient,
    channel,
    priority,
    payload:       buildPayload(),
    sourceService: "playground",
  };

  const handleSend = async () => {
    if (!recipient.trim()) return;
    setSending(true);
    setSendError(null);
    setEventId(null);
    try {
      const id = await sendNotification(requestBody);
      setEventId(id);
    } catch (err) {
      setSendError(
        err?.response?.data?.message ?? "Failed to send. Is your backend running?"
      );
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setEventId(null);
    setSendError(null);
    setRecipient("");
    setPairs([{ key: "username", value: "" }]);
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      {/* Header */}
      <p className="font-mono text-[11px] text-accent uppercase tracking-widest mb-2">
        Interactive Playground
      </p>
      <h2 className="text-xl font-semibold text-white mb-1">
        Send a test notification
      </h2>
      <p className="text-sm text-muted mb-8">
        Fill in the form and watch the notification travel through Notiq's
        pipeline in real time.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* ── Left: Form panel ── */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm font-semibold text-white">
              Compose notification
            </span>
          </div>

          <div className="mb-4">
            <FormLabel>Recipient email</FormLabel>
            <FormInput
              type="email"
              placeholder="you@gmail.com"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              disabled={sending}
            />
          </div>

          <div className="mb-4">
            <FormLabel>Event type</FormLabel>
            <FormInput
              type="text"
              placeholder="e.g. USER_REGISTERED"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              disabled={sending}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <FormLabel>Channel</FormLabel>
              <FormSelect
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                disabled={sending}
              >
                {CHANNEL_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value} disabled={!c.available}>
                    {c.label}
                  </option>
                ))}
              </FormSelect>
            </div>
            <div>
              <FormLabel>Priority</FormLabel>
              <FormSelect
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                disabled={sending}
              >
                {PRIORITY_OPTIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </FormSelect>
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <FormLabel>Payload</FormLabel>
              <span className="text-[10px] text-amber-400 font-mono bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                not yet wired to email
              </span>
            </div>
            <PayloadBuilder pairs={pairs} onChange={setPairs} />
          </div>

          {sendError && (
            <div className="mb-4 text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2 font-mono">
              {sendError}
            </div>
          )}

          {!eventId ? (
            <button
              onClick={handleSend}
              disabled={sending || !recipient.trim()}
              className="w-full bg-accent hover:bg-accent2 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors duration-150 flex items-center justify-center gap-2"
            >
              {sending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Send notification
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="w-full bg-surface2 hover:bg-border text-white text-sm font-semibold px-4 py-2.5 rounded-lg border border-border transition-colors duration-150 flex items-center justify-center gap-2"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
              </svg>
              Send another
            </button>
          )}

          <RequestPreview payload={requestBody} />
        </div>

        {/* ── Right: Timeline panel ── */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm font-semibold text-white">
                Delivery timeline
              </span>
            </div>
            {eventId && (
              <div className={`flex items-center gap-1.5 text-[10px] font-mono px-2 py-1 rounded-full border
                ${isConnected
                  ? "text-green-400 bg-green-400/10 border-green-400/25"
                  : "text-amber-400 bg-amber-400/10 border-amber-400/25"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-green-400 animate-pulse" : "bg-amber-400"}`} />
                {isConnected ? "Live" : "Connecting…"}
              </div>
            )}
          </div>

          {/* ✅ Real DeliveryTimeline — no stub */}
          <DeliveryTimeline
            eventId={eventId}
            statusHistory={statusHistory}
            currentStatus={currentStatus}
            isConnected={isConnected}
            error={wsError}
          />
        </div>

      </div>
    </div>
  );
};

export default Playground;