"use strict"

/* PELUSO MARTINA | SECCHES LUCÍA */

let productos = [
    {
      id: 1,
      nombre: "All Born Screaming — St. Vincent",
      precio: 30000,
      imagen: "all-born-screaming.jpg",
      categoria: "Alternativo",
      descripcion:
        "El séptimo álbum de Clark, titulado All Born Screaming, fue estrenado el 26 de abril del 2024. El álbum fue autoproducido por Clark, y tuvo colaboraciones con Dave Grohl, Cate Le Bon, Josh Freese, Rachel Eckroth, Mark Guiliana, Justin Meldal-Johnsen, Stella Mogzawa y David Ralicke. Con 10 canciones, la intérprete se adentra en géneros como el rock progresivo e industrial, jazz, electrónica y ska.",
    },
    {
      id: 2,
      nombre: "<Dall> — ARTMS",
      precio: 25000,
      imagen: "dall.jpg",
      categoria: "K-Pop",
      descripcion:
        "<Dall> (Hangul: 달, Luna; acrónimo de “Devine All Love & Live”) es el álbum debut completo de ARTMS. Fue lanzado el 31 de mayo de 2024, a la 1PM KST, junto con la canción principal “Virtual Angel”.",
    },
    {
      id: 3,
      nombre: "What's Your Pleasure? — Jessie Ware",
      precio: 35000,
      imagen: "whats-your-pleasure.jpg",
      categoria: "Alternativo",
      descripcion:
        "What's Your Pleasure? —en español, ¿Cúal es tu placer?— es el cuarto álbum de estudio de la cantante y compositora británica, Jessie Ware, que fue lanzado mundialmente el 26 de junio de 2020 por los sellos discográficos PMR, Virgin EMI y EMI.",
    },
    {
      id: 4,
      nombre: "KISS OF LIFE — KISS OF LIFE",
      precio: 25000,
      imagen: "kiss-of-life.jpg",
      categoria: "K-Pop",
      descripcion:
        "KISS OF LIFE es el primer EP del grupo surcoreano del mismo nombre. Fue lanzado por S2 Entertainment el 5 de julio de 2023. El mini álbum contiene seis pistas, incluido el sencillo principal «Shhh» y cuatro canciones en solitario, una por cada integrante, las cuales también tienen videos complementarios.",
    },
    {
      id: 5,
      nombre: "RUSH! (ARE U COMING?) — Måneskin",
      precio: 35000,
      imagen: "rush-are-u-coming.jpg",
      categoria: "Rock",
      descripcion:
        "Rush! es el tercer álbum de estudio de la banda italiana de rock Måneskin, lanzado el 20 de enero de 2023 a través de Epic Records y Sony Music. Måneskin grabó ''probablemente 50'' canciones para el álbum, parte de las cuales se grabaron en Los Ángeles con el productor Max Martin.",
    },
    {
      id: 6,
      nombre: "So Much (for) Stardust — Fall Out Boy",
      precio: 30000,
      imagen: "so-much-for-stardust.jpg",
      categoria: "Rock",
      descripcion:
        "So Much (For) Stardust es el octavo álbum de estudio de la banda estadounidense de rock Fall Out Boy. El disco fue publicado el 24 de marzo de 2023 por Fueled by Ramen. El álbum marca un regreso a un sonido más guiado por la guitarra.",
    },
];

let carrito = [];

let selectFiltro = document.getElementById("filtro");
let listaDeProductos = document.getElementById("productos");

let spanContadorCarrito = document.querySelector("header button span");
let contadorCarrito = 0;

let spanPrecioTotal = document.querySelector("header p span");
let precioTotal = 0;

// Para formatear el precio a pesos
let peso = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS'});

let botonVerCarrito = document.querySelector("header button");

let main = document.querySelector("main");

// Filtrado por categorías
selectFiltro.addEventListener("change", event => {
    let filtroSeleccionado = event.target.value;
    mostrarBanner();
  
    if (filtroSeleccionado === "Todos") {
      listarProductos();
    } else {
      let productosFiltrados = productos.filter(producto => producto.categoria === filtroSeleccionado);
      listarProductos(productosFiltrados);
    }
});

// Función para mostar el banner al cambiar de categoría
function mostrarBanner(){
  let bannerYaExistente = document.querySelector(".banner");

  if(bannerYaExistente){
    main.removeChild(banner);
  }else{
    let banner = document.createElement("div");
    banner.classList.add("banner");
  
    let imagen = document.createElement("img");
    imagen.src = "https://placehold.co/800x200";
    imagen.alt = "Banner publicitario";
    // Agregarle diseño al banner, y un href para la oferta
    
    let cerrar = document.createElement("a");
    cerrar.classList.add("cerrar");
    cerrar.href = "#";
    cerrar.innerText = "X";
    cerrar.addEventListener("click", event => {
      event.preventDefault();
      main.removeChild(banner);
    });

    setTimeout(function() {
      main.removeChild(banner);
    }, 10000);
    
    banner.append(imagen, cerrar);
    
    main.appendChild(banner);
  }
}
  
// Función para listar productos
function listarProductos(productosAListar = productos) {
    listaDeProductos.innerText = "";
    for (let producto of productosAListar) {
      let li = document.createElement("li");
  
      let img = document.createElement("img");
      img.src = `img/${producto.imagen}`;
      img.alt = producto.nombre;
  
      let div = document.createElement("div");
  
      let nombreProducto = document.createElement("h3");
      nombreProducto.innerText = producto.nombre;
  
      let precioProducto = document.createElement("p");
      precioProducto.innerText = "Precio: ";
      let spanPrecioProducto = document.createElement("span");
      spanPrecioProducto.innerText = peso.format(producto.precio);
      precioProducto.appendChild(spanPrecioProducto);
  
      let categoriaProducto = document.createElement("p");
      categoriaProducto.innerText = "Género: " + producto.categoria;
  
      let botonAgregar = document.createElement("button");
      botonAgregar.innerText = "Agregar al carrito";
      botonAgregar.dataset.id = producto.id;
      botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));
  
      let botonDetalles = document.createElement("button");
      botonDetalles.innerText = "Descripción";
      botonDetalles.addEventListener("click", () => mostrarDetallesProducto(producto));
  
      div.append(nombreProducto, precioProducto, categoriaProducto, botonAgregar, botonDetalles);
  
      li.append(img, div);
      listaDeProductos.appendChild(li);
    }
}

// Función para agregar al carrito
function agregarAlCarrito(producto) {
    let productoExistente = carrito.find(item => item.id === producto.id);
  
    if (productoExistente) {
      productoExistente.cantidad++;
      productoExistente.subtotal += producto.precio;
    } else {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        subtotal: producto.precio,
        imagen: producto.imagen,
        categoria: producto.categoria,
        cantidad: 1,
      });
    }
  
    contadorCarrito++;
    precioTotal += producto.precio;
  
    actualizarCarrito();
}

// Función para actualizar el carrito
function actualizarCarrito() {
    spanContadorCarrito.innerText = `(${contadorCarrito})`;
    spanPrecioTotal.innerText = peso.format(precioTotal);
}

// Función para mostrar el carrito
function mostrarCarrito() {
    let resultCarrito = document.createElement("div");
    resultCarrito.classList.add("modal");
    resultCarrito.id = "resultCarrito";
  
    let contenidoCarrito = document.createElement("div");
  
    let cerrar = document.createElement("a");
    cerrar.classList.add("cerrar");
    cerrar.href = "#";
    cerrar.innerText = "X";
    cerrar.addEventListener("click", event => {
      event.preventDefault();
      main.removeChild(resultCarrito);
    });
  
    let discosTotal = document.createElement("p");
    discosTotal.innerText = `Items: ${contadorCarrito} — Total: $${precioTotal}`;
    discosTotal.classList.add("totalCarrito");
  
    let hr = document.createElement("hr");
  
    let listaCarrito = document.createElement("ul");
    listaCarrito.id = "lista-carrito";
  
    let botonPagar = document.createElement("button");
    botonPagar.innerText = "Ir a Pagar";
    botonPagar.addEventListener("click", () => {
      window.open(
        "https://cdn.discordapp.com/attachments/609152495733702671/1256373539095842826/tengapiedad.png?ex=6680888a&is=667f370a&hm=99bba7a247c2578479349945727a8ee19d6686df5b0de6736d4f8d340ef34da3&",
        "_blank"
      );
    });
  
    let botonVaciar = document.createElement("button");
    botonVaciar.innerText = "Vaciar";
    botonVaciar.addEventListener("click", vaciarCarrito);
  
    let botonContainer = document.createElement("div");
    botonContainer.classList.add("botonContainer");
    botonContainer.appendChild(botonPagar);
    botonContainer.appendChild(botonVaciar);
  
    contenidoCarrito.append(cerrar, discosTotal, hr, listaCarrito, botonContainer);
  
    resultCarrito.appendChild(contenidoCarrito);
    main.appendChild(resultCarrito);
  
    listarProductosCarrito();
}

// Función para listar productos en el carrito
function listarProductosCarrito() {
    let listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerText = "";
    let totalCarrito = document.querySelector(".totalCarrito");
    totalCarrito.innerText = `Items: ${contadorCarrito} — Total: $${precioTotal}`;
  
    for (let producto of carrito) {
      let li = document.createElement("li");
      li.classList.add("item-carrito");
  
      let nombreProducto = document.createElement("span");
      if (producto.cantidad > 1) {
        nombreProducto.innerText = `${producto.nombre} - $${producto.subtotal} — (${producto.cantidad})`;
      } else {
        nombreProducto.innerText = `${producto.nombre} - $${producto.precio}`;
      }
  
      let eliminar = document.createElement("a");
      eliminar.classList.add("eliminar");
      eliminar.href = "#";
      eliminar.innerText = "Eliminar";
      eliminar.addEventListener("click", () => eliminarDelCarrito(producto.id));
  
      li.appendChild(nombreProducto);
      li.appendChild(eliminar);
  
      listaCarrito.appendChild(li);
    }
  }

// Función para eliminar del carrito
function eliminarDelCarrito(id) {
    let index = carrito.findIndex(item => item.id === id);
  
    if (index !== -1) {
      let productoEliminado = carrito[index];
      precioTotal -= productoEliminado.precio;
      contadorCarrito--;
  
      if (productoEliminado.cantidad > 1) {
        productoEliminado.cantidad--;
        productoEliminado.subtotal -= productoEliminado.precio;
      } else {
        carrito.splice(index, 1);
      }
  
      actualizarCarrito();
      listarProductosCarrito();
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    contadorCarrito = 0;
    precioTotal = 0;
    actualizarCarrito();
    main.removeChild(document.getElementById("resultCarrito"));
}


// Función modal descripción
function mostrarDetallesProducto(producto) {
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.id = "detalleProducto";
  
    let contenido = document.createElement("div");
  
    let titulo = document.createElement("h2");
    titulo.innerText = producto.nombre;
  
    let imagen = document.createElement("img");
    imagen.src = `img/${producto.imagen}`;
    imagen.alt = producto.nombre;
  
    let listaDescripcion = document.createElement("ul");
    listaDescripcion.classList.add("descripcion-lista");
  
    let propiedadesProducto = [
      { label: "Precio", value: `${peso.format(producto.precio)}` },
      { label: "Categoría", value: producto.categoria },
      { label: "Descripción", value: producto.descripcion },
    ];
  
    propiedadesProducto.forEach(propiedad => {
      let listItem = document.createElement("li");
  
      let label = document.createElement("label");
      label.innerText = `${propiedad.label}:`;
      label.classList.add("label");
  
      let value = document.createElement("span");
      value.innerText = ` ${propiedad.value}`;
  
      listItem.append(label, value);
  
      listaDescripcion.appendChild(listItem);
    });
  
    let cerrar = document.createElement("a");
    cerrar.classList.add("cerrar");
    cerrar.href = "#";
    cerrar.innerText = "X";
    cerrar.addEventListener("click", event => {
      event.preventDefault();
      main.removeChild(modal);
    });
  
    let botonAgregar = document.createElement("button");
    botonAgregar.innerText = "Agregar al carrito";
    botonAgregar.dataset.id = producto.id;
    botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));
  
    contenido.append(titulo, imagen, listaDescripcion, botonAgregar, cerrar);
  
    modal.appendChild(contenido);
    main.appendChild(modal);
  }
  
botonVerCarrito.addEventListener("click", mostrarCarrito);
  
listarProductos();
