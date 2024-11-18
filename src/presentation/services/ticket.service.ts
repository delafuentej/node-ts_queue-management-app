
import { Ticket } from "../../domain";
import { UuidAdapter } from "../../config/uuid.adapter";
import { WssService } from "./wss.service";




export class TicketService {

    constructor(
        private readonly wssService: WssService= WssService.instance,
    ){}
    //TicketService class => target: controll all other services
   public readonly tickets: Ticket[] = [
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
   ];

   private readonly workingOnTickets: Ticket[]= [];

   public get pendingTickets(): Ticket[]{
        return this.tickets.filter( ticket => ticket.done === false);
   };

   public get lastWorkingOnTickets(): Ticket[]{
        return this.workingOnTickets.splice(0,4);
   }
   public get lastTicketNumber(): number { //with filter: Math.max(ticket.number)
     return (this.tickets.length > 0) ? this.tickets.at(-1)!.number : 0;
   };

   public createTicket(): Ticket{
        const newTicket: Ticket = {
            id: UuidAdapter.uuid(),
            number: this.lastTicketNumber + 1,
            createAt: new Date(),
            done:false,
            handleAt: undefined,
            handleAtDesk: undefined,
            doneAt: undefined
        };

        this.tickets.push(newTicket);
        //! Pending: Connection with ws
        this.onTicketNumberChanged();
        return newTicket;
   };

    public drawTicket(desk: string){
        const ticket = this.tickets.find( ticket => !ticket.handleAtDesk);
        if(!ticket) return {status: 'error', message: 'No pending tickets'};
        
        ticket.handleAtDesk = desk;
        ticket.handleAt = new Date();
        //
        this.workingOnTickets.unshift({...ticket});

         //! Pending: Connection with ws
        return {
            status: 'ok',
            ticket: ticket,
        };
   };

   public doneTicket(id: string){
        const ticket = this.tickets.find( ticket => ticket.id === id);
        if(!ticket) return {status: 'error', message: `No ticket found with id:${id}`};

        this.tickets.map( ticket =>{
            if(ticket.id === id){
                ticket.done = true,
                ticket.doneAt = new Date
            };
            return ticket;
        });
        return {
            status: 'ok',
        };
   };

   private onTicketNumberChanged(){
        this.wssService.sendMessage('on-ticket-count-changed', this.pendingTickets.length);
   }


   
}