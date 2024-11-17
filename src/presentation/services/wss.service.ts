import { Server } from 'http';
import { WebSocketServer } from 'ws';

// const ws = new WebSocket('ws://www.host.com/path', {
//     perMessageDeflate: false
//   });
// path => where websockets will be listend to
interface Options {
    server: Server;
    path?: string;//ws
}

export class WssService {
    // as singleton

    private static _instance: WssService;
    private wss: WebSocketServer;

    private constructor(options: Options){
        const {server, path ='/ws'} = options;//http://localhost:PORT/ws

        this.wss = new WebSocketServer({server, path})
    }

}