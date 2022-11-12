import { listaServices } from "../service/cliente_service.js";

const url = new URL(window.location);
const buscar_pets = url.searchParams.get("buscar");
const buscarp = buscar_pets.toLocaleLowerCase();
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
const div = document.querySelector("[data-search]");



  listaServices
  .listaBuscados()
  .then((data) => {

      data.forEach(({ raza, tamanio, color, descripcion, imagen, id }) => {
        const colorp = color.toLowerCase();
        const razap = raza.toLowerCase();
        const tamaniop = tamanio.toLowerCase();
        const descripcionp = descripcion.toLowerCase();
  
        if (razap.includes(buscarp) || tamaniop.includes(buscarp) || descripcionp.includes(buscarp) || colorp.includes(buscarp)) {
          document.querySelector(".img_search").style.display = "none";
          document.querySelector(".rotate").style.display = "none";
          const nuevaLinea = crearNuevaLinea(imagen, raza, id);
          div.appendChild(nuevaLinea);
      
        }
  
      })
    
   
  })
  .catch((error) => console.log(error));




  