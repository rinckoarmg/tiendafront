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
$cantidadProduto=D.getElementById("cantidad_producto");
let total_venta=0.0,
ivaProducto,
totalIva,
usuario="",
password="";



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
          //$templateUsuarios.getElementById("usuario_usuario").textContent =
            usuario = json.usuario;
          //$templateUsuarios.getElementById("contraseña_usuario").textContent =
            password = json.password;
  
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
          $templateProductos.getElementById("nombre_producto").textContent =json.nombre_producto;
          $templateProductos.getElementById("iva_compra").textContent =`${json.ivacompra} %`;
          $templateProductos.getElementById("cantidad_producto").textContent =`${e.target.cantidad_producto.value} und`;
          $templateProductos.getElementById("valor_unitario").textContent =`$ ${json.precio_venta}`;
          $templateProductos.getElementById("total").textContent =`$ ${e.target.cantidad_producto.value * json.precio_venta}`;
          

          let $clone = D.importNode($templateProductos, true);
          $fragmento.appendChild($clone);
          $tablaProductos.querySelector("tbody").appendChild($fragmento);
        
          total_venta = total_venta + (e.target.cantidad_producto.value  * parseFloat(json.precio_venta, 10));
 
        ivaProducto=(total_venta / 100 ) * json.ivacompra,
        totalIva=total_venta + ivaProducto;

        D.getElementById("total_venta").textContent=`$ ${total_venta}`;
        D.getElementById("total_iva").textContent=`$ ${ivaProducto}`;
        D.getElementById("total_con_iva").textContent=`$ ${totalIva}`;

        e.target.codigo_producto.value="";
        e.target.cantidad_producto.value="";
      } catch (error) {
        console.log(error);
      }
    }
  });

D.addEventListener("click", async e => {
    if (e.target.matches("#confirmar_venta")){
      try {
        let ventas= {
            method:"POST",
            headers:{
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            },
            body:JSON.stringify(
              {
                codigo_venta:20,
                cedula_cliente: {
                    cedula_cliente: $templateClientes.getElementById("cedula_cliente").textContent,
                    direccion_cliente: $templateClientes.getElementById("direccion_cliente").textContent,
                    email_cliente: $templateClientes.getElementById("correo_cliente").textContent,
                    nombre_cliente:$templateClientes.getElementById("nombre_cliente").textContent,
                    telefono_cliente: $templateClientes.getElementById("telefono_cliente").textContent
                },
                cedula_usuario: {
                    cedula_usuario: $templateUsuarios.getElementById("cedula_usuario").textContent,
                    email_usuario: $templateUsuarios.getElementById("correo_usuario").textContent,
                    nombre_usuario: $templateUsuarios.getElementById("nombre_usuario").textContent,
                    password: password,
                    usuario: usuario
                },
                ivaventa: ivaProducto,
                total_venta: totalIva,
                valor_venta: total_venta
            }
            )
        },
        res = await fetch("http://localhost:8080/ventas/guardar", ventas),
        json = await res.json();
        console.log(res);
        if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
        location.reload();
    } catch (error) {
        let mensaje = err.statusText("Ocurrio un error");
    }
    }
});

