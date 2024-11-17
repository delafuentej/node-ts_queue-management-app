import { Ticket } from "../../domain"
import { UuidAdapter } from "../../config/uuid.adapter"

export class TicketService {
    //TicketService class => target: controll all other services
   private readonly tickets: Ticket[] = [
    {
        id: UuidAdapter.uuid(),
        number: 1,
        createAt: new Date(),
        done:false,
    },
    {
        id: UuidAdapter.uuid(),
        number: 2,
        createAt: new Date(),
        done:false,
    },
    {
        id: UuidAdapter.uuid(),
        number: 3,
        createAt: new Date(),
        done:false,
    },
    {
        id: UuidAdapter.uuid(),
        number: 4,
        createAt: new Date(),
        done:false,
    },
    {
        id: UuidAdapter.uuid(),
        number: 5,
        createAt: new Date(),
        done:false,
    },
    {
        id: UuidAdapter.uuid(),
        number: 6,
        createAt: new Date(),
        done:false,
    },

   ]
   
}