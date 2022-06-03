// PROCEDIMIENTO PARA MOSTRAR INFO DE LAS TARJETAS EN EL HOME

let cardArray; //CREO UNA COPIA DEL ARRAY EVENTOS EN MAINDATA.JS
let divcards = document.getElementById("contcardsId"); // CREO VARIABLE DONDE SE VAN A ALOJAR LOS VALORES QUE ME DEVUELVA LA FUNCION, POR ID
var inputSearch = document.getElementById("searchId") // LLAMO A LOS IMPUT DE ID "SERACHID"
let containerCheckbox = document.getElementById("divCheckbox");
let filteredSearchArray = []; // ALMACENA DATOS DEL INGRESO DE TEXTO EN EL IMPUT SEARCH
let contenidoCard = [];
let checked = []; // CREO UN ARRAY VACIO PARA GUARDAR LOS VALUE DE CADA CHECKBOX CLIKEADO
let inputValue ="";


// FUNCION ASINCRONA PARA LLAMAR DATOS DE UNA API EXTERNA
async function getDatafromAPI() {
    await fetch("https://amazing-events.herokuapp.com/api/events") // PEDIDO DE RESPUESTA POR URL
        .then(response => response.json()) // PASO DATOS DE LA API A FORMATO JSON
        .then(json => cardArray = json.events); // GUARDO LOS DATOS DE LA VARIABLE JSON EN UNA VARIABLE GLOBAL
        console.log(cardArray)

contenidoCard = cardArray.events; //EN LA VARIABLE CONTCARD GUARDO EL ELEMENTO EVENTOS DEL ARRAY CARDARRAY

// PROCEDIMIENTO PARA IMPRIMIR LOS CHECKBOX EN HOME SEGUN LA CATEGORIA DE CADA EVENTO


function showBox(){
let categories = cardArray.map(function (evento) {
    return evento.category;
  }); // CON UN MAP DEL DEL ARRAY "cardArray" SACO EL ELEMENTO CATEGORY DE CADA CARD Y LO GUARDO EN LA VARIABLE CATEGORIES 

    var setCategories = new Set(categories) // DEVUELVE UN SET (COLECCION DE VALORES UNICOS) CON LOS ELEMENTOS CATEGORY
    var categoryArray = [...setCategories] // CREA UN ARRAY CON LOS VALORES DEL SET ANTERIOR
    console.log(categoryArray)

    var inputCheckbox = ""
    for (let i=0 ; i < categoryArray.length; i++){
        inputCheckbox += `<div class="form-check">
                 <input id="${categoryArray[i]}" class="form-check-input" type="checkbox" value="${categoryArray[i]}"/>
                 <label for="${categoryArray[i]}"class="form-check-label"> ${categoryArray[i]} </label>
               </div>`
    }
    document.querySelector('#divCheckbox').innerHTML = inputCheckbox;
  }

showBox();


// PROCEDIMIENTO PARA ESCUCHAR EVENTOS DE LOS CHECKBOX

let checkBoxCall = document.querySelectorAll('input[type=checkbox]'); // LLAMO A LOS INPUT DE TIPO CHECKBOX

for (var i = 0 ; i < checkBoxCall.length; i++){ // RECORRO EL ARRAY CON TODOS LOS VALUES = A CATEGORY
  checkBoxCall[i].addEventListener("click", (evento)=>{ // ESCUCHO EL EVENTO CLICK EN CADA ITERACION DEL BUCLE FOR

    if(evento.target.checked){ 
      checked.push(evento.target.value) // SI ESTA CLICKEADO METO EL VALUE DEL CHECKBOX DENTRO DEL ARRAY "CHECKED"
    } 
    else{
      checked = checked.filter(everyClickedCheck => everyClickedCheck !== evento.target.value) // CON EL FILTER RECORRO EL ARRAY "CHECKED" Y COMPRUEBO MEDIANTA UNA NEGACION DEL VALUE DEL EVENTO SI CADA ELEMENTO ESTA CHECKEADO
      console.log(checked);
    }
    if (checked.length == 0 && inputValue == ""){
      filteredSearchArray = cardArray
    }
    else if (checked.length > 0 && inputValue == ""){
      filteredSearchArray = cardArray.filter(everyCardInfo => checked.includes(everyCardInfo.category)) 
      // console.log(filteredSearchArray);
    } else if (checked.length > 0 && inputValue !== ""){
      filteredSearchArray = cardArray.filter(everyCardInfo => checked.includes(everyCardInfo.category)).filter(everyCardInfo => everyCardInfo.name.toLowerCase().trim().includes(inputValue)) 
    }
    cardsInfo(filteredSearchArray);
  })


// PROCEDIMIENTO PARA ESCUCHAR EVENTOS SEARCH Y CAPTURAR SUS INPUT

inputSearch.addEventListener("keyup",(evento)=>capturarInput(evento)) // LE PIDO QUE HAGA UNA FUNCION DE CAPTURA DE LOS DATOS PARA CUANDO EL EVENTO CHANGE SEA ESCUCHADO

function capturarInput(evento){
  let inputValue = inputSearch.value;
  inputValue = inputValue.toLowerCase().trim(); // CAPTURO EN LA VARIABLE INPUTVALUE EL LO QUE SE INGRESO EN EL INPUT SEARCH Y ADEMAS LE SACO ESPACIOS Y LO LLEVO A MINUSCULA
  
  // PROCEDIMIENTO PARA COMPARAR LAS ENTRADAS DE BUSQUEDA CON DATOS DE LAS CARDS (4 OPCIONES)
   // 1 . CHECKBOXES SIN CLICKEAR Y SIN TEXTO INGRESADO POR INPUT SEARCH
  if (checked.length == 0 && inputValue == "") {
    filteredSearchArray = cardArray
  }
  // 2 . CHECKBOXES SIN CLICKEAR Y TEXTO INGRESADO POR IMPUT SEARCH
  else if (checked.length == 0 && inputValue !== ""){
    // GUARDO EN UN ARRAY VACIO EL VALOR INGRESADO POR EL IMPUT SEARCH Y FILTRANDO EL ARRAY QUE CONTIENE LA INFORMACION DE LAS TARJETAS LOS COMPARO CON EL ELEMENTO NAME PARA VER SI TIENEN COINCIDENCIA 
    filteredSearchArray = cardArray.filter(everyCardInfo => everyCardInfo.name.toLowerCase().trim().includes(inputValue)) 
  }
  // 3 . CHECKBOXES CLICKEADOS Y TEXTO INGRESADO POR IMPUT SEARCH
  else if (checked.length > 0 && inputValue !== ""){
    filteredSearchArray = cardArray.filter(everyCardInfo => checked.includes(everyCardInfo.category)).filter(everyCardInfo => everyCardInfo.name.toLowerCase().trim().includes(inputValue)) 
  }
  cardsInfo(filteredSearchArray);
}


  capturarInput();

}

}

getDatafromAPI();


function cardsInfo(arrayInfo) { // CREO FUNCION PARA LLENAR LAS CARDS
  let contenidoCard = ""; // CREO VARIABLE VACIA PARA DEPOSITAR LA INFORMACION DE LAS CARDS
  for (let i=0; i<arrayInfo.length ;i++){ // RECORRO EL ARREGLO CON LA INFO DE CADA CARD
    // var id=1;
    // cardArray.map(evento=>evento.id = id++)
  contenidoCard += // POR CADA ITERACION DEL BUCLE VA A DEPOSITAR LA INFO DE CADA CARD
  `<div class="card my-2 mx-2 align-items-center justify-content-center d-flex flex-wrap" style="width: 18rem">
  <img src="${arrayInfo[i].image}" class="card-img-top" alt="cinema" />
  <div class="card-body">
    <h5 class="card-title">${arrayInfo[i].name}</h5>
    <p class="card-text">${arrayInfo[i].description}</p>
    <p class="card-text card-price">Price: $ ${arrayInfo[i].price}</p>
    <a href="./details.html?id=${arrayInfo[i]._id}" class="btn btn-primary viewmorebutton">View more</a>
  </div>
</div>`
  }
  divcards.innerHTML=contenidoCard; // IMPRIME INFO DE CADA ELEMENTO DEL ARRAY EN CADA CARD
}



