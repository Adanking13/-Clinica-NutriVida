const formulario = document.getElementById("form-registro");

const mensajeRegistro = document.getElementById("mensaje-registro");

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

Object.keys(comunasPorRegion).forEach(function (region) {
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
    const rut = run
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

function validarCorreo(correo) {
    const formatoCorreo =
        /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

    return formatoCorreo.test(correo);
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const run =
        document.getElementById("run").value.trim();

    const nombre =
        document.getElementById("nombre").value.trim();

    const apellidos =
        document.getElementById("apellidos").value.trim();

    const correo =
        document.getElementById("correo").value.trim();

    const fechaNacimiento =
        document.getElementById("fecha-nacimiento").value;

    const region =
        regionSelect.value;

    const comuna =
        comunaSelect.value;

    const direccion =
        document.getElementById("direccion").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmarPassword =
        document.getElementById("password-confirmar").value;

    mensajeRegistro.textContent = "";
    mensajeRegistro.style.color = "";

    if (run === "") {
        mensajeRegistro.textContent =
            "Ingresa tu RUN.";
        return;
    }

    if (!validarRun(run)) {
        mensajeRegistro.textContent =
            "Ingresa un RUN válido.";
        return;
    }

    if (nombre === "") {
        mensajeRegistro.textContent =
            "Ingresa tu nombre.";
        return;
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{2,50}$/.test(nombre)) {
        mensajeRegistro.textContent =
            "Ingresa un nombre válido.";
        return;
    }

    if (apellidos === "") {
        mensajeRegistro.textContent =
            "Ingresa tus apellidos.";
        return;
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{2,100}$/.test(apellidos)) {
        mensajeRegistro.textContent =
            "Ingresa apellidos válidos.";
        return;
    }

    if (correo === "") {
        mensajeRegistro.textContent =
            "Ingresa tu correo electrónico.";
        return;
    }

    if (correo.length > 100) {
        mensajeRegistro.textContent =
            "El correo no puede superar los 100 caracteres.";
        return;
    }

    if (!validarCorreo(correo)) {
        mensajeRegistro.textContent =
            "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        return;
    }

    if (fechaNacimiento !== "") {
        const fechaIngresada =
            new Date(fechaNacimiento + "T00:00:00");

        const fechaActual =
            new Date();

        if (fechaIngresada > fechaActual) {
            mensajeRegistro.textContent =
                "La fecha de nacimiento no puede ser futura.";
            return;
        }
    }

    if (region === "") {
        mensajeRegistro.textContent =
            "Selecciona una región.";
        return;
    }

    if (comuna === "") {
        mensajeRegistro.textContent =
            "Selecciona una comuna.";
        return;
    }

    if (direccion === "") {
        mensajeRegistro.textContent =
            "Ingresa tu dirección.";
        return;
    }

    if (direccion.length > 300) {
        mensajeRegistro.textContent =
            "La dirección no puede superar los 300 caracteres.";
        return;
    }

    if (password === "") {
        mensajeRegistro.textContent =
            "Ingresa una contraseña.";
        return;
    }

    if (password.length < 4 || password.length > 10) {
        mensajeRegistro.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres.";
        return;
    }

    if (confirmarPassword === "") {
        mensajeRegistro.textContent =
            "Confirma tu contraseña.";
        return;
    }

    if (password !== confirmarPassword) {
        mensajeRegistro.textContent =
            "Las contraseñas no coinciden.";
        return;
    }

    mensajeRegistro.textContent =
        "¡Registro realizado correctamente!";

    mensajeRegistro.style.color =
        "var(--acento)";

    formulario.reset();

    comunaSelect.innerHTML =
        '<option value="">Selecciona una comuna</option>';

    comunaSelect.disabled = true;
});