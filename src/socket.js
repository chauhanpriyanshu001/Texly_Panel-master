
import { io } from "socket.io-client";

const socket = io("https://admin.texly.in", {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

export default socket;
