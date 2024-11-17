import { Router } from 'express';
import { TicketsRoutes } from './tickets/routes';

  


export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definition routes
     router.use('/api/tickets', TicketsRoutes.routes );



    return router;
  }


}

