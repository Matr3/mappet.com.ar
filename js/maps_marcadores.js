import { listaServices } from "../service/cliente_service.js";
var map;
var markers = [];
const carga_pets = document.querySelector(".carga_pets");
export var lng = " ";
export var lat = " ";
/*const infoContent = "../img/paw-solid.svg";*/

function initMap() {
  const obelisco = { lat: -34.6037345, lng: -58.3837591 };

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: obelisco,

  });


  if (carga_pets) {
    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function (event) {
      lat = event.latLng.lat();
      lng = event.latLng.lng();
      guardarMarker(lat, lng)
      deleteMarkers();
      addMarkerBuscado(event.latLng);
    });
  } else {
    // Adds a marker at the center of the map.
    addMarker(obelisco);
  }


}

// Adds a marker to the map and push to the array.
function addMarkerBuscado(location) {

  const marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: "ico/marcador-de-posicion.ico"
  });

  markers.push(marker);
}

function addMarker() {
  listaServices
    .listaBuscados()
    .then((data) => {
      data.forEach(({ id, raza, latlgn, imagen }) => {
        var lat = latlgn.lat;
        var lng = latlgn.lng;

        const contentString = `
        <div>
        <a class="link_mascotas" href="./detalle_pets.html?id=${id}&categoria=${raza}">
        
        <div class="bng_box">
        <img class="img_mascotaMap" src="${imagen}" alt="${raza}">
        </div>
        
        <div>
          <ul class="detalles_tarjeta">
            <li class="descripcion">${raza}</li>
            <li>Mas detalles</li>
          </ul>   
        </div>
        </a>
        </div>
        `;

        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        const location = { lat: lat, lng: lng };
        const marker = new google.maps.Marker({
          position: location,
          content: contentString,
          icon: "ico/marcador-de-posicion.ico",
          map: map
        });
        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        });

        markers.push(marker);
      });
    })
    .catch((error) => console.log("Oops! Error. Comuniquese con Matr3"));

}

function guardarMarker(lat, lng) {
  lat = lat;
  lng = lng;
}
// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}
window.initMap = initMap;
