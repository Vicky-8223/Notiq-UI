// api/sse.js
export const connectToNotifications = (
    eventId,
    onStatusUpdate,
    onConnected,
    onError
) => {
    const url = `https://notiq.duckdns.org/api/sse/notification/${eventId}`;
    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
        console.log("SSE connected at:", new Date().toISOString());
        if (onConnected) onConnected();
    };

    eventSource.addEventListener("notification-status", (e) => {
        const update = JSON.parse(e.data);
        console.log("SSE update:", update, "at", new Date().toISOString());
        onStatusUpdate(update);
    });

    eventSource.onerror = (err) => {
        console.error("SSE error:", err);
        if (onError) onError("SSE connection failed");
    };

    // Return eventSource so the hook can close it on cleanup
    return eventSource;
};