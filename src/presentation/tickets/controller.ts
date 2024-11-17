import { Request, Response } from "express";
import { TicketService } from "../services";



export class TicketsController {

    //DI WssService => to be able to send communication via websockets from rest api
    constructor(
       private readonly ticketService: TicketService = new TicketService(),
    ){};

    public getAllTickets = async(req: Request, res: Response) => {
       res.json(this.ticketService.tickets);
    };
    public getLastTicketNumber = async(req: Request, res: Response) => {
        res.json(this.ticketService.lastTicketNumber);
    };
    public getPendingTickets = async(req: Request, res: Response) => {
        res.json(this.ticketService.pendingTickets);
    };
    public getDrawTicket= async(req: Request, res: Response) => {
        const {desk} = req.params;
        res.json(this.ticketService.drawTicket(desk));
    };
    public getWorkingOnTickets= async(req: Request, res: Response) => {
        res.json(this.ticketService.lastWorkingOnTickets);
    };

    public createTicket = async(req: Request, res: Response) => {
        res.status(201).json(this.ticketService.createTicket());
    };

    public doneTicket = async(req: Request, res: Response) => {
        const {ticketId} = req.params;
        res.json(this.ticketService.doneTicket(ticketId));
    };






    


   

}