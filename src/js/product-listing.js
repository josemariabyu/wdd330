import ExternalServices from './ExternalServices.mjs'; // O ProductData.mjs según tu proyecto
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

// Cargar Header y Footer dinámicos
loadHeaderFooter();

// Capturar la categoría desde la URL (ej: ?category=tents)
const category = getParam('category');

// Instanciar las clases pasándole la categoría
const dataSource = new ExternalServices();
const element = document.querySelector('.product-list');
const listing = new ProductList(category, dataSource, element);

// Inicializar el listado
listing.init();
