let socket = null;

export function getSocket() {
    if (!socket || socket.readyState === WebSocket.CLOSED) {

        console.log('Attempting WebSocket connection...');

        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        socket = new WebSocket(`${protocol}://${window.location.host}`);
        
        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onclose = () => {
            console.log('WebSocket closed');
          };

        socket.onerror = (err) => {
            console.error('WebSocket error: ', err)
        };

        socket.onmessage = (event) => {
            const msg = JSON.parse(event.data);

            console.log('Server says: ', msg);
        }
    }
    return socket;
}