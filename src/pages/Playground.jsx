import { useState } from "react";
import { sendNotification } from "../api/notification";
import { PRIORITY_OPTIONS, CHANNEL_OPTIONS, EVENT_TYPE_OPTIONS } from "../constants";
import { useNotificationSocket } from "../hooks/useNotificationSocket";
import DeliveryTimeline from "../components/DeliveryTimeline";

// ── Small reusable field components ──────────────────────────

const FormLabel = ({ children }) => (
  <label className="block text-[10px] font-bold font-mono text-muted uppercase tracking-wider mb-1.5">
    {children}
  </label>
);

const FormInput = ({ ...props }) => (
  <input
    {...props}
    className="w-full bg-surface2/60 border border-border rounded-lg px-3.5 py-2.5 text-xs text-black placeholder-slate-700 outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all duration-150 font-medium"
  />
);

const FormSelect = ({ children, ...props }) => (
  <div className="relative">
    <select
      {...props}
      className="w-full bg-surface2/60 border border-border rounded-lg px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20 transition-all duration-150 cursor-pointer appearance-none font-medium"
    >
      {children}
    </select>
    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-muted">
      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
  </div>
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
            className="flex-1 bg-surface2/60 border border-border rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-700 outline-none focus:border-accent/60 transition-all font-mono"
          />
          <span className="text-muted text-xs font-mono">:</span>
          <input
            placeholder="value"
            value={pair.value}
            onChange={(e) => updateRow(i, "value", e.target.value)}
            className="flex-1 bg-surface2/60 border border-border rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-700 outline-none focus:border-accent/60 transition-all font-mono"
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
        className="flex items-center gap-1.5 text-xs text-accent2 hover:text-white transition-colors mt-1 font-semibold"
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
        <span className="text-[10px] font-bold font-mono text-muted uppercase tracking-wider">
          Request Payload JSON
        </span>
        <button
          onClick={copy}
          className="text-[10px] font-mono text-accent2 hover:text-white transition-colors flex items-center gap-1 font-semibold"
        >
          {copied ? (
            <span className="text-emerald-400">✓ Copied</span>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy JSON
            </>
          )}
        </button>
      </div>
      <pre className="bg-[#0b0f19] border border-border rounded-lg p-3 text-xs font-mono text-slate-300 overflow-x-auto max-h-40 leading-relaxed">
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
        err?.response?.data?.message ?? "Failed to send, Seems to be the Server is still spinning up. Please try again in a moment."
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
    <div className="max-w-5xl mx-auto px-6 py-10 lg:py-12">
      <span className="text-[15px] text-amber-400 font-mono bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
        Still SMS and In-App channels are not wired.Only Email channel is functional for now. Please use EMAIL channel to test the Playground.
      </span>
      {/* Header */}
      <div className="space-y-1 mb-8">
        <p className="font-mono text-[10px] text-accent uppercase tracking-widest font-bold">
          Interactive Playground
        </p>
        <h2 className="text-2xl font-bold font-heading text-white">
          Send a test notification
        </h2>
        <p className="text-xs text-muted">
          Fill in the form and watch the notification travel through Notiq's pipeline in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* ── Left: Form panel ── */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            <span className="text-xs font-bold font-heading text-black uppercase tracking-wider">
              Compose Notification
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
            <FormSelect
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              disabled={sending}
            >
              {EVENT_TYPE_OPTIONS.map((type) => (
                <option key={type} value={type} className="bg-surface2">
                  {type}
                </option>
              ))}
            </FormSelect>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <FormLabel>Channel</FormLabel>
              <FormSelect
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                disabled={sending}
              >
                {CHANNEL_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value} className="bg-surface2" disabled={!c.available}>
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
                  <option key={p} className="bg-surface2" value={p}>{p}</option>
                ))}
              </FormSelect>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-1.5">
              <FormLabel>Payload</FormLabel>
              {/* <span className="text-[9px] text-amber-400 font-mono bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                not yet wired to email
              </span> */}
            </div>
            <PayloadBuilder pairs={pairs} onChange={setPairs} />
          </div>

          {sendError && (
            <div className="mb-4 text-xs text-rose-400 bg-rose-500/5 border border-rose-500/20 rounded-lg px-3 py-2.5 font-mono">
              {sendError}
            </div>
          )}

          {!eventId ? (
            <button
              onClick={handleSend}
              disabled={sending || !recipient.trim()}
              className="w-full bg-gradient-to-r from-accent to-indigo-600 hover:from-accent hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(99,102,241,0.25)]"
            >
              {sending ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
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
                  Send Notification
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="w-full bg-surface2 hover:bg-border text-white text-xs font-semibold px-4 py-3 rounded-lg border border-border transition-all duration-150 flex items-center justify-center gap-2"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
              </svg>
              Send Another
            </button>
          )}

          <RequestPreview payload={requestBody} />
        </div>

        {/* ── Right: Timeline panel ── */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold font-heading text-black uppercase tracking-wider">
                Delivery Timeline
              </span>
            </div>
            {eventId && (
              <div className={`flex items-center gap-1.5 text-[9px] font-mono px-2.5 py-1 rounded-full border font-semibold
                ${isConnected
                  ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                  : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                }`}
              >
                <span className={`w-1 h-1 rounded-full ${isConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
                {isConnected ? "LIVE" : "CONNECTING…"}
              </div>
            )}
          </div>

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