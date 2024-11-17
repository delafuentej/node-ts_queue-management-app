import { Router } from "express";
import { TicketsController } from "./controller";


export class TicketsRoutes {


    static get routes(): Router {

        const router = Router();

        //controller instans
        const ticketsController = new TicketsController();

        // Defining the routes

        //gets
        router.get('/', ticketsController.getAllTickets);// get all the tickets
        router.get('/last',ticketsController.getLastTicketNumber);//to obtain the last ticket
        router.get('/pending', ticketsController.getPendingTickets)// to obtain the pending tickets
        router.get('/draw/:desk',ticketsController.getDrawTicket) //'/draw/:desk' => to get a ticket and assign it to a specific desk
        router.get('/working-on', ticketsController.getOnWorkingTickets) // to display the tickets currently being worked on.
        //post
        router.post('/',ticketsController.createTicket)// to create a new ticket
        // put
        router.put('/done/:ticketId',ticketsController.doneTicket) // when a ticket is done/terminated
    

        return router;
      }

}