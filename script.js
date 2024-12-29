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
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});

// Variables
const carrito = document.getElementById("carrito");
const swiperWrapper1 = document.querySelector("#lista .swiper-wrapper");
const swiperWrapper2 = document.querySelector("#lista-2 .swiper-wrapper");
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const cuentaCarrito = document.getElementById("cuenta-carrito"); // Contador del carrito
let productos = [];

// Cargar productos desde productos.json
fetch("productos.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data.productos;
    mostrarProductos(productos);
  })
  .catch((error) => console.error("Error al cargar el JSON:", error));

// Actualizar el contador del carrito
function actualizarContadorCarrito() {
  const totalProductos = lista.childElementCount;
  cuentaCarrito.textContent = totalProductos;
}

function mostrarProductos(productos) {
  productos.forEach((producto) => {
    const swiperSlide = document.createElement("div");
    swiperSlide.classList.add("swiper-slide");

    swiperSlide.innerHTML = `
      <div class="platillo">
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio}</p>
        <img src="${producto.imagen}" alt="">
        <p>${producto.descripcion}</p>
        <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar al Carrito</a>
      </div>
    `;

    // Agregar los productos al Swiper correspondiente
    if (producto.categoria === "carne") {
      swiperWrapper1.appendChild(swiperSlide);
    } else {
      swiperWrapper2.appendChild(swiperSlide);
    }
  });

  // Actualizar los sliders después de cargar productos
  swiper.update();
}

cargarEventListeners();

function cargarEventListeners() {
  // Agregar elementos al carrito
  swiperWrapper1.addEventListener("click", comprarElemento);
  swiperWrapper2.addEventListener("click", comprarElemento);

  // Eliminar elementos del carrito
  carrito.addEventListener("click", eliminarElemento);

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

  // Mostrar elementos del LocalStorage
  document.addEventListener("DOMContentLoaded", leerLocalStorage);

  // Agregar botón de comprar
  const comprarBtn = document.createElement("button");
  comprarBtn.id = "comprar-carrito";
  comprarBtn.textContent = "Comprar";
  comprarBtn.classList.add("btn-2");
  carrito.appendChild(comprarBtn);
  comprarBtn.addEventListener("click", comprarCarrito);
}

function comprarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const elemento = e.target.parentElement;
    leerDatosElemento(elemento);
  }
}

function leerDatosElemento(elemento) {
  const infoElemento = {
    imagen: elemento.querySelector("img").src,
    titulo: elemento.querySelector("h3").textContent,
    precio: elemento.querySelector(".precio").textContent,
    id: elemento.querySelector("a").getAttribute("data-id"),
  };
  insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><img src="${elemento.imagen}" width="100"></td>
    <td>${elemento.titulo}</td>
    <td>${elemento.precio}</td>
    <td><a href="#" class="borrar" data-id="${elemento.id}">Eliminar</a></td>
  `;
  lista.appendChild(row);

  guardarElementoLocalStorage(elemento);
  actualizarContadorCarrito(); // Actualizar contador
}

function eliminarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar")) {
    const elemento = e.target.parentElement.parentElement;
    elemento.remove();
    const elementoId = elemento.querySelector("a").getAttribute("data-id");
    eliminarElementoLocalStorage(elementoId);
    actualizarContadorCarrito(); // Actualizar contador
  }
}

function vaciarCarrito() {
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
  vaciarLocalStorage();
  actualizarContadorCarrito(); // Actualizar contador
}

function comprarCarrito() {
  if (lista.childElementCount > 0) {
    alert("Compra realizada. ¡Gracias por tu compra!");
    vaciarCarrito();
  } else {
    alert("El carrito está vacío. Agrega productos antes de comprar.");
  }
}

function leerLocalStorage() {
  let elementos = obtenerElementosLocalStorage();
  elementos.forEach((elemento) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${elemento.imagen}" width="100"></td>
      <td>${elemento.titulo}</td>
      <td>${elemento.precio}</td>
      <td><a href="#" class="borrar" data-id="${elemento.id}">Eliminar</a></td>
    `;
    lista.appendChild(row);
  });
  actualizarContadorCarrito(); // Actualizar contador al cargar
}

function guardarElementoLocalStorage(elemento) {
  let elementos = obtenerElementosLocalStorage();
  elementos.push(elemento);
  localStorage.setItem("elementos", JSON.stringify(elementos));
}

function obtenerElementosLocalStorage() {
  return localStorage.getItem("elementos") === null
    ? []
    : JSON.parse(localStorage.getItem("elementos"));
}

function eliminarElementoLocalStorage(id) {
  let elementos = obtenerElementosLocalStorage();
  elementos = elementos.filter((elemento) => elemento.id !== id);
  localStorage.setItem("elementos", JSON.stringify(elementos));
}

function vaciarLocalStorage() {
  localStorage.clear();
}
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevenir el envío por defecto
  let isValid = true;

  // Validar el nombre
  const name = document.getElementById("name");
  const nameError = document.getElementById("name-error");
  if (name.value.trim() === "") {
      nameError.textContent = "Por favor, ingresa tu nombre.";
      isValid = false;
  } else {
      nameError.textContent = "";
  }

  // Validar el correo
  const email = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.value.trim())) {
      emailError.textContent = "Por favor, ingresa un correo válido.";
      isValid = false;
  } else {
      emailError.textContent = "";
  }

  // Validar el mensaje
  const message = document.getElementById("message");
  const messageError = document.getElementById("message-error");
  if (message.value.trim() === "") {
      messageError.textContent = "Por favor, escribe un mensaje.";
      isValid = false;
  } else {
      messageError.textContent = "";
  }

  // Si todo es válido, enviar el formulario
  if (isValid) {
      this.submit();
  }
});