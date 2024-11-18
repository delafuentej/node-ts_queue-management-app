
let socket = null;
const labelPendingTickets = document.querySelector('#lbl-pending')

async function loadPendingTicketsCount (){
    const pendingTickets = await fetch('/api/tickets/pending').then(res => res.json());
    const pendingTicketsCount= pendingTickets.length || 0;
    
    labelPendingTickets.innerText = pendingTicketsCount;
}

loadPendingTicketsCount();



function connetToWebSocketServer(){

    socket = new WebSocket('ws://localhost:3000/ws');

    socket.onopen= (event) =>{
        console.log('Connected!!!');
    }

    socket.onmessage = ( event ) => {
      console.log(JSON.parse(event.data));
        const {type, payload }= JSON.parse(event.data);//pendingTicketsCount
       if(type !=='on-ticket-count-changed') return;
        labelPendingTickets.innerText = payload;
      };

    socket.onclose= (event) =>{
        
      console.log('Disconnected!!!');
      setTimeout(()=>{
        console.log( 'retrying to connect' );
          connetToWebSocketServer();
      },1500);
  }

}

connetToWebSocketServer();