const parametros = new URLSearchParams(window.location.search);
const servicioSeleccionado = parametros.get("servicio");

console.log("Servicio seleccionado:", servicioSeleccionado);

const selectServicio = document.querySelector("#servicio");

if (servicioSeleccionado) {
    selectServicio.value = servicioSeleccionado;
}