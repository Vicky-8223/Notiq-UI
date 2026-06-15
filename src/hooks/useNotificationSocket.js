import { useEffect, useRef, useState } from "react";
import { connectToNotifications } from "../api/websocket";
import { NOTIFICATION_STATUS } from "../constants";

export const useNotificationSocket = (eventId) => {
  const [statusHistory, setStatusHistory]   = useState([]);
  const [currentStatus, setCurrentStatus]   = useState(null);
  const [isConnected,   setIsConnected]     = useState(false);
  const [error,         setError]           = useState(null);
  const clientRef = useRef(null);

  useEffect(() => {
    if (!eventId) return;

    // Seed RECEIVED immediately from POST response
    setStatusHistory([
      {
        status:    NOTIFICATION_STATUS.RECEIVED,
        timestamp: new Date().toISOString(),
      },
    ]);
    setCurrentStatus(NOTIFICATION_STATUS.RECEIVED);
    setIsConnected(false);
    setError(null);

    const client = connectToNotifications(eventId, (update) => {
      // update shape: { eventId, status, timestamp }
      console.log("Received WS update:",update);
      setIsConnected(true);
      setCurrentStatus(update.status);
      setStatusHistory((prev) => {
        const alreadyExists = prev.some((s) => s.status === update.status);
        if (alreadyExists) return prev;
        return [...prev, { status: update.status, timestamp: update.timestamp }];
      });
    });

    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
      setIsConnected(false);
    };
  }, [eventId]);

  return { statusHistory, currentStatus, isConnected, error };
};