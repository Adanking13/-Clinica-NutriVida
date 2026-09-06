const formulario = document.getElementById("form-producto");
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

    if (stockCritico !== "" &&
        (!Number.isInteger(Number(stockCritico)) || Number(stockCritico) < 0)) {
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