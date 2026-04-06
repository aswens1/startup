let socket = null;

export function getSocket() {
    if (!socket) {

        console.log('Attempting WebSocket connection...');

        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        
        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onclose = () => {
            console.log('WebSocket closed');
          };

        socket.onerror = (err) => {
            console.error('WebSocket error: ', err)
        }
    }
    return socket;
}