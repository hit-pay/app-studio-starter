// Stands in for the `ws` package in the edge build; the runtime has a built-in WebSocket.
export const WebSocket = globalThis.WebSocket

export default WebSocket
