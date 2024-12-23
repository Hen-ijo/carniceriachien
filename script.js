// Swiper.js Configuración
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        520: {
            slidesPerView: 2
        },
        950: {
            slidesPerView: 3
        }
    }
});

// Carrito
const carrito = document.getElementById('carrito');
const elementos = document.getElementById('lista');
const elementos2 = document.getElementById('lista-2');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
    // Agregar elementos al carrito
    elementos.addEventListener('click', comprarElemento);
    elementos2.addEventListener('click', comprarElemento);

    // Eliminar elementos del carrito
    carrito.addEventListener('click', eliminarElemento);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Mostrar elementos del LocalStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) { // Corrección de 'classlist' a 'classList'
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent, // Selector válido
        id: elemento.querySelector('a').getAttribute('data-id')
    };

    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width="100">
        </td>
        <td>${elemento.titulo}</td>
        <td>${elemento.precio}</td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">Eliminar</a>
        </td>
    `;
    lista.appendChild(row);

    guardarElementoLocalStorage(elemento);
}

function eliminarElemento(e) {
    e.preventDefault();

    let elemento, elementoId;

    if (e.target.classList.contains('borrar')) { // Corrección de 'classlist' a 'classList'
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');
    }

    eliminarElementoLocalStorage(elementoId);
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    vaciarLocalStorage();
    return false;
}

function guardarElementoLocalStorage(elemento) {
    let elementos;

    elementos = obtenerElementosLocalStorage();

    elementos.push(elemento);

    localStorage.setItem('elementos', JSON.stringify(elementos));
}

function obtenerElementosLocalStorage() {
    let elementosLS;

    if (localStorage.getItem('elementos') === null) {
        elementosLS = [];
    } else {
        elementosLS = JSON.parse(localStorage.getItem('elementos'));
    }
    return elementosLS;
}

function leerLocalStorage() {
    let elementosLS;

    elementosLS = obtenerElementosLocalStorage();

    elementosLS.forEach(function (elemento) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${elemento.imagen}" width="100">
            </td>
            <td>${elemento.titulo}</td>
            <td>${elemento.precio}</td>
            <td>
                <a href="#" class="borrar" data-id="${elemento.id}">Eliminar</a>
            </td>
        `;
        lista.appendChild(row);
    });
}

function eliminarElementoLocalStorage(id) {
    let elementosLS;

    elementosLS = obtenerElementosLocalStorage();

    elementosLS.forEach(function (elemento, index) {
        if (elemento.id === id) {
            elementosLS.splice(index, 1);
        }
    });

    localStorage.setItem('elementos', JSON.stringify(elementosLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}

// Variables
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');

// Función para agregar productos al carrito
function addToCart() {
  cartCount++;
  updateCartCount();
}

// Función para actualizar el contador
function updateCartCount() {
  cartCountElement.textContent = cartCount;
  cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
}

// Simulación de agregar productos al carrito
document.getElementById('cart-icon').addEventListener('click', addToCart);


