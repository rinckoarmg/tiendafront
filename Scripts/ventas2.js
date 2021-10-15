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
 let cantidad,
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

  var codDetalle;
  var cantidadDetalle;
  

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

//acción buscar 
D.addEventListener("submit", async (e) => {
  if (e.target === $buscarProductos) {
    e.preventDefault();

    crearDetalleVentas();
    buscarDetalleVentas()
  }
});

//crear detalle venta
async function crearDetalleVentas(){
  await new Promise(resolve => setTimeout(resolve, 1000));
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
        json2 = await res.json();
        console.log(json2);
      
      codDetalle = json2.codigo_detalle_venta,
      cantidadDetalle = json2.cantidad_producto;
      
    } catch (err) {
      console.log(err.name);
      console.log(err.message);
      console.log("error en guardar detalleventa")
    }
}

//buscar detalle venta
async function buscarDetalleVentas(){
  await new Promise(resolve => setTimeout(resolve, 2000));
    try {
      let res = await fetch(`http://localhost:8080/detalle_ventas/buscar/${codDetalle}`),
        json = await res.json();

      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      console.log(json);

      
      //$templateProductos.getElementById("cod_detalle").textContent = json.codigo_detalle_venta;
      $templateProductos.getElementById("codigo_producto").textContent = json.codigo_producto.codigo_producto;
      $templateProductos.getElementById("nombre_producto").textContent = json.codigo_producto.nombre_producto;
      $templateProductos.getElementById("iva_compra").textContent = `${json.codigo_producto.ivacompra}`;
      $templateProductos.getElementById("cantidad_producto").textContent = `${json.cantidad_producto}`;
      $templateProductos.getElementById("valor_unitario").textContent = `${json.codigo_producto.precio_venta}`;
      $templateProductos.getElementById("total").textContent = `${json.cantidad_producto * json.codigo_producto.precio_venta}`;

      $templateProductos.getElementById("eliminar_producto").dataset.codigo_detalle_venta = json.codigo_detalle_venta;

      $templateProductos.getElementById("modificar_producto").dataset.codigo_detalle_venta = json.codigo_detalle_venta;
      $templateProductos.getElementById("modificar_producto").dataset.cantidad_producto = $templateProductos.getElementById("cantidad_producto").textContent;
      $templateProductos.getElementById("modificar_producto").dataset.codigo_producto = json.codigo_producto.codigo_producto;
      $templateProductos.getElementById("modificar_producto").dataset.ivacompra = json.codigo_producto.ivacompra;
      $templateProductos.getElementById("modificar_producto").dataset.nitproveedor = json.codigo_producto.nitproveedor.nitproveedor;
      $templateProductos.getElementById("modificar_producto").dataset.ciudad_proveedor = json.codigo_producto.nitproveedor.ciudad_proveedor;
      $templateProductos.getElementById("modificar_producto").dataset.direccion_proveedor = json.codigo_producto.nitproveedor.direccion_proveedor;
      $templateProductos.getElementById("modificar_producto").dataset.nombre_proveedor = json.codigo_producto.nitproveedor.nombre_proveedor;
      $templateProductos.getElementById("modificar_producto").dataset.telefono_proveedor = json.codigo_producto.nitproveedor.telefono_proveedor;
      $templateProductos.getElementById("modificar_producto").dataset.nombre_producto = json.codigo_producto.nombre_producto;
      $templateProductos.getElementById("modificar_producto").dataset.precio_compra = json.codigo_producto.precio_compra;
      $templateProductos.getElementById("modificar_producto").dataset.precio_venta = json.codigo_producto.precio_venta;
      $templateProductos.getElementById("modificar_producto").dataset.codigo_venta = json.codigo_venta.codigo_venta;
      $templateProductos.getElementById("modificar_producto").dataset.cedula_cliente = json.codigo_venta.cedula_cliente.cedula_cliente;
      $templateProductos.getElementById("modificar_producto").dataset.direccion_cliente = json.codigo_venta.cedula_cliente.direccion_cliente;
      $templateProductos.getElementById("modificar_producto").dataset.email_cliente = json.codigo_venta.cedula_cliente.email_cliente;
      $templateProductos.getElementById("modificar_producto").dataset.nombre_cliente = json.codigo_venta.cedula_cliente.nombre_cliente;
      $templateProductos.getElementById("modificar_producto").dataset.telefono_cliente = json.codigo_venta.cedula_cliente.telefono_cliente;
      $templateProductos.getElementById("modificar_producto").dataset.cedula_usuario = json.codigo_venta.cedula_usuario.cedula_usuario;
      $templateProductos.getElementById("modificar_producto").dataset.email_usuario = json.codigo_venta.cedula_usuario.email_usuario;
      $templateProductos.getElementById("modificar_producto").dataset.nombre_usuario = json.codigo_venta.cedula_usuario.nombre_usuario
      $templateProductos.getElementById("modificar_producto").dataset.password = json.codigo_venta.cedula_usuario.password;
      $templateProductos.getElementById("modificar_producto").dataset.usuario = json.codigo_venta.cedula_usuario.usuario;
      $templateProductos.getElementById("modificar_producto").dataset.ivaventa = json.codigo_venta.ivaventa;
      $templateProductos.getElementById("modificar_producto").dataset.total_venta = json.codigo_venta.total_venta;
      $templateProductos.getElementById("modificar_producto").dataset.valor_venta = json.codigo_venta.valor_venta;

      let $clone = D.importNode($templateProductos, true);
      $fragmento.appendChild($clone);
      $tablaProductos.querySelector("tbody").appendChild($fragmento);
      
      codDetalle=json.codigo_detalle_venta;

      total_venta = total_venta + (json.cantidad_producto * parseFloat(json.codigo_producto.precio_venta, 10));
      totalIva = (total_venta / 100) * iva_compra,
      totalMasIva = total_venta + totalIva;

      D.getElementById("total_venta").textContent = `${total_venta}`;
      D.getElementById("total_iva").textContent = `${totalIva}`;
      D.getElementById("total_con_iva").textContent = `${totalMasIva}`;

      valortot = json.cantidad_producto * json.codigo_producto.precio_venta,
      valorven = json.codigo_producto.precio_venta,
      valoriv = json.codigo_producto.ivacompra;

      //e.target.codigo_producto.value = "";
      //e.target.cantidad_producto.value = "";

    } catch (err) {
      console.log(err.name);
      console.log(err.message);
      console.log("error en buscar detalle")
    }
  };

//traer datos modificar detalle venta
D.addEventListener("click", async e => {
  if (e.target.matches("#modificar_producto")) {
    e.target.parentNode.parentNode.remove() 
    //console.log(codDetalle);
    $formulario.InputCodigo.value = e.target.dataset.codigo_detalle_venta;
    $formulario.InputCantidad.value = e.target.dataset.cantidad_producto;
    
  }
});

//modificar detalle venta
D.addEventListener("submit", async e => {
  if (e.target === $formulario){
    codprod = e.target.dataset.codigo_producto.codigo_producto,
    iva_compra = e.target.dataset.codigo_producto.ivacompra,
    nit_proveedor = e.target.dataset.codigo_producto.nitproveedor.nitproveedor,
      ciudadProveedor = e.target.dataset.codigo_producto.nitproveedor.ciudad_proveedor,
      direccionProveedor = e.target.dataset.codigo_producto.nitproveedor.direccion_proveedor,
      nombreProveedor = e.target.dataset.codigo_producto.nitproveedor.nombre_proveedor,
      telefonoProveedor = e.target.dataset.codigo_producto.nitproveedor.telefono_proveedor,
    nombreprod = e.target.dataset.codigo_producto.nombre_producto,
    precioCompra = e.target.dataset.codigo_producto.precio_compra,
    precioventa = e.target.dataset.codigo_producto.precio_venta,
  codigoVenta = e.target.dataset.codigo_venta.codigo_venta,
    cedcliente = e.target.dataset.codigo_venta.cedula_cliente.cedula_cliente,
      dirclie = e.target.dataset.codigo_venta.cedula_cliente.direccion_cliente,
      emailclie = e.target.dataset.codigo_venta.cedula_cliente.email_cliente,
      nombclie = e.target.dataset.codigo_venta.cedula_cliente.nombre_cliente,
      telclie = e.target.dataset.codigo_venta.cedula_cliente.telefono_cliente,
    cedus = e.target.dataset.codigo_venta.cedula_usuario.cedula_usuario,
      emailus = e.target.dataset.codigo_venta.cedula_usuario.email_usuario,
      nombus = e.target.dataset.codigo_venta.cedula_usuario.nombre_usuario,
      password = e.target.dataset.codigo_venta.cedula_usuario.password,
      usuario = e.target.dataset.codigo_venta.cedula_usuario.usuario;
    totalIva = e.target.dataset.codigo_venta.ivaventa,
    totalMasIva = e.target.dataset.codigo_venta.total_venta,
    total_venta = e.target.dataset.codigo_venta.valor_venta,
  valortot = e.target.dataset.cantidad_producto * precioventa,
  valorven = precioventa,
  valoriv = iva_compra;

    e.preventDefault();
      try {
        let datosPr = {
            method:"PUT",
            headers:{
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            },
            body:JSON.stringify(
              { 
                codigo_detalle_venta: e.target.InputCodigo.value,
                cantidad_producto: e.target.InputCantidad.value,
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
        res = await fetch(`http://localhost:8080/detalle_ventas/actualizar/${e.target.InputCodigo.value}`,datosPr),
        json = await res.json();
        console.log(res);
        if (!res.ok) throw{status:res.status,statusText:res.statusText}; 

        buscarDetalleVentas()
    } catch (err) {
        console.log(err.name); 
        console.log(err.message);
    }
  }
});

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

//eliminar detalle venta
D.addEventListener("click", async e =>{
  if (e.target.matches("#eliminar_producto")){
    
      let borrar = confirm(`Esta seguro de eliminar el item: ${e.target.dataset.codigo_detalle_venta}?`);
      if (borrar){
          try {
              let datosU = {
                  method:"DELETE",
                  headers:{
                      "Accept": 'application/json',
                      'Content-Type': 'application/json',
                  }
              },
              res = await fetch(`http://localhost:8080/detalle_ventas/eliminar/${e.target.dataset.codigo_detalle_venta}`,datosU),
              json = await res.text();
              if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
              e.target.parentNode.parentNode.remove() 
              console.log(res);
          } catch (err) {
              console.log(err.name); 
              console.log(err.message);
          }
      }
  }
});