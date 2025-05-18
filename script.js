const descripciones = {
  "Cascada": "Modelo secuencial donde cada fase (análisis, diseño, desarrollo, prueba, entrega) se completa completamente antes de pasar a la siguiente. Ideal para proyectos predecibles y con requerimientos fijos, como obras de ingeniería o implementación de hardware.",
  "Ágil": "Enfoque iterativo que prioriza la entrega continua de valor, la adaptación al cambio y la colaboración constante. Usado en desarrollo de software, marketing y proyectos creativos donde los requerimientos evolucionan.",
  "Scrum": "Marco de trabajo ágil que organiza el trabajo en sprints (ciclos de 1 a 4 semanas), con roles como Scrum Master, Product Owner y reuniones diarias (dailies). Favorece entregas frecuentes, priorización y mejora continua.",
  "Kanban": "Sistema visual de gestión de tareas que utiliza tableros con columnas ('Por hacer', 'En progreso', 'Hecho'). Es útil para flujos de trabajo continuos como soporte técnico, atención al cliente o mantenimiento.",
  "Lean": "Busca maximizar el valor entregado al cliente eliminando todo lo que no aporta valor ('desperdicio'). Promueve la mejora continua, procesos eficientes y cultura de optimización. Originado en Toyota.",
  "Seis Sigma": "Metodología basada en datos y estadística para reducir errores y variabilidad en los procesos. Utiliza roles como 'Green Belt' y 'Black Belt' y herramientas como DMAIC (Definir, Medir, Analizar, Mejorar, Controlar).",
  "PRINCE2": "Metodología de gestión por procesos muy estructurada, con roles bien definidos y documentación detallada. Muy usada en gobiernos y grandes corporaciones, especialmente en Europa.",
  "Camino Crítico": "Técnica de planificación que identifica las tareas esenciales que no pueden retrasarse sin afectar la fecha final del proyecto. Se usa en proyectos donde los plazos son fijos y estrictos (ej. construcción, ingeniería).",
  "PERT": "Herramienta para estimar tiempos en proyectos con alta incertidumbre. Usa estimaciones optimistas, más probables y pesimistas para cada tarea. Ideal en investigación, innovación y desarrollo tecnológico."
};

const seleccionadas = [];
const maxSeleccion = 3;

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const closeBtn = document.querySelector(".close");

const formulario = document.getElementById("formulario");
const selectores = document.querySelectorAll(".selector");

// Agregar evento a cada recuadro ya existente en el HTML
selectores.forEach(selector => {
  selector.addEventListener("click", () => {
    const nombre = selector.dataset.nombre;

    if (!selector.classList.contains("selected")) {
      if (seleccionadas.length < maxSeleccion) {
        selector.classList.add("selected");
        seleccionadas.push(nombre);
        mostrarPopup(nombre);
      }
    } else {
      selector.classList.remove("selected");
      const index = seleccionadas.indexOf(nombre);
      if (index !== -1) seleccionadas.splice(index, 1);
    }

    formulario.style.display = seleccionadas.length > 0 ? "block" : "none";
  });
});

function mostrarPopup(nombre) {
  popupTitle.textContent = nombre;
  popupDescription.textContent = descripciones[nombre];
  popup.style.display = "flex";
}

closeBtn.onclick = () => {
  popup.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === popup) popup.style.display = "none";
};

document.getElementById("formularioEvaluacion").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    selecciones: seleccionadas,
    nombre: this.nombre.value,
    area: this.area.value,
    respuestas: {
      organizacion_tareas: this.organizacion_tareas.value,
      herramientas_utilizadas: this.herramientas_utilizadas.value,
      seguimiento_proyectos: this.seguimiento_proyectos.value,
      asignacion_tareas: this.asignacion_tareas.value,
      aspectos_mejorar: this.aspectos_mejorar.value,
      tareas_repetitivas: this.tareas_repetitivas.value
    }
  };

  console.log("Formulario enviado:", JSON.stringify(data));
  alert("Formulario enviado correctamente. Gracias por tu participación.");

  // Reset
  this.reset();
  seleccionadas.length = 0;
  selectores.forEach(el => el.classList.remove("selected"));
  formulario.style.display = "none";

  // POST opcional a Power Automate
  /*
  fetch("https://your-flow-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  */
});
