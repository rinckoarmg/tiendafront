const D = document,
$tabla = D.getElementById("tabla_proveedores"), 
$template = D.getElementById("listado_proveedores").content,
$fragmento = D.createDocumentFragment();

//metodo GET 
const listaP = async()=>{
    try {
        let res = await fetch("http://localhost:8080/proveedores/listar"),
        json = await res.json();
        if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
        console.log(json);
        json.forEach(proveedor => {
            $template.getElementById("nit_proveedor").textContent = proveedor.nitproveedor;
            $template.getElementById("ciudad_proveedor").textContent = proveedor.ciudad_proveedor;
            $template.getElementById("direccion_proveedor").textContent = proveedor.direccion_proveedor;
            $template.getElementById("nombre_proveedor").textContent = proveedor.nombre_proveedor;
            $template.getElementById("telefono_proveedor").textContent = proveedor.telefono_proveedor;
            $template.getElementById("eliminar_proveedor").dataset.nitproveedor = proveedor.nitproveedor;
            let $clone = D.importNode($template, true);
            $fragmento.appendChild($clone);
        }); 
        $tabla.querySelector("tbody").appendChild($fragmento);
    } catch (error) {
        let mensaje=err.statusText("Ocurrio un error");
    }
}
D.addEventListener("DOMContentLoaded",listaP);