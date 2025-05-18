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
    const descripcion = selector.dataset.desc;

    if (!selector.classList.contains("selected")) {
      if (seleccionadas.length < maxSeleccion) {
        selector.classList.add("selected");
        seleccionadas.push(nombre);
        mostrarPopup(nombre, descripcion);
      }
    } else {
      selector.classList.remove("selected");
      const index = seleccionadas.indexOf(nombre);
      if (index !== -1) seleccionadas.splice(index, 1);
    }

    formulario.style.display = seleccionadas.length > 0 ? "block" : "none";
  });
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
