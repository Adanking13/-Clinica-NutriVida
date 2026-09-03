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

    if (nombre === "") {
        mensaje.textContent = "Por favor, ingresa tu nombre completo.";
        return;
    }

    if (correo === "") {
        mensaje.textContent = "Por favor, ingresa tu correo electrónico.";
        return;
    }

    if (telefono === "") {
        mensaje.textContent = "Por favor, ingresa tu teléfono.";
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