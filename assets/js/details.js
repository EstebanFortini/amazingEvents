let cardArray; //CREO UNA COPIA DEL ARRAY EVENTOS EN MAINDATA.JS
let divcards = document.getElementById("contcardsId"); // CREO VARIABLE DONDE SE VAN A ALOJAR LOS VALORES QUE ME DEVUELVA LA FUNCION, POR ID
let contenidoCard = [];

getDetailsfromAPI();

async function getDetailsfromAPI() {
  await fetch("https://amazing-events.herokuapp.com/api/events") // PEDIDO DE RESPUESTA POR URL
      .then(response => response.json()) // PASO DATOS DE LA API A FORMATO JSON
      .then(json => cardArray = json); // GUARDO LOS DATOS DE LA VARIABLE JSON EN UNA VARIABLE GLOBAL
      console.log(cardArray)

contenidoCard = cardArray.events; //EN LA VARIABLE CONTCARD GUARDO EL ELEMENTO EVENTOS DEL ARRAY CARDARRAY
console.log(contenidoCard)
detailsInfo();

function detailsInfo(){
  let id = location.search.split("?id=");
  console.log(location)
    console.log(location.search)
    console.log(id)
  let selectedId = String(id[1]);
  console.log(selectedId)
  let evento = contenidoCard.find(function(evento) {
      return evento._id == selectedId;
  } )
  console.log(evento)
    let containDC = `
    <div class="card my-2 mx-2 align-items-center justify-content-center d-flex flex-wrap" style="width: 50rem">
    
    <h3 class="card-title">${evento.name}</h3>
    <img src="${evento.image}" class="imgDC" alt="" />
  <div class="card-body">
    
    <p class="card-textDC">Date: ${evento.date}</p>
    <p class="card-textDC">Description: ${evento.description}</p>
    <p class="card-textDC">Category: ${evento.category}</p>
    <p class="card-textDC">Place: ${evento.place}</p>
    <p class="card-textDC">Capacity: ${evento.capacity}</p>
    <p class="card-textDC">Assistance or estimate: ${evento.assistance}</p>
    <p class="card-textDC">Price: $${evento.price}</p>
  </div>
</div>`

    document.querySelector("#contcardsId").innerHTML = containDC;
}

}

