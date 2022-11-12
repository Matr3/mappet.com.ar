export function valida(input) {
    const tipoInput = input.dataset.tipo;


    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoInput, input);
    }
};

const tipoError = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
];

const mensajesError = {
    nombre: {
        valueMissing: "Este Campo no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    animal: {
        valueMissing: "Este Campo no puede estar vacio"
    },
    color: {
        valueMissing: "Este Campo no puede estar vacio",
    },
    tamanio: {
        valueMissing: "Este Campo no puede estar vacio",
    },
    email: {
        valueMissing: "Este Campo no puede estar vacio",
        typeMismatch: "El correo no es valido",
        patternMismatch: "El correo no es valido",
    },
}

function mostrarMensajeError(tipoInput, input) {
    let mensaje = "";
    tipoError.forEach((error) => {
        if (input.validity[error]) {
            mensaje = mensajesError[tipoInput][error];
        }
    })
    return mensaje;
};
