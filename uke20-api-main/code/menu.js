
var beerIcon = L.icon({ // Denne kodeblokken lager ikonbildet til kartets markører
    iconUrl: 'beer.png', // importerer ikonbildet

    iconSize:     [60, 96], // størrelse på ikonet 
    shadowSize:   [50, 64], // størrelse på skyggen
    iconAnchor:   [22, 94], // spissen av ikonet som vil være der markøren er
    shadowAnchor: [4, 62],  // det samme meg skyggen
    popupAnchor:  [-3, -76] // spissen der popuppen åpner relativt til iconAnchor
});


const mybtn = document.getElementById('myList'); //henter et element med id my list
const tre = document.getElementById('btn'); //henter et element med id btn
tre.addEventListener("click", openmenu ); //binder et event når tre klikkes
function openmenu() {                       //når tre klikkes runner denne funksjonen
    if(mybtn.style.display != 'block') { //hvis den ikke er synlig så runner neste linje
        mybtn.style.display = 'block';  //gjør den synlig
    } else {
        mybtn.style.display = 'none'; //hvis den er synlig så blir den satt til synlig
    }
    console.log('clicked'); //logger at den klikkes
}




// kart innstillinger
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' // legger inn copy right attribbutsene med kartet

var map = L.map('map1').setView([59.745164250056135, 10.164131070531106], 10); // Den koden generer selve kartet. I tillegg setter det start point på mappet (legger til map, set longtitude og latitude så zoom)
let marker = L.marker([59.745164250056135,10.164131070531106 ]).addTo(map); // legg til marker ved angitt longtitude latitude også blir den lagt til i kartet
let tileURL =   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { }).addTo(map); // henter kartbilde fra map api
const tiles =L.tileLayer(tileURL,{attribution}); // det fulle kartet med copyright regler




async function show_me(){ //lager en funksjon som ikke runner på main thread-en og som derfor kan laste innhold etter at nettsiden er lastet inn
    let lat; //deklarerer variabelen lat (latitude)
    let long; //deklarerer variabelen long (longitude)

    let place = document.getElementById("searchbar").value; //henter søkeordet fra søkebaren. Den hentes fra div med id="searchbar" og får dermed dens verdi
    let resp = await fetch("https://api.openbrewerydb.org/v1/breweries/search?query=" + place + "&per_page=20" ); //henter data fra en api og søker i en database utifra det som ble skrevet i search bar, spesifiserer også at det bare skal være 20 per side
    let mydata = await resp.json(); //gjør dataen til json data og lagrer denne dataen i variabelen mydata
    console.log(mydata); //logger den ut til consollen 
    lat = mydata[0].latitude; //henter latitude-verdien fra det første objektet i listen mydata. Denne verdien lagres i variabelen lat.
    long = mydata[0].longitude; //henter longitude-verdien fra det første objektet i listen mydata. Denne veriden lagres i variabelen long.


    mydata.forEach(element => { // forEach-løkke som itererer igjennom hvert element i JSON-dataen fra API-en
        if (element.longitude && element.latitude) { //sjekker om latitude og longitude exisisterer. Hvis det ikke eksisterer går forEach-løkken videre til neste element.
            let marker = L.marker([element.latitude, element.longitude], {icon: beerIcon}).addTo(map); // legger til longtitude og latitude, deretter ikon til kartet
            marker.bindPopup(`<b>${element.name}</b><br>${element.street}`).openPopup(); // knytte en pop up-melding til markøren
        }
    });

}