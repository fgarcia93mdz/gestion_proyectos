const metodologias = [
  { nombre: "Cascada", descripcion: "Secuencial y estructurada. Ideal para proyectos con etapas claras." },
  { nombre: "Ágil", descripcion: "Iterativa y flexible. Se adapta al cambio constantemente." },
  { nombre: "Scrum", descripcion: "Trabajo en sprints cortos, con roles y reuniones frecuentes." },
  { nombre: "Kanban", descripcion: "Visual, con columnas como 'Por hacer', 'En progreso', 'Hecho'." },
  { nombre: "Lean", descripcion: "Busca eliminar desperdicios y enfocarse en lo esencial." },
  { nombre: "Seis Sigma", descripcion: "Mejora de procesos con foco en datos y reducción de errores." },
  { nombre: "PRINCE2", descripcion: "Metodología formal con roles definidos y procesos estructurados." },
  { nombre: "Camino Crítico", descripcion: "Se enfoca en las tareas clave para cumplir plazos." },
  { nombre: "PERT", descripcion: "Estimaciones de tiempos en entornos inciertos o de innovación." }
];

const contenedor = document.getElementById("metodologias");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const closeBtn = document.querySelector(".close");

let seleccionadas = [];

metodologias.forEach((m, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.textContent = m.nombre;

  card.addEventListener("click", (e) => {
    if (!seleccionadas.includes(m.nombre)) {
      if (seleccionadas.length < 3) {
        card.classList.add("selected");
        seleccionadas.push(m.nombre);
        mostrarPopup(m.nombre, m.descripcion);
      }
    } else {
      card.classList.remove("selected");
      seleccionadas = seleccionadas.filter(nombre => nombre !== m.nombre);
    }
  });

  contenedor.appendChild(card);
});

function mostrarPopup(titulo, descripcion) {
  popupTitle.textContent = titulo;
  popupDescription.textContent = descripcion;
  popup.style.display = "flex";
}

closeBtn.onclick = () => {
  popup.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === popup) popup.style.display = "none";
};

// Envío del formulario
document.getElementById("formularioEvaluacion").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    selecciones: seleccionadas,
    nombre: document.getElementById("nombre").value,
    area: document.getElementById("area").value,
    respuestas: {
      organizacion_tareas: this.organizacion_tareas.value,
      herramientas_utilizadas: this.herramientas_utilizadas.value,
      seguimiento_proyectos: this.seguimiento_proyectos.value,
      asignacion_tareas: this.asignacion_tareas.value,
      aspectos_mejorar: this.aspectos_mejorar.value,
      tareas_repetitivas: this.tareas_repetitivas.value
    }
  };

  console.log("JSON a enviar:", JSON.stringify(data));
  alert("Formulario enviado con éxito.");

  // Acá iría el POST a Power Automate con fetch
  /*
  fetch("https://your-flow-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(() => alert("¡Datos enviados correctamente!"));
  */
});
