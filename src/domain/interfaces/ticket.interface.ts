

export interface Ticket {
    id: string;
    number: number;
    createAt: Date;
    handleAt?: Date;
    doneAt?: Date;
    handleAtDesk?: string;
    done: boolean;
};