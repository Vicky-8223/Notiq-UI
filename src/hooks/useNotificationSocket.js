// hooks/useNotificationSocket.js
import { useEffect, useRef, useState } from "react";
import { connectToNotifications } from "../api/sse";
import { NOTIFICATION_STATUS } from "../constants";

const TERMINAL_STATUSES = ["DELIVERED", "FAILED", "DLQ"];

export const useNotificationSocket = (eventId) => {
    const [statusHistory, setStatusHistory] = useState([]);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [isConnected,   setIsConnected]   = useState(false);
    const [error,         setError]         = useState(null);

    const esRef = useRef(null);

    // ── Helper to close SSE cleanly ──────────────────────
    const closeSSE = () => {
        if (esRef.current) {
            esRef.current.close();
            esRef.current = null;
        }
        setIsConnected(false);
    };

    useEffect(() => {
        if (!eventId) return;

        setStatusHistory([{
            status:    NOTIFICATION_STATUS.RECEIVED,
            timestamp: new Date().toISOString()
        }]);
        setCurrentStatus(NOTIFICATION_STATUS.RECEIVED);
        setIsConnected(false);
        setError(null);

        let mounted = true;

        const eventSource = connectToNotifications(
            eventId,

            // onStatusUpdate ── FIX 1: close on terminal status
            (update) => {
                if (!mounted) return;

                setCurrentStatus(update.status);
                setStatusHistory((prev) => {
                    const alreadyExists = prev.some((s) => s.status === update.status);
                    if (alreadyExists) return prev;
                    return [...prev, {
                        status:    update.status,
                        timestamp: update.timestamp
                    }];
                });

                // Close SSE cleanly once pipeline is finished
                if (TERMINAL_STATUSES.includes(update.status)) {
                    closeSSE();
                }
            },

            // onConnected
            () => {
                if (!mounted) return;
                setIsConnected(true);
            },

            // onError ── FIX 2: ignore error if we closed it intentionally
            (err) => {
                if (!mounted) return;
                if (!esRef.current) return; // we closed it ourselves — not a real error
                setError("SSE connection failed");
                setIsConnected(false);
            }
        );

        esRef.current = eventSource;

        return () => {
            mounted = false;
            closeSSE();
        };

    }, [eventId]);

    return { statusHistory, currentStatus, isConnected, error };
};