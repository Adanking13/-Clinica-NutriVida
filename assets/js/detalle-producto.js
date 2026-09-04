const parametros = new URLSearchParams(window.location.search);
const idProducto = parametros.get("id");

const productos = {
    EV002: {
        nombre: "Bioimpedanciometría",
        descripcion: "Evaluación de composición corporal.",
        precio: 12000
    },
    EV003: {
        nombre: "Encuesta de hábitos alimentarios",
        descripcion: "Análisis de hábitos y patrón alimentario.",
        precio: 10000
    },
    EV004: {
        nombre: "Análisis de exámenes",
        descripcion: "Interpretación nutricional de exámenes.",
        precio: 15000
    },
    TG001: {
        nombre: "Taller de alimentación saludable",
        descripcion: "Taller sobre alimentación equilibrada.",
        precio: 15000
    },
    TG002: {
        nombre: "Taller de cocina nutritiva",
        descripcion: "Preparación de recetas saludables.",
        precio: 20000
    },
    TG003: {
        nombre: "Taller de nutrición para deportistas",
        descripcion: "Alimentación e hidratación para deportistas.",
        precio: 18000
    }
};

const producto = productos[idProducto];

if (producto) {

    document.querySelector("#nombre-producto").textContent = producto.nombre;
    document.querySelector("#descripcion-producto").textContent = producto.descripcion;
    document.querySelector("#codigo-producto").textContent = idProducto;
    document.querySelector("#precio-producto").textContent =
        producto.precio.toLocaleString("es-CL");

    document.querySelector("#btn-agregar-detalle").addEventListener("click", function () {

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        carrito.push({
            id: idProducto,
            nombre: producto.nombre,
            precio: producto.precio
        });

        localStorage.setItem("carrito", JSON.stringify(carrito));

        document.querySelector("#mensaje-producto").textContent =
            "¡Producto agregado al carrito!";
    });
}