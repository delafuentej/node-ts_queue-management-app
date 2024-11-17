import { Request, Response } from "express";



export class TicketsController {

    //DI WssService => to be able to send communication via websockets from rest api
    constructor(
       
    ){};

    public getAllTickets = async(req: Request, res: Response) => {
        res.json('getAllTickets');
    };
    public getLastTicketNumber = async(req: Request, res: Response) => {
        res.json('getLastTicketNumber');
    };
    public getPendingTickets = async(req: Request, res: Response) => {
        res.json('getPendingTickets');
    };
    public getDrawTicket= async(req: Request, res: Response) => {
        res.json('getDrawTicket');
    };
    public getOnWorkingTickets= async(req: Request, res: Response) => {
        res.json('getOnWorkingTickets');
    };

    public createTicket = async(req: Request, res: Response) => {
        res.json('createTicket');
    };

    public doneTicket = async(req: Request, res: Response) => {
        res.json('doneTicket');
    };






    


   

}