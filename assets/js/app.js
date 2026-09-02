const botonIniciar = document.querySelector("#btn-iniciar");

botonIniciar.addEventListener("click", function () {
    document.querySelector("#clinica").scrollIntoView({
        behavior: "smooth"
    });
});