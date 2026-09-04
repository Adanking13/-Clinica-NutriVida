const parametros =
    new URLSearchParams(window.location.search);

const servicioSeleccionado =
    parametros.get("servicio");

const selectServicio =
    document.querySelector("#servicio");

if (servicioSeleccionado && selectServicio) {
    selectServicio.value =
        servicioSeleccionado;
}

const formulario =
    document.querySelector("#form-reserva");

const mensaje =
    document.querySelector("#mensaje-reserva");


if (formulario) {

    formulario.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const nombre =
                document.querySelector("#nombre")
                .value
                .trim();

            const correo =
                document.querySelector("#correo")
                .value
                .trim();

            const telefono =
                document.querySelector("#telefono")
                .value
                .trim();

            const servicio =
                document.querySelector("#servicio")
                .value;

            const fecha =
                document.querySelector("#fecha")
                .value;

            const hora =
                document.querySelector("#hora")
                .value;


            if (nombre === "") {

                mensaje.textContent =
                    "Ingresa tu nombre.";

                return;
            }


            if (correo === "") {

                mensaje.textContent =
                    "Ingresa tu correo electrónico.";

                return;
            }


            if (telefono === "") {

                mensaje.textContent =
                    "Ingresa tu teléfono.";

                return;
            }


            if (servicio === "") {

                mensaje.textContent =
                    "Selecciona el tipo de atención.";

                return;
            }


            if (fecha === "") {

                mensaje.textContent =
                    "Selecciona una fecha.";

                return;
            }


            if (hora === "") {

                mensaje.textContent =
                    "Selecciona una hora.";

                return;
            }


            window.location.href =
                "confirmacion.html";
        }
    );
}