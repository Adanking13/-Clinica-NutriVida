const formulario = document.querySelector("#form-login");

const mensaje = document.querySelector("#mensaje-login");

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const correo = document.querySelector("#correo").value.trim();
    const password = document.querySelector("#password").value;

    const formatoCorreo =
        /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

    mensaje.textContent = "";
    mensaje.style.color = "";

    if (correo === "") {
        mensaje.textContent =
            "Por favor, ingresa tu correo electrónico.";
        return;
    }

    if (!formatoCorreo.test(correo)) {
        mensaje.textContent =
            "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        return;
    }

    if (password === "") {
        mensaje.textContent =
            "Por favor, ingresa tu contraseña.";
        return;
    }

    if (password.length < 4 || password.length > 10) {
        mensaje.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres.";
        return;
    }

    mensaje.textContent =
        "¡Inicio de sesión realizado correctamente!";

    mensaje.style.color =
        "var(--acento)";

    const accesoAdminAnterior =
        document.querySelector("#acceso-admin");

    if (accesoAdminAnterior) {
        accesoAdminAnterior.remove();
    }

    if (correo.toLowerCase() === "admin@duoc.cl") {

        const accesoAdmin =
            document.createElement("a");

        accesoAdmin.id =
            "acceso-admin";

        accesoAdmin.href =
            "admin.html";

        accesoAdmin.className =
            "btn";

        accesoAdmin.textContent =
            "Ir a administración";

        formulario.appendChild(accesoAdmin);
    }
});