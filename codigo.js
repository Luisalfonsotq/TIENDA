const obj = {
  nombre: "",
  cantidad: 0,
  tipo: "",
};

let clientes = [];
let paraborrar = [];
let posicion = -1;

htmleditar = `
  <button type="button" onclick="editar()" class="individual btn btn-outline-success">EDITAR</button>
  <button type="button" onclick="pintar()" class="individual btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">MOSTRAR</button>
`;

htmlguardar = `
  <button type="button" onclick="guardar()" class="individual btn btn-outline-success">GUARDAR</button>
  <button type="button" onclick="pintar()" class="individual btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">MOSTRAR</button>
`;

function guardar() {
  console.log("guardando");
  // Obtener valores del formulario
  obj.nombre = document.getElementById("nombre").value;
  obj.cantidad = parseInt(document.getElementById("cantidad").value);
  obj.tipo = document.getElementById("tipo").value;

  // Crear un nuevo cliente (producto)
  let cliente = { ...obj };
  clientes.push(cliente);

  // Mostrar un mensaje de éxito
  const myToast = new bootstrap.Toast(document.getElementById('liveToast'));
  myToast.show();

  // Actualizar la tabla y limpiar el formulario
  pintar();
  limpiar();
}

function limpiar() {
  document.getElementById("nombre").value = '';
  document.getElementById("cantidad").value = '1'; // Valor predeterminado
  document.getElementById("tipo").value = 'Selecciona un tipo de gomita'; // Valor predeterminado
}

function pintar() {
  let tabla = `
      <table border=1 class="table table-dark table-hover">
          <thead>
              <th>Selection</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Type of Product</th>
              <th>Actions</th>
          </thead>
  `;
  let filtotal = "";
  // Recorrer la lista de clientes (productos)
  for (posi in clientes) {
      let data = clientes[posi];
      let fila = `
          <tr>
              <td><input type="checkbox" onclick="agregar_desmark('${data.nombre}')" id="${posi}"></td>
              <td>${data.nombre}</td>
              <td>${data.cantidad}</td>
              <td>${data.tipo}</td>
              <td>
                  <button onclick="preeditar(${posi})" class="btn btn-primary">
                      <i class="bi bi-pencil"></i>
                  </button>
                  <button onclick="preborrar(${posi})" class="btn btn-danger">
                      <i class="bi bi-trash"></i>
                  </button>
              </td>
          </tr>`;
      filtotal += fila;
  }
  tabla += filtotal + '</table>';
  document.getElementById("tabla").innerHTML = tabla;
}

function preeditar(pos) {
  // Llenar los campos con los datos del producto a editar
  document.getElementById("nombre").value = clientes[pos].nombre;
  document.getElementById("cantidad").value = clientes[pos].cantidad;
  document.getElementById("tipo").value = clientes[pos].tipo;

  // Cambiar los botones para editar
  document.getElementById('botones').innerHTML = htmleditar;

  // Guardar la posición para saber qué producto editar
  posicion = pos;

  // Cerrar el modal actual
  let miModal = document.getElementById('exampleModal');
  let modalBootstrap = bootstrap.Modal.getInstance(miModal);
  modalBootstrap.hide();
}

function editar() {
  // Obtener los nuevos valores
  obj.nombre = document.getElementById("nombre").value;
  obj.cantidad = parseInt(document.getElementById("cantidad").value);
  obj.tipo = document.getElementById("tipo").value;

  // Actualizar el producto en la lista
  let cliente = { ...obj };
  clientes[posicion] = cliente;

  // Volver a los botones de guardar
  document.getElementById('botones').innerHTML = htmlguardar;

  // Limpiar los campos
  limpiar();
}

function preborrar(pos) {
  // Guardar la posición del producto a borrar
  posicion = pos;
  document.getElementById("registro").innerText = pos + 1; // Mostrar el número de registro a borrar
  let miModal = document.getElementById('modalborrrado');
  let modalBootstrap = new bootstrap.Modal(miModal);
  modalBootstrap.show();
}

function borrarvarios() {
  // Borrar todos los productos seleccionados
  for (let nombre of paraborrar) {
      let p = clientes.findIndex((e) => e.nombre == nombre);
      clientes.splice(p, 1);
  }
  pintar();

  // Desmarcar el checkbox "todos"
  let check = document.getElementById('todos');
  check.checked = !check.checked;

  // Limpiar el arreglo de productos a borrar
  paraborrar = [];
}

function borrauno() {
  // Borrar el producto seleccionado
  borrar(posicion);
  posicion = -1;

  // Mostrar un mensaje de éxito
  document.getElementById("mensaje").innerText = "Registro borrado con éxito ...";
  const myToast = new bootstrap.Toast(document.getElementById('liveToast'));
  myToast.show();

  // Actualizar la lista
  pintar();
}

function borrar(pos) {
  // Borrar el producto en la posición indicada
  clientes.splice(pos, 1);
}

function activarcheck() {
  // Marcar todos los productos para eliminar
  paraborrar = [];
  for (indice in clientes) {
      let cliente = clientes[indice];
      let check = document.getElementById(indice);
      check.checked = !check.checked;
      paraborrar.push(cliente.nombre);
  }
  console.log(paraborrar);
}

function agregar_desmark(nombre) {
  // Agregar o quitar productos de la lista de borrado
  let pos = paraborrar.findIndex((e) => e == nombre);
  if (pos == -1) {
      paraborrar.push(nombre);
  } else {
      paraborrar.splice(pos, 1);
  }
  console.log(paraborrar);
}

function borrar() {
  // Borrar los productos seleccionados
  for (nombre of paraborrar) {
      let pos = clientes.findIndex((e) => e.nombre == nombre);
      clientes.splice(pos, 1);
  }
  for (nombre of paraborrar) {
      let pos2 = paraborrar.findIndex((e) => e == nombre);
      paraborrar.splice(pos2, 1);
  }
  pintar();
}

function cerrar() {
  // Cerrar el modal y desmarcar el checkbox
  document.getElementById('todos').checked = false;
}

// Función para mostrar el catálogo
function catalogo(){
// Selecciona el modal usando su ID
    const modal = new bootstrap.Modal(document.getElementById('exampleModalcatalogo'));
    // Muestra el modal
    modal.show();
}