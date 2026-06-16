import { useEffect, useRef, useState } from "react";
import { connectToNotifications } from "../api/websocket";
import { NOTIFICATION_STATUS } from "../constants";

export const useNotificationSocket = (eventId) => {

    const [statusHistory, setStatusHistory] = useState([]);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    const clientRef = useRef(null);

    useEffect(() => {

        if (!eventId) return;

        setStatusHistory([
            {
                status: NOTIFICATION_STATUS.RECEIVED,
                timestamp: new Date().toISOString()
            }
        ]);

        setCurrentStatus(NOTIFICATION_STATUS.RECEIVED);
        setIsConnected(false);
        setError(null);

        let mounted = true;

        connectToNotifications(
            eventId,

            (update) => {
                if (!mounted) return;

                setCurrentStatus(update.status);

                setStatusHistory((prev) => {

                    const alreadyExists = prev.some(
                        (s) => s.status === update.status
                    );

                    if (alreadyExists) {
                        return prev;
                    }

                    return [
                        ...prev,
                        {
                            status: update.status,
                            timestamp: update.timestamp
                        }
                    ];
                });
            },

            () => {
                if (!mounted) return;

                console.log(
                    "WebSocket Connected At:",
                    new Date().toISOString()
                );

                setIsConnected(true);
            },

            (err) => {
                if (!mounted) return;

                console.error(err);
                setError(err);
            }
        )
            .then((client) => {
                clientRef.current = client;
            })
            .catch((err) => {
                console.error(err);
                setError(err);
            });

        return () => {

            mounted = false;

            if (clientRef.current) {
                clientRef.current.deactivate();
                clientRef.current = null;
            }

            setIsConnected(false);
        };

    }, [eventId]);

    return {
        statusHistory,
        currentStatus,
        isConnected,
        error
    };
};