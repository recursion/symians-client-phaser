import { Socket, SocketOptions, Channel } from 'phoenix';

const logger = (msg) => console.log(msg);

const socketAddress = 'ws:/192.168.88.29:4000/socket';

// function that takes a string.
export interface MsgHandler {
    (msg: string): void;
}

// object with an event and a MsgHandler function
export interface EventHandler {
    event: string;
    handler: MsgHandler;
}


// connect the websocket
export const init = (): Socket => {
    let socket = new Socket(socketAddress, { params: {} });
    socket.connect();
    return socket;
};

// connect to channel `name` on the socket
export const createChannel = (socket: Socket, name: string, eventHandlers: [EventHandler]) => {
    let channel = socket.channel(name, {});
    eventHandlers.map(({ event, handler }) => {
        channel.on(event, handler);
    });
    channel.join()
        .receive('ok', ({ messages }) => {
            const info = `socket connected: ${channel} `;
            if (messages) {
                console.log(info, messages);
            } else {
                console.log(info);
            }
        })
        .receive('error', ({ reason }) => console.log('error: ', reason))
        .receive('timeout', () => console.log('Networking issue. Still waiting...'));
};
