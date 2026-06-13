import { useState } from "react";

const sections = [
  { id: "introduction",  label: "Introduction"   },
  { id: "endpoint",      label: "API Endpoint"   },
  { id: "schema",        label: "NotificationEvent" },
  { id: "lifecycle",     label: "Lifecycle"      },
  { id: "retry",         label: "Retry & DLQ"    },
  { id: "channels",      label: "Channels"       },
];

const CodeBlock = ({ children }) => (
  <pre className="bg-[#0d1424] border border-border rounded-lg p-4 font-mono text-xs leading-relaxed overflow-x-auto my-3 text-slate-300 whitespace-pre-wrap">
    {children}
  </pre>
);

const EndpointRow = ({ method, path }) => (
  <div className="flex items-center gap-3 bg-[#0d1424] border border-border rounded-lg px-4 py-3 my-3">
    <span className="font-mono text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded">
      {method}
    </span>
    <span className="font-mono text-sm text-white">{path}</span>
  </div>
);

const ParamTable = ({ rows }) => (
  <div className="overflow-x-auto my-3">
    <table className="w-full text-xs border-collapse">
      <thead>
        <tr className="bg-surface2 text-muted uppercase tracking-wide text-[10px]">
          <th className="text-left px-3 py-2 font-medium">Field</th>
          <th className="text-left px-3 py-2 font-medium">Type</th>
          <th className="text-left px-3 py-2 font-medium">Required</th>
          <th className="text-left px-3 py-2 font-medium">Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-border">
            <td className="px-3 py-2 font-mono text-accent2">{row.field}</td>
            <td className="px-3 py-2 text-muted">{row.type}</td>
            <td className={`px-3 py-2 font-mono ${row.required ? "text-red-400" : "text-muted"}`}>
              {row.required ? "required" : "optional"}
            </td>
            <td className="px-3 py-2 text-slate-300">{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StatusTable = ({ rows }) => (
  <div className="overflow-x-auto my-3">
    <table className="w-full text-xs border-collapse">
      <thead>
        <tr className="bg-surface2 text-muted uppercase tracking-wide text-[10px]">
          <th className="text-left px-3 py-2 font-medium">Status</th>
          <th className="text-left px-3 py-2 font-medium">Set by</th>
          <th className="text-left px-3 py-2 font-medium">Kafka topic</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-border">
            <td className="px-3 py-2 font-mono text-green-400">{row.status}</td>
            <td className="px-3 py-2 text-slate-300">{row.setBy}</td>
            <td className="px-3 py-2 font-mono text-amber-400 text-[11px]">{row.topic}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ChannelTable = ({ rows }) => (
  <div className="overflow-x-auto my-3">
    <table className="w-full text-xs border-collapse">
      <thead>
        <tr className="bg-surface2 text-muted uppercase tracking-wide text-[10px]">
          <th className="text-left px-3 py-2 font-medium">Channel</th>
          <th className="text-left px-3 py-2 font-medium">Status</th>
          <th className="text-left px-3 py-2 font-medium">Kafka topic</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-border">
            <td className="px-3 py-2 font-mono text-white">{row.channel}</td>
            <td className={`px-3 py-2 font-semibold ${row.available ? "text-green-400" : "text-muted"}`}>
              {row.available ? "✓ Available" : "Coming soon"}
            </td>
            <td className={`px-3 py-2 font-mono text-[11px] ${row.available ? "text-amber-400" : "text-muted"}`}>
              {row.topic}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Docs = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(`doc-${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex gap-0 h-full">

      {/* Sticky doc sidenav */}
      <aside className="w-44 min-w-44 border-r border-border py-6 px-4 sticky top-0 h-full overflow-y-auto hidden md:block">
        <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-3">
          On this page
        </p>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`block w-full text-left text-xs py-1.5 pl-2 border-l-2 mb-0.5 transition-all duration-150
              ${activeSection === s.id
                ? "border-accent text-white"
                : "border-transparent text-muted hover:text-slate-300 hover:border-border"
              }`}
          >
            {s.label}
          </button>
        ))}
      </aside>

      {/* Doc content */}
      <div className="flex-1 overflow-y-auto px-10 py-8 max-w-3xl">

        {/* Introduction */}
        <section id="doc-introduction" className="mb-10">
          <h2 className="text-lg font-semibold text-white pb-2 border-b border-border mb-4">
            Introduction
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-3">
            Notiq is a developer-first notification platform built on an
            event-driven architecture. You send one HTTP request — Notiq handles
            persistence, routing, delivery, and retry logic across all channels.
          </p>
          <p className="text-sm text-muted leading-relaxed">
            The entire system speaks through a shared contract called{" "}
            <code className="font-mono text-accent2 text-xs bg-surface2 px-1.5 py-0.5 rounded">
              NotificationEventProducer
            </code>
            . Every service that produces or consumes events conforms to this
            contract, making the system easy to extend without breaking existing
            consumers.
          </p>
        </section>

        {/* API Endpoint */}
        <section id="doc-endpoint" className="mb-10">
          <h2 className="text-lg font-semibold text-white pb-2 border-b border-border mb-4">
            API Endpoint
          </h2>
          <EndpointRow method="POST" path="/api/v1/notify" />
          <h3 className="text-sm font-semibold text-white mt-5 mb-2">Request body</h3>
          <ParamTable
            rows={[
              { field: "recipient", type: "string", required: true,  description: "Email address or user ID" },
              { field: "channel",   type: "enum",   required: true,  description: "EMAIL · SMS · IN_APP" },
              { field: "subject",   type: "string", required: false, description: "Email subject line" },
              { field: "body",      type: "string", required: true,  description: "Message content" },
              { field: "metadata",  type: "object", required: false, description: "Arbitrary key-value pairs" },
            ]}
          />
          <h3 className="text-sm font-semibold text-white mt-5 mb-2">Example request</h3>
          <CodeBlock>{`curl -X POST https://api.notiq.dev/v1/notify \\
  -H "Content-Type: application/json" \\
  -d '{
    "recipient": "user@example.com",
    "channel": "EMAIL",
    "subject": "Your order shipped",
    "body": "Your package is on its way!"
  }'`}</CodeBlock>
          <h3 className="text-sm font-semibold text-white mt-5 mb-2">Response</h3>
          <CodeBlock>{`{
  "notificationId": "ntf_01HXYZ...",
  "status": "RECEIVED",
  "timestamp": "2025-06-10T10:00:00Z"
}`}</CodeBlock>
        </section>

        {/* Schema */}
        <section id="doc-schema" className="mb-10">
          <h2 className="text-lg font-semibold text-white pb-2 border-b border-border mb-4">
            NotificationEvent Schema
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-3">
            The internal shared contract used by all Kafka producers and
            consumers. All services are bound to this type.
          </p>
          <CodeBlock>{`// Shared contract — NotificationEventProducer
public record NotificationEvent(
  String notificationId,  // idempotency key
  String recipient,
  Channel channel,        // EMAIL | SMS | IN_APP
  String subject,
  String body,
  NotificationStatus status,
  Instant createdAt,
  int retryCount          // 0–3 before DLQ
)`}</CodeBlock>
        </section>

        {/* Lifecycle */}
        <section id="doc-lifecycle" className="mb-10">
          <h2 className="text-lg font-semibold text-white pb-2 border-b border-border mb-4">
            Notification Lifecycle
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-3">
            Every notification passes through four statuses, tracked in the
            core service and visible in the playground timeline.
          </p>
          <StatusTable
            rows={[
              { status: "RECEIVED",   setBy: "core",                topic: "notification-request"    },
              { status: "DISPATCHED", setBy: "core ← dispatcher",   topic: "notification-dispatched" },
              { status: "PROCESSING", setBy: "email-service",       topic: "email-request"           },
              { status: "DELIVERED",  setBy: "core ← email-service",topic: "notification-delivered"  },
            ]}
          />
        </section>

        {/* Retry */}
        <section id="doc-retry" className="mb-10">
          <h2 className="text-lg font-semibold text-white pb-2 border-b border-border mb-4">
            Retry & Dead Letter Queue
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-3">
            If the email service fails to deliver, it publishes a failure event.
            The core increments{" "}
            <code className="font-mono text-accent2 text-xs bg-surface2 px-1.5 py-0.5 rounded">
              retryCount
            </code>{" "}
            and re-publishes the event to{" "}
            <code className="font-mono text-amber-400 text-xs bg-surface2 px-1.5 py-0.5 rounded">
              email-request
            </code>
            . After 3 failed attempts the notification is marked{" "}
            <span className="font-semibold text-red-400">DLQ</span> and removed
            from the retry loop.
          </p>
          <CodeBlock>{`// Retry logic in core service
if (event.retryCount() < 3) {
  producer.publish("email-request", event.withRetry());
} else {
  repository.markAsDLQ(event.notificationId());
}`}</CodeBlock>
        </section>

        {/* Channels */}
        <section id="doc-channels" className="mb-10">
          <h2 className="text-lg font-semibent text-white pb-2 border-b border-border mb-4">
            Channels
          </h2>
          <ChannelTable
            rows={[
              { channel: "EMAIL",  available: true,  topic: "email-request"  },
              { channel: "SMS",    available: false, topic: "sms-request"    },
              { channel: "IN_APP", available: false, topic: "inapp-request"  },
            ]}
          />
        </section>

      </div>
    </div>
  );
};

export default Docs;