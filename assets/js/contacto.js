const formulario = document.getElementById("form-contacto");

if (formulario) {
    const mensaje = document.getElementById("mensaje-contacto");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const asunto = document.getElementById("asunto").value.trim();
        const texto = document.getElementById("mensaje").value.trim();

        mensaje.textContent = "";
        mensaje.style.color = "";

        if (nombre === "") {
            mensaje.textContent = "Ingresa tu nombre.";
            return;
        }

        if (nombre.length < 2) {
            mensaje.textContent = "El nombre debe tener al menos 2 caracteres.";
            return;
        }

        const correoValido = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

        if (correo === "") {
            mensaje.textContent = "Ingresa tu correo.";
            return;
        }

        if (!correoValido.test(correo)) {
            mensaje.textContent = "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
            return;
        }

        const telefonoValido = /^\+?[\d\s]{8,15}$/;

        if (telefono === "") {
            mensaje.textContent = "Ingresa tu teléfono.";
            return;
        }

        if (!telefonoValido.test(telefono)) {
            mensaje.textContent = "Ingresa un teléfono válido.";
            return;
        }

        if (asunto === "") {
            mensaje.textContent = "Ingresa un asunto.";
            return;
        }

        if (texto === "") {
            mensaje.textContent = "Ingresa tu mensaje.";
            return;
        }

        if (texto.length < 10) {
            mensaje.textContent = "El mensaje debe tener al menos 10 caracteres.";
            return;
        }

        mensaje.textContent = "Mensaje enviado correctamente.";
        mensaje.style.color = "var(--acento)";

        formulario.reset();
    });
}