//constantes generales
const D = document,
  $fragmento = D.createDocumentFragment(),
  $formulario = D.getElementById("datos_item"),

  //constantes de buscar cliente

  $tablaClientes = D.getElementById("tabla_clientes"),
  $templateClientes = D.getElementById("clientes_template").content,
  $buscarClientes = D.getElementById("buscar_cliente"),

  // constantes de buscar usuario

  $tablaUsuarios = D.getElementById("tabla_usuario"),
  $templateUsuarios = D.getElementById("usuarios_template").content,
  $buscarUsuarios = D.getElementById("buscar_usuario"),

  //constantes de buscar productos

  $tablaProductos = D.getElementById("tabla_productos"),
  $templateProductos = D.getElementById("productos_template").content,
  $buscarProductos = D.getElementById("buscar_producto"),

  //constantes de cantidad del producto

  $tablaTotales = D.getElementById("tabla_totales"),
  $cantidadProduto = D.getElementById("cantidad_producto");
  
  
 //variables detalleventas
 let coddetalle,
  cantidad,
  codprod,
    iva_compra = "",
    nit_proveedor = "",
      ciudadProveedor = "",
      direccionProveedor = "",
      nombreProveedor = "",
      telefonoProveedor = "",
    nombreprod = "",
    precioCompra,
    precioventa,
  codigoVenta,
    cedcliente,
      dirclie = "",
      emailclie = "",
      nombclie = "",
      telclie = "",
    cedus,
      emailus = "",
      nombus = "",
      password = "",
      usuario = "",
    totalIva = 0,
    totalMasIva = 0,
    total_venta = 0.0,
  valortot = 0,
  valorven = 0,
  valoriv = 0;

//metodo buscar cliente
D.addEventListener("submit", async (e) => {
  if (e.target === $buscarClientes) {
    e.preventDefault();

    try {
      let res = await fetch(`http://localhost:8080/clientes/buscar/${e.target.numero_cedula.value}`),
        json = await res.json();
      console.log(e.target.numero_cedula.value);

      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      console.log(json);

      cedcliente = e.target.numero_cedula.value;
      nombclie = json.nombre_cliente;
      emailclie = json.email_cliente;
      telclie = json.telefono_cliente;
      dirclie = json.direccion_cliente

      $templateClientes.getElementById("cedula_cliente").textContent = json.cedula_cliente;
      $templateClientes.getElementById("nombre_cliente").textContent = json.nombre_cliente;
      $templateClientes.getElementById("correo_cliente").textContent = json.email_cliente;
      $templateClientes.getElementById("telefono_cliente").textContent = json.telefono_cliente;
      $templateClientes.getElementById("direccion_cliente").textContent = json.direccion_cliente;

      let $clone = D.importNode($templateClientes, true);
      $fragmento.appendChild($clone);

      $tablaClientes.querySelector("tbody").appendChild($fragmento);

    } catch (err) {
      console.log(err.name);
      console.log(err.message);
      console.log("error en buscar cliente")
    }
  }
});

//metodo buscar usuario
D.addEventListener("submit", async (e) => {
  if (e.target === $buscarUsuarios) {
    e.preventDefault();

    try {
      let res = await fetch(`http://localhost:8080/usuarios/buscar/${e.target.numero_cedula.value}`),
        json = await res.json();
      console.log(e.target.numero_cedula.value);

      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      console.log(json);

      cedus = json.cedula_usuario;
      emailus = json.email_usuario;
      nombus = json.nombre_usuario;
      password = json.password;
      usuario = json.usuario;

      $templateUsuarios.getElementById("cedula_usuario").textContent = json.cedula_usuario;
      $templateUsuarios.getElementById("nombre_usuario").textContent = json.nombre_usuario;
      $templateUsuarios.getElementById("correo_usuario").textContent = json.email_usuario;
      //$templateUsuarios.getElementById("usuario_usuario").textContent = usuario = json.usuario;
      //$templateUsuarios.getElementById("contraseña_usuario").textContent = password = json.password;

      let $clone = D.importNode($templateUsuarios, true);
      $fragmento.appendChild($clone);

      $tablaUsuarios.querySelector("tbody").appendChild($fragmento);

    } catch (err) {
      console.log(err.name);
      console.log(err.message);
      console.log("error en buscar usuario")
    }
    //crear venta inicial
    console.log(cedcliente, dirclie, emailclie, nombclie, telclie, cedus, emailus, nombus, password, usuario, totalIva, totalMasIva, total_venta);
    crearv()
  }
});

//metodo buscar producto
D.addEventListener("submit", async (e) => {
  if (e.target === $buscarProductos) {
    e.preventDefault();

    try {
      let res = await fetch(`http://localhost:8080/productos/buscar/${e.target.codigo_producto.value}`),
        json = await res.json();

      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      console.log(json);

      cantidad = e.target.cantidad_producto.value,
      codprod = json.codigo_producto,
      nombreprod = json.nombre_producto,
      iva_compra = json.ivacompra,
      precioCompra = json.precio_compra,
      precioventa = json.precio_venta,
      coddetalle = json.codigo_detalle_venta,

      $templateProductos.getElementById("codigo_producto").textContent = json.codigo_producto;
      $templateProductos.getElementById("nombre_producto").textContent = json.nombre_producto;
      $templateProductos.getElementById("iva_compra").textContent = `${json.ivacompra}`;
      $templateProductos.getElementById("cantidad_producto").textContent = `${cantidad}`;
      $templateProductos.getElementById("valor_unitario").textContent = `${json.precio_venta}`;
      $templateProductos.getElementById("total").textContent = `${e.target.cantidad_producto.value * json.precio_venta}`;

      $templateProductos.getElementById("eliminar_producto").dataset.codigo_detalle_venta = json.codigo_detalle_venta;

      $templateProductos.getElementById("modificar_producto").dataset.codigo_detalle_venta = json.codigo_detalle_venta;
      $templateProductos.getElementById("modificar_producto").dataset.cantidad_producto = json.cantidad_producto;

      let $clone = D.importNode($templateProductos, true);
      $fragmento.appendChild($clone);
      $tablaProductos.querySelector("tbody").appendChild($fragmento);

      total_venta = total_venta + (e.target.cantidad_producto.value * parseFloat(json.precio_venta, 10));
      totalIva = (total_venta / 100) * iva_compra,
      totalMasIva = total_venta + totalIva;

      nit_proveedor = json.nitproveedor.nitproveedor,
      ciudadProveedor = json.nitproveedor.ciudad_proveedor,
      direccionProveedor = json.nitproveedor.direccion_proveedor,
      nombreProveedor = json.nitproveedor.nombre_proveedor,
      telefonoProveedor = json.nitproveedor.telefono_proveedor;

        D.getElementById("total_venta").textContent = `${total_venta}`;
      D.getElementById("total_iva").textContent = `${totalIva}`;
      D.getElementById("total_con_iva").textContent = `${totalMasIva}`;

      valortot = e.target.cantidad_producto.value * json.precio_venta,
      valorven = json.precio_venta,
      valoriv = json.ivacompra;

      e.target.codigo_producto.value = "";
      e.target.cantidad_producto.value = "";
    } catch (err) {
      console.log(err.name);
      console.log(err.message);
      console.log("error en buscar producto")
    }
    crearDetalleVentas()
  }
});

//metodo crear venta
async function crearv(){
  try {
    let ventas = {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {

          cedula_cliente: {
            cedula_cliente: cedcliente,
            direccion_cliente: dirclie,
            email_cliente: emailclie,
            nombre_cliente: nombclie,
            telefono_cliente: telclie
          },
          cedula_usuario: {
            cedula_usuario: cedus,
            email_usuario: emailus,
            nombre_usuario: nombus,
            password: password,
            usuario: usuario
          },
          ivaventa: totalIva,
          total_venta: totalMasIva,
          valor_venta: total_venta
        }
      )
    },
    
      res = await fetch("http://localhost:8080/ventas/guardar", ventas),
      json = await res.json();
    console.log(res);
    codigoVenta = json.codigo_venta,
    
    console.log(json);

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
  
  } catch (err) {
    console.log(err.name);
    console.log(err.message);
    console.log("error en crear venta")
  }
};

//confirmar venta
async function confirmarVenta(){
  try {
    let ventas = {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          codigo_venta: codigoVenta,
          cedula_cliente: {
            cedula_cliente: cedcliente,
            direccion_cliente: dirclie,
            email_cliente: emailclie,
            nombre_cliente: nombclie,
            telefono_cliente: telclie
          },
          cedula_usuario: {
            cedula_usuario: cedus,
            email_usuario: emailus,
            nombre_usuario: nombus,
            password: password,
            usuario: usuario
          },
          ivaventa: totalIva,
          total_venta: totalMasIva,
          valor_venta: total_venta
        }
      )
    },
      res = await fetch("http://localhost:8080/ventas/guardar", ventas),
      json = await res.json();
    console.log(res);
    codigoVenta = json.codigo_venta,
    
    console.log(json);
    console.log(codigoVenta);
    alert("La venta ha sido creada con éxito")

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
  
  } catch (err) {
    console.log(err.name);
    console.log(err.message);
    console.log("error en guardar venta2")
  }

}

D.addEventListener("click", async e => {
  if (e.target.matches("#confirmar_venta")) {
    confirmarVenta();
    //location.reload();
  }
});

//crear detalle venta
async function crearDetalleVentas(){
    try {
      let detalleVentas = {
        method: "POST",
        headers: {
          "Accept": 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            cantidad_producto: cantidad,
            codigo_producto: {
              codigo_producto: codprod,
              ivacompra: iva_compra,
              nitproveedor:{
                nitproveedor: nit_proveedor,
                ciudad_proveedor: ciudadProveedor,
                direccion_proveedor: direccionProveedor,
                nombre_proveedor: nombreProveedor,
                telefono_proveedor: telefonoProveedor
              },
              nombre_producto: nombreprod,
              precio_compra: precioCompra,
              precio_venta: precioventa
            },
            codigo_venta: {
              codigo_venta: codigoVenta,
              cedula_cliente: {
                cedula_cliente: cedcliente,
                direccion_cliente: dirclie,
                email_cliente: emailclie,
                nombre_cliente: nombclie,
                telefono_cliente: telclie
              },
              cedula_usuario: {
                cedula_usuario: cedus,
                email_usuario: emailus,
                nombre_usuario: nombus,
                password: password,
                usuario: usuario
              },
              ivaventa: totalIva,
              total_venta: totalMasIva,
              valor_venta: total_venta
            },
            valor_total: valortot,
            valor_venta: valorven,
            valoriva: valoriv
          }
        )
      },
        res = await fetch("http://localhost:8080/detalle_ventas/guardar", detalleVentas),
        json = await res.json();
        console.log(res);
  
      
    } catch (err) {
      console.log(err.name);
      console.log(err.message);
      console.log("error en guardar detalleventa")
}}

//modificar detalle venta
D.addEventListener("click", async e => {
  if (e.target.matches("#modificar")) {
    console.log(codigo_detalle_venta);
    $formulario.InputCodigo.value = e.target.dataset.codigo_detalle_venta;
    $formulario.InputCantidad.value = e.target.dataset.cantidad_producto;
    crearDetalleVentas()
    //location.reload();
  }
});