import { listaClientes } from "../service/cliente_service.js";
import { detalleUsuarios } from "./barraUsuarioIndex.js";
import { perfilUser } from "./usuario_pets.js";
import { detallePets } from "./detalle_pets.js";

const carga_pets = document.querySelector(".carga_pets");
const search_pets = document.querySelector(".search_pets");
const perfilPets = document.querySelector(".perfilPets");
const box_detalle_pets = document.querySelector(".box_detalle_pets");
const perfil_cuerpo = document.querySelector(".box_ingreso");



function estilos() {
  document.querySelector(".box_ingreso").style.display = "none";
  document.querySelector(".maps").style.display = "block";
  document.querySelector(".formulario_carga").style.display = "flex";

}


function storageEmail(emailAdd, nombreCompletoAdd, imagenAdd) {
  sessionStorage.setItem("email", emailAdd);
  sessionStorage.getItem("email");
  sessionStorage.setItem("nombre", nombreCompletoAdd);
  sessionStorage.getItem("nombre");
  sessionStorage.setItem("imagen", imagenAdd);
  sessionStorage.getItem("imagen");


}

var dato1 = {};

//Funcion capturar datos
export function obtenerDatos() {

  const emailAdd = dato1.email;
  const nombreAdd = dato1.given_name;
  const apellidoAdd = dato1.family_name;
  const nombreCompletoAdd = dato1.name;
  const imagenAdd = dato1.picture;
  //console.log(email + " " + nombre + " " + apellido + " " + nombreCompleto + " " + imagen);
  var count = true;
  listaClientes
    .listaUsuarios()
    .then((respuesta) => {
      respuesta.forEach(({ email }) => {

        const user = email;


        if (user.includes(emailAdd)) {
          document.querySelector(".box_botonInicio").style.display = "none";
          document.querySelector(".box_detalle_user").style.display = "block";
          detalleUsuarios(nombreCompletoAdd, imagenAdd);
          storageEmail(emailAdd, nombreCompletoAdd, imagenAdd);
          if (carga_pets) {

            estilos();
          } else if (perfilPets) {

            perfilUser();
          } else if (box_detalle_pets) {

            document.querySelector(".box_ingreso").style.display = "none";
            detallePets();
          } else if (perfil_cuerpo) {

            document.querySelector(".box_ingreso").style.display = "none";
            perfilUser();
          } else if (search_pets) {
          
          }


          return count = false;
        }

      }
      );
      if (count) {

        listaClientes
          .crearUsuario(emailAdd, nombreAdd, apellidoAdd, nombreCompletoAdd, imagenAdd)
          .then((respuesta) => {

            document.querySelector(".box_botonInicio").style.display = "none";
            document.querySelector(".box_detalle_user").style.display = "block";
            detalleUsuarios(nombreCompletoAdd, imagenAdd);
            if (carga_pets) {
              estilos();
            } else if (perfilPets) {
              perfilUser();
            } else if (box_detalle_pets) {
              document.querySelector(".box_ingreso").style.display = "none";
              detallePets();
            } else if (perfil_cuerpo) {

              document.querySelector(".box_ingreso").style.display = "none";
              perfilUser();
            }


          }).catch((error) => console.log(error));

      };
    })

    .catch((err) => console.log(err));

}

//Funcion usada de https://es.stackoverflow.com/
function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  dato1 = JSON.parse(jsonPayload);
  return JSON.parse(jsonPayload);
};

function handleCredentialResponse(response) {
  // console.log("Encoded JWT ID token: " + response.credential);
  JSON.stringify(parseJwt(response.credential));
  obtenerDatos();

}


if (sessionStorage.getItem("email")) {

  document.querySelector(".box_botonInicio").style.display = "none";
  document.querySelector(".box_detalle_user").style.display = "block";
  const nombre = sessionStorage.getItem("nombre").replace(/"/g, '');
  const imagen = sessionStorage.getItem("imagen").replace(/"/g, '');

  detalleUsuarios(nombre, imagen);
  if (carga_pets) {
    estilos();
  } else if (perfilPets) {
    perfilUser();
  } else if (box_detalle_pets) {
    document.querySelector(".box_ingreso").style.display = "none";
    detallePets();
  } else if (perfil_cuerpo) {
    document.querySelector(".box_ingreso").style.display = "none";
    perfilUser();
  }



} else {
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "404534087235-cn6uhb4iiua6vjg91orae16aq4qij8ad.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      auto_select: true
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

}

const donar = document.querySelector(".btnDonar");

donar.addEventListener("click", (evento) => {
    evento.preventDefault();
    window.location.href = "https://www.paypal.com/donate/?hosted_button_id=VLCSMLX2AG8HQ";
});