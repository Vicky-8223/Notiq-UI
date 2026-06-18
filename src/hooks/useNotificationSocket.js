// hooks/useNotificationSocket.js
import { useEffect, useRef, useState } from "react";
import { connectToNotifications } from "../api/sse";
import { NOTIFICATION_STATUS } from "../constants";

export const useNotificationSocket = (eventId) => {
    const [statusHistory, setStatusHistory] = useState([]);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [isConnected,   setIsConnected]   = useState(false);
    const [error,         setError]         = useState(null);

    const esRef = useRef(null);

    useEffect(() => {
        if (!eventId) return;

        // Seed the initial RECEIVED status immediately
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

            // onStatusUpdate
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
            },

            // onConnected
            () => {
                if (!mounted) return;
                setIsConnected(true);
            },

            // onError
            (err) => {
                if (!mounted) return;
                setError(err);
                setIsConnected(false);
            }
        );

        esRef.current = eventSource;

        return () => {
            mounted = false;
            if (esRef.current) {
                esRef.current.close();   // SSE cleanup — replaces client.deactivate()
                esRef.current = null;
            }
            setIsConnected(false);
        };

    }, [eventId]);

    return { statusHistory, currentStatus, isConnected, error };
};