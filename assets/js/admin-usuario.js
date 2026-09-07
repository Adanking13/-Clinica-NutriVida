const formulario = document.getElementById("form-usuario");

const mensajeUsuario = document.getElementById("mensaje-usuario");

const regionSelect = document.getElementById("region");

const comunaSelect = document.getElementById("comuna");

const comunasPorRegion = {
    "Arica y Parinacota": [
        "Arica",
        "Camarones",
        "Putre",
        "General Lagos"
    ],
    "Tarapacá": [
        "Iquique",
        "Alto Hospicio",
        "Pozo Almonte",
        "Pica"
    ],
    "Antofagasta": [
        "Antofagasta",
        "Calama",
        "Mejillones",
        "Tocopilla"
    ],
    "Atacama": [
        "Copiapó",
        "Caldera",
        "Vallenar",
        "Huasco"
    ],
    "Coquimbo": [
        "La Serena",
        "Coquimbo",
        "Ovalle",
        "Illapel"
    ],
    "Valparaíso": [
        "Valparaíso",
        "Viña del Mar",
        "Quilpué",
        "Villa Alemana",
        "San Antonio"
    ],
    "Metropolitana de Santiago": [
        "Santiago",
        "La Reina",
        "Providencia",
        "Las Condes",
        "Ñuñoa",
        "Maipú",
        "Puente Alto",
        "San Bernardo"
    ],
    "O'Higgins": [
        "Rancagua",
        "Machalí",
        "Rengo",
        "San Fernando"
    ],
    "Maule": [
        "Talca",
        "Curicó",
        "Linares",
        "Molina"
    ],
    "Ñuble": [
        "Chillán",
        "San Carlos",
        "Bulnes",
        "Yungay"
    ],
    "Biobío": [
        "Concepción",
        "Talcahuano",
        "Los Ángeles",
        "Coronel"
    ],
    "La Araucanía": [
        "Temuco",
        "Villarrica",
        "Pucón",
        "Angol"
    ],
    "Los Ríos": [
        "Valdivia",
        "La Unión",
        "Río Bueno",
        "Panguipulli"
    ],
    "Los Lagos": [
        "Puerto Montt",
        "Osorno",
        "Castro",
        "Ancud"
    ],
    "Aysén": [
        "Coyhaique",
        "Aysén",
        "Chile Chico",
        "Cochrane"
    ],
    "Magallanes y de la Antártica Chilena": [
        "Punta Arenas",
        "Puerto Natales",
        "Porvenir",
        "Cabo de Hornos"
    ]
};

const regiones = Object.keys(comunasPorRegion);

regiones.forEach(function (region) {
    const opcion = document.createElement("option");

    opcion.value = region;
    opcion.textContent = region;

    regionSelect.appendChild(opcion);
});

regionSelect.addEventListener("change", function () {
    const regionSeleccionada = regionSelect.value;

    comunaSelect.innerHTML =
        '<option value="">Selecciona una comuna</option>';

    if (regionSeleccionada === "") {
        comunaSelect.disabled = true;
        return;
    }

    comunasPorRegion[regionSeleccionada].forEach(function (comuna) {
        const opcion = document.createElement("option");

        opcion.value = comuna;
        opcion.textContent = comuna;

        comunaSelect.appendChild(opcion);
    });

    comunaSelect.disabled = false;
});

function validarRun(run) {
    let rut = run
        .replace(/\./g, "")
        .replace(/-/g, "")
        .toUpperCase();

    if (!/^\d{7,8}[0-9K]$/.test(rut)) {
        return false;
    }

    const cuerpo = rut.slice(0, -1);
    const digitoVerificador = rut.slice(-1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplicador;

        multiplicador++;

        if (multiplicador === 8) {
            multiplicador = 2;
        }
    }

    const resto = suma % 11;
    const resultado = 11 - resto;

    let digitoCalculado;

    if (resultado === 11) {
        digitoCalculado = "0";
    } else if (resultado === 10) {
        digitoCalculado = "K";
    } else {
        digitoCalculado = String(resultado);
    }

    return digitoCalculado === digitoVerificador;
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const run = document.getElementById("run").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const fechaNacimiento =
        document.getElementById("fecha-nacimiento").value;
    const tipoUsuario =
        document.getElementById("tipo-usuario").value;
    const region = regionSelect.value;
    const comuna = comunaSelect.value;
    const direccion =
        document.getElementById("direccion").value.trim();

    mensajeUsuario.textContent = "";
    mensajeUsuario.style.color = "";

    if (run === "") {
        mensajeUsuario.textContent =
            "Ingresa el RUN del usuario.";
        return;
    }

    if (!validarRun(run)) {
        mensajeUsuario.textContent =
            "Ingresa un RUN válido.";
        return;
    }

    if (nombre === "") {
        mensajeUsuario.textContent =
            "Ingresa el nombre del usuario.";
        return;
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/.test(nombre)) {
        mensajeUsuario.textContent =
            "Ingresa un nombre válido.";
        return;
    }

    if (apellidos === "") {
        mensajeUsuario.textContent =
            "Ingresa los apellidos del usuario.";
        return;
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/.test(apellidos)) {
        mensajeUsuario.textContent =
            "Ingresa apellidos válidos.";
        return;
    }

    if (correo === "") {
        mensajeUsuario.textContent =
            "Ingresa el correo electrónico.";
        return;
    }

    const correoValido =
        /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

    if (!correoValido.test(correo)) {
        mensajeUsuario.textContent =
            "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        return;
    }

    if (fechaNacimiento !== "") {
        const fechaActual = new Date();
        const fechaIngresada =
            new Date(fechaNacimiento + "T00:00:00");

        if (fechaIngresada > fechaActual) {
            mensajeUsuario.textContent =
                "La fecha de nacimiento no puede ser futura.";
            return;
        }
    }

    if (tipoUsuario === "") {
        mensajeUsuario.textContent =
            "Selecciona un tipo de usuario.";
        return;
    }

    if (region === "") {
        mensajeUsuario.textContent =
            "Selecciona una región.";
        return;
    }

    if (comuna === "") {
        mensajeUsuario.textContent =
            "Selecciona una comuna.";
        return;
    }

    if (direccion === "") {
        mensajeUsuario.textContent =
            "Ingresa la dirección del usuario.";
        return;
    }

    if (direccion.length < 5) {
        mensajeUsuario.textContent =
            "La dirección debe tener al menos 5 caracteres.";
        return;
    }

    mensajeUsuario.textContent =
        "Usuario creado correctamente.";

    mensajeUsuario.style.color =
        "var(--acento)";

    formulario.reset();

    comunaSelect.innerHTML =
        '<option value="">Selecciona una comuna</option>';

    comunaSelect.disabled = true;
});