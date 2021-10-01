const D = document,
$tabla = D.getElementById("tabla_productos"), 
$template = D.getElementById("listado_productos").content,
$fragmento = D.createDocumentFragment();

//metodo GET 
const listaPr = async()=>{
    try {
        let res = await fetch("http://localhost:8080/productos/listar"),
        json = await res.json();
        if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
        console.log(json);
        json.forEach(producto => {
            $template.getElementById("codigo_producto").textContent = producto.codigo_producto;
            $template.getElementById("iva_compra").textContent = producto.ivacompra;
            $template.getElementById("nit_proveedor").textContent = producto.nitproveedor.nitproveedor;
            $template.getElementById("precio_compra").textContent = producto.precio_compra;
            $template.getElementById("precio_venta").textContent = producto.precio_venta;

            $template.getElementById("eliminar_producto").dataset.codigo_producto = producto.codigo_producto;
            $template.getElementById("eliminar_producto").dataset.codigo_producto = producto.codigo_producto;
            $template.getElementById("eliminar_producto").dataset.codigo_producto = producto.codigo_producto;
            $template.getElementById("eliminar_producto").dataset.codigo_producto = producto.codigo_producto;
            $template.getElementById("eliminar_producto").dataset.codigo_producto = producto.codigo_producto;
            $template.getElementById("eliminar_producto").dataset.codigo_producto = producto.codigo_producto;
            let $clone = D.importNode($template, true);
            $fragmento.appendChild($clone);
        }); 
        $tabla.querySelector("tbody").appendChild($fragmento);
    } catch (error) {
        let mensaje=err.statusText("Ocurrio un error");
    }
}
D.addEventListener("DOMContentLoaded",listaPr);

// Agregar
function guardarProducto(producto) {
    const formData = new FormData();
    formData.append('codigo_producto', producto.codigo_producto);
    formData.append('iva_compra', producto.ivacompra);
    formData.append('nit_proveedor', producto.nitproveedor);
    formData.append('precio_compra', producto.precio_compra);
    formData.append('precio_venta', producto.precio_venta);

    return fetch('http://localhost:8080/productos/guardar', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
}

guardarProducto(producto)
   .then((json) => {
       // handle success
    })
   .catch(error => error);

// Buscar


/* DELETE
const options = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
}

fetch('http://localhost:8080/productos/eliminar/{codigo_producto}', options)
    .then(res => {
        if (res.ok) {
            return Promise.resolve('User deleted.');
        } else {
            return Promise.reject('An error occurred.');
        }
    })
    .then(res => console.log(res));*/