//Fetch API
const url = "https://62faaedbffd7197707f152a5.mockapi.io/pets";
const url1 = "https://62faaedbffd7197707f152a5.mockapi.io/user";

const listaBuscados = () => fetch("https://62faaedbffd7197707f152a5.mockapi.io/pets").then((respuesta) => respuesta.json()).catch((error) => error);

const listaUsuarios = () => fetch("https://62faaedbffd7197707f152a5.mockapi.io/user").then((respuesta) => respuesta.json()).catch((error) => error);

const crearBusqueda = (data) => {
    //console.log(imagen, categoria, nombre_prod, precio_prod, descripcion_prod)
    return fetch((`/php/agregarPets.php`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data
    })
}


const crearUsuario = (email, nombre, apellido, nombreCompleto, imagen) => {
    console.log(email, nombre, apellido, nombreCompleto, imagen)
    return fetch((`${url1}`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            nombre,
            apellido,
            nombreCompleto,
            imagen

        })
    })
}

const eliminarPets = (id) => {
    console.log("eliminar a", id)
    return fetch(`https://62faaedbffd7197707f152a5.mockapi.io/pets/${id}`, {
        method: "DELETE"
    })
}

const detallePets = (id) => {
    return fetch(`https://62faaedbffd7197707f152a5.mockapi.io/pets/${id}`)
        .then((respuesta) => respuesta.json())
}

const actualizarPets = (imagen, selector, raza, color, tamanio, descripcion, email, fecha, latlgn, id) => {
    return fetch(`https://62faaedbffd7197707f152a5.mockapi.io/pets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagen, selector, raza, color, tamanio, descripcion, email, fecha, latlgn })
    })
        .then((respuesta) => respuesta)
        .catch((err) => console.log(err));
}


export const listaServices = {
    eliminarPets,
    listaBuscados,
    crearBusqueda,
    actualizarPets,
    detallePets,

}
export const listaClientes = {
    crearUsuario,
    listaUsuarios
}
