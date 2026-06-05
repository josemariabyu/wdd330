import ProductData from "../js/ProductData.mjs";
import { alertMessage } from "../js/utils.mjs"; // 1. Importamos la función de alertas

const services = new ProductData();

// Función principal del checkout
async function procesarPago() {
  const payload = {
    orderDate: new Date(),
    // Aquí irían tus campos del formulario mapeados
  };

  try {
    const res = await services.checkout(payload); 
    console.log("¡Orden exitosa!", res);
    
    // CAMINO FELIZ: Limpiamos carrito y redirigimos
    localStorage.removeItem('so-cart'); 
    window.location.href = './success.html'; 
    
  } catch (err) {
    // CAMINO TRISTE: Atrapamos el error detallado
    console.error("Hubo un error en el checkout:", err);
    
    // Si el servidor nos devuelve un objeto con varios errores específicos:
    if (err.message && typeof err.message === 'object') {
      // Recorremos cada error y mostramos una alerta personalizada por cada uno
      Object.values(err.message).forEach(msg => {
        alertMessage(msg);
      });
    } else {
      // Si es un error de texto simple, mostramos una sola alerta
      alertMessage(err.message || "Something went wrong with your order.");
    }
  }
}

// Escuchamos el click del botón de enviar cuando cargue la página
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector('#checkoutSubmit');
  
  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Evitamos que la página se recargue sola
      
      const myForm = document.forms[0]; // Tomamos el formulario de la página
      
      if (myForm) {
        const chk_status = myForm.checkValidity(); // Revisa si cumple los campos requeridos
        myForm.reportValidity(); // Muestra los mensajes de error visuales del navegador
        
        // Si el formulario es totalmente válido, procesamos el pago
        if(chk_status) {
          procesarPago();        
        }
      }
    });
  }
});
