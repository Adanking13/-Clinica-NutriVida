const USUARIOS_KEY = "nutrivida_usuarios";

function obtenerUsuariosAdmin() {
    try {
        const usuarios = JSON.parse(
            localStorage.getItem(USUARIOS_KEY)
        );

        if (Array.isArray(usuarios)) {
            return usuarios;
        }
    } catch (error) {
        console.warn(
            "No se pudo leer la lista de usuarios.",
            error
        );
    }

    return [];
}

function escaparHtml(valor) {
    return String(valor ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", () => {

    const tbody =
        document.getElementById("tabla-usuarios");

    const contador =
        document.getElementById("contador-usuarios");

    if (!tbody) {
        return;
    }

    const renderizarUsuarios = () => {

        const usuarios =
            obtenerUsuariosAdmin();

        if (contador) {
            contador.textContent =
                `${usuarios.length} usuario${
                    usuarios.length === 1 ? "" : "s"
                } registrado${
                    usuarios.length === 1 ? "" : "s"
                }`;
        }

        if (usuarios.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="6">
                        No hay usuarios registrados todavía.
                    </td>
                </tr>
            `;

            return;
        }

        tbody.innerHTML = usuarios
            .map((usuario) => {

                const nombreCompleto =
                    [
                        usuario.nombre,
                        usuario.apellidos
                    ]
                        .filter(Boolean)
                        .join(" ");

                return `
                    <tr>

                        <td>
                            ${escaparHtml(usuario.id)}
                        </td>

                        <td>
                            ${escaparHtml(nombreCompleto)}
                        </td>

                        <td>
                            ${escaparHtml(usuario.correo)}
                        </td>

                        <td>
                            ${escaparHtml(
                                usuario.rol || "Paciente"
                            )}
                        </td>

                        <td>
                            <span class="stock-ok">
                                ${escaparHtml(
                                    usuario.estado || "Activo"
                                )}
                            </span>
                        </td>

                        <td>
                            <button
                                type="button"
                                class="btn-table"
                                data-user-id="${escaparHtml(
                                    usuario.id
                                )}">
                                Ver ficha
                            </button>
                        </td>

                    </tr>
                `;
            })
            .join("");

        tbody
            .querySelectorAll("[data-user-id]")
            .forEach((button) => {

                button.addEventListener(
                    "click",
                    () => {

                        const usuario =
                            usuarios.find(
                                (item) =>
                                    String(item.id) ===
                                    String(
                                        button.dataset.userId
                                    )
                            );

                        if (!usuario) {
                            return;
                        }

                        alert(
                            `Ficha de usuario\n\n` +
                            `Nombre: ${
                                usuario.nombre
                            } ${
                                usuario.apellidos
                            }\n` +
                            `RUN: ${
                                usuario.run
                            }\n` +
                            `Correo: ${
                                usuario.correo
                            }\n` +
                            `Rol: ${
                                usuario.rol || "Paciente"
                            }\n` +
                            `Ubicación: ${
                                usuario.comuna
                            }, ${
                                usuario.region
                            }`
                        );
                    }
                );
            });
    };

    renderizarUsuarios();

    window.addEventListener(
        "storage",
        renderizarUsuarios
    );

    window.addEventListener(
        "pageshow",
        renderizarUsuarios
    );
});