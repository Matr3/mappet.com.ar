import { listaServices } from "../service/cliente_service.js";

//const busca = "Perdiste tu mascota?";
const encontro = "Encontraste alguna mascota?";
//backticks
const crearNuevaLinea = (imagen, raza, id) => {
  const linea = document.createElement("div");

  const contenido = `
    <div class="mascotas">
    <a class="link_mascotas" href="./detalle_pets.html?id=${id}&categoria=${raza}">
    <div class="wh_box">
    <div class="bng_box">
    <img class="img" src="${imagen}" alt="${raza}">
    </div>
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
  linea.innerHTML = contenido;

  return linea;
};

const act = document.querySelector(".activar");
const div = document.querySelector("[data-encontrados]");

let cont_b = 0;
listaServices
  .listaBuscados()
  .then((data) => {
    data.forEach(({ selector, imagen, raza, id }) => {
      if (selector === encontro) {
        if (act) {
          const nuevaLinea = crearNuevaLinea(imagen, raza, id);
          div.appendChild(nuevaLinea);

        }
        else if (cont_b < 6) {

          const nuevaLinea = crearNuevaLinea(imagen, raza, id);
          div.appendChild(nuevaLinea);
          cont_b++;
        }
      }
    });
  })
  .catch((error) => console.log("Oops! Error. Comuniquese con Matr3"));