const D = document,
$tabla = D.getElementById("tabla_productos"), 
$template = D.getElementById("listado_productos").content,
$fragmento = D.createDocumentFragment(),
$buscar = D.getElementById("buscarProducto"),
$codigo = D.getElementById("codigoproducto").nodeValue;


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
            $template.getElementById("nombre_producto").textContent = producto.nombre_producto;
            $template.getElementById("precio_compra").textContent = producto.precio_compra;
            $template.getElementById("precio_venta").textContent = producto.precio_venta;
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

// Metodo GET by Id

D.addEventListener("submit", async (e) =>{
    if (e.target==$buscar){
        $tabla.querySelector("tbody").textContent="";
        e.preventDefault();
        try {
            let res = await fetch(`http://localhost:8080/productos/buscar/${e.target.codigoproducto.value}`),
            json = await res.json(); 
            if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
            console.log(json);
                $template.getElementById("codigo_producto").textContent = json.codigo_producto;
                $template.getElementById("iva_compra").textContent = json.ivacompra;
                $template.getElementById("nit_proveedor").textContent = json.nitproveedor.nitproveedor;
                $template.getElementById("nombre_producto").textContent = json.nombre_producto;
                $template.getElementById("precio_compra").textContent = json.precio_compra;
                $template.getElementById("precio_venta").textContent = json.precio_venta;
                let $clone = D.importNode($template, true);
                $fragmento.appendChild($clone);
            $tabla.querySelector("tbody").appendChild($fragmento);
        } catch (error) {
            let mensaje=err.statusText("Ocurrio un error");
        }
    }
    limpiar();
})

// Limpiar codigo producto
function limpiar() {
    D.getElementById("codigoproducto").value = "";
}

// Cargar listado
D.addEventListener("click", async e =>{
    if (e.target.matches("#vertodos")){
        $tabla.querySelector("tbody").textContent="";
        listaPr();
    }
})


// Metodo DELETE
D.addEventListener("click", async e =>{
    if (e.target.matches("#eliminar_producto")){
        let borrar = confirm(`Esta seguro de eliminar el producto con cédula: ${e.target.dataset.codigo_producto}?`);
        if (borrar){
            try {
                let datosPr={
                    method:"DELETE",
                    headers:{
                        "Accept": 'application/json',
                        'Content-Type': 'application/json',
                    }
                },
                res=await fetch(`http://localhost:8080/productos/eliminar/${e.target.dataset.codigo_producto}`,datosPr),
                json=await res.text();
                if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
                location.reload();
            } catch (error) {
                let mensaje=err.statusText("Ocurrio un error"); 
            }
        }
    }
}) 
