const D = document,
$tabla = D.getElementById("tabla_ventas"), 
$template = D.getElementById("listado_ventas").content,
$fragmento = D.createDocumentFragment();

//metodo GET 
const listaV = async()=>{
    try {
        let res = await fetch("http://localhost:8080/ventas/listar"),
        json = await res.json();
        if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
        console.log(json);
        json.forEach(venta => {
            $template.getElementById("cedulaV").textContent = venta.cedula_cliente.cedula_cliente;
            $template.getElementById("nombreV").textContent = venta.cedula_cliente.nombre_cliente;
            $template.getElementById("valorTotalV").textContent = venta.total_venta;
            $template.getElementById("eliminar_venta").dataset.codigo_venta = venta.codigo_venta;
            let $clone = D.importNode($template, true);
            $fragmento.appendChild($clone);
        }); 
        $tabla.querySelector("tbody").appendChild($fragmento);
    } catch (error) {
        let mensaje=err.statusText("Ocurrio un error");
    }
}
D.addEventListener("DOMContentLoaded",listaV);