import { listaServices } from "../service/cliente_service.js";
import { lat } from "../js/maps_marcadores.js";
import { lng } from "../js/maps_marcadores.js";

const url = new URL(window.location);
const id = url.searchParams.get("id");

var fecha = Date();

const selector = document.querySelector("[data-tipo=selector]");
const raza = document.querySelector("[data-tipo=animal]");
const color = document.querySelector("[data-tipo=color]");
const tamanio = document.querySelector("[data-tipo=tamanio]");
const descripcion = document.querySelector("[data-tipo=descripcion]");
const email = document.querySelector("[data-tipo=email]");

const imagenDiv = document.querySelector(".agregar__imagen-div");

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

let fileImagen = "";

const obtenerPets = () => {

    if (id === null) {
        console.log("error")
    }

    listaServices.detallePets(id)
        .then((pets) => {

            /*cargo todos los input*/
            selector.text = pets.selector;
            raza.value = pets.raza;
            color.value = pets.color;
            tamanio.value = pets.tamanio;
            descripcion.value = pets.descripcion;
            email.value = pets.email;
            imagenDiv.style.backgroundImage = `url("${pets.imagen}")`;
            fileImagen = pets.imagen;

            /*pongo un escuchador en el boton de carga
            de imagen para su modificacion*/
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

                    var arch = new FileReader();
                    arch.readAsDataURL(blob);
                    arch.addEventListener('load', leer);
                }
            }
            function leer(ev) {
                document.getElementById('box__imagen').style.backgroundImage = "url('" + ev.target.result + "')";
                fileImagen = ev.target.result;
                document.querySelector(".archivo__faltante").parentElement.classList.remove("input__invalido");
            }

        }).catch((error) => console.log(error));
};
obtenerPets();

document.querySelector(".formulario_contenedor").addEventListener("submit", (evento) => {
    evento.preventDefault();
    modificarPets();
});


const modificarPets = async () => {

    try {
        const latlgn = { lat: lat, lng: lng };

        const modificado = await listaServices.actualizarPets
            (fileImagen, selector.text, raza.value, color.value, tamanio.value, descripcion.value, email.value, fecha, latlgn, id)

        window.location.href = ("usuario_pets.html");


    } catch (error) {
        console.log(error)
    }
}

