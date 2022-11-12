import { obtenerDatos } from "./loginIndex.js"

export function detalleUsuarios(nombreCompletoAdd, imagenAdd) {


    //backticks
    const crearUsuario = () => {
        const linea = document.createElement("div");
        const contenido = `
    <div class="user_display">
        <picture>
            <img class="img_user" src="${imagenAdd}" alt="Usuario ${nombreCompletoAdd}" referrerpolicy="no-referrer"/ >
        </picture>
        <div class="content">
            <a class="miCuenta" href="./usuario_pets.html"><h1 class="titleUser">${nombreCompletoAdd}</h1></a>
        </div>
    </div>
        `;

        linea.innerHTML = contenido;

        return linea;
    };
    const div = document.querySelector("[data-usuario]");




    const nuevaLinea1 = crearUsuario();
    div.appendChild(nuevaLinea1).className = "user_detalles";


}
