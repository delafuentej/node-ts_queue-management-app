import { createServer } from 'http';
import { envs } from './config/envs';
import { Server, AppRoutes, WssService } from './presentation';


const PORT = envs.PORT;

(async()=> {
  main();
})();

function main() {

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  const httpServer = createServer(server.app);

  WssService.initWebSocketServer({
    server: httpServer,
    path: '/ws',
  })

  httpServer.listen(PORT, ()=> {
    console.log(`Server listen on PORT: ${PORT}`)
  })


  //express server
  //server.start();
}