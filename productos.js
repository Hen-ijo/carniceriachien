document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");

    // Crear formulario dinámico para agregar reseñas
    const form = document.createElement("form");
    form.id = "form-reseña";
    form.innerHTML = `
        <h2>Deja tu reseña</h2>
        <input type="text" id="nombre" placeholder="Tu nombre" required>
        <textarea id="comentario" placeholder="Escribe tu reseña aquí..." required></textarea>
        <label for="calificacion">Calificación:</label>
        <select id="calificacion" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <button type="submit">Enviar</button>
    `;
    container.prepend(form);

    const listaReseñas = document.querySelectorAll(".review");
    const calificaciones = Array.from(listaReseñas).map(review => {
        const stars = review.querySelector(".stars").textContent;
        return stars.split("★").length - 1;
    });
    const promedioCalificacion = document.createElement("h3");
    promedioCalificacion.id = "promedio-calificacion";
    promedioCalificacion.textContent = `Promedio de Calificación: ${calcularPromedio(calificaciones)}`;
    container.appendChild(promedioCalificacion);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const comentario = document.getElementById("comentario").value;
        const calificacion = parseInt(document.getElementById("calificacion").value);

        // Crear nueva reseña
        const nuevaReseña = document.createElement("div");
        nuevaReseña.classList.add("review");
        nuevaReseña.innerHTML = `
            <h3>${nombre}</h3>
            <div class="stars">${"★".repeat(calificacion)}${"☆".repeat(5 - calificacion)}</div>
            <p class="comment">${comentario}</p>
        `;
        container.appendChild(nuevaReseña);

        // Actualizar promedio
        calificaciones.push(calificacion);
        promedioCalificacion.textContent = `Promedio de Calificación: ${calcularPromedio(calificaciones)}`;

        // Limpiar formulario
        form.reset();
    });

    function calcularPromedio(calificaciones) {
        const total = calificaciones.reduce((a, b) => a + b, 0);
        return (total / calificaciones.length).toFixed(1);
    }
});
