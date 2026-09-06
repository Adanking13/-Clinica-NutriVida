const formulario = document.querySelector("#form-login");
const mensaje = document.querySelector("#mensaje-login");

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const correo = document.querySelector("#correo").value.trim();
    const password = document.querySelector("#password").value;

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    mensaje.textContent = "";
    mensaje.style.color = "";

    if (correo === "") {
        mensaje.textContent = "Por favor, ingresa tu correo electrónico.";
        return;
    }

    if (!formatoCorreo.test(correo)) {
        mensaje.textContent = "Por favor, ingresa un correo electrónico válido.";
        return;
    }

    if (password === "") {
        mensaje.textContent = "Por favor, ingresa tu contraseña.";
        return;
    }

    if (password.length < 6) {
        mensaje.textContent = "La contraseña debe tener al menos 6 caracteres.";
        return;
    }

    mensaje.textContent = "¡Inicio de sesión realizado correctamente!";
    mensaje.style.color = "var(--acento)";
});