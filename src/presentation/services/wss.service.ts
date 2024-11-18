import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

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
    //connect both express and our websocketserver on the same server
    //_instance => to keep the instance initialised
    private static _instance: WssService;
    private wss: WebSocketServer;

    private constructor(options: Options){
        const {server, path ='/ws'} = options;//http://localhost:PORT/ws

        this.wss = new WebSocketServer({server, path});
        this.start();
    }

    //to take over the server instance if necessary.
    static get instance(): WssService{

        if(!WssService._instance) throw 'WssService is not initialiize';

        return WssService._instance;
    };
    // initialisation of the server by creating the instance
    static initWebSocketServer(options: Options){
        WssService._instance = new WssService(options);
    };

    public sendMessage(type: string, payload: Object){
        this.wss.clients.forEach( client =>{
            if ( client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({type, payload}))
            };
        });
    };

    public start(){
        this.wss.on('connection', (ws: WebSocket)=> {
            console.log('Client connected');
            ws.on('error', console.error);

            ws.on('close', ()=>{
                console.log('Client disconnected');
            })
          });
    }

}