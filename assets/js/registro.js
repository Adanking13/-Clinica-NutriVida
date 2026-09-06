const formulario = document.querySelector("#form-registro");

const mensaje = document.querySelector("#mensaje-registro");

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim();
    const correo = document.querySelector("#correo").value.trim();
    const telefono = document.querySelector("#telefono").value.trim();
    const password = document.querySelector("#password").value;
    const confirmarPassword = document.querySelector("#password-confirmar").value;

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formatoNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{3,}$/;
    const formatoTelefono = /^\+56\s?9\s?\d{4}\s?\d{4}$/;

    mensaje.textContent = "";
    mensaje.style.color = "";

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

    if (password === "") {
        mensaje.textContent = "Por favor, ingresa una contraseña.";
        return;
    }

    if (password.length < 6) {
        mensaje.textContent = "La contraseña debe tener al menos 6 caracteres.";
        return;
    }

    if (confirmarPassword === "") {
        mensaje.textContent = "Confirma tu contraseña.";
        return;
    }

    if (password !== confirmarPassword) {
        mensaje.textContent = "Las contraseñas no coinciden.";
        return;
    }

    mensaje.textContent = "¡Registro realizado correctamente!";
    mensaje.style.color = "var(--acento)";

    formulario.reset();
});