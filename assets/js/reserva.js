const parametros = new URLSearchParams(window.location.search);
const servicioSeleccionado = parametros.get("servicio");
const selectServicio = document.querySelector("#servicio");
const formulario = document.querySelector("#form-reserva");
const mensaje = document.querySelector("#mensaje-reserva");

if (servicioSeleccionado && selectServicio) {
    selectServicio.value = servicioSeleccionado;
}

if (formulario) {
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.querySelector("#nombre").value.trim();
        const correo = document.querySelector("#correo").value.trim();
        const telefono = document.querySelector("#telefono").value.trim();
        const nutricionista = document.querySelector("#nutricionista").value;
        const servicio = document.querySelector("#servicio").value;
        const motivo = document.querySelector("#motivo").value.trim();
        const fecha = document.querySelector("#fecha").value;
        const hora = document.querySelector("#hora").value;

        const nombreValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/;
        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const telefonoValido = /^\+?[\d\s]{8,15}$/;

        if (nombre === "") {
            mensaje.textContent = "Ingresa tu nombre.";
            return;
        }

        if (!nombreValido.test(nombre)) {
            mensaje.textContent = "Ingresa un nombre válido.";
            return;
        }

        if (correo === "") {
            mensaje.textContent = "Ingresa tu correo electrónico.";
            return;
        }

        if (!correoValido.test(correo)) {
            mensaje.textContent = "Ingresa un correo electrónico válido.";
            return;
        }

        if (telefono === "") {
            mensaje.textContent = "Ingresa tu teléfono.";
            return;
        }

        if (!telefonoValido.test(telefono)) {
            mensaje.textContent = "Ingresa un teléfono válido.";
            return;
        }

        if (nutricionista === "") {
            mensaje.textContent = "Selecciona un nutricionista.";
            return;
        }

        if (servicio === "") {
            mensaje.textContent = "Selecciona el servicio.";
            return;
        }

        if (motivo === "") {
            mensaje.textContent = "Ingresa el motivo de tu consulta.";
            return;
        }

        if (motivo.length < 10) {
            mensaje.textContent = "El motivo debe tener al menos 10 caracteres.";
            return;
        }

        if (fecha === "") {
            mensaje.textContent = "Selecciona una fecha.";
            return;
        }

        const fechaSeleccionada = new Date(fecha + "T00:00:00");
        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);

        if (fechaSeleccionada < fechaActual) {
            mensaje.textContent = "La fecha no puede ser anterior al día de hoy.";
            return;
        }

        if (hora === "") {
            mensaje.textContent = "Selecciona una hora.";
            return;
        }

        mensaje.textContent = "";

        window.location.href = "confirmacion.html";
    });
}