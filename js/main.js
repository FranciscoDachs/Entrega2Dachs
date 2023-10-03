class Empresa {
    constructor(nombre, ubicacion) {
      this.nombre = nombre;
      this.ubicacion = ubicacion;
      this.inventarioFogones = [];
      this.clientes = [];
      this.ventas = [];
      this.carrito = [];
    }
  
    agregarFogon(fogon) {
      this.inventarioFogones.push(fogon);
    }
  
    agregarCliente(cliente) {
      this.clientes.push(cliente);
    }
  
    agregarAlCarrito(fogon, cantidad) {
      this.carrito.push({ fogon, cantidad });
    }
  
    realizarVenta(cliente, ubicacion) {
      let costoTotal = 0;
      let ventaDetalle = "";
  
      this.carrito.forEach((item) => {
        const fogon = item.fogon;
        const cantidad = item.cantidad;
        let costoEnvio = 0;
  
        if (ubicacion === "ROSARIO") {
          costoEnvio = 0;
        } else if (ubicacion === "SANTA FE") {
          costoEnvio = 1000;
        } else {
          costoEnvio = 2500;
        }
  
        if (this.inventarioFogones.includes(fogon)) {
          this.inventarioFogones.splice(this.inventarioFogones.indexOf(fogon), 1);
  
          const costoVenta = fogon.precio * cantidad;
          costoTotal += costoVenta + costoEnvio;
  
          ventaDetalle += `Modelo: ${fogon.modelo}, Cantidad: ${cantidad}, Costo Unitario: $${fogon.precio}, Costo Envío: $${costoEnvio}, Subtotal: $${costoVenta}\n`;
        } else {
          ventaDetalle += `El fogón ${fogon.modelo} no está disponible en el inventario.\n`;
        }
      });
  
      this.carrito = []; 
  
      if (ventaDetalle !== "") {
        const ventaCompleta = `Venta realizada a ${cliente.nombre} ${cliente.apellido} en ${ubicacion}:\n${ventaDetalle}Total: $${costoTotal}.`;
        this.ventas.push({ cliente, ventaCompleta });
        return ventaCompleta;
      } else {
        return "No se pudo completar la venta. Algunos fogones no están disponibles en el inventario.";
      }
    }
  }
  
  class Fogon {
    constructor(modelo, precio, tamaño, color) {
      this.modelo = modelo;
      this.precio = precio;
      this.tamaño = tamaño;
      this.color = color;
    }
  
    obtenerDescripcion() {
      return `${this.modelo} \n Tamaño: ${this.tamaño}. \n Precio: $${this.precio}.\n Colores disponibles: ${this.color}`;
    }
  }
  
  class Cliente {
    constructor(nombre, apellido) {
      this.nombre = nombre;
      this.apellido = apellido;
    }
  }
  

  const empresa = new Empresa("Chenque Fogones", "Rosario, Santa Fe");
  
  const fogon1 = new Fogon("Modelo Small", 5500, "Pequeño", "Negro");
  const fogon2 = new Fogon("Modelo Medium", 8000, "Mediano", "Negro");
  const fogon3 = new Fogon("Modelo Large", 10000, "Grande", "Negro");
  
  empresa.agregarFogon(fogon1);
  empresa.agregarFogon(fogon2);
  empresa.agregarFogon(fogon3);
  
  
  console.log(`¡Bienvenido a ${empresa.nombre} en ${empresa.ubicacion}!`);
  
  const clienteNombre = prompt("Por favor, ingresa tu nombre:").trim();
  const clienteApellido = prompt("Ingresa tu apellido:").trim();
  
  const nuevoCliente = new Cliente(clienteNombre, clienteApellido);
  empresa.agregarCliente(nuevoCliente);
  
  let continuarComprando = true;
  
  while (continuarComprando) {
    alert("Modelos de fogones disponibles:");
    
    for (let i = 1; i <= 3; i++) {
      const fogon = empresa.inventarioFogones[i - 1];
      alert(`${i}. ${fogon.obtenerDescripcion()}`);
    }
  
    const modeloFogon = prompt("Selecciona un modelo de fogón: \n 1- Small \n 2- Medium \n 3- Large \n Presione 0 para finalizar la compra:").trim();
  
    if (modeloFogon === "0") {
      continuarComprando = false;
      continue;
    }
  
    const indexModelo = parseInt(modeloFogon);
  
    if (indexModelo >= 1 && indexModelo <= 3) {
      const fogonSeleccionado = empresa.inventarioFogones[indexModelo - 1];
  
      if (fogonSeleccionado) {
        const cantidad = parseInt(prompt(`¿Cuántos fogones ${fogonSeleccionado.modelo} deseas comprar?`));
  
        if (!isNaN(cantidad) && cantidad > 0) {
          empresa.agregarAlCarrito(fogonSeleccionado, cantidad);
        } else {
          alert("Cantidad no válida. Debes ingresar un número mayor que cero.");
        }
      } else {
        alert("Selección de fogón no válida.");
      }
    } else {
      alert("Selección de modelo no válida.");
    }
  }
  
  if (empresa.carrito.length > 0) {
    const ubicacionEnvio = prompt("Selecciona la ubicación de envío (Rosario, Santa Fe, Otro):").trim().toUpperCase();
  
    if (ubicacionEnvio) {
      const venta = empresa.realizarVenta(nuevoCliente, ubicacionEnvio);
      alert(venta);
    } else {
      alert("Ubicación de envío no válida. La venta se ha cancelado.");
    }
  }
  
  // Registro de ventas y clientes en la consola
  console.log("Registro de Ventas:");
  empresa.ventas.forEach((venta) => {
    console.log(venta.ventaCompleta);
  });
  
  console.log("Registro de Clientes:");
  empresa.clientes.forEach((cliente) => {
    console.log(`Nombre: ${cliente.nombre} ${cliente.apellido}`);
  });
  