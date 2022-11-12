import { listaServices } from "../service/cliente_service.js";

export function perfilUser() {
  //backticks
  const emailStorage = sessionStorage.getItem("email");


  const crearNuevaLinea = (imagen, raza, id) => {
    const linea = document.createElement("div");
    const contenido = `
        <div class="mascotas">
        
        <div class="wh_box">
        <div class="articulo_edicion">
        <a class="position_icon" href="editar_pets.html?id=${id}"><img class="icon" src="./img/editar.png" alt=""></a>
        <button type="button" id="${id}" class="btn_borrar"><img class="borrar" src="./img/borrar.png"/></button>
         </div>
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
        
    </div>
        `;
    linea.innerHTML = contenido;
    const btn = linea.querySelector("button");
    btn.addEventListener("click", () => {
      const id = btn.id;
      listaServices
        .eliminarPets(id)
        .then((respuesta) => {

          window.location.href = "./usuario_pets.html";
        })
        .catch((err) => console.log("Ocurrió un error"));
    });

    return linea;
  };



  const div = document.querySelector("[data-buscados-all]");



  listaServices
    .listaBuscados()
    .then((data) => {
      data.forEach(({ emailUser, imagen, raza, id }) => {

        if (emailUser === emailStorage) {
          const nuevaLinea = crearNuevaLinea(imagen, raza, id);
          div.appendChild(nuevaLinea).className = "pets_detalles";
        }



      });
    })
    .catch((error) => console.log(error));
}
