export const NOTIFICATION_STATUS = {
    RECEIVED : "RECEIVED",
    PROCESSING : "PROCESSING",
    DISPATCHED : "DISPATCHED",
    DELIVERED : "DELIVERED",
    FAILED : "FAILED",
    DLQ : "DLQ"
}
export const TIMELINE_STEPS = [
  {
    id:    "RECEIVED",
    label: "Received by core",
    sub:   "Persisted to database",
    topic: "notification-request",
    icon:  "📥",
  },
  {
    id:    "DISPATCHED",
    label: "Dispatched",
    sub:   "Routed to respective channel",
    topic: "notification-dispatched",
    icon:  "📤",
  },
  {
    id:    "PROCESSING",
    label: "Processing",
    sub:   "Email/SMS/Push service picked up the event",
    topic: "email-request/sms-request/push-request",
    icon:  "⚙️",
  },
  {
    id:    "DELIVERED",
    label: "Delivered",
    sub:   "Message delivered to recipient",
    topic: "notification-delivered",
    icon:  "✅",
  },
];
export const NAV_ITEMS = [
    {id: "overview" , label: "Overview", icon: "grid"},
    {id: "docs",label:"Documentation",icon:"book"},
    {id: "playgroud",label: "Playground", icon: "code"},
];
export const PRIORITY_OPTIONS = ["HIGH", "MEDIUM", "LOW"];
export const CHANNEL_OPTIONS = [
  { value: "EMAIL",  label: "EMAIL",  available: true  },
  { value: "SMS",    label: "SMS",    available: false },
  { value: "IN_APP", label: "IN_APP", available: false },
];
export const WS_BASE_URL = `${import.meta.env.VITE_NOTIQ_BACKEND}/ws`;

