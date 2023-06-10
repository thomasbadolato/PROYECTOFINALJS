const formulario = document.getElementById('formulario')
const inputNombre = document.getElementById('nombre')
const inputApellido = document.getElementById('apellido')
const inputEmail = document.getElementById('email')
const titulo = document.getElementById('titulo')
const divProductos = document.getElementById('divProductos')

//Ingreso Datos //

formulario.onsubmit = (e) => {
  e.preventDefault()
  const infoUsuario = {
    nombre: inputNombre.value,
    apellido: inputApellido.value,
    email: inputEmail.value,
  }

  // Storage JSON //

  localStorage.setItem('infoUsuario', JSON.stringify(infoUsuario))
  formulario.remove()
  titulo.innerText = `E S C A B I A 2 ${infoUsuario.nombre} ${infoUsuario.apellido}`
}

// Storage infoUser //

const infoUsuario = localStorage.getItem('infoUsuario')
const infoUsuarioJS = JSON.parse(infoUsuario)
if (infoUsuario) {
  formulario.remove()
  titulo.innerText = `E S C A B I A 2 ${infoUsuarioJS.nombre} ${infoUsuarioJS.apellido}`
}

// Array de los Productos //

class Producto {
  constructor(id, nombre, precio, stock, image) {
    this.id = id
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
    this.image = image
  }
}

const productos = [
  new Producto(1, 'DMZ', 3500, 10, './images/dmz.jpg'),
  new Producto(2, 'Deep Medi', 9500, 5, './images/deepmedi.jpg'),
  new Producto(3, 'Duploc', 250, 150, './images/duploc.jpg'),
  new Producto(4, 'Scotch Bonnet', 890, 30, './images/Scotchbonnet.jpg'),

]

// Funcion que recorre el Array del carrito //

productos.forEach((prod) => {
  divProductos.innerHTML += `<div class="card cardProducto">
  <div class="card" style="width: 15rem;"s
  <div class="card-body">
  <img src="${prod.image}" class="card-img-center" alt="...">
    <h5 class="card-title">${prod.nombre}</h5>
    <p class="card-text"> $ ${prod.precio}</p>
    <button id=${prod.id} class="btn btn-dark">Agregar al Carrito</button>
  </div>
</div>`
})



// Guardar productos en el carrito //
const carrito = []

// Declaro contadorCarrito
let contadorCarrito = 0;

// Funcion para guardar en cada uno de los botones de compra //
const botonesAgregar = document.querySelectorAll('.btn-dark')
botonesAgregar.forEach((boton) => {
  boton.onclick = () => {
    const producto = productos.find((prod) => prod.id === parseInt(boton.id));
  
    const prodCarrito = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    };
  
    // Obtener el precio del producto seleccionado
    const precioProducto = parseInt(producto.precio);
  
    const indexProd = carrito.findIndex((prod) => prod.id === prodCarrito.id);
    if (indexProd === -1) {
      carrito.push(prodCarrito);
    } else {
      carrito[indexProd].cantidad++;
    }
  
    // Incrementar el contador del carrito y actualizar el input
    contadorCarrito++;
    actualizarContadorCarrito();
  
    // Agregar el precio del producto al objeto del carrito
    carrito[indexProd].precioProducto = precioProducto;
  };
  
})
// Funcion para actualizar el texto del contador html
function actualizarContadorCarrito() {
  const contadorCarritoElemento = document.getElementById('contadorCarrito');
  contadorCarritoElemento.textContent = contadorCarrito.toString();

  const previsualizacionCarritoElemento = document.getElementById('previsualizacionCarrito');
  previsualizacionCarritoElemento.innerHTML = ''; // Limpia la previsualización actual

  if (contadorCarrito > 0) {
    carrito.forEach((producto) => {
      const productoHTML = `
        <div>
          <span>${producto.nombre}</span>
          <button class="btn btn-outline-danger" data-action="carrito-option" onclick="restarUnidad(${producto.id})">-</button>
          <span>${producto.cantidad}</span>
          <button class="btn btn-outline-success spacebtn" data-action="carrito-option" onclick="sumarUnidad(${producto.id})">+</button>
          <button class="btn btn-outline-warning spacebtn" data-action="carrito-option" onclick="eliminarProducto(${producto.id})">Eliminar</button>
          <span class="precioProducto">$${producto.precio * producto.cantidad}</span></div>
      `;
      previsualizacionCarritoElemento.innerHTML += productoHTML;
    });
  } else {
    previsualizacionCarritoElemento.textContent = 'No hay productos en el carrito';
  }
}

// Función para restar, sumar y eliminar productos del carrito
function restarUnidad(id) {
  const producto = carrito.find((prod) => prod.id === id);
  if (producto) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    } else {
      carrito.splice(carrito.indexOf(producto), 1);
    }
    actualizarContadorCarrito();
  }
}

function sumarUnidad(id) {
  const producto = carrito.find((prod) => prod.id === id);
  if (producto) {
    producto.cantidad++;
    actualizarContadorCarrito();
  }
}

function eliminarProducto(id) {
  const producto = carrito.find((prod) => prod.id === id);
  if (producto) {
    carrito.splice(carrito.indexOf(producto), 1);
    actualizarContadorCarrito();
  }
}

const imagenCarrito = document.getElementById('imagenCarrito');
const popupCarrito = document.getElementById('popupCarrito');
const cerrarPopup = document.getElementById('cerrarPopup');

imagenCarrito.addEventListener('click', () => {
  popupCarrito.style.display = 'block';
  document.addEventListener('click', cerrarPopupExterno);
});

// Agrega el atributo 'data-action' a los botones de suma, resta y de eliminar
const botonesSumaResta = document.querySelectorAll('.btn-dark.spacebtn');
botonesSumaResta.forEach((boton) => {
  boton.setAttribute('data-action', 'carrito-option');
});

function cerrarPopupExterno(event) {
  if (!popupCarrito.contains(event.target) && event.target !== imagenCarrito && !event.target.hasAttribute('data-action', 'carrito-option')) {
    popupCarrito.style.display = 'none';
    document.removeEventListener('click', cerrarPopupExterno);
  }
}

// Boton finalizar compra
const botonFinalizar = document.querySelector('#finalizar')
const thead = document.querySelector('#thead')
const tbody = document.querySelector('#tbody')
const parrafoTotal = document.querySelector('#total')
botonFinalizar.onclick = () => {
  divProductos.remove()
  botonFinalizar.remove()
  prodd.innerText = '';

  thead.innerHTML = `<tr class= "table">
  <th scope="col">Producto</th>
  <th scope="col">Cantidad</th>
  <th scope="col">Total</th>
  </tr>`

  let totalCompra = 0
  carrito.forEach(prod => {
    totalCompra += prod.cantidad * prod.precio
    tbody.innerHTML += `
    <tr>
      <td>${prod.nombre}</td>
      <td>${prod.cantidad}</td>
      <td> $ ${prod.cantidad * prod.precio}</td>
    </tr>
    `
  })
  parrafoTotal.innerText = `Total de la Compra  $ ${totalCompra}`

  
  // Verificar si el botón "Abrir Tarjeta" ya existe en el DOM
  const botonAbrirTarjeta = document.getElementById('botonAbrirTarjeta');
  if (!botonAbrirTarjeta) {
    // Si no existe, crea el botón "Abrir Tarjeta" y lo agrega al DOM
    const botonAbrirTarjeta = document.createElement('button');
    botonAbrirTarjeta.textContent = 'PAGAR';
    botonAbrirTarjeta.className = 'btn btn-outline-success centerpa';
    botonAbrirTarjeta.id = 'botonAbrirTarjeta';
    botonAbrirTarjeta.onclick = abrirTarjetaFlotante;
    // Actualizar el contenido de la tabla de productos
function actualizarTablaProductos() {
  tbody.innerHTML = '';

  let totalCompra = 0;
  carrito.forEach((prod) => {
    totalCompra += prod.cantidad * prod.precio;
    tbody.innerHTML += `
      <tr>
        <td>${prod.nombre}</td>
        <td>${prod.cantidad}</td>
        <td> $ ${prod.cantidad * prod.precio}</td>
      </tr>
    `;
  });

  parrafoTotal.innerText = `Total de la Compra  $ ${totalCompra}`;
}

// Funcion para restar, sumar y eliminar productos del carrito
function restarUnidad(id) {
  const producto = carrito.find((prod) => prod.id === id);
  if (producto) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    } else {
      carrito.splice(carrito.indexOf(producto), 1);
    }
    contadorCarrito--;
    actualizarContadorCarrito();
    actualizarTablaProductos();
  }
}

function sumarUnidad(id) {
  const producto = carrito.find((prod) => prod.id === id);
  if (producto) {
    producto.cantidad++;
    contadorCarrito++;
    actualizarContadorCarrito();
    actualizarTablaProductos();
  }
}

function eliminarProducto(id) {
  const producto = carrito.find((prod) => prod.id === id);
  if (producto) {
    carrito.splice(carrito.indexOf(producto), 1);
    contadorCarrito -= producto.cantidad;
    actualizarContadorCarrito();
    actualizarTablaProductos();
  }
}

    divCarrito.appendChild(botonAbrirTarjeta);
  }
};

// Boton para abrir la tarjeta flotante
function abrirTarjetaFlotante() {
  const tarjetaFlotante = document.createElement('div');
  tarjetaFlotante.className = 'tarjeta-flotante';

  const contenidoTarjeta = document.createElement('div');
  contenidoTarjeta.className = 'tarjeta-contenido';

  const imagenTarjeta = document.createElement('img');
  imagenTarjeta.src = 'https://static.vecteezy.com/system/resources/previews/005/035/758/large_2x/bank-card-icon-editable-of-credit-card-vector.jpg'; // TARJETA IMG
  imagenTarjeta.alt = 'Tarjeta de débito/crédito';

  const formulario = document.createElement('form'); // Agregar formulario
  formulario.addEventListener('submit', validarFormulario); // Agregar el evento submit al formulario

  const inputNombreTitular = document.createElement('input');
  inputNombreTitular.type = 'text';
  inputNombreTitular.placeholder = 'Nombre del titular';
  inputNombreTitular.required = true;

  const inputNumeroTarjeta = document.createElement('input');
  inputNumeroTarjeta.type = 'text';
  inputNumeroTarjeta.placeholder = 'Número de tarjeta';
  inputNumeroTarjeta.required = true;

  const inputVencimientoTarjeta = document.createElement('input');
  inputVencimientoTarjeta.type = 'text';
  inputVencimientoTarjeta.placeholder = 'Fecha de vencimiento';
  inputVencimientoTarjeta.required = true;

  const inputCodigoSeguridad = document.createElement('input');
  inputCodigoSeguridad.type = 'text';
  inputCodigoSeguridad.placeholder = 'Código de seguridad';
  inputCodigoSeguridad.required = true;

  const botonEnviar = document.createElement('button');
  botonEnviar.innerText = 'Completar Compra';
  botonEnviar.classList.add('btn', 'btn-outline-success');

  formulario.appendChild(inputNombreTitular);
  formulario.appendChild(inputNumeroTarjeta);
  formulario.appendChild(inputVencimientoTarjeta);
  formulario.appendChild(inputCodigoSeguridad);
  formulario.appendChild(botonEnviar);

  contenidoTarjeta.appendChild(imagenTarjeta);
  contenidoTarjeta.appendChild(formulario);

  tarjetaFlotante.appendChild(contenidoTarjeta);
  document.body.appendChild(tarjetaFlotante);
}

function validarFormulario(event) {
  event.preventDefault(); // Preeviene el envo del formulario

  const inputNombreTitular = document.querySelector('input[placeholder="Nombre del titular"]');
  const inputNumeroTarjeta = document.querySelector('input[placeholder="Número de tarjeta"]');
  const inputVencimientoTarjeta = document.querySelector('input[placeholder="Fecha de vencimiento"]');
  const inputCodigoSeguridad = document.querySelector('input[placeholder="Código de seguridad"]');

  if (
    inputNombreTitular.value &&
    inputNumeroTarjeta.value &&
    inputVencimientoTarjeta.value &&
    inputCodigoSeguridad.value
  ) {
    cerrarTarjetaFlotante(); // Llama a la funcion para cerrar la tarjeta y muestra el mensaje de "Compra exitosa"
  } else {
    alert('Por favor, complete todos los campos requeridos.');
  }
}

function cerrarTarjetaFlotante() {
  const tarjetaFlotante = document.querySelector('.tarjeta-flotante');
  tarjetaFlotante.remove();

  // Crea la card mensaje de "Compra exitosa"
  const cardCompraExitosa = document.createElement('div');
  cardCompraExitosa.className = 'card card-exitosa';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const mensajeCompraExitosa = document.createElement('p');
  mensajeCompraExitosa.textContent = 'Compra exitosa';

  const botonCerrar = document.createElement('button');
  botonCerrar.innerText = 'Cerrar';
  botonCerrar.className = 'btn btn-outline-success';
  botonCerrar.onclick = () => {
    cardCompraExitosa.remove();
    window.location.href = 'index.html';
  };

  cardBody.appendChild(mensajeCompraExitosa);
  cardBody.appendChild(botonCerrar);
  cardCompraExitosa.appendChild(cardBody);
  document.body.appendChild(cardCompraExitosa);

  // Cerrar la card después de unos toque
  setTimeout(() => {
    cardCompraExitosa.remove();
  }, 10000);
}

// Agrega el boton al DOM
const divCarrito = document.getElementById('divCarrito');
divCarrito.appendChild(botonAbrirTarjeta);
