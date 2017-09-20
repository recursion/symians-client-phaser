import { Socket, SocketOptions, Channel } from 'phoenix';

const logger = (msg) => console.log(msg);

const socketAddress = 'ws:/192.168.88.29:4000/socket';

// connect to default channels
const connectDefaultChannels = (socket) => {
    channel(socket, 'system:chat', [{ event: 'new:msg', handler: logger }]);
    channel(socket, 'system:',
        [{ event: 'world', handler: logger },
        { event: 'token', handler: logger }
        ]);
};

// connect the websocket
export const init = () => {
    let socket = new Socket(socketAddress, { params: {} });
    socket.connect();
    connectDefaultChannels(socket);
};

// connect to channel `name` on the socket
const channel = (socket, name: string, eventHandlers) => {
    let channel = socket.channel(name, {});
    eventHandlers.map(({ event, handler }) => {
        channel.on(event, handler);
    });
    channel.join()
        .receive('ok', ({ messages }) => {
            const info = `socket connected: ${channel.name} `;
            if (messages) {
                console.log(info, messages);
            } else {
                console.log(info);
            }
        })
        .receive('error', ({ reason }) => console.log('error: ', reason))
        .receive('timeout', () => console.log('Networking issue. Still waiting...'));
};
