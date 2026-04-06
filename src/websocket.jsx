export function getSocket() {
    if (!socket) {
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        socket = new WebSocket(`${protocol}://${window.location.host}`);
        
        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onerror = (err) => {
            console.error('WebSocket error: ', err)
        }
    }
    return socket;
}