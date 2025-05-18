const metodologias = [
  {
    nombre: "Cascada",
    descripcion: "Modelo secuencial donde cada fase (análisis, diseño, desarrollo, prueba, entrega) se completa completamente antes de pasar a la siguiente. Ideal para proyectos predecibles y con requerimientos fijos, como obras de ingeniería o implementación de hardware."
  },
  {
    nombre: "Ágil",
    descripcion: "Enfoque iterativo que prioriza la entrega continua de valor, la adaptación al cambio y la colaboración constante. Usado en desarrollo de software, marketing y proyectos creativos donde los requerimientos evolucionan."
  },
  {
    nombre: "Scrum",
    descripcion: "Marco de trabajo ágil que organiza el trabajo en sprints (ciclos de 1 a 4 semanas), con roles como Scrum Master, Product Owner y reuniones diarias (dailies). Favorece entregas frecuentes, priorización y mejora continua."
  },
  {
    nombre: "Kanban",
    descripcion: "Sistema visual de gestión de tareas que utiliza tableros con columnas ('Por hacer', 'En progreso', 'Hecho'). Es útil para flujos de trabajo continuos como soporte técnico, atención al cliente o mantenimiento."
  },
  {
    nombre: "Lean",
    descripcion: "Busca maximizar el valor entregado al cliente eliminando todo lo que no aporta valor ('desperdicio'). Promueve la mejora continua, procesos eficientes y cultura de optimización. Originado en Toyota."
  },
  {
    nombre: "Seis Sigma",
    descripcion: "Metodología basada en datos y estadística para reducir errores y variabilidad en los procesos. Utiliza roles como 'Green Belt' y 'Black Belt' y herramientas como DMAIC (Definir, Medir, Analizar, Mejorar, Controlar)."
  },
  {
    nombre: "PRINCE2",
    descripcion: "Metodología de gestión por procesos muy estructurada, con roles bien definidos y documentación detallada. Muy usada en gobiernos y grandes corporaciones, especialmente en Europa."
  },
  {
    nombre: "Camino Crítico",
    descripcion: "Técnica de planificación que identifica las tareas esenciales que no pueden retrasarse sin afectar la fecha final del proyecto. Se usa en proyectos donde los plazos son fijos y estrictos (ej. construcción, ingeniería)."
  },
  {
    nombre: "PERT",
    descripcion: "Herramienta para estimar tiempos en proyectos con alta incertidumbre. Usa estimaciones optimistas, más probables y pesimistas para cada tarea. Ideal en investigación, innovación y desarrollo tecnológico."
  }
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
