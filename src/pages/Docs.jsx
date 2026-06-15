import { useState } from "react";
import { CheckCircle2, Settings, Network, Mail, ShieldCheck, Database, Smartphone, Bell, RefreshCw, Palette, Hourglass, Lock, Activity, ArrowRight } from "lucide-react";
import { KafkaIcon } from "../components/icons/KafkaIcon";

const KafkaText = () => (
  <span className="inline-flex items-center gap-1 font-semibold text-amber-400/90">
    <KafkaIcon className="w-3.5 h-3.5" />
    Kafka
  </span>
);
const sections = [
  { id: "overview",           label: "Introduction & Overview" },
  { id: "components",         label: "System Components" },
  { id: "lifecycle",          label: "Notification Lifecycle" },
  { id: "idempotency",        label: "Idempotency & Deduplication" },
  { id: "retry",              label: "Retry & DLQ Strategy" },
  { id: "db-model",           label: "Database Model" },
  { id: "endpoints",          label: "API Reference" },
  { id: "design-decisions",    label: "Why Kafka & PostgreSQL" },
  { id: "scalability-roadmap", label: "Scalability & Roadmap" },
];

const CodeBlock = ({ children }) => (
  <pre className="bg-[#0b0f19] border border-border rounded-lg p-4 font-mono text-xs leading-relaxed overflow-x-auto my-3 text-indigo-300 relative group">
    {children}
  </pre>
);

const EndpointBox = ({ method, path, children }) => {
  const isPost = method === "POST";
  return (
    <div className="border border-border rounded-xl bg-surface2/30 overflow-hidden my-4">
      <div className="flex items-center gap-3 bg-surface border-b border-border/60 px-4 py-3">
        <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${isPost ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" : "text-sky-400 bg-sky-500/10 border border-sky-500/20"}`}>
          {method}
        </span>
        <span className="font-mono text-xs font-semibold text-white">{path}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

const ParamTable = ({ rows }) => (
  <div className="overflow-x-auto my-3 border border-border/60 rounded-lg">
    <table className="w-full text-xs border-collapse">
      <thead>
        <tr className="bg-surface2/55 border-b border-border text-muted uppercase tracking-wide text-[9px]">
          <th className="text-left px-3 py-2 font-bold font-heading">Field</th>
          <th className="text-left px-3 py-2 font-bold font-heading">Type</th>
          <th className="text-left px-3 py-2 font-bold font-heading">Required</th>
          <th className="text-left px-3 py-2 font-bold font-heading">Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-border/40 hover:bg-surface2/20 last:border-b-0">
            <td className="px-3 py-2.5 font-mono text-accent2">{row.field}</td>
            <td className="px-3 py-2.5 text-slate-400 font-mono text-[11px]">{row.type}</td>
            <td className="px-3 py-2.5">
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${row.required ? "text-rose-400 bg-rose-500/10 border border-rose-500/20" : "text-slate-500 bg-slate-800/40"}`}>
                {row.required ? "required" : "optional"}
              </span>
            </td>
            <td className="px-3 py-2.5 text-slate-300 leading-relaxed">{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Docs = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(`doc-${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-full w-full relative">
      
      {/* Sticky doc navigation */}
      <aside className="w-56 min-w-56 border-r border-border/80 py-8 px-4 sticky top-0 h-full overflow-y-auto hidden lg:block bg-surface/30 select-none">
        <p className="text-[10px] font-bold font-heading text-muted uppercase tracking-widest px-2.5 mb-3.5">
          Documentation
        </p>
        <div className="space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`block w-full text-left text-[11px] font-medium py-2 px-2.5 rounded-md transition-all duration-150 border-l-2
                ${activeSection === s.id
                  ? "border-accent bg-accent/5 text-white font-semibold"
                  : "border-transparent text-muted hover:text-slate-200 hover:border-slate-800 hover:bg-surface2/40"
                }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Doc Content Area */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-8 lg:py-10 max-w-4xl space-y-12">
        
        {/* SECTION: Overview */}
        <section id="doc-overview" className="space-y-4 pt-4">
          <h1 className="text-3xl font-black font-heading text-white">Notiq Developer Documentation</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Notiq is a distributed notification platform built using an event-driven microservices architecture. It decouples delivery logic from core services while providing robust operational guarantees.
          </p>
          <div className="bg-surface2/40 border border-border rounded-xl p-4 space-y-2.5">
            <h3 className="text-xs font-bold font-mono text-accent2 uppercase tracking-wide">Platform Guarantees:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Durable Persistence</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Event-Based Delivery</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Delivery Tracking</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Retry Orchestration</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> DLQ Handling</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Idempotency Keys</div>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Every service communicates through a shared contract known as the <code>NotificationEvent</code>. This schema acts as the standard communication unit across the entire system.
          </p>
        </section>

        <div className="h-px bg-border/60" />

        {/* SECTION: System Components */}
        <section id="doc-components" className="space-y-4">
          <h2 className="text-xl font-bold font-heading text-white">System Components</h2>
          <p className="text-xs text-muted">
            The platform consists of four primary decoupled units coordinating delivery.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Core Service */}
            <div className="bg-surface border border-border rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-accent2"><Settings className="w-5 h-5" /></span>
                <h3 className="text-sm font-bold font-heading text-white">Core Service</h3>
              </div>
              <ul className="space-y-1.5 text-xs text-muted list-disc list-inside">
                <li>Accept incoming API notification requests</li>
                <li>Persist notifications to DB for auditing</li>
                <li>Prevent duplicate transaction processing</li>
                <li>Orchestrate retry increments & DLQ transitions</li>
              </ul>
              <div className="pt-2 text-[10px] font-mono text-accent2">
                Database: <span className="text-slate-300">PostgreSQL</span>
              </div>
            </div>

            {/* Dispatcher Service */}
            <div className="bg-surface border border-border rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-purple-400"><Network className="w-5 h-5" /></span>
                <h3 className="text-sm font-bold font-heading text-white">Dispatcher Service</h3>
              </div>
              <ul className="space-y-1.5 text-xs text-muted list-disc list-inside">
                <li>Consume notification requests from <KafkaText /></li>
                <li>Perform channel-specific routing logic</li>
                <li>Publish dispatched status update events</li>
                <li>No channel-specific delivery code (routing only)</li>
              </ul>
            </div>

            {/* Email Service */}
            <div className="bg-surface border border-border rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400"><Mail className="w-5 h-5" /></span>
                <h3 className="text-sm font-bold font-heading text-white">Email Service</h3>
              </div>
              <ul className="space-y-1.5 text-xs text-muted list-disc list-inside">
                <li>Consume channel email requests</li>
                <li>Send emails out securely via Gmail SMTP</li>
                <li>Publish DELIVERED / FAILED events to <KafkaText /></li>
              </ul>
            </div>

            {/* Apache Kafka */}
            <div className="bg-surface border border-border rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-amber-400"><KafkaIcon className="w-5 h-5" /></span>
                <h3 className="text-sm font-bold font-heading text-white"><KafkaText /></h3>
              </div>
              <p className="text-xs text-muted">
                Acts as the communication backbone. The primary topics routing notifications:
              </p>
              <div className="flex flex-wrap gap-1.5 text-[9px] font-mono text-amber-400 font-semibold select-all">
                <span className="bg-amber-500/5 border border-amber-500/20 px-1.5 py-0.5 rounded">notification-request</span>
                <span className="bg-amber-500/5 border border-amber-500/20 px-1.5 py-0.5 rounded">notification-dispatched</span>
                <span className="bg-amber-500/5 border border-amber-500/20 px-1.5 py-0.5 rounded">email-notifications</span>
                <span className="bg-amber-500/5 border border-amber-500/20 px-1.5 py-0.5 rounded">notification-delivered</span>
                <span className="bg-amber-500/5 border border-amber-500/20 px-1.5 py-0.5 rounded">notification-failed</span>
                <span className="bg-amber-500/5 border border-amber-500/20 px-1.5 py-0.5 rounded">notification-retry</span>
                <span className="bg-amber-500/5 border border-amber-500/20 px-1.5 py-0.5 rounded">notification-dlq</span>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-border/60" />

        {/* SECTION: Lifecycle */}
        <section id="doc-lifecycle" className="space-y-4">
          <h2 className="text-xl font-bold font-heading text-white">Notification Lifecycle</h2>
          <p className="text-xs text-muted">
            The standard step progression of a notification event as it flows through the pipelines.
          </p>

          {/* Stepper timeline */}
          <div className="relative border-l border-border pl-6 ml-3 space-y-8 select-none">
            
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-[30px] top-0.5 w-4.5 h-4.5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-white">
                1
              </div>
              <h3 className="text-xs font-bold text-white">Publish request</h3>
              <p className="text-xs text-muted mt-0.5">Client sends payload. Core persists and sets status.</p>
              <div className="flex gap-2 mt-1.5 font-mono text-[9px]">
                <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">RECEIVED</span>
                <span className="text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">Topic: notification-request</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-[30px] top-0.5 w-4.5 h-4.5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-white">
                2
              </div>
              <h3 className="text-xs font-bold text-white">Dispatcher consumes</h3>
              <p className="text-xs text-muted mt-0.5">Dispatcher routes notification to the corresponding channel queue.</p>
              <div className="flex gap-2 mt-1.5 font-mono text-[9px]">
                <span className="text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded">DISPATCHED</span>
                <span className="text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">Topic: notification-dispatched</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-[30px] top-0.5 w-4.5 h-4.5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-white">
                3
              </div>
              <h3 className="text-xs font-bold text-white">Channel processes</h3>
              <p className="text-xs text-muted mt-0.5">Email service consumes the routing event, ready to relay via SMTP.</p>
              <div className="flex gap-2 mt-1.5 font-mono text-[9px]">
                <span className="text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">PROCESSING</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="absolute -left-[30px] top-0.5 w-4.5 h-4.5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-white">
                4
              </div>
              <h3 className="text-xs font-bold text-white">Final resolution</h3>
              <p className="text-xs text-muted mt-0.5">Delivery completes. In case of transient failure, the event is marked for retry.</p>
              <div className="flex flex-wrap gap-2 mt-1.5 font-mono text-[9px]">
                <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">DELIVERED</span>
                <span className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded">FAILED</span>
                <span className="text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">Topic: notification-delivered / notification-failed</span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative">
              <div className="absolute -left-[30px] top-0.5 w-4.5 h-4.5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-white">
                5
              </div>
              <h3 className="text-xs font-bold text-white">Retry flow</h3>
              <p className="text-xs text-muted mt-0.5">Core increment-retry logs are updated, and the message returns to processing status.</p>
              <div className="flex gap-2 mt-1.5 font-mono text-[9px]">
                <span className="text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">PROCESSING</span>
                <span className="text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">Topic: notification-retry</span>
              </div>
            </div>

            {/* Step 6 */}
            <div className="relative">
              <div className="absolute -left-[30px] top-0.5 w-4.5 h-4.5 rounded-full bg-red-950 border border-red-500 flex items-center justify-center text-[9px] font-bold text-red-400">
                !
              </div>
              <h3 className="text-xs font-bold text-red-400">Dead letter queue (DLQ)</h3>
              <p className="text-xs text-muted mt-0.5">If retryCount exceeds three attempts, the event goes to DLQ for developers to analyze.</p>
              <div className="flex gap-2 mt-1.5 font-mono text-[9px]">
                <span className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded">DLQ</span>
                <span className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded">Topic: notification-dlq</span>
              </div>
            </div>

          </div>
        </section>

        <div className="h-px bg-border/60" />

        {/* SECTION: Idempotency */}
        <section id="doc-idempotency" className="space-y-4">
          <h2 className="text-xl font-bold font-heading text-white">Idempotency & Deduplication</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            <KafkaText /> guarantees <em>at-least-once</em> delivery semantics, which means network blips can cause duplicate messages. 
            To prevent users from receiving duplicate notifications:
          </p>
          <div className="bg-surface border border-border rounded-xl p-5 space-y-3 text-xs leading-relaxed text-slate-300">
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Deduplication Safeguards:
            </div>
            <ol className="list-decimal list-inside space-y-1.5">
              <li>Every notification request must contain a unique Event ID (or it is generated on receipt).</li>
              <li>Before persistence, Core Service checks database existence: <code>existsByEventId(eventId)</code>.</li>
              <li>If the ID exists, the event is silently ignored (idempotent ignore), preventing double sends.</li>
            </ol>
          </div>
          <CodeBlock>
{`// Idempotency check in Spring Boot Core Repository
if (repository.existsByEventId(eventId)) {
    log.warn("Duplicate Event ID {} detected. Skipping persistence.", eventId);
    return;
}
repository.save(notification);`}
          </CodeBlock>
        </section>

        <div className="h-px bg-border/60" />

        {/* SECTION: Retry Strategy */}
        <section id="doc-retry" className="space-y-4">
          <h2 className="text-xl font-bold font-heading text-white">Retry Strategy</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Temporary failures (such as mail server latency, network timeout, or SMTP throttling) are caught automatically. The system increments the retry loop up to 3 times before abandoning.
          </p>

          {/* Retry loop flowchart */}
          <div className="bg-surface border border-border rounded-xl p-5 select-none overflow-x-auto">
            <div className="flex items-center justify-center gap-3 font-mono text-[10px] font-bold min-w-[500px]">
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-3 py-1.5 rounded">FAILED</div>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded">RETRY INCREMENT</div>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <div className="bg-surface2 border border-border text-slate-300 px-3 py-1.5 rounded">PROCESSING</div>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <div className="bg-indigo-500/10 border border-accent/20 text-accent2 px-3 py-1.5 rounded">ATTEMPT #1..3</div>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded">DLQ (Limit Reached)</div>
            </div>
          </div>
          
          <CodeBlock>
{`// Retry logic orchestration in core microservice
if (event.retryCount() < 3) {
    NotificationEvent retryEvent = event.incrementRetry();
    kafkaTemplate.send("notification-retry", retryEvent);
} else {
    log.error("Notification {} failed after max retries. Sending to DLQ.", event.notificationId());
    kafkaTemplate.send("notification-dlq", event.withStatus(NotificationStatus.DLQ));
}`}
          </CodeBlock>
        </section>

        <div className="h-px bg-border/60" />

        {/* SECTION: Database Model */}
        <section id="doc-db-model" className="space-y-4">
          <h2 className="text-xl font-bold font-heading text-white">Database Model</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            The Postgres <code>notifications</code> table represents the persistent state and operational source of truth.
          </p>

          {/* Table list */}
          <div className="border border-border/85 rounded-xl overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-surface2/60 border-b border-border/80 p-3 font-bold font-heading text-white tracking-wide">
              <div>Field Name</div>
              <div>Field Type</div>
              <div>Usage Role</div>
            </div>
            <div className="divide-y divide-border/40 font-mono">
              {[
                { name: "notificationId", type: "UUID (Primary Key)", role: "Unique record ID" },
                { name: "eventId",        type: "VARCHAR (Unique)",  role: "Idempotency validation key" },
                { name: "correlationId",  type: "VARCHAR",           role: "Trace events across microservices" },
                { name: "recipient",      type: "VARCHAR",           role: "Email address / target details" },
                { name: "sourceService",  type: "VARCHAR",           role: "Trigger service indicator" },
                { name: "channel",        type: "VARCHAR (Enum)",    role: "EMAIL | SMS | IN_APP" },
                { name: "priority",       type: "VARCHAR (Enum)",    role: "HIGH | MEDIUM | LOW" },
                { name: "status",         type: "VARCHAR (Enum)",    role: "RECEIVED | PROCESSING | DELIVERED | etc" },
                { name: "retryCount",     type: "INTEGER",           role: "Current retry index (0-3)" },
                { name: "eventType",      type: "VARCHAR",           role: "e.g. USER_REGISTERED" },
                { name: "payload",        type: "TEXT (JSONB)",      role: "Template parameters payload" },
                { name: "createdAt",      type: "TIMESTAMP",         role: "Creation audit timestamp" },
                { name: "updatedAt",      type: "TIMESTAMP",         role: "Last transaction timestamp" },
              ].map((field) => (
                <div key={field.name} className="grid grid-cols-3 p-3 text-slate-300 hover:bg-surface2/10">
                  <div className="text-accent2 font-semibold font-mono">{field.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{field.type}</div>
                  <div className="text-xs text-muted font-sans font-medium">{field.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-border/60" />

        {/* SECTION: API Endpoints */}
        <section id="doc-endpoints" className="space-y-4">
          <h2 className="text-xl font-bold font-heading text-white">API Reference</h2>
          <p className="text-xs text-muted">
            REST endpoints provided by Notiq for publishing and tracing notifications.
          </p>

          {/* Endpoint 1 */}
          <EndpointBox method="POST" path="/test/publish">
            <p className="text-xs text-slate-300 mb-3">
              Creates and publishes a new notification event to the platform.
            </p>
            <ParamTable
              rows={[
                { field: "recipient",     type: "string", required: true,  description: "Target email address" },
                { field: "channel",       type: "string", required: true,  description: "Must be EMAIL" },
                { field: "priority",      type: "string", required: true,  description: "HIGH · MEDIUM · LOW" },
                { field: "eventType",     type: "string", required: true,  description: "Identifier (e.g. USER_REGISTERED)" },
                { field: "payload",       type: "object", required: false, description: "Key-value data payload dictionary" },
                { field: "sourceService", type: "string", required: false, description: "Name of the calling system" },
              ]}
            />
            
            <h4 className="text-xs font-bold font-heading text-white mt-4 mb-2">JSON Request Body Schema</h4>
            <CodeBlock>
{`{
  "recipient": "user@gmail.com",
  "channel": "EMAIL",
  "priority": "HIGH",
  "eventType": "USER_REGISTERED",
  "payload": {
    "username": "developer1"
  },
  "sourceService": "playground"
}`}
            </CodeBlock>
          </EndpointBox>

          {/* Endpoint 2 */}
          <EndpointBox method="GET" path="/test/{eventId}">
            <p className="text-xs text-slate-300 mb-3">
              Retrieve real-time details, retries, and status for a single event ID.
            </p>
            <h4 className="text-xs font-bold font-heading text-slate-400 mt-2 mb-2">Example response:</h4>
            <CodeBlock>
{`{
  "eventId": "81d5832c-3df4-411a-8e2b-f81d5832c6bb",
  "recipient": "user@gmail.com",
  "channel": "EMAIL",
  "priority": "HIGH",
  "status": "DELIVERED",
  "retryCount": 0,
  "eventType": "USER_REGISTERED"
}`}
            </CodeBlock>
          </EndpointBox>

          {/* Endpoint 3 */}
          <EndpointBox method="GET" path="/test/all">
            <p className="text-xs text-slate-300">
              Fetch all notifications currently tracked by the database audit store.
            </p>
          </EndpointBox>
        </section>

        <div className="h-px bg-border/60" />

        {/* SECTION: Why Kafka & Postgres */}
        <section id="doc-design-decisions" className="space-y-6">
          <h2 className="text-xl font-bold font-heading text-white">Architectural Choices</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Why Kafka */}
            <div className="bg-surface2/30 border border-border rounded-xl p-6 space-y-3">
              <h3 className="text-sm font-bold font-heading text-white flex items-center gap-2">
                <span className="text-amber-400"><KafkaIcon className="w-4 h-4" /></span>
                Why <KafkaText />?
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                <KafkaText /> handles distributed message queue duties:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
                <li><strong>Durability:</strong> Events are committed to disks across cluster nodes.</li>
                <li><strong>Horizontal Scale:</strong> Partitions distribute consumers cleanly.</li>
                <li><strong>Event Replays:</strong> Easily inspect/replay previous outages.</li>
                <li><strong>Isolation:</strong> Producers write without waiting for consumers.</li>
              </ul>
            </div>

            {/* Why Postgres */}
            <div className="bg-surface2/30 border border-border rounded-xl p-6 space-y-3">
              <h3 className="text-sm font-bold font-heading text-white flex items-center gap-2">
                <span className="text-indigo-400"><Database className="w-4 h-4" /></span>
                Why PostgreSQL?
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                <KafkaText /> handles stream flow, while PostgreSQL holds static audit states:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
                <li><strong>Fast Dashboard Queries:</strong> Fast filters without replaying topics.</li>
                <li><strong>State Checks:</strong> Perfect for deduplication/idempotency audits.</li>
                <li><strong>Long-Term History:</strong> Clean auditing separate from stream retention limits.</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="h-px bg-border/60" />

        {/* SECTION: Scalability & Roadmap */}
        <section id="doc-scalability-roadmap" className="space-y-6">
          <h2 className="text-xl font-bold font-heading text-white">Scalability & Roadmap</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scalability card */}
            <div className="bg-surface border border-border rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold font-mono text-accent2 uppercase tracking-wide">Scale Architecture</h3>
              <p className="text-xs text-muted leading-relaxed">
                Notiq achieves low-latency parallel scale using:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
                <li><strong>Partitions:</strong> Distributed routing channels.</li>
                <li><strong>Consumer Groups:</strong> Scale instances to share throughput.</li>
                <li><strong>Stateless Cores:</strong> Run nodes in Kubernetes without sticky session locks.</li>
              </ul>
            </div>

            {/* Roadmap card */}
            <div className="bg-surface border border-border rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-wide">Future Roadmap</h3>
              <ul className="grid grid-cols-2 gap-x-2 gap-y-2 text-[11px] font-semibold text-slate-300">
                <li className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-muted" /> SMS Service</li>
                <li className="flex items-center gap-1.5"><Bell className="w-3.5 h-3.5 text-muted" /> Push Service</li>
                <li className="flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5 text-muted" /> WebSockets Sync</li>
                <li className="flex items-center gap-1.5"><Palette className="w-3.5 h-3.5 text-muted" /> Body Templates</li>
                <li className="flex items-center gap-1.5"><Hourglass className="w-3.5 h-3.5 text-muted" /> Rate Limiting</li>
                <li className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-muted" /> Multi-Tenant OAuth</li>
                <li className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-muted" /> Analytics Panel</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Docs;