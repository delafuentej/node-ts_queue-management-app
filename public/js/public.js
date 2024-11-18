


function renderTickets(tickets=[]){

    for(let i = 0; i < tickets.length; i++){
      
        if(i >= 4) return;

        const ticket = tickets[i]; 
        if(!ticket) break;

        const ticketLabel = document.querySelector(`#lbl-ticket-0${i +1}`);
        const deskLabel = document.querySelector(`#lbl-desk-0${i +1}`);

        const formatDeskLabel = ticket.handleAtDesk.charAt(0).toUpperCase()+ ticket.handleAtDesk.slice(1).toLowerCase();
       ticketLabel.innerText= `Ticket ${ticket.number}`;
       deskLabel.innerText= formatDeskLabel;
    }

}



async function loadCurrentTickets(){
    const onWorkingTickets = await fetch('/api/tickets/working-on')
    .then( res => res.json());
    
    renderTickets(onWorkingTickets);
}

loadCurrentTickets()