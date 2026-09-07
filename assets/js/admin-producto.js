const formulario = document.getElementById("form-producto");
const tablaProductos = document.getElementById("tabla-productos");
const alertaStock = document.getElementById("alerta-stock");

if (formulario) {
    const mensajeProducto = document.getElementById("mensaje-producto");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const codigo = document.getElementById("codigo").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();
        const precio = document.getElementById("precio").value;
        const stock = document.getElementById("stock").value;
        const stockCritico = document.getElementById("stock-critico").value;
        const categoria = document.getElementById("categoria").value;
        const imagen = document.getElementById("imagen").value.trim();

        mensajeProducto.textContent = "";
        mensajeProducto.style.color = "";

        if (codigo === "") {
            mensajeProducto.textContent = "Ingresa el código del producto.";
            return;
        }

        if (codigo.length < 3) {
            mensajeProducto.textContent = "El código debe tener al menos 3 caracteres.";
            return;
        }

        if (nombre === "") {
            mensajeProducto.textContent = "Ingresa el nombre del producto.";
            return;
        }

        if (nombre.length > 100) {
            mensajeProducto.textContent = "El nombre no puede superar los 100 caracteres.";
            return;
        }

        if (descripcion.length > 500) {
            mensajeProducto.textContent = "La descripción no puede superar los 500 caracteres.";
            return;
        }

        if (precio === "") {
            mensajeProducto.textContent = "Ingresa el precio del producto.";
            return;
        }

        if (Number(precio) < 0) {
            mensajeProducto.textContent = "El precio no puede ser negativo.";
            return;
        }

        if (stock === "") {
            mensajeProducto.textContent = "Ingresa el stock del producto.";
            return;
        }

        if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
            mensajeProducto.textContent = "El stock debe ser un número entero mayor o igual a 0.";
            return;
        }

        if (
            stockCritico !== "" &&
            (!Number.isInteger(Number(stockCritico)) || Number(stockCritico) < 0)
        ) {
            mensajeProducto.textContent = "El stock crítico debe ser un número entero mayor o igual a 0.";
            return;
        }

        if (categoria === "") {
            mensajeProducto.textContent = "Selecciona una categoría.";
            return;
        }

        if (imagen !== "") {
            try {
                new URL(imagen);
            } catch {
                mensajeProducto.textContent = "Ingresa una URL de imagen válida.";
                return;
            }
        }

        mensajeProducto.textContent = "Producto creado correctamente.";
        mensajeProducto.style.color = "var(--acento)";

        formulario.reset();
    });
}

function editarProducto(id) {
    const filas = document.querySelectorAll("#tabla-productos tr");
    const fila = filas[id - 1];

    if (!fila) {
        return;
    }

    const nombreActual = fila.cells[1].textContent.trim();

    const precioActual = fila.cells[3].textContent
        .replace("$", "")
        .replace(".", "")
        .trim();

    const stockActual = fila.cells[4].textContent
        .split("·")[0]
        .trim();

    const nuevoNombre = prompt(
        "Nuevo nombre del producto:",
        nombreActual
    );

    if (nuevoNombre === null) {
        return;
    }

    if (nuevoNombre.trim() === "") {
        alert("El nombre no puede estar vacío.");
        return;
    }

    const nuevoPrecio = prompt(
        "Nuevo precio del producto:",
        precioActual
    );

    if (nuevoPrecio === null) {
        return;
    }

    if (
        nuevoPrecio.trim() === "" ||
        Number(nuevoPrecio) < 0 ||
        isNaN(Number(nuevoPrecio))
    ) {
        alert("Ingresa un precio válido.");
        return;
    }

    const nuevoStock = prompt(
        "Nuevo stock del producto:",
        stockActual
    );

    if (nuevoStock === null) {
        return;
    }

    if (
        nuevoStock.trim() === "" ||
        !Number.isInteger(Number(nuevoStock)) ||
        Number(nuevoStock) < 0
    ) {
        alert("El stock debe ser un número entero mayor o igual a 0.");
        return;
    }

    fila.cells[1].textContent = nuevoNombre.trim();

    fila.cells[3].textContent =
        "$" + Number(nuevoPrecio).toLocaleString("es-CL");

    fila.cells[4].textContent = nuevoStock;

    if (Number(nuevoStock) <= 3) {
        fila.cells[4].textContent =
            nuevoStock + " · Stock crítico";

        fila.cells[4].style.color = "#ff6b6b";
        fila.cells[4].style.fontWeight = "bold";
    } else {
        fila.cells[4].style.color = "";
        fila.cells[4].style.fontWeight = "";
    }

    mostrarAlertaStock();
}

function mostrarAlertaStock() {
    if (!alertaStock || !tablaProductos) {
        return;
    }

    const filas = tablaProductos.querySelectorAll("tr");
    let productosCriticos = 0;

    filas.forEach(function (fila) {
        const stockCelda = fila.cells[4];

        if (!stockCelda) {
            return;
        }

        const stock = Number(
            stockCelda.textContent.split("·")[0].trim()
        );

        if (stock <= 3) {
            productosCriticos++;

            stockCelda.textContent =
                stock + " · Stock crítico";

            stockCelda.style.color = "#ff6b6b";
            stockCelda.style.fontWeight = "bold";
        }
    });

    if (productosCriticos > 0) {
        alertaStock.textContent =
            "⚠ Hay " + productosCriticos +
            " producto(s) con stock crítico.";

        alertaStock.style.color = "#ff6b6b";
        alertaStock.style.fontWeight = "bold";
        alertaStock.style.marginBottom = "20px";
    } else {
        alertaStock.textContent =
            "✓ No hay productos con stock crítico.";

        alertaStock.style.color = "var(--acento)";
        alertaStock.style.fontWeight = "bold";
        alertaStock.style.marginBottom = "20px";
    }
}

if (tablaProductos) {
    mostrarAlertaStock();
}