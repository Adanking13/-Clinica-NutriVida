let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const botones = document.querySelectorAll(".btn-agregar");
const contenidoCarrito = document.querySelector("#carrito-contenido");
const totalCarrito = document.querySelector("#total-carrito");

botones.forEach(function (boton) {
    boton.addEventListener("click", function () {

        const producto = {
            id: boton.dataset.id,
            nombre: boton.dataset.nombre,
            precio: Number(boton.dataset.precio)
        };

        carrito.push(producto);

        localStorage.setItem("carrito", JSON.stringify(carrito));

        mostrarCarrito();
    });
});

function mostrarCarrito() {

    contenidoCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenidoCarrito.innerHTML = "<p>El carrito está vacío.</p>";
        totalCarrito.innerHTML = "<strong>Total:</strong> $0";
        return;
    }

    let total = 0;

    carrito.forEach(function (producto) {

        const elemento = document.createElement("p");

        elemento.textContent =
            producto.nombre + " - $" + producto.precio.toLocaleString("es-CL");

        contenidoCarrito.appendChild(elemento);

        total += producto.precio;
    });

    totalCarrito.innerHTML =
        "<strong>Total:</strong> $" + total.toLocaleString("es-CL");
}

mostrarCarrito();