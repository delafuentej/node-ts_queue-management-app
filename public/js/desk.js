
let socket = null;
let workingTicket= null;

const labelPendingTickets = document.querySelector('#lbl-pending')
const deskHeader = document.querySelector('.desk');
const alert = document.querySelector('.alert');

const drawBtn = document.querySelector('#btn-draw');
const doneBtn = document.querySelector('#btn-done');

let currentTicketLabel = document.querySelector('small');


const searchParams = new URLSearchParams( window.location.search);

if( !searchParams.has('desk')){
  window.location = 'index.html';
  throw new Error('A desk is required')
};

const deskNumber = searchParams.get('desk');
const deskNumberLabel = deskNumber.charAt(0).toUpperCase() + deskNumber.slice(1).toLowerCase();

deskHeader.innerHTML= deskNumberLabel;


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

async function getTicket(){
  await doneTicket();

  const {status, message, ticket} = await fetch(`/api/tickets/draw/${deskNumber}`)
  .then( res => res.json());

  //console.log({status, message, ticket});

  if(status === 'error'){
    currentTicketLabel.innerText = message;
    return;
  }
   workingTicket = ticket;
   console.log('workingTicket',workingTicket)
   currentTicketLabel.innerText = ticket.number;
  
}

async function doneTicket(){
  if(!workingTicket) return;

  const {status, message} = await fetch(`/api/tickets/done/${workingTicket.id}`,{
    method: 'PUT'
  }).then( res => res.json());
  console.log('status',status)
  if(status === 'ok'){
    workingTicket = null;
    currentTicketLabel.innerText = 'Nobody';
  }

}
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

//listeners
drawBtn.addEventListener('click', getTicket);
doneBtn.addEventListener('click', doneTicket);
//
loadPendingTicketsCount();
connetToWebSocketServer();
