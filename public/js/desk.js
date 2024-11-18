
let socket = null;
const labelPendingTickets = document.querySelector('#lbl-pending')
const desk = document.querySelector('.desk');
const alert = document.querySelector('.alert');


const searchParams = new URLSearchParams( window.location.search);

if( !searchParams.has('desk')){
  window.location = 'index.html';
  throw new Error('A desk is required')
};

const deskNumber = searchParams.get('desk');
const deskNumberLabel = deskNumber.charAt(0).toUpperCase() + deskNumber.slice(1).toLowerCase();

desk.innerHTML= deskNumberLabel;


function checkTicketCount(currentCount= 0){
  if(currentCount === 0){
    alert.classList.remove('d-none');
  }else{
    alert.classList.add('d-none');
  }
 
  if(currentCount !== 0){
    labelPendingTickets.innerHTML = currentCount;
  }
  
}

async function loadPendingTicketsCount (){
    const pendingTickets = await fetch('/api/tickets/pending').then(res => res.json());
    const pendingTicketsCount= pendingTickets.length || 0;
    
    checkTicketCount(pendingTicketsCount);
    //labelPendingTickets.innerText = pendingTicketsCount;
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
       // labelPendingTickets.innerText = payload;
        checkTicketCount(payload);
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