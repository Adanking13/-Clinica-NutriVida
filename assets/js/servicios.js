document.addEventListener("DOMContentLoaded", () => {

    const botones = document.querySelectorAll(".tarjeta-servicio button");

    botones.forEach((boton) => {

        boton.addEventListener("click", () => {

            const tarjeta = boton.closest(".tarjeta-servicio");
            const servicio = tarjeta.querySelector("h3").textContent;

            const formulario = document.createElement("div");

            formulario.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.75);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                ">

                    <div style="
                        background: #1b2028;
                        padding: 30px;
                        border-radius: 15px;
                        width: 90%;
                        max-width: 450px;
                        color: white;
                    ">

                        <h2>Agendar servicio</h2>

                        <p>
                            Servicio seleccionado:
                            <strong>${servicio}</strong>
                        </p>

                        <label>Nombre</label>
                        <input id="nombreReserva" type="text"
                            placeholder="Tu nombre"
                            style="width:100%; padding:10px; margin:8px 0 15px;">

                        <label>Correo</label>
                        <input id="correoReserva" type="email"
                            placeholder="correo@ejemplo.com"
                            style="width:100%; padding:10px; margin:8px 0 15px;">

                        <label>Fecha</label>
                        <input id="fechaReserva" type="date"
                            style="width:100%; padding:10px; margin:8px 0 15px;">

                        <label>Hora</label>
                        <input id="horaReserva" type="time"
                            style="width:100%; padding:10px; margin:8px 0 20px;">

                        <button id="confirmarReserva"
                            style="
                                width:100%;
                                padding:12px;
                                border:none;
                                border-radius:8px;
                                background:#2f80ed;
                                color:white;
                                font-weight:bold;
                                cursor:pointer;
                            ">
                            Confirmar reserva
                        </button>

                        <button id="cerrarFormulario"
                            style="
                                width:100%;
                                padding:10px;
                                margin-top:10px;
                                border:none;
                                border-radius:8px;
                                background:#444;
                                color:white;
                                cursor:pointer;
                            ">
                            Cancelar
                        </button>

                    </div>
                </div>
            `;

            document.body.appendChild(formulario);

            document
                .querySelector("#cerrarFormulario")
                .addEventListener("click", () => {
                    formulario.remove();
                });

            document
                .querySelector("#confirmarReserva")
                .addEventListener("click", () => {

                    const nombre = document.querySelector("#nombreReserva").value;
                    const correo = document.querySelector("#correoReserva").value;
                    const fecha = document.querySelector("#fechaReserva").value;
                    const hora = document.querySelector("#horaReserva").value;

                    if (!nombre || !correo || !fecha || !hora) {
                        alert("Completa todos los campos.");
                        return;
                    }

                    alert(
                        `Reserva registrada correctamente.\n\n` +
                        `Servicio: ${servicio}\n` +
                        `Nombre: ${nombre}\n` +
                        `Fecha: ${fecha}\n` +
                        `Hora: ${hora}`
                    );

                    formulario.remove();
                });
        });

    });

});