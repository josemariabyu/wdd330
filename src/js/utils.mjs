// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// Función para mostrar alertas personalizadas y elegantes sin usar el alert() nativo
export function alertMessage(message, scroll = true) {
  // 1. Creamos el elemento contenedor de la alerta
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-box'); // Clase para darle estilos CSS luego

  // 2. Le agregamos el contenido: el mensaje de error y un botón de cierre (X)
  alertContainer.innerHTML = `
    <p class="alert-text">${message}</p>
    <span class="alert-close">&times;</span>
  `;

  // 3. Escuchamos el click dentro de la alerta para cerrarla si tocan la X
  alertContainer.addEventListener('click', function(e) {
    // Verificamos si el usuario hizo clic específicamente en la clase del botón de cierre
    if (e.target.classList.contains('alert-close')) {
      alertContainer.remove(); // Eliminamos la alerta por completo de la pantalla
    }
  });

  // 4. Buscamos el elemento <main> de la página actual e inyectamos la alerta arriba de todo
  const main = document.querySelector('main');
  if (main) {
    main.prepend(alertContainer);
  }

  // 5. Si la opción scroll es verdadera (por defecto lo es), subimos la pantalla a tope
  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
