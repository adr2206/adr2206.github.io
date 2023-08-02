// Función para manejar el envío del formulario
function registrarCliente(event) {
  event.preventDefault();

  // Obtener los valores ingresados por el usuario
  const nombre = document.getElementById('nombre').value;
  const edad = document.getElementById('edad').value;
  const genero = document.getElementById('genero').value;
  const origen = document.getElementById('origen').value;
  const destino = document.getElementById('destino').value;
  const metodoPago = document.getElementById('metodo-pago').value;

  // Crear un objeto con los datos del cliente
  const cliente = {
    nombre,
    edad,
    genero,
    origen,
    destino,
    metodoPago,
  };

  // Obtener la lista de clientes registrados desde localStorage
  const clientesRegistrados = obtenerClientesDesdeLocalStorage();

  // Agregar el cliente a la lista de clientes registrados
  clientesRegistrados.push(cliente);

  // Guardar la lista de clientes registrados actualizada en localStorage
  guardarClientesEnLocalStorage(clientesRegistrados);

  // Limpiar el formulario
  document.getElementById('formulario-registro').reset();

  // Mostrar el listado de clientes actualizado
  mostrarListadoClientes();
}

// Función para guardar los datos de los clientes registrados en LocalStorage
function guardarClientesEnLocalStorage(clientes) {
  localStorage.setItem('clientesRegistrados', JSON.stringify(clientes));
}

// Función para obtener los datos de los clientes registrados desde LocalStorage
function obtenerClientesDesdeLocalStorage() {
  const data = localStorage.getItem('clientesRegistrados');
  return data ? JSON.parse(data) : [];
}

// Función para mostrar el listado de clientes en la tabla
function mostrarListadoClientes() {
  const tablaClientes = document.getElementById('lista-clientes');
  const tbody = tablaClientes.querySelector('tbody');
  tbody.innerHTML = '';

  // Obtener la lista de clientes registrados desde localStorage
  const clientesRegistrados = obtenerClientesDesdeLocalStorage();

  // Crear y agregar cada fila de la tabla
  clientesRegistrados.forEach((cliente, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${cliente.nombre}</td>
      <td>${cliente.edad}</td>
      <td>${cliente.genero}</td>
      <td>${cliente.origen}</td>
      <td>${cliente.destino}</td>
      <td>${cliente.metodoPago}</td>
      <td><button onclick="eliminarCliente(${index})">Eliminar</button></td>
    `;
    tbody.appendChild(fila);
  });
}

// Función para eliminar un cliente de la lista
function eliminarCliente(index) {
  // Obtener la lista de clientes registrados desde localStorage
  const clientesRegistrados = obtenerClientesDesdeLocalStorage();

  // Eliminar el cliente del array
  clientesRegistrados.splice(index, 1);

  // Actualizar la lista en localStorage
  guardarClientesEnLocalStorage(clientesRegistrados);

  // Mostrar el listado de clientes actualizado
  mostrarListadoClientes();
}

// Llamamos a la función para mostrar el listado de clientes en la página clientes.html
document.addEventListener('DOMContentLoaded', mostrarListadoClientes);
