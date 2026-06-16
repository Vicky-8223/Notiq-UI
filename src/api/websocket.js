import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export const connectToNotifications = (
    eventId,
    onStatusUpdate,
    onConnected,
    onError
) => {
    return new Promise((resolve, reject) => {

        const socket = new SockJS("https://notiq.duckdns.org/ws");

        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 100,

            onConnect: () => {
                console.log("Connected to WebSocket");

                if (onConnected) {
                    onConnected();
                }

                client.subscribe(
                    `/topic/notification/${eventId}`,
                    (message) => {
                        const update = JSON.parse(message.body);

                        console.log(
                            "Received WS update:",
                            update,
                            "at",
                            new Date().toISOString()
                        );

                        onStatusUpdate(update);
                    }
                );

                resolve(client);
            },

            onStompError: (frame) => {
                console.error("STOMP Error:", frame);

                if (onError) {
                    onError(frame);
                }

                reject(frame);
            },

            onWebSocketError: (error) => {
                console.error("WebSocket Error:", error);

                if (onError) {
                    onError(error);
                }
            }
        });

        client.activate();
    });
};