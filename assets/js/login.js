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

    const accesoAdminAnterior = document.querySelector("#acceso-admin");

    if (accesoAdminAnterior) {
        accesoAdminAnterior.remove();
    }

    if (correo === "admin@nutrivida.cl") {

        const accesoAdmin = document.createElement("a");

        accesoAdmin.id = "acceso-admin";
        accesoAdmin.href = "admin.html";
        accesoAdmin.className = "btn";
        accesoAdmin.textContent = "Ir a administración";

        formulario.appendChild(accesoAdmin);
    }
});