const descripciones = {
  "Cascada": `Modelo secuencial tradicional. Cada fase del proyecto (análisis, diseño, desarrollo, pruebas, entrega) se realiza por completo antes de pasar a la siguiente. 
Ideal para proyectos con requerimientos estables, cronogramas claros y bajo nivel de cambios.
✔️ Ventajas: previsibilidad, documentación completa, control de alcance.
🔧 Usos: construcción, ingeniería, implementación de ERP, hardware.
🏢 Común en: empresas industriales, constructoras, organismos públicos.`,

  "Ágil": `Filosofía y conjunto de prácticas que promueven ciclos iterativos cortos, colaboración con el cliente y adaptación al cambio constante.
✔️ Ventajas: flexibilidad, entregas frecuentes, foco en valor.
🔧 Usos: desarrollo de software, marketing, diseño de producto.
🏢 Común en: startups, empresas digitales, agencias creativas.`,

  "Scrum": `Marco de trabajo ágil que organiza el trabajo en Sprints (de 1 a 4 semanas). Utiliza roles definidos como Scrum Master, Product Owner y el equipo de desarrollo.
✔️ Ventajas: visibilidad diaria, mejora continua, foco en objetivos concretos.
🔧 Usos: proyectos de software, diseño de productos, apps.
🏢 Común en: áreas de desarrollo, innovación, consultoras de tecnología.`,

  "Kanban": `Sistema visual para gestionar el flujo de trabajo con tableros divididos en columnas como "Por hacer", "En curso", "Hecho".
✔️ Ventajas: gestión de carga de trabajo, mejora en tiempos de entrega, visibilidad clara.
🔧 Usos: soporte técnico, mantenimiento, procesos administrativos.
🏢 Común en: help desks, industrias, pymes operativas.`,

  "Lean": `Filosofía de mejora continua enfocada en eliminar desperdicios y maximizar el valor entregado al cliente.
✔️ Ventajas: eficiencia operativa, cultura de optimización, reducción de tiempos muertos.
🔧 Usos: manufactura, logística, procesos repetitivos.
🏢 Común en: empresas manufactureras, logística, operaciones.`,

  "Seis Sigma": `Metodología rigurosa basada en datos para mejorar la calidad y reducir la variabilidad de procesos.
Utiliza el ciclo DMAIC y niveles de certificación como Green Belt y Black Belt.
✔️ Ventajas: mejora de calidad, decisiones basadas en datos.
🔧 Usos: control de calidad, procesos industriales, auditorías.
🏢 Común en: industrias, empresas ISO, grandes corporaciones.`,

  "PRINCE2": `Metodología estructurada de gestión de proyectos basada en procesos, orientada a control total de tiempo, costos, riesgos y calidad.
✔️ Ventajas: roles claros, gobernanza, documentación sólida.
🔧 Usos: proyectos complejos, públicos, regulatorios.
🏢 Común en: gobiernos, grandes empresas, consultoras internacionales.`,

  "Camino Crítico": `Herramienta para identificar tareas que determinan la duración total de un proyecto.
El retraso de una de estas tareas retrasa todo el proyecto.
✔️ Ventajas: control preciso del cronograma, identificación de riesgos de tiempo.
🔧 Usos: planificación de obras, implementación de sistemas, ingeniería.
🏢 Común en: obras civiles, arquitectura, ingeniería.`,

  "PERT": `Técnica de análisis probabilístico para estimar tiempos en proyectos con incertidumbre.
Utiliza 3 estimaciones (optimista, probable, pesimista) por tarea.
✔️ Ventajas: análisis de riesgo de tiempo, planificación más realista.
🔧 Usos: I+D, innovación, proyectos tecnológicos.
🏢 Común en: empresas de innovación, laboratorios, proyectos exploratorios.`
};


const seleccionadas = [];
const maxSeleccion = 3;

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const closeBtn = document.querySelector(".close");

const formulario = document.getElementById("formulario");
const selectores = document.querySelectorAll(".selector");
const btnContinuar = document.getElementById("btnContinuar");

selectores.forEach(selector => {
  const nombre = selector.dataset.nombre;
  const btnInfo = selector.querySelector(".info");
  const btnSelect = selector.querySelector(".seleccionar");

  btnInfo.addEventListener("click", (e) => {
    e.stopPropagation();
    mostrarPopup(nombre);
  });

  btnSelect.addEventListener("click", (e) => {
    e.stopPropagation();

    if (!selector.classList.contains("selected")) {
      if (seleccionadas.length < maxSeleccion) {
        selector.classList.add("selected");
        seleccionadas.push(nombre);
      }
    } else {
      selector.classList.remove("selected");
      const index = seleccionadas.indexOf(nombre);
      if (index !== -1) seleccionadas.splice(index, 1);
    }

    btnContinuar.disabled = seleccionadas.length === 0;
    btnContinuar.classList.toggle("enabled", seleccionadas.length > 0);
  });
});

btnContinuar.addEventListener("click", () => {
  document.querySelector(".contenedor").style.display = "none";
  formulario.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function mostrarPopup(nombre) {
  popupTitle.innerText = nombre;
  popupDescription.innerText = descripciones[nombre];
  popup.style.display = "flex";
}

closeBtn.onclick = () => {
  popup.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === popup) popup.style.display = "none";
};

document.getElementById("formularioEvaluacion").addEventListener("submit", function (e) {
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

  this.reset();
  seleccionadas.length = 0;
  selectores.forEach(el => el.classList.remove("selected"));
  formulario.style.display = "none";
  document.querySelector(".contenedor").style.display = "block";
  btnContinuar.disabled = true;
  btnContinuar.classList.remove("enabled");
});
