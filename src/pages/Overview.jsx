import { useNavigate } from "react-router-dom";
import { Target, Clock, RefreshCw, Inbox, ShieldCheck, Rocket, Activity, Laptop, Settings, Database, Network, Lightbulb, Zap, Eye, Blocks, XCircle, Sparkles } from "lucide-react";
import { KafkaIcon } from "../components/icons/KafkaIcon";
import { MailIcon } from "../components/icons/MailIcon";

const KafkaText = () => (
  <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
    <KafkaIcon className="w-3.5 h-3.5" />
    Kafka
  </span>
);

const FeatureCard = ({ icon, title, description, color }) => (
  <div className="bg-white border border-border rounded-xl p-5 hover:border-accent/40 hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-4 ${color}`}>
      {icon}
    </div>
    <h3 className="text-sm font-semibold font-heading text-[#202124] mb-2">{title}</h3>
    <p className="text-xs text-muted leading-relaxed">{description}</p>
  </div>
);

const PrincipleCard = ({ title, description, icon, children }) => (
  <div className="bg-white border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:border-accent/30">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-accent text-sm border border-blue-100">
        {icon}
      </div>
      <h3 className="text-base font-bold font-heading text-[#202124]">{title}</h3>
    </div>
    <p className="text-xs text-muted leading-relaxed mb-4">{description}</p>
    {children}
  </div>
);

/* ── Architecture Node ── */
const ArchNode = ({ icon, label, sublabel, color, ring }) => (
  <div className="flex flex-col items-center gap-2.5 min-w-[100px]">
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border-2 ${color} ${ring} transition-all duration-300 hover:scale-105 hover:shadow-md`}>
      {icon}
    </div>
    <div className="text-center">
      <div className="text-xs font-bold text-[#202124] font-heading">{label}</div>
      {sublabel && <div className="text-[10px] text-muted font-mono mt-0.5">{sublabel}</div>}
    </div>
  </div>
);

/* ── Flow Arrow ── */
const FlowArrow = ({ label, color = "text-[#bdc1c6]", dashed = false }) => (
  <div className="flex flex-col items-center justify-center px-1 min-w-[60px]">
    {label && <span className="text-[9px] font-mono text-muted mb-1 whitespace-nowrap">{label}</span>}
    <svg className={`w-full h-3 ${color}`} fill="none" viewBox="0 0 80 12" preserveAspectRatio="none">
      <path
        d="M0,6 L74,6 M68,2 L75,6 L68,10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeDasharray={dashed ? "4,4" : "none"}
      />
    </svg>
  </div>
);

const Overview = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Event-Driven Architecture",
      color: "bg-indigo-50 text-indigo-600 border border-indigo-100",
      description: <span className="inline-block">Notifications are represented as immutable, durable events flowing through <KafkaText /> topics with full auditability.</span>
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Real-Time Status Tracking",
      color: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      description: "Observe notifications as they progress through RECEIVED, DISPATCHED, PROCESSING, and final delivery stages."
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: "Retry Mechanism",
      color: "bg-amber-50 text-amber-600 border border-amber-100",
      description: "Automatic retry pipeline handles transient delivery and API issues up to 3 times before graceful DLQ quarantine."
    },
    {
      icon: <Inbox className="w-5 h-5" />,
      title: "Dead Letter Queue",
      color: "bg-rose-50 text-rose-600 border border-rose-100",
      description: "Unrecoverable delivery events are isolated and saved to the DLQ for troubleshooting without stalling other messages."
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Idempotency Protection",
      color: "bg-cyan-50 text-cyan-600 border border-cyan-100",
      description: <span className="inline-block">Unique Event IDs prevent duplicate persistence or double-delivery of messages, matching at-least-once <KafkaText /> guarantees.</span>
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: "Multi-Channel Support",
      color: "bg-purple-50 text-purple-600 border border-purple-100",
      description: "A single notification request is dynamically routed to Email, with SMS, Push, WhatsApp, and Slack coming soon."
    },
    {
      icon: <Activity className="w-5 h-5" />,
      title: "Dashboard & Monitoring",
      color: "bg-teal-50 text-teal-600 border border-teal-100",
      description: "Unified web interface to review metrics, check retry queues, manage DLQ entries, and inspect historical audits."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 lg:py-14 space-y-16">

      {/* ── HERO SECTION ── */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        <div className="lg:col-span-3 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-accent font-mono text-[10px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Event-Driven Notification Infrastructure
          </div>
          <h1 className="text-4xl lg:text-5xl font-black font-heading text-[#202124] leading-[1.15] tracking-tight">
            Distribute notifications.<br />
            <span className="text-accent">
              Simplify at scale.
            </span>
          </h1>
          <p className="text-sm text-muted leading-relaxed max-w-xl">
            Notiq decouples notification logic from your business microservices.
            Publish events securely to Notiq and let the platform handle persistence,
            routing, multi-channel delivery, retries, and real-time observability.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/playground")}
              className="bg-accent hover:bg-accent2 text-white text-xs font-semibold px-5 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 group shadow-sm hover:shadow-md"
            >
              <span>Try the Playground</span>
              <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <button
              onClick={() => navigate("/docs")}
              className="bg-white hover:bg-surface2 text-[#202124] text-xs font-semibold px-5 py-3 rounded-lg border border-border transition-all duration-200 flex items-center gap-2 shadow-sm"
            >
              <span>Read developer docs</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </button>
          </div>
        </div>

        {/* Hero stat card */}
        {/* <div className="lg:col-span-2 bg-white border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <span className="text-xs font-semibold font-heading text-[#202124]">Platform at a Glance</span>
            <span className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
              Active
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[11px] text-muted mb-1.5 font-mono">
                <span>Avg Event Latency</span>
                <span className="text-accent font-semibold">&lt; 100ms</span>
              </div>
              <div className="w-full bg-[#f1f3f4] rounded-full h-1.5 overflow-hidden">
                <div className="bg-accent h-full w-[88%] rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-muted mb-1.5 font-mono">
                <span>Delivery Success Rate</span>
                <span className="text-emerald-600 font-semibold">99.98%</span>
              </div>
              <div className="w-full bg-[#f1f3f4] rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-full w-[98.5%] rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-muted mb-1.5 font-mono">
                <span>Current Kafka Lag</span>
                <span className="text-muted font-semibold">0 msgs</span>
              </div>
              <div className="w-full bg-[#f1f3f4] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#dadce0] h-full w-[3%] rounded-full" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-border">
            <div className="bg-surface2 border border-border rounded-lg p-2.5 text-center">
              <div className="text-base font-bold font-mono text-[#202124]">100K</div>
              <div className="text-[9px] text-muted uppercase tracking-wider">Max Req/Min</div>
            </div>
            <div className="bg-surface2 border border-border rounded-lg p-2.5 text-center">
              <div className="text-base font-bold font-mono text-[#202124]">3×</div>
              <div className="text-[9px] text-muted uppercase tracking-wider">Auto Retry</div>
            </div>
          </div>
        </div> */}
      </section>

      {/* ── WHY NOTIQ EXISTS ── */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-heading text-[#202124]">Why Notiq Exists</h2>
          <p className="text-xs text-muted">
            Most applications start by sending notifications directly from business logic. As systems grow, this anti-pattern breaks in production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Direct Sends Card */}
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-rose-600">
              <XCircle className="w-5 h-5" />
              <h3 className="text-sm font-semibold font-heading">Direct Sending Pain Points</h3>
            </div>
            <p className="text-xs text-rose-700/70">
              Embedding notification code for user registrations, order confirmations, marketing alerts, or OTPs creates brittle logic:
            </p>
            <ul className="space-y-2.5 text-xs text-rose-800 font-medium">
              <li className="flex items-start gap-2"><span className="text-rose-500 font-bold mt-0.5">·</span><span>Email and SMS provider APIs drop out or timeout unexpectedly.</span></li>
              <li className="flex items-start gap-2"><span className="text-rose-500 font-bold mt-0.5">·</span><span>Duplicate actions trigger double notifications to users.</span></li>
              <li className="flex items-start gap-2"><span className="text-rose-500 font-bold mt-0.5">·</span><span>Failed requests block active business threads or get silently dropped.</span></li>
              <li className="flex items-start gap-2"><span className="text-rose-500 font-bold mt-0.5">·</span><span>Zero lifecycle visibility once the send request leaves the application.</span></li>
            </ul>
          </div>

          {/* Notiq Card */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-accent">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-sm font-semibold font-heading">The Event-Driven Solution</h3>
            </div>
            <p className="text-xs text-blue-700/70">
              Notiq decouples notification requests. Every message becomes a durable event handled asynchronously:
            </p>
            <ul className="space-y-2.5 text-xs text-blue-900 font-medium">
              <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">·</span><span><strong>Reliable Buffer:</strong> Events are securely persisted before attempt begins.</span></li>
              <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">·</span><span><strong><KafkaText /> Backbone:</strong> Distributed consumers process items concurrently.</span></li>
              <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">·</span><span><strong>Auto Retries:</strong> Transient API outages are automatically retried.</span></li>
              <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">·</span><span><strong>Observability:</strong> Track notification lifecycle from received to delivered.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE DIAGRAM ── */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-heading text-[#202124]">System Architecture</h2>
          <p className="text-xs text-muted">
            High-performance, event-driven infrastructure routing and status auditing.
          </p>
        </div>

        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm overflow-hidden">
          {/* ── Main horizontal flow ── */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[820px]">

              {/* Top label row */}
              <div className="flex items-end justify-between px-6 mb-4">
                {["Client App","","Core Service","","Apache Kafka","","Dispatcher","","Channel Service"].map((label, i) => (
                  <div key={i} className={`text-[9px] font-mono font-bold uppercase tracking-widest text-center ${label ? "text-muted" : ""}`}
                       style={{ minWidth: i % 2 === 0 ? 110 : 60 }}>
                    {label}
                  </div>
                ))}
              </div>

              {/* Flow row */}
              <div className="flex items-center justify-between px-4 relative">

                {/* ── Client ── */}
                <ArchNode
                  icon={<Laptop className="w-7 h-7 text-[#5f6368]" />}
                  label="Client App"
                  sublabel="POST /notify"
                  color="bg-[#f8f9fa]"
                  ring="border-border"
                />

                <FlowArrow label="HTTP REST" dashed />

                {/* ── Core Service ── */}
                <div className="flex flex-col items-center gap-2.5 min-w-[110px] relative">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 border-2 border-accent flex items-center justify-center shadow-sm hover:scale-105 hover:shadow-md transition-all duration-300" style={{ boxShadow: "0 0 0 4px rgba(26,115,232,0.08)" }}>
                    <Settings className="w-7 h-7 text-accent" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-[#202124] font-heading">Core Service</div>
                    <div className="text-[10px] text-muted font-mono mt-0.5">Persist & Status</div>
                  </div>
                  {/* DB connector */}
                  <div className="absolute -bottom-[72px] flex flex-col items-center">
                    <div className="h-7 w-px bg-border" style={{ borderLeft: "1px dashed #dadce0" }} />
                    <div className="bg-white border border-border rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm mt-0.5">
                      <Database className="w-3 h-3 text-indigo-500" />
                      <span className="text-[9px] font-bold text-[#202124] font-mono">PostgreSQL</span>
                    </div>
                  </div>
                </div>

                <FlowArrow label="Publish Event" color="text-accent" />

                {/* ── Kafka ── */}
                <div className="flex flex-col items-center gap-2.5 min-w-[110px]">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center shadow-sm hover:scale-105 hover:shadow-md transition-all duration-300" style={{ boxShadow: "0 0 0 4px rgba(245,158,11,0.08)" }}>
                    <KafkaIcon className="w-9 h-9" style={{ filter: "none" }} />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-[#202124] font-heading flex items-center justify-center gap-1">
                      <KafkaIcon className="w-3 h-3" /> Kafka
                    </div>
                    <div className="text-[10px] text-muted font-mono mt-0.5">Event Backbone</div>
                  </div>
                </div>

                <FlowArrow label="Consume Event" color="text-amber-500" />

                {/* ── Dispatcher ── */}
                <ArchNode
                  icon={<Network className="w-7 h-7 text-purple-600" />}
                  label="Dispatcher"
                  sublabel="Routing Engine"
                  color="bg-purple-50"
                  ring="border-purple-200"
                />

                <FlowArrow label="Channel Topic" color="text-purple-400" dashed />

                {/* ── Channel Service ── */}
                <div className="flex flex-col items-center gap-2.5 min-w-[110px] relative">
                  <div className="w-16 h-16 rounded-2xl bg-red-50 border-2 border-red-200 flex items-center justify-center shadow-sm hover:scale-105 hover:shadow-md transition-all duration-300" style={{ boxShadow: "0 0 0 4px rgba(234,67,53,0.06)" }}>
                    <MailIcon className="w-9 h-9" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-[#202124] font-heading">Channel Service</div>
                    <div className="text-[10px] text-muted font-mono mt-0.5">Gmail SMTP API</div>
                  </div>
                  {/* Dashboard connector */}
                  <div className="absolute -bottom-[72px] flex flex-col items-center">
                    <div className="h-7 w-px bg-border" style={{ borderLeft: "1px dashed #dadce0" }} />
                    <div className="bg-white border border-border rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm mt-0.5">
                      <Activity className="w-3 h-3 text-teal-600" />
                      <span className="text-[9px] font-bold text-[#202124] font-mono">Dashboard</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Spacer for connectors below */}
              <div className="h-[72px]" />

              {/* ── Status feedback row ── */}
              <div className="mt-4 mx-4 border border-dashed border-accent/30 rounded-xl bg-blue-50/50 px-5 py-3 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                  </svg>
                </div>
                <p className="text-[10px] text-[#3c4043] leading-relaxed font-medium">
                  <span className="text-accent font-bold">Status feedback loop:</span>{" "}
                  Once Gmail SMTP completes or fails, Channel Service publishes to{" "}
                  <code className="text-[10px] text-accent font-mono bg-blue-100 px-1 py-0.5 rounded">notification-delivered</code> /{" "}
                  <code className="text-[10px] text-accent font-mono bg-blue-100 px-1 py-0.5 rounded">notification-failed</code>{" "}
                  topics. Core Service consumes these, updates PostgreSQL, and streams live WebSocket events to the Dashboard.
                </p>
              </div>

            </div>
          </div>

          {/* ── Topic legend ── */}
          <div className="mt-6 pt-5 border-t border-border">
            <p className="text-[9px] font-bold font-mono uppercase tracking-widest text-muted mb-3">Kafka Topics</p>
            <div className="flex flex-wrap gap-2">
              {[
                "notification-request",
                "notification-dispatched",
                "email-notifications",
                "notification-delivered",
                "notification-failed",
                "notification-retry",
                "notification-dlq",
              ].map((topic) => (
                <span key={topic} className="bg-amber-50 border border-amber-200 text-amber-700 font-mono text-[9px] font-semibold px-2 py-1 rounded-md">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE PRINCIPLES ── */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-heading text-[#202124]">Core Principles</h2>
          <p className="text-xs text-muted">
            Designed from the ground up for strict resilience, low latency, and zero event loss.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PrincipleCard title="Reliability" description="Every notification is persisted before processing begins. Notifications are never lost because of temporary service failures, db locks, or provider outages." icon={<ShieldCheck className="w-4 h-4" />} />

          <PrincipleCard title="Observability" description="Every notification is tracked through its complete lifecycle in real-time. Developers always know the exact state of a notification." icon={<Eye className="w-4 h-4" />}>
            <div className="bg-[#f8f9fa] border border-border rounded-xl p-3.5 mt-2 flex items-center justify-between text-[10px] font-mono font-semibold select-none overflow-x-auto gap-2">
              <span className="text-muted bg-white border border-border px-2 py-1 rounded shadow-sm">RECEIVED</span>
              <span className="text-muted">➔</span>
              <span className="text-accent bg-blue-50 border border-blue-100 px-2 py-1 rounded shadow-sm">DISPATCHED</span>
              <span className="text-muted">➔</span>
              <span className="text-amber-600 bg-amber-50 border border-amber-100 px-2 py-1 rounded shadow-sm">PROCESSING</span>
              <span className="text-muted">➔</span>
              <span className="text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded shadow-sm">DELIVERED</span>
              <span className="text-muted">or</span>
              <span className="text-rose-600 bg-rose-50 border border-rose-100 px-2 py-1 rounded shadow-sm">DLQ</span>
            </div>
          </PrincipleCard>

          <PrincipleCard title="Scalability" description={<>Uses <KafkaText /> as its messaging backbone. Services scale independently and notifications can be processed concurrently by multiple consumers. High throughput remains unchanged.</>} icon={<Zap className="w-4 h-4" />} />

          <PrincipleCard title="Extensibility" description="Adding new delivery channels does not require modifying existing producers. The routing layer dynamically redirects incoming notifications." icon={<Blocks className="w-4 h-4" />}>
            <div className="grid grid-cols-3 gap-2 mt-2 font-mono text-[9px] font-bold text-center">
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 py-1.5 rounded">EMAIL (Active)</div>
              <div className="bg-[#f8f9fa] border border-border text-muted py-1.5 rounded">SMS (Planned)</div>
              <div className="bg-[#f8f9fa] border border-border text-muted py-1.5 rounded">PUSH (Planned)</div>
              <div className="bg-[#f8f9fa] border border-border text-muted py-1.5 rounded">SLACK (Planned)</div>
              <div className="bg-[#f8f9fa] border border-border text-muted py-1.5 rounded">TEAMS (Planned)</div>
              <div className="bg-[#f8f9fa] border border-border text-muted py-1.5 rounded">WHATSAPP</div>
            </div>
          </PrincipleCard>
        </div>
      </section>

      {/* ── KEY FEATURES ── */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-heading text-[#202124]">Key Features</h2>
          <p className="text-xs text-muted">
            Everything you need for enterprise-grade delivery metrics out of the box.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-heading text-[#202124]">Technology Stack</h2>
          <p className="text-xs text-muted">
            Built using modern, cloud-native frameworks and messaging infrastructures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-border rounded-xl p-5 space-y-3.5 shadow-sm">
            <h3 className="text-xs font-bold font-mono text-accent uppercase tracking-wider">Frontend App</h3>
            <div className="space-y-2">
              {[
                { name: "React 19", role: "UI Component Architecture" },
                { name: "TypeScript", role: "Typed Component Interfaces" },
                { name: "Tailwind CSS", role: "Utility Design Engine" },
                { name: "Axios & Websockets", role: "REST Actions & Live Timelines" },
              ].map((stack) => (
                <div key={stack.name} className="flex justify-between items-center text-xs py-1.5 border-b border-border last:border-0">
                  <span className="text-[#202124] font-medium">{stack.name}</span>
                  <span className="text-[10px] text-muted">{stack.role}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl p-5 space-y-3.5 shadow-sm">
            <h3 className="text-xs font-bold font-mono text-indigo-500 uppercase tracking-wider">Backend Core</h3>
            <div className="space-y-2">
              {[
                { name: "Java 21", role: "Loom Virtual Threads Ready" },
                { name: "Spring Boot", role: "Microservice Framework" },
                { name: "Spring Data JPA", role: "PostgreSQL Database Layer" },
                { name: "Spring Kafka", role: "Publisher & Subscriber Engine" },
              ].map((stack) => (
                <div key={stack.name} className="flex justify-between items-center text-xs py-1.5 border-b border-border last:border-0">
                  <span className="text-[#202124] font-medium">{stack.name}</span>
                  <span className="text-[10px] text-muted">{stack.role}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl p-5 space-y-3.5 shadow-sm">
            <h3 className="text-xs font-bold font-mono text-amber-600 uppercase tracking-wider">Infrastructure</h3>
            <div className="space-y-2">
              {[
                { name: <KafkaText />, role: "Event broker & topic replay" },
                { name: "PostgreSQL", role: "Audit log & relational storage" },
                { name: "Docker", role: "Container orchestration" },
                { name: "Gmail SMTP", role: "Active relay delivery engine" },
              ].map((stack, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs py-1.5 border-b border-border last:border-0">
                  <span className="text-[#202124] font-medium">{stack.name}</span>
                  <span className="text-[10px] text-muted">{stack.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="bg-[#f8f9fa] border border-border rounded-2xl p-8 lg:p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
        <h2 className="text-2xl font-bold font-heading text-[#202124] mb-3">Our Vision</h2>
        <p className="text-sm text-muted leading-relaxed max-w-2xl mx-auto">
          Notiq is more than a simple notification sender. It is a complete notification infrastructure platform focused on reliability, observability, scalability, and operational visibility.
        </p>
        <div className="mt-4 text-xs font-mono text-accent font-semibold">
          Applications focus on business logic. Notiq handles the complexity of notification delivery.
        </div>
      </section>
    </div>
  );
};

export default Overview;