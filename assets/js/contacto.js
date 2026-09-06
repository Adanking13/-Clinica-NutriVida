const formulario = document.getElementById("form-contacto");
const mensajeFormulario = document.getElementById("mensaje-formulario");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    mensajeFormulario.textContent = "";
    mensajeFormulario.style.color = "";

    if (nombre === "") {
        mensajeFormulario.textContent = "Ingresa tu nombre.";
        return;
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/.test(nombre)) {
        mensajeFormulario.textContent = "Ingresa un nombre válido.";
        return;
    }

    if (correo === "") {
        mensajeFormulario.textContent = "Ingresa tu correo electrónico.";
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        mensajeFormulario.textContent = "Ingresa un correo electrónico válido.";
        return;
    }

    if (telefono === "") {
        mensajeFormulario.textContent = "Ingresa tu teléfono.";
        return;
    }

    if (!/^\+?[\d\s]{8,15}$/.test(telefono)) {
        mensajeFormulario.textContent = "Ingresa un teléfono válido.";
        return;
    }

    if (asunto === "") {
        mensajeFormulario.textContent = "Ingresa un asunto.";
        return;
    }

    if (asunto.length < 3) {
        mensajeFormulario.textContent = "El asunto debe tener al menos 3 caracteres.";
        return;
    }

    if (mensaje === "") {
        mensajeFormulario.textContent = "Ingresa un mensaje.";
        return;
    }

    if (mensaje.length < 10) {
        mensajeFormulario.textContent = "El mensaje debe tener al menos 10 caracteres.";
        return;
    }

    mensajeFormulario.textContent = "Mensaje enviado correctamente.";
    mensajeFormulario.style.color = "var(--acento)";

    formulario.reset();
});