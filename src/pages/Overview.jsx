import { useNavigate } from "react-router-dom";

const FeatureCard = ({ icon, title, description, color }) => (
  <div className="bg-surface border border-border rounded-xl p-5 hover:border-accent/40 transition-colors duration-200">
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-3 ${color}`}>
      {icon}
    </div>
    <h3 className="text-sm font-semibold text-white mb-1.5">{title}</h3>
    <p className="text-xs text-muted leading-relaxed">{description}</p>
  </div>
);

const FlowChip = ({ label, type }) => {
  const styles = {
    kafka:   "text-amber-400 border-amber-400/30 bg-amber-400/7",
    service: "text-accent2 border-accent/30 bg-accent/7",
  };
  return (
    <span className={`font-mono text-[11px] px-3 py-1.5 rounded-md border ${styles[type]}`}>
      {label}
    </span>
  );
};

const Overview = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "📨",
      title: "Event-driven core",
      color: "bg-accent/15",
      description:
        "Built on Kafka. Every notification is a durable event — persisted, tracked, and retried automatically up to 3 times before DLQ.",
    },
    {
      icon: "⚡",
      title: "Multi-channel routing",
      color: "bg-green-400/15",
      description:
        "One API, any channel. Email today — SMS and in-app notifications coming soon. The dispatcher handles routing transparently.",
    },
    {
      icon: "🔒",
      title: "Idempotent by design",
      color: "bg-amber-400/15",
      description:
        "Every event carries a unique notification ID. Duplicate deliveries are impossible even under Kafka at-least-once semantics.",
    },
  ];

  const flow = [
    { label: "POST /notify",               type: "service" },
    { label: "notification-request",        type: "kafka"   },
    { label: "core + dispatcher",           type: "service" },
    { label: "email-request",               type: "kafka"   },
    { label: "email-service",               type: "service" },
    { label: "notification-delivered",      type: "kafka"   },
  ];

  return (
    <div className="max-w-4xl mx-auto px-10 py-10">

      {/* Hero */}
      <p className="font-mono text-[11px] text-accent uppercase tracking-widest mb-3">
        Developer Notification Platform
      </p>
      <h1 className="text-3xl font-semibold text-white leading-snug mb-3">
        Send notifications.<br />
        <span className="text-accent2">Never write that code again.</span>
      </h1>
      <p className="text-sm text-muted leading-relaxed max-w-lg mb-8">
        Notiq is an event-driven notification infrastructure. POST your payload
        once — Notiq handles persistence, routing, delivery, and retry logic
        across all channels.
      </p>

      {/* CTA buttons */}
      <div className="flex items-center gap-3 mb-10">
        <button
          onClick={() => navigate("/playground")}
          className="bg-accent hover:bg-accent2 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-150 flex items-center gap-2"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Try the playground
        </button>
        <button
          onClick={() => navigate("/docs")}
          className="bg-surface2 hover:bg-border text-white text-sm font-semibold px-5 py-2.5 rounded-lg border border-border transition-colors duration-150 flex items-center gap-2"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          Read the docs
        </button>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>

      {/* Flow diagram */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          How a notification travels
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          {flow.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <FlowChip {...step} />
              {i < flow.length - 1 && (
                <span className="text-muted text-sm">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {[
          { value: "< 100ms", label: "Avg dispatch time" },
          { value: "3x",      label: "Auto retry on failure" },
          { value: "∞",       label: "Notifications supported" },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface border border-border rounded-xl p-5 text-center">
            <div className="text-2xl font-mono font-semibold text-accent2 mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-muted">{stat.label}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Overview;