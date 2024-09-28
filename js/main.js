const tarjetas = [
  { id:"rtx-4060",
    titulo: "RTX-4060",
    precio: 300,
    img: "./multimedia/rtx4060.jpg",
  },
  { id:"rtx-4070",
    titulo: "RTX-4070",
    precio: 550,
    img: "./multimedia/rtx4070.jpg",
  },
  { id: "rtx-4080" , 
    titulo: "RTX-4080",
    precio: 1000,
    img: "./multimedia/rtx4080.jpg",
  },
  { id: "rtx-4090",
    titulo: "RTX-4090",
    precio: 2000,
    img: "./multimedia/rtx4090.jpg",
  }
];

const contenedorTarjetas = document.querySelector("#tarjetas");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoTarjetas = document.querySelector("#carrito-tarjetas");
const carritoTotal = document.querySelector("#total-carrito");

let carrito = [];

tarjetas.forEach((tarjeta) => {
  let div = document.createElement("div");
  div.classList.add("tarjeta");
  div.innerHTML = `
   <img class="tarjeta-img" src=${tarjeta.img}>
   <h3>${tarjeta.titulo}</h3><p>$${tarjeta.precio}</p>
   `;
   let button = document.createElement("button");
   button.classList.add("tarjeta-btn");
   button.innerText= "Agregar al carrito";
   button.addEventListener("click",() => {agregaralcarrito(tarjeta)});
   
   div.append(button);
   contenedorTarjetas.append(div);
});

function actualizarcarrito() {
  if (carrito.length === 0) {
      carritoVacio.classList.remove("d-none");
      carritoTarjetas.classList.add("d-none");
  } else {
      carritoVacio.classList.add("d-none");
      carritoTarjetas.classList.remove("d-none");

      carritoTarjetas.innerHTML = "";

      carrito.forEach((tarjeta) => {
          let div = document.createElement("div");
          div.classList.add("carrito-tarjeta");
          div.innerHTML = `
          <h3>${tarjeta.titulo}</h3>
          <p>$${tarjeta.precio}</p>
          <p>Cant: ${tarjeta.cantidad}</p>
          <p>Subt: ${tarjeta.precio * tarjeta.cantidad}</p>`;

          let button = document.createElement("button");
          button.classList.add("carrito-tarjeta-btn");
          button.innerText = "X";
          button.addEventListener("click", () => { borrardelcarrito(tarjeta) });

          div.append(button);
          carritoTarjetas.append(div);
      });
  }
}

function agregaralcarrito(tarjeta) {
  let itemEncontrado = carrito.find((item) => item.id === tarjeta.id);
  if (itemEncontrado) {
      itemEncontrado.cantidad++;
  } else {
      carrito.push({ ...tarjeta, cantidad: 1 });
  }
  actualizarcarrito();
  actualizarTotal();
  guardarCarrito();
}

function borrardelcarrito(tarjeta) {
  let itemEncontrado = carrito.find((item) => item.id === tarjeta.id);
  if (itemEncontrado) {
      itemEncontrado.cantidad--;
      if (itemEncontrado.cantidad === 0) {
          let indice = carrito.findIndex((item) => item.id === tarjeta.id);
          carrito.splice(indice, 1);
      }
  }
  actualizarcarrito();
  actualizarTotal();
  guardarCarrito();
}

function actualizarTotal() {
  let total = carrito.reduce((acc, tar) => acc + (tar.precio * tar.cantidad), 0);
  carritoTotal.innerText = `$${total}`;
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
      actualizarcarrito();
      actualizarTotal();
  }
}

document.addEventListener("DOMContentLoaded", cargarCarrito);

