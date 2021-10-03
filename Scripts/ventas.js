//constantes generales
const D = document,
$fragmento = D.createDocumentFragment(),

//constantes de buscar cliente

$tablaClientes = D.getElementById("tabla_clientes"), 
$templateClientes = D.getElementById("clientes_template").content,
$buscarClientes=D.getElementById("buscar_cliente"),

// constantes de buscar usuario

$tablaUsuarios=D.getElementById("tabla_usuario"),
$templateUsuarios=D.getElementById("usuarios_template").content,
$buscarUsuarios=D.getElementById("buscar_usuario"),

//constantes de buscar productos

$tablaProductos=D.getElementById("tabla_productos"),
$templateProductos=D.getElementById("productos_template").content,
$buscarProductos=D.getElementById("buscar_producto"),

//constantes de cantidad del producto

$tablaTotales=D.getElementById("tabla_totales"),
$templateTotales=D.getElementById("totales_template").content,
$cantidadProduto=D.getElementById("cantidad_producto");




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
        
        
          $templateClientes.getElementById("cedula_cliente").textContent =json.cedula_cliente;
          $templateClientes.getElementById("nombre_cliente").textContent =
            json.nombre_cliente;
          $templateClientes.getElementById("correo_cliente").textContent =
            json.email_cliente;
          $templateClientes.getElementById("telefono_cliente").textContent =
            json.telefono_cliente;
          $templateClientes.getElementById("direccion_cliente").textContent =
            json.direccion_cliente;
  
          let $clone = D.importNode($templateClientes, true);
          $fragmento.appendChild($clone);
        
        $tablaClientes.querySelector("tbody").appendChild($fragmento);
  
      } catch (error) {
        console.log(error);
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
        
        
          $templateUsuarios.getElementById("cedula_usuario").textContent =json.cedula_usuario;
          $templateUsuarios.getElementById("nombre_usuario").textContent =
            json.nombre_usuario;
          $templateUsuarios.getElementById("correo_usuario").textContent =
            json.email_usuario;
          $templateUsuarios.getElementById("usuario_usuario").textContent =
            json.usuario;
          $templateUsuarios.getElementById("contraseña_usuario").textContent =
            json.password;
  
          let $clone = D.importNode($templateUsuarios, true);
          $fragmento.appendChild($clone);
        
        $tablaUsuarios.querySelector("tbody").appendChild($fragmento);
  
      } catch (error) {
        console.log(error);
      }
    }
  });

  //metodo buscar producto

  
  D.addEventListener("submit", async (e) => {
    if (e.target === $buscarProductos ) {
      e.preventDefault();
  
      try {
        let res = await fetch(`http://localhost:8080/productos/buscar/${e.target.codigo_producto.value}`),
          json = await res.json();
        
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        console.log(json);
        
        
          $templateProductos.getElementById("codigo_producto").textContent =json.codigo_producto;
          $templateProductos.getElementById("nombre_producto").textContent =
            json.nombre_producto;
          $templateProductos.getElementById("iva_compra").textContent =`${json.ivacompra} %`;
          $templateProductos.getElementById("cantidad_producto").textContent =`${e.target.cantidad_producto.value} und`;
          $templateProductos.getElementById("valor_unitario").textContent =`$ ${json.precio_venta}`;
          $templateProductos.getElementById("total").textContent =`$ ${e.target.cantidad_producto.value * json.precio_venta}`;
          

          let $clone = D.importNode($templateProductos, true);
          $fragmento.appendChild($clone);
        
        $tablaProductos.querySelector("tbody").appendChild($fragmento);
        
        const totalProducto=e.target.cantidad_producto.value * json.precio_venta,
        ivaProducto=(totalProducto / 100 ) * json.ivacompra,
        totalIva=totalProducto + ivaProducto;

        $templateTotales.getElementById("total_venta").textContent=`${Number(totalProducto)}`;
        $templateTotales.getElementById("total_iva").textContent=`${ivaProducto}`;
        $templateTotales.getElementById("total_con_iva").textContent=`${totalIva}`;
        

        $tablaTotales.querySelector("tbody").appendChild($templateTotales);

      } catch (error) {
        console.log(error);
      }
    }
  });

