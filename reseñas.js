// reseñas.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-reseña");
    const listaReseñas = document.getElementById("lista-reseñas");
    const promedioCalificacion = document.getElementById("promedio-calificacion");

    let calificaciones = []; // Para calcular el promedio

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const comentario = document.getElementById("comentario").value;
        const calificacion = parseInt(document.getElementById("calificacion").value);

        // Crear reseña
        const reseñaDiv = document.createElement("div");
        reseñaDiv.classList.add("review");

        reseñaDiv.innerHTML = `
            <h3>${nombre}</h3>
            <div class="stars">${"★".repeat(calificacion)}${"☆".repeat(5 - calificacion)}</div>
            <p class="comment">${comentario}</p>
        `;

        // Agregar la reseña a la lista
        listaReseñas.prepend(reseñaDiv);

        // Actualizar calificaciones
        calificaciones.push(calificacion);
        actualizarPromedio();

        // Limpiar formulario
        form.reset();
    });

    function actualizarPromedio() {
        const total = calificaciones.reduce((a, b) => a + b, 0);
        const promedio = (total / calificaciones.length).toFixed(1);
        promedioCalificacion.textContent = promedio;
    }
});
