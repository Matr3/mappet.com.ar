import { listaServices } from "../service/cliente_service.js"
import { lat, lng } from "../js/maps_marcadores.js";


let imagen = "";

const comprimirImagen = (imagen) => {
    return new Promise((resolve, reject) => {
        const $canvas = document.createElement("canvas");
        const imagenG = new Image();
        imagenG.onload = () => {
            $canvas.width = 800;
            $canvas.height = (imagenG.height * $canvas.width) / imagenG.width;
            $canvas.getContext("2d").drawImage(imagenG, 0, 0, $canvas.width, $canvas.height);
            $canvas.toBlob(
                (blob) => {
                    if (blob === null) {
                        return reject(blob);
                    } else {
                        resolve(blob);
                    }
                },
                "image/jpeg",
                50 / 100
            );
        };
        imagenG.src = URL.createObjectURL(imagen);
    });
};
/*Muestra la imagen seleccionada para agregar en el nuevo producto
y deja la URL del archivo para usar luego*/

const btnAgregarImagen = document.querySelector(".agregar__imagen");
btnAgregarImagen.addEventListener('change', cargar);

async function cargar(ev) {

    const size = 50000;
    if (ev.target.files[0].size <= size) {
        var arch = new FileReader();
        arch.readAsDataURL(ev.target.files[0]);
        arch.addEventListener('load', leer);

    } else {
        const archivo = ev.target.files[0];
        const blob = await comprimirImagen(archivo);
        console.log("pesado")
        var arch = new FileReader();
        arch.readAsDataURL(blob);
        arch.addEventListener('load', leer);
    }
}

function leer(ev) {
    document.getElementById('box__imagen').style.backgroundImage = "url('" + ev.target.result + "')";

    imagen = ev.target.result;

    document.querySelector(".archivo__faltante").parentElement.classList.remove("input__invalido");
}


/*Submit del formulario de cargar nuevo producto.
Chequeo que tenga el archivo de foto seleccionado*/
const formAgregarProducto = document.querySelector(".formulario_contenedor");

formAgregarProducto.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!imagen) {

        document.querySelector(".archivo__faltante").parentElement.classList.add("input__invalido");

    } else {
        var fecha = Date();
        const nombreUser = document.querySelector(".titleUser").textContent;
        const emailUser = sessionStorage.getItem("email").replace(/"/g, '');
        const selectorBusqueda = document.querySelector("[data-tipo=selector]");
        const selector = selectorBusqueda.options[selectorBusqueda.selectedIndex].text;
        const raza = document.querySelector("[data-tipo=animal]").value;
        const color = document.querySelector("[data-tipo=color]").value;
        const tamanio = document.querySelector("[data-tipo=tamanio]").value;
        const descripcion = document.querySelector("[data-tipo=descripcion]").value;
        const email = document.querySelector("[data-tipo=email]").value;
        const latlgn = { lat: lat, lng: lng };
        const vacio = " ";
        const datos = {selector: selector, imagen: imagen, raza: raza, color: color, descripcion: descripcion, tamanio: tamanio, email: email, latlgn: latlgn, fecha: fecha, nombreUser: nombreUser, emailUser: emailUser}
        if (lat === vacio) {
            console.log("marque en el mapa donde se perdio o encontro la mascota");
        } else {
            console.log(datos)
            fetch('./php/agregarPets.php',{
                method: 'POST',
                body: JSON.stringify(datos),
                headers: {
                  'Content-Type': 'application/json'// AQUI indicamos el formato
                }
              })
              .then(function(response) {
                return response.text();
              })
              .then(function(data) {
                console.log(data);
              })
              .catch(function(error) {
                console.error(error);
              })
                
        }

    }
});