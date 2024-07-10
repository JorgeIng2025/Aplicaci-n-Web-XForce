document.addEventListener("DOMContentLoaded", async function() {
  // Verifica si ya se ha redirigido antes
  if (sessionStorage.getItem('datosProcesados') === 'true') {
      console.log("Datos ya procesados previamente, no se redirige.");
      return; // Detiene la ejecución si ya se ha redirigido antes
  }

  // Función que simula un procesamiento de datos prolongado
  async function procesarDatos() {
      return new Promise(resolve => {
          setTimeout(() => {
              // Aquí iría tu lógica de procesamiento de datos
              console.log("Datos procesados");
              resolve();
          }, 5000); // Simula 5 segundos de procesamiento
      });
  }

  // Espera a que el procesamiento de datos termine
  await procesarDatos();

  // Marca en localStorage que los datos han sido procesados
  sessionStorage.setItem('datosProcesados', 'true');

  // Redirige a otra página
  window.location.href = "index2.html"; // Cambia esta URL a la de tu página destino
});



// Definir la clase Producto
class Producto {
  // Constructor de la clase Producto
  constructor(nombre, precio, talla, imgChange) {
    this.nombre = nombre; // Nombre del producto
    this.precio = precio; // Precio del producto
    this.imgChange = imgChange; // URL de la imagen del producto
    this.talla = talla; //talla del producto

  }
}

// Definir la clase CarritoDeCompras
class CarritoDeCompras {
  // Constructor de la clase CarritoDeCompras
  constructor() {
    this.productos = JSON.parse(localStorage.getItem("carrito")) || [];
    this.actualizarCarrito(); // Actualizar el carrito al cargar la página
  }


  // Método para agregar un producto al carrito
  agregarProducto(producto) {
    this.productos.push(producto); // Agrega el producto a la lista de productos
    this.actualizarCarrito(); // Actualiza la visualización del carrito
    this.guardarCarritoEnLocalStorage(); // Guardar el carrito en localStorage después de agregar un producto


  }

  // Método para eliminar un producto del carrito
  eliminarDelCarrito(index) {
    this.productos.splice(index, 1); // Elimina el producto en la posición especificada del carrito
    this.actualizarCarrito(); // Actualiza la visualización del carrito
    this.guardarCarritoEnLocalStorage(); // Guardar el carrito en localStorage después de agregar un producto

  }


  // Método para calcular el total de la compra
  calcularTotal() {
    let total = 0;
    for (let producto of this.productos) {
      total += producto.precio; // Suma el precio de cada producto en el carrito
    }
    return total.toFixed(3); // Devuelve el total con dos decimales
  }

  // Método para actualizar la visualización del carrito
  actualizarCarrito() {
    const productosDiv = document.getElementById('productos'); // Obtiene el contenedor de productos del HTML
    productosDiv.innerHTML = ''; // Limpia el contenido anterior

    // Itera sobre la lista de productos en el carrito
    for (let i = 0; i < this.productos.length; i++) {
      const producto = this.productos[i]; // Obtiene el producto en la posición actual

      // Crea un div para mostrar el producto
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');

      // Crea un elemento de imagen y establece su atributo src y alt
      const imagen = document.createElement('img');
      imagen.src = producto.imgChange;
      imagen.alt = producto.nombre;
      productoDiv.appendChild(imagen); // Agrega la imagen al contenedor de producto


      // Crea un elemento de párrafo para mostrar el nombre y el precio del producto
      const nombre = document.createElement('h3');
      nombre.textContent = `${producto.nombre}`;

      const precioTalla = document.createElement('span');
      precioTalla.textContent = `Precio: ₡${producto.precio.toFixed(3)} Talla: ${producto.talla}`;

      productoDiv.append(nombre,precioTalla); // Agrega el nombre y el precio al contenedor de producto

      // Crea un botón para eliminar el producto
      const eliminarBtn = document.createElement('button');
      eliminarBtn.textContent = 'Eliminar';
      eliminarBtn.onclick = () => this.eliminarDelCarrito(i); // Asigna una función para manejar clics
      productoDiv.appendChild(eliminarBtn); // Agrega el botón al contenedor de producto

      productosDiv.appendChild(productoDiv); // Agrega el contenedor de producto al contenedor principal
    }

    /*Este boton sera ingresado pero en el card po rlo que este es un boton de finalización*/
    const finalizarBtn = document.createElement('button');
    finalizarBtn.id = 'finalizarCompraBtn';
    finalizarBtn.textContent = 'Finalizar Compra';
    finalizarBtn.onclick = SeguirComprando;
    productosDiv.appendChild(finalizarBtn);


    // Actualiza el total de la compra en el HTML
    document.getElementById('total').innerText = '₡' + this.calcularTotal();

  }

  guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(this.productos));
  }


}

/*Necesito esta función para cuando este desarrollado el index Card */
function SeguirComprando() {
  // Lógica del index donde se encontrará el metodo de pago.
  alert("Gracias por su compra.!")
}

// Crea un nuevo carrito de compras
const carrito = new CarritoDeCompras();

// // Función para mostrar u ocultar el carrito de compras
// function toggleCarrito() {
//   const carritoDiv = document.getElementById("carrito");
//   if (carritoDiv.style.display === "none") {
//     carritoDiv.style.display = "block"; // Muestra el carrito si está oculto
//   } else {
//     carritoDiv.style.display = "none"; // Oculta el carrito si está visible
//   }
// }


function toggleCarrito() {
  const carritoDiv = document.getElementById("carrito");

  // Comprueba el estado actual de visibilidad usando la propiedad computedStyle
  const computedStyle = window.getComputedStyle(carritoDiv);
  const displayStyle = computedStyle.getPropertyValue("display");

  // Alterna la visibilidad basada en el estado actual
  // Alterna la visibilidad basada en el estado actual
  if (displayStyle === "none") {
    carritoDiv.style.display = "block"; // Muestra el menú si está oculto
  } else {
    carritoDiv.style.display = "none"; // Oculta el menú si está visible
  }
}


// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio, imgChange, talla) {
  const producto = new Producto(nombre, precio, imgChange, talla); // Crea un nuevo producto
  carrito.agregarProducto(producto); // Agrega el producto al carrito
}




// // Ejemplo de uso: Agregar productos al carrito
// agregarAlCarrito("Camiseta", 20.99, "imagen_camiseta.jpg");
// agregarAlCarrito("Pantalón", 35.50, "imagen_pantalon.jpg");


//El siguiente script me permitira el cambion a selección del estilo del artículo.
// para eso necesitamos la declaración de las variables que necesitaremos con los debidos parametros

// let whiteBtn = document.getElementById("white");
// let blueBtn = document.getElementById("blue");
// let blackBtn = document.getElementById("black");
// // let imgChange = document.getElementById("imgChange");


// whiteBtn.onclick = function () {
//   imgChange.src = "./img.Desarrollo/Yezzy 250 blancas.png";
// }

// blueBtn.onclick = function () {
//   imgChange.src = "./img.Desarrollo/Yezzy 350.png";
// }

// blackBtn.onclick = function () {
//   imgChange.src = "./img.Desarrollo/yezzy 350 v2 nregas.png";
// }

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("#Botones img");

  /**
   * Función para cambiar la imagen principal y actualizar la selección.
   * @param {string} imgSrc - La fuente de la imagen a mostrar.
   * @param {string} id - El ID del botón seleccionado.
   */
  function changeImage(imgSrc, id) {
    // Cambiar la imagen principal
    document.getElementById('imgChange').src = imgSrc;
    // Guardar la selección en localStorage
    localStorage.setItem("selectedButton", id);
    // Actualizar la selección visual
    updateSelection(id);
  }

  /**
   * Función para actualizar la selección visual del botón.
   * @param {string} selectedId - El ID del botón seleccionado.
   */
  function updateSelection(selectedId) {
    buttons.forEach(button => {
      if (button.id === selectedId) {
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    });
  }

  // Leer la selección guardada en localStorage
  const savedSelection = localStorage.getItem("selectedButton");
  if (savedSelection) {
    // Obtener la imagen correspondiente al ID guardado
    const selectedButton = document.getElementById(savedSelection);
    if (selectedButton) {
      // Cambiar la imagen principal y actualizar la selección visual
      changeImage(selectedButton.src, savedSelection);
    }
  }

  // Añadir event listeners a cada botón
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      changeImage(button.src, button.id);
    });
  });
});


const button = document.getElementById('buttonCard');

button.addEventListener('click', () => {
  // Cambia el color del botón para confirmar el clic
  button.classList.add('clicked');

  // Vuelve al color original después de un tiempo
  setTimeout(() => {
    button.classList.remove('clicked');
  }, 1000); // Cambia el tiempo según tu preferencia
});

const $form = document.querySelector('#form')

$form.addEventListener('submit', handlesubmit)

