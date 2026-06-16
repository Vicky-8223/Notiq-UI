import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export const connectToNotifications = (
    eventId,
    onStatusUpdate,
)=>{
    const socket = new SockJS("https://notiq.duckdns.org/ws");
    const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
            console.log("Connnected to WebSocket");
            client.subscribe(`/topic/notification/${eventId}`,
                (message)=>{
                    const update=JSON.parse(message.body);
                    onStatusUpdate(update);
                }
            )
        }
    });
    client.activate();
    return client;
}