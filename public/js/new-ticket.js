const labelNewTicket = document.querySelector('#lbl-new-ticket');
const createTicketButton = document.querySelector('.btn');


async function getLastTicketNumber(){
    const lastTicketNumber= await fetch('/api/tickets/last').then(res => res.json())
    labelNewTicket.innerText = lastTicketNumber;
}

getLastTicketNumber();

async function createTicket(){
    const newTicket = await fetch('/api/tickets',{
        method: 'POST'
    }).then(res => res.json());
   
    labelNewTicket.innerText = newTicket.number;
}

createTicketButton.addEventListener('click', createTicket);

