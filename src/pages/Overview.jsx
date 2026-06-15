import { useNavigate } from "react-router-dom";
import { Target, Clock, RefreshCw, Inbox, ShieldCheck, Rocket, Activity, Laptop, Settings, Database, Network, Mail, Lightbulb, Zap, Eye, Blocks, XCircle, Sparkles } from "lucide-react";
import { KafkaIcon } from "../components/icons/KafkaIcon";

const KafkaText = () => (
  <span className="inline-flex items-center gap-1 font-semibold text-amber-400/90">
    <KafkaIcon className="w-3.5 h-3.5" />
    Kafka
  </span>
);
const FeatureCard = ({ icon, title, description, color }) => (
  <div className="bg-surface border border-border rounded-xl p-5 hover:border-accent/40 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-4 ${color} border border-white/5`}>
      {icon}
    </div>
    <h3 className="text-sm font-semibold font-heading text-white mb-2">{title}</h3>
    <p className="text-xs text-muted leading-relaxed">{description}</p>
  </div>
);

const PrincipleCard = ({ title, description, icon, children }) => (
  <div className="bg-surface border border-border rounded-xl p-6 transition-all duration-300 hover:border-slate-800">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent2 text-sm border border-accent/20">
        {icon}
      </div>
      <h3 className="text-base font-bold font-heading text-white">{title}</h3>
    </div>
    <p className="text-xs text-muted leading-relaxed mb-4">{description}</p>
    {children}
  </div>
);

const Overview = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Event-Driven Architecture",
      color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      description: <span className="inline-block">Notifications are represented as immutable, durable events flowing through <KafkaText /> topics with full auditability.</span>
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Real-Time Status Tracking",
      color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      description: "Observe notifications as they progress through RECEIVED, DISPATCHED, PROCESSING, and final delivery stages."
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: "Retry Mechanism",
      color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      description: "Automatic retry pipeline handles transient delivery and API issues up to 3 times before graceful DLQ quarantine."
    },
    {
      icon: <Inbox className="w-5 h-5" />,
      title: "Dead Letter Queue",
      color: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      description: "Unrecoverable delivery events are isolated and saved to the DLQ for troubleshooting without stalling other messages."
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Idempotency Protection",
      color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      description: <span className="inline-block">Unique Event IDs prevent duplicate persistence or double-delivery of messages, matching at-least-once <KafkaText /> guarantees.</span>
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: "Multi-Channel Support",
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      description: "A single notification request is dynamically routed to Email, with SMS, Push, WhatsApp, and Slack coming soon."
    },
    {
      icon: <Activity className="w-5 h-5" />,
      title: "Dashboard & Monitoring",
      color: "bg-teal-500/10 text-teal-400 border-teal-500/25",
      description: "Unified web interface to review metrics, check retry queues, manage DLQ entries, and inspect historical audits."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 lg:py-14 space-y-14">
      {/* ── HERO SECTION ── */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        <div className="lg:col-span-3 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent2 font-mono text-[10px] uppercase tracking-wider">
            <span><Sparkles className="w-3.5 h-3.5" /></span> Event-Driven Notification Infrastructure
          </div>
          <h1 className="text-4xl lg:text-5xl font-black font-heading text-white leading-[1.15] tracking-tight">
            Distribute notifications.<br />
            <span className="bg-gradient-to-r from-accent2 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Simplify at scale.
            </span>
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
            Notiq decouples notification logic from your business microservices. 
            Publish events securely to Notiq and let the platform handle persistence, 
            routing, multi-channel delivery, retries, and real-time observability.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/playground")}
              className="bg-accent hover:bg-accent2 text-white text-xs font-semibold px-5 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 group hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            >
              <span>Try the Playground</span>
              <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <button
              onClick={() => navigate("/docs")}
              className="bg-surface2 hover:bg-border text-white text-xs font-semibold px-5 py-3 rounded-lg border border-border transition-all duration-200 flex items-center gap-2"
            >
              <span>Read developer docs</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </button>
          </div>
        </div>

        {/* Hero Interactive Stat Board */}
        {/* <div className="lg:col-span-2 bg-gradient-to-br from-surface to-surface2 border border-border rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-4">
            <span className="text-xs font-semibold font-heading text-white">Live Pipeline Status</span>
            <span className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
              Active
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[11px] text-muted mb-1 font-mono">
                <span>Avg Event Latency</span>
                <span className="text-accent2">&lt; 100ms</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-border/40">
                <div className="bg-accent h-full w-[88%] rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-muted mb-1 font-mono">
                <span>Delivery Success Rate</span>
                <span className="text-emerald-400">99.98%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-border/40">
                <div className="bg-emerald-500 h-full w-[98.5%] rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-muted mb-1 font-mono">
                <span>Current Kafka Lag</span>
                <span className="text-slate-400">0 msgs</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-border/40">
                <div className="bg-slate-700 h-full w-[5%] rounded-full" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-border/60">
            <div className="bg-surface2/60 border border-border/50 rounded-lg p-2.5 text-center">
              <div className="text-base font-bold font-mono text-white">100,000</div>
              <div className="text-[9px] text-muted uppercase tracking-wider">Max Req/Min</div>
            </div>
            <div className="bg-surface2/60 border border-border/50 rounded-lg p-2.5 text-center">
              <div className="text-base font-bold font-mono text-white">3x</div>
              <div className="text-[9px] text-muted uppercase tracking-wider">Auto Retry</div>
            </div>
          </div>
        </div> */}
      </section>

      {/* ── WHY NOTIQ EXISTS ── */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-heading text-white">Why Notiq Exists</h2>
          <p className="text-xs text-muted">
            Most applications start by sending notifications directly from business logic. As systems grow, this anti-pattern breaks in production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Direct Sends Card */}
          <div className="bg-surface/40 border border-border rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-rose-400">
              <span className="text-lg"><XCircle className="w-5 h-5" /></span>
              <h3 className="text-sm font-semibold font-heading">Direct Sending Pain Points</h3>
            </div>
            <p className="text-xs text-muted">
              Embedding notification code for user registrations, order confirmations, marketing alerts, or OTPs creates brittle logic:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">·</span>
                <span>Email and SMS provider APIs drop out or timeout unexpectedly.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">·</span>
                <span>Duplicate actions trigger double notifications to users.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">·</span>
                <span>Failed requests block active business threads or get silently dropped.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">·</span>
                <span>Zero lifecycle visibility once the send request leaves the application.</span>
              </li>
            </ul>
          </div>

          {/* Notiq Card */}
          <div className="bg-indigo-500/[0.02] border border-accent/20 rounded-xl p-6 space-y-4 shadow-[0_0_30px_rgba(99,102,241,0.03)]">
            <div className="flex items-center gap-2.5 text-accent2">
              <span className="text-lg"><Sparkles className="w-5 h-5" /></span>
              <h3 className="text-sm font-semibold font-heading">The Event-Driven Solution</h3>
            </div>
            <p className="text-xs text-muted">
              Notiq decouples notification requests. Every message becomes a durable event handled asynchronously:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-accent2 font-bold">·</span>
                <span><strong>Reliable Buffer:</strong> Events are securely persisted before attempt begins.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent2 font-bold">·</span>
                <span><strong><KafkaText /> Backbone:</strong> Distributed consumers process items concurrently.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent2 font-bold">·</span>
                <span><strong>Auto Retries:</strong> Transient API outages are automatically retried.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent2 font-bold">·</span>
                <span><strong>Observability:</strong> Track notification lifecycle from received to delivered.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE OVERVIEW DIAGRAM ── */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-heading text-white">System Architecture</h2>
          <p className="text-xs text-muted">
            High-performance, event-driven infrastructure routing and status auditing.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 lg:p-8 flex flex-col space-y-8 relative">
          {/* React/SVG Flow Diagram */}
          <div className="overflow-x-auto w-full py-4 select-none">
            <div className="min-w-[800px] flex items-center justify-between px-4 relative">
              
              {/* Client node */}
              <div className="flex flex-col items-center space-y-2 w-36">
                <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 shadow-lg relative group hover:border-slate-500 transition-colors">
                  <Laptop className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-white">Client App</div>
                  <div className="text-[10px] text-muted font-mono mt-0.5">Sends Notification</div>
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="flex-1 flex flex-col items-center justify-center px-2 font-mono text-[10px] text-muted">
                <span className="mb-1">POST /notify</span>
                <svg className="w-full h-3 text-slate-600" fill="none" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,6 L95,6 M90,2 L96,6 L90,10" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
                </svg>
              </div>

              {/* Core Service Node */}
              <div className="flex flex-col items-center space-y-2 w-36 relative">
                <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border-2 border-accent flex items-center justify-center text-accent2 shadow-[0_0_20px_rgba(99,102,241,0.25)] relative">
                  <Settings className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-white">Core Service</div>
                  <div className="text-[10px] text-muted font-mono mt-0.5">Persist & Status</div>
                </div>
                {/* Database connector below */}
                <div className="absolute -bottom-20 flex flex-col items-center">
                  <div className="h-8 w-px bg-slate-600 border-dashed" />
                  <div className="bg-slate-900 border border-border rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg">
                    <Database className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[10px] font-bold text-white font-mono">PostgreSQL</span>
                  </div>
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="flex-1 flex flex-col items-center justify-center px-2 font-mono text-[10px] text-muted">
                <span className="mb-1">Publish Request</span>
                <svg className="w-full h-3 text-accent/60 animate-pulse" fill="none" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,6 L95,6 M90,2 L96,6 L90,10" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>

              {/* Apache Kafka Node */}
              <div className="flex flex-col items-center space-y-2 w-40">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border-2 border-amber-500/50 flex items-center justify-center text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
                  <KafkaIcon className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-white"><KafkaText /></div>
                  <div className="text-[10px] text-muted font-mono mt-0.5">Event Backbone</div>
                </div>
              </div>

              {/* Arrow 3 */}
              <div className="flex-1 flex flex-col items-center justify-center px-2 font-mono text-[10px] text-muted">
                <span className="mb-1">Consume Event</span>
                <svg className="w-full h-3 text-amber-500/60" fill="none" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,6 L95,6 M90,2 L96,6 L90,10" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>

              {/* Dispatcher Node */}
              <div className="flex flex-col items-center space-y-2 w-36">
                <div className="w-14 h-14 rounded-xl bg-purple-500/10 border-2 border-purple-500/50 flex items-center justify-center text-purple-400 shadow-lg">
                  <Network className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-white">Dispatcher</div>
                  <div className="text-[10px] text-muted font-mono mt-0.5">Routing Engine</div>
                </div>
              </div>

              {/* Arrow 4 */}
              <div className="flex-1 flex flex-col items-center justify-center px-2 font-mono text-[10px] text-muted">
                <span className="mb-1">To Channel Topic</span>
                <svg className="w-full h-3 text-purple-500/60" fill="none" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,6 L95,6 M90,2 L96,6 L90,10" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
                </svg>
              </div>

              {/* Channel Service Node */}
              <div className="flex flex-col items-center space-y-2 w-36 relative">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-white">Channel Service</div>
                  <div className="text-[10px] text-muted font-mono mt-0.5">Gmail SMTP API</div>
                </div>
                {/* Back to Core arrow below */}
                <div className="absolute -bottom-20 flex flex-col items-center">
                  <div className="bg-slate-900 border border-border rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg">
                    <Activity className="w-3.5 h-3.5 text-teal-400" />
                    <span className="text-[10px] font-bold text-white font-mono">Dashboard & Monitor</span>
                  </div>
                  <div className="h-8 w-px bg-slate-600 border-dashed" />
                </div>
              </div>

            </div>
          </div>
          
          <div className="h-10" /> {/* spacing for postgres & dashboard nodes */}

          <div className="bg-surface2/60 border border-border/80 rounded-xl p-4 text-xs text-slate-300 leading-relaxed font-medium mt-6">
            <span className="inline-block align-middle mr-1.5"><Lightbulb className="w-4 h-4 text-amber-400" /></span> <strong>How status flows back:</strong> Once Gmail SMTP completes or fails delivery, the <em>Channel Service</em> publishes status updates back to dedicated <KafkaText /> topics (<code>notification-delivered</code> / <code>notification-failed</code>). The <em>Core Service</em> consumes these updates, updates the PostgreSQL audit logs, and streams live websocket notifications straight to your dashboard monitoring client.
          </div>
        </div>
      </section>

      {/* ── CORE PRINCIPLES ── */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-heading text-white">Core Principles</h2>
          <p className="text-xs text-muted">
            Designed from the ground up for strict resilience, low latency, and zero event loss.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PrincipleCard title="Reliability" description="Every notification is persisted before processing begins. Notifications are never lost because of temporary service failures, db locks, or provider outages." icon={<ShieldCheck className="w-4 h-4" />} />
          
          <PrincipleCard title="Observability" description="Every notification is tracked through its complete lifecycle in real-time. Developers always know the exact state of a notification." icon={<Eye className="w-4 h-4" />}>
            {/* Status lifecycle step map */}
            <div className="bg-surface2/40 border border-border/50 rounded-xl p-3.5 mt-2 flex items-center justify-between text-[10px] font-mono font-semibold select-none overflow-x-auto gap-2">
              <span className="text-slate-400 bg-slate-800/40 border border-slate-700/30 px-2 py-1 rounded">RECEIVED</span>
              <span className="text-muted">➔</span>
              <span className="text-accent2 bg-accent/5 border border-accent/20 px-2 py-1 rounded">DISPATCHED</span>
              <span className="text-muted">➔</span>
              <span className="text-amber-400 bg-amber-500/5 border border-amber-500/20 px-2 py-1 rounded">PROCESSING</span>
              <span className="text-muted">➔</span>
              <span className="text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 px-2 py-1 rounded">DELIVERED</span>
              <span className="text-muted">or</span>
              <span className="text-rose-400 bg-rose-500/5 border border-rose-500/20 px-2 py-1 rounded">DLQ</span>
            </div>
          </PrincipleCard>

          <PrincipleCard title="Scalability" description={<>Uses <KafkaText /> as its messaging backbone. Services scale independently and notifications can be processed concurrently by multiple consumers. High throughput remains unchanged.</>} icon={<Zap className="w-4 h-4" />} />

          <PrincipleCard title="Extensibility" description="Adding new delivery channels does not require modifying existing producers. The routing layer dynamically redirects incoming notifications." icon={<Blocks className="w-4 h-4" />}>
            {/* Channel matrix */}
            <div className="grid grid-cols-3 gap-2 mt-2 font-mono text-[9px] font-bold text-center">
              <div className="bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 py-1.5 rounded">EMAIL (Active)</div>
              <div className="bg-slate-900 border border-border text-slate-500 py-1.5 rounded">SMS (Planned)</div>
              <div className="bg-slate-900 border border-border text-slate-500 py-1.5 rounded">PUSH (Planned)</div>
              <div className="bg-slate-900 border border-border text-slate-500 py-1.5 rounded">SLACK (Planned)</div>
              <div className="bg-slate-900 border border-border text-slate-500 py-1.5 rounded">TEAMS (Planned)</div>
              <div className="bg-slate-900 border border-border text-slate-500 py-1.5 rounded">WHATSAPP (Planned)</div>
            </div>
          </PrincipleCard>
        </div>
      </section>

      {/* ── KEY FEATURES ── */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-heading text-white">Key Features</h2>
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
          <h2 className="text-2xl font-bold font-heading text-white">Technology Stack</h2>
          <p className="text-xs text-muted">
            Built using modern, cloud-native frameworks and messaging infrastructures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Client / Web */}
          <div className="bg-surface border border-border rounded-xl p-5 space-y-3.5">
            <h3 className="text-xs font-bold font-mono text-accent2 uppercase tracking-wider">Frontend App</h3>
            <div className="space-y-2">
              {[
                { name: "React 19", role: "UI Component Architecture" },
                { name: "TypeScript", role: "Typed Component Interfaces" },
                { name: "Tailwind CSS", role: "Utility Design Engine" },
                { name: "Axios & Websockets", role: "REST Actions & Live Timelines" },
              ].map((stack) => (
                <div key={stack.name} className="flex justify-between items-center text-xs">
                  <span className="text-white font-medium">{stack.name}</span>
                  <span className="text-[10px] text-muted">{stack.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Core Engine */}
          <div className="bg-surface border border-border rounded-xl p-5 space-y-3.5">
            <h3 className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-wider">Backend Core</h3>
            <div className="space-y-2">
              {[
                { name: "Java 21", role: "Loom Virtual Threads Ready" },
                { name: "Spring Boot", role: "Microservice Framework" },
                { name: "Spring Data JPA", role: "PostgreSQL Database Layer" },
                { name: "Spring Kafka", role: "Publisher & Subscriber Engine" },
              ].map((stack) => (
                <div key={stack.name} className="flex justify-between items-center text-xs">
                  <span className="text-white font-medium">{stack.name}</span>
                  <span className="text-[10px] text-muted">{stack.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Storage & Messaging */}
          <div className="bg-surface border border-border rounded-xl p-5 space-y-3.5">
            <h3 className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">Infrastructure</h3>
            <div className="space-y-2">
              {[
                { name: <KafkaText />, role: "Event broker & topic replay" },
                { name: "PostgreSQL", role: "Audit log & relational storage" },
                { name: "Docker", role: "Container orchestration container" },
                { name: "Gmail SMTP", role: "Active relay delivery engine" },
              ].map((stack, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-white font-medium">{stack.name}</span>
                  <span className="text-[10px] text-muted">{stack.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="bg-gradient-to-br from-indigo-950/20 via-surface to-slate-950 border border-accent/10 rounded-2xl p-8 lg:p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <h2 className="text-2xl font-bold font-heading text-white mb-3">Our Vision</h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Notiq is more than a simple notification sender. It is a complete notification infrastructure platform focused on reliability, observability, scalability, and operational visibility.
        </p>
        <div className="mt-4 text-xs font-mono text-accent2 font-semibold">
          Applications focus on business logic. Notiq handles the complexity of notification delivery.
        </div>
      </section>
    </div>
  );
};

export default Overview;