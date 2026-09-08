const comunasPorRegion =
{
    "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica"],
    "Antofagasta": ["Antofagasta", "Calama", "Mejillones", "Tocopilla"],
    "Atacama": ["Copiapó", "Caldera", "Vallenar", "Huasco"],
    "Coquimbo": ["La Serena", "Coquimbo", "Ovalle", "Illapel"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio"],
    "Metropolitana de Santiago": ["Santiago", "La Reina", "Providencia", "Las Condes", "Ñuñoa", "Maipú", "Puente Alto", "San Bernardo"],
    "O'Higgins": ["Rancagua", "Machalí", "Rengo", "San Fernando"],
    "Maule": ["Talca", "Curicó", "Linares", "Molina"],
    "Ñuble": ["Chillán", "San Carlos", "Bulnes", "Yungay"],
    "Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Coronel"],
    "La Araucanía": ["Temuco", "Villarrica", "Pucón", "Angol"],
    "Los Ríos": ["Valdivia", "La Unión", "Río Bueno", "Panguipulli"],
    "Los Lagos": ["Puerto Montt", "Osorno", "Castro", "Ancud"],
    "Aysén": ["Coyhaique", "Aysén", "Chile Chico", "Cochrane"],
    "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"]
};

const USUARIOS_KEY = "nutrivida_usuarios";

function obtenerUsuarios()
{
    try
    {
        const guardados = JSON.parse(localStorage.getItem(USUARIOS_KEY));

        if (Array.isArray(guardados))
        {
            return guardados;
        }
    }
    catch (error)
    {
        console.warn("No se pudo leer la lista de usuarios.", error);
    }

    try
    {
        const usuarioAnterior = JSON.parse(
            localStorage.getItem("nutrivida_usuario_demo")
        );

        if (usuarioAnterior)
        {
            const migrado =
            [
                {
                    ...usuarioAnterior,
                    id: 3,
                    rol: "Paciente",
                    estado: "Activo"
                }
            ];

            localStorage.setItem(
                USUARIOS_KEY,
                JSON.stringify(migrado)
            );

            return migrado;
        }
    }
    catch (error)
    {
        console.warn(
            "No se pudo migrar el usuario de demostración.",
            error
        );
    }

    return [];
}

function guardarUsuarios(usuarios)
{
    localStorage.setItem(
        USUARIOS_KEY,
        JSON.stringify(usuarios)
    );
}

function validarRun(run)
{
    const rut = run
        .replace(/[.\-]/g, "")
        .toUpperCase();

    if (!/^\d{7,8}[0-9K]$/.test(rut))
    {
        return false;
    }

    let suma = 0;
    let multiplicador = 2;

    for (let i = rut.length - 2; i >= 0; i--)
    {
        suma += Number(rut[i]) * multiplicador;

        multiplicador =
            multiplicador === 7
                ? 2
                : multiplicador + 1;
    }

    const resultado = 11 - (suma % 11);

    const digito =
        resultado === 11
            ? "0"
            : resultado === 10
                ? "K"
                : String(resultado);

    return digito === rut.at(-1);
}

document.addEventListener("DOMContentLoaded", () =>
{
    const form = document.getElementById("form-registro");

    if (!form) return;

    const region = document.getElementById("region");
    const comuna = document.getElementById("comuna");
    const fecha = document.getElementById("fecha-nacimiento");

    Object.keys(comunasPorRegion).forEach((nombreRegion) =>
    {
        const option = document.createElement("option");

        option.value = nombreRegion;
        option.textContent = nombreRegion;

        region.appendChild(option);
    });

    region.addEventListener("change", () =>
    {
        comuna.innerHTML =
            '<option value="">Selecciona una comuna</option>';

        (comunasPorRegion[region.value] || []).forEach(
            (nombreComuna) =>
            {
                const option = document.createElement("option");

                option.value = nombreComuna;
                option.textContent = nombreComuna;

                comuna.appendChild(option);
            }
        );

        comuna.disabled = !region.value;

        if (region.value)
        {
            clearFieldError("region");
        }
    });

    if (fecha)
    {
        fecha.max = new Date()
            .toISOString()
            .split("T")[0];
    }

    // VALIDACIÓN EN TIEMPO REAL

    const validarCampoEnTiempoReal = (id, validar) =>
    {
        const campo = document.getElementById(id);

        if (!campo) return;

        campo.addEventListener("input", () =>
        {
            const resultado = validar(campo.value);

            if (resultado === true)
            {
                clearFieldError(id);
            }
            else
            {
                setFieldError(id, resultado);
            }
        });
    };

    validarCampoEnTiempoReal("run", (value) =>
    {
        return validarRun(value.trim().toUpperCase())
            ? true
            : "Ingresa un RUN chileno válido.";
    });

    validarCampoEnTiempoReal("nombre", (value) =>
    {
        return validName(value.trim())
            ? true
            : "Ingresa un nombre válido.";
    });

    validarCampoEnTiempoReal("apellidos", (value) =>
    {
        return validName(value.trim())
            ? true
            : "Ingresa apellidos válidos.";
    });

    validarCampoEnTiempoReal("correo", (value) =>
    {
        return validEmail(value.trim())
            ? true
            : "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    });

    validarCampoEnTiempoReal("direccion", (value) =>
    {
        return value.trim().length >= 5
            ? true
            : "La dirección debe tener al menos 5 caracteres.";
    });

    validarCampoEnTiempoReal("password", (value) =>
    {
        return value.length >= 4 && value.length <= 10
            ? true
            : "La contraseña debe tener entre 4 y 10 caracteres.";
    });

    validarCampoEnTiempoReal("password-confirmar", (value) =>
    {
        const password =
            document.getElementById("password")?.value || "";

        return value === password
            ? true
            : "Las contraseñas no coinciden.";
    });

    // VALIDACIÓN AL ENVIAR

    form.addEventListener("submit", (event) =>
    {
        event.preventDefault();

        clearAllFieldErrors(form);
        showFormMessage("mensaje-registro", "");

        const values =
            Object.fromEntries(
                new FormData(form).entries()
            );

        const runNormalizado =
            values.run.trim().toUpperCase();

        const correoNormalizado =
            values.correo.trim().toLowerCase();

        if (!validarRun(runNormalizado))
        {
            return setFieldError(
                "run",
                "Ingresa un RUN chileno válido."
            );
        }

        if (!validName(values.nombre.trim()))
        {
            return setFieldError(
                "nombre",
                "Ingresa un nombre válido."
            );
        }

        if (!validName(values.apellidos.trim()))
        {
            return setFieldError(
                "apellidos",
                "Ingresa apellidos válidos."
            );
        }

        if (!validEmail(correoNormalizado))
        {
            return setFieldError(
                "correo",
                "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com."
            );
        }

        if (
            values["fecha-nacimiento"] &&
            new Date(
                values["fecha-nacimiento"] + "T00:00:00"
            ) > new Date()
        )
        {
            return setFieldError(
                "fecha-nacimiento",
                "La fecha no puede ser futura."
            );
        }

        if (!values.region)
        {
            return setFieldError(
                "region",
                "Selecciona una región."
            );
        }

        if (!values.comuna)
        {
            return setFieldError(
                "comuna",
                "Selecciona una comuna."
            );
        }

        if (values.direccion.trim().length < 5)
        {
            return setFieldError(
                "direccion",
                "La dirección debe tener al menos 5 caracteres."
            );
        }

        if (
            values.password.length < 4 ||
            values.password.length > 10
        )
        {
            return setFieldError(
                "password",
                "La contraseña debe tener entre 4 y 10 caracteres."
            );
        }

        if (
            values.password !==
            values["password-confirmar"]
        )
        {
            return setFieldError(
                "password-confirmar",
                "Las contraseñas no coinciden."
            );
        }

        const usuarios = obtenerUsuarios();

        const duplicadoRun =
            usuarios.some(
                (usuario) =>
                    usuario.run === runNormalizado
            );

        const duplicadoCorreo =
            usuarios.some(
                (usuario) =>
                    usuario.correo === correoNormalizado
            );

        if (duplicadoRun)
        {
            return setFieldError(
                "run",
                "Este RUN ya está registrado."
            );
        }

        if (duplicadoCorreo)
        {
            return setFieldError(
                "correo",
                "Este correo ya está registrado."
            );
        }

        const siguienteId =
            usuarios.reduce(
                (max, usuario) =>
                    Math.max(
                        max,
                        Number(usuario.id) || 0
                    ),
                2
            ) + 1;

        // No se almacena la contraseña.

        const usuario =
        {
            id: siguienteId,
            run: runNormalizado,
            nombre: values.nombre.trim(),
            apellidos: values.apellidos.trim(),
            correo: correoNormalizado,
            fechaNacimiento:
                values["fecha-nacimiento"] || "",
            region: values.region,
            comuna: values.comuna,
            direccion: values.direccion.trim(),
            rol: "Paciente",
            estado: "Activo"
        };

        usuarios.push(usuario);

        guardarUsuarios(usuarios);

        showFormMessage(
            "mensaje-registro",
            "Registro realizado correctamente. El usuario quedó disponible en Administración → Usuarios.",
            "success"
        );

        form.reset();

        comuna.innerHTML =
            '<option value="">Selecciona una comuna</option>';

        comuna.disabled = true;
    });
});