const comunasPorRegionAdmin =
{
    "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],     "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica"],     "Antofagasta": ["Antofagasta", "Calama", "Mejillones", "Tocopilla"],     "Atacama": ["Copiapó", "Caldera", "Vallenar", "Huasco"],     "Coquimbo": ["La Serena", "Coquimbo", "Ovalle", "Illapel"],     "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio"],     "Metropolitana de Santiago": ["Santiago", "La Reina", "Providencia", "Las Condes", "Ñuñoa", "Maipú", "Puente Alto", "San Bernardo"],     "O'Higgins": ["Rancagua", "Machalí", "Rengo", "San Fernando"],     "Maule": ["Talca", "Curicó", "Linares", "Molina"],     "Ñuble": ["Chillán", "San Carlos", "Bulnes", "Yungay"],     "Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Coronel"],     "La Araucanía": ["Temuco", "Villarrica", "Pucón", "Angol"],     "Los Ríos": ["Valdivia", "La Unión", "Río Bueno", "Panguipulli"],     "Los Lagos": ["Puerto Montt", "Osorno", "Castro", "Ancud"],     "Aysén": ["Coyhaique", "Aysén", "Chile Chico", "Cochrane"],     "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"]
}
;
const USUARIOS_KEY_ADMIN = "nutrivida_usuarios";
function validarRunAdmin(run)
{
    const rut = run.replace(/[.\-]/g, "").toUpperCase();
    if (!/^\d{7,8}[0-9K]$/.test(rut)) return false;
    let suma = 0;
    let multiplicador = 2;
    for (let i = rut.length - 2;
    i >= 0;
    i--)
    {
        suma += Number(rut[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    const resultado = 11 - (suma % 11);
    const digito = resultado === 11 ? "0" : resultado === 10 ? "K" : String(resultado);
    return digito === rut.at(-1);
}
document.addEventListener("DOMContentLoaded", () =>
{
    const form = document.getElementById("form-usuario");
    if (!form) return;
    const region = document.getElementById("region");
    const comuna = document.getElementById("comuna");
    const fecha = document.getElementById("fecha-nacimiento");
    Object.keys(comunasPorRegionAdmin).forEach((nombreRegion) =>
    {
        const option = document.createElement("option");
        option.value = nombreRegion;
        option.textContent = nombreRegion;
        region.appendChild(option);
    }
    );
    region.addEventListener("change", () =>
    {
        comuna.innerHTML = '<option value="">Selecciona una comuna</option>';
        (comunasPorRegionAdmin[region.value] || []).forEach((nombreComuna) =>
        {
            const option = document.createElement("option");
            option.value = nombreComuna;
            option.textContent = nombreComuna;
            comuna.appendChild(option);
        }
        );
        comuna.disabled = !region.value;
    }
    );
    if (fecha) fecha.max = new Date().toISOString().split("T")[0];
    form.addEventListener("submit", (event) =>
    {
        event.preventDefault();
        clearAllFieldErrors(form);
        showFormMessage("mensaje-usuario", "");
        const values = Object.fromEntries(new FormData(form).entries());
        const run = values.run.trim().toUpperCase();
        const correo = values.correo.trim().toLowerCase();
        if (!validarRunAdmin(run)) return setFieldError("run", "Ingresa un RUN chileno válido.");
        if (!validName(values.nombre.trim())) return setFieldError("nombre", "Ingresa un nombre válido.");
        if (!validName(values.apellidos.trim())) return setFieldError("apellidos", "Ingresa apellidos válidos.");
        if (!validEmail(correo)) return setFieldError("correo", "Ingresa un correo válido.");
        if (!values["tipo-usuario"]) return setFieldError("tipo-usuario", "Selecciona un perfil.");
        if (!values.region) return setFieldError("region", "Selecciona una región.");
        if (!values.comuna) return setFieldError("comuna", "Selecciona una comuna.");
        if (values.direccion.trim().length < 5) return setFieldError("direccion", "La dirección debe tener al menos 5 caracteres.");
        let usuarios = [];
        try
        {
            usuarios = JSON.parse(localStorage.getItem(USUARIOS_KEY_ADMIN)) || [];
            if (!Array.isArray(usuarios)) usuarios = [];
        }
        catch (error)
        {
            usuarios = [];
        }
        if (usuarios.some((usuario) => usuario.run === run)) return setFieldError("run", "Este RUN ya está registrado.");
        if (usuarios.some((usuario) => usuario.correo === correo)) return setFieldError("correo", "Este correo ya está registrado.");
        const siguienteId = usuarios.reduce((max, usuario) => Math.max(max, Number(usuario.id) || 0), 2) + 1;
        usuarios.push(
        {
            id: siguienteId,             run,             nombre: values.nombre.trim(),             apellidos: values.apellidos.trim(),             correo,             fechaNacimiento: values["fecha-nacimiento"] || "",             rol: values["tipo-usuario"],             region: values.region,             comuna: values.comuna,             direccion: values.direccion.trim(),             estado: "Activo"
        }
        );
        localStorage.setItem(USUARIOS_KEY_ADMIN, JSON.stringify(usuarios));
        showFormMessage("mensaje-usuario", "Usuario creado correctamente. Ya aparece en el listado de Administración → Usuarios.", "success");
        form.reset();
        comuna.innerHTML = '<option value="">Selecciona una comuna</option>';
        comuna.disabled = true;
    }
    );
}
);
