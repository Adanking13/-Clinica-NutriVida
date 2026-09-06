// añadido de menu de hamburguesa para los telefonos y tablets

document.addEventListener("DOMContentLoaded", function () {
    const botonesMenu = document.querySelectorAll(".nav-toggle");

    botonesMenu.forEach(function (boton) {
        const idMenu = boton.getAttribute("aria-controls");
        const menu = document.getElementById(idMenu);

        if (!menu) {
            return;
        }

        boton.addEventListener("click", function () {
            const estaAbierto = menu.classList.toggle("nav-abierta");
            boton.setAttribute("aria-expanded", estaAbierto ? "true" : "false");
        });

        // Cierra el menú automáticamente al elegir una opción
        const enlaces = menu.querySelectorAll("a");
        enlaces.forEach(function (enlace) {
            enlace.addEventListener("click", function () {
                menu.classList.remove("nav-abierta");
                boton.setAttribute("aria-expanded", "false");
            });
        });

        
        // se limpia el estado para que no quede "atascado" en móvil al volver a achicar.
        window.addEventListener("resize", function () {
            if (window.innerWidth > 800) {
                menu.classList.remove("nav-abierta");
                boton.setAttribute("aria-expanded", "false");
            }
        });
    });
});