const parametros = new URLSearchParams(window.location.search);
const servicioSeleccionado = parametros.get("servicio");

console.log("Servicio seleccionado:", servicioSeleccionado);

const selectServicio = document.querySelector("#servicio");

if (servicioSeleccionado) {
    selectServicio.value = servicioSeleccionado;
}
const formulario = document.querySelector("#form-reserva");
const mensaje = document.querySelector("#mensaje-reserva");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim();
    const correo = document.querySelector("#correo").value.trim();
    const telefono = document.querySelector("#telefono").value.trim();
    const servicio = document.querySelector("#servicio").value;
    const fecha = document.querySelector("#fecha").value;
    const hora = document.querySelector("#hora").value;
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formatoNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{3,}$/;
    const formatoTelefono = /^\+56\s?9\s?\d{4}\s?\d{4}$/;

    if (nombre === "") {
        mensaje.textContent = "Por favor, ingresa tu nombre completo.";
        return;
    }

    if (!formatoNombre.test(nombre)) {
        mensaje.textContent = "Por favor, ingresa un nombre válido.";
        return;
}

    if (correo === "") {
        mensaje.textContent = "Por favor, ingresa tu correo electrónico.";
        return;
    }

    if (!formatoCorreo.test(correo)) {
        mensaje.textContent = "Por favor, ingresa un correo electrónico válido.";
        return;
}

    if (telefono === "") {
        mensaje.textContent = "Por favor, ingresa tu teléfono.";
        return;
    }

    if (!formatoTelefono.test(telefono)) {
        mensaje.textContent = "Por favor, ingresa un teléfono válido.";
        return;
}

    if (servicio === "") {
        mensaje.textContent = "Por favor, selecciona un servicio.";
        return;
    }

    if (fecha === "") {
        mensaje.textContent = "Por favor, selecciona una fecha.";
        return;
    }

    if (hora === "") {
        mensaje.textContent = "Por favor, selecciona una hora.";
        return;
    }

    mensaje.textContent = "¡Reserva realizada correctamente!";
});