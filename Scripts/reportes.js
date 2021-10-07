const D = document,
$tabla = D.getElementById("tabla_ventas"), 
$template = D.getElementById("listado_ventas").content,
$buscar = D.getElementById("buscarVenta"),
$fragmento = D.createDocumentFragment(),
$codigo = D.getElementById("codigocliente").nodeValue,
$subtotal = 0,
$cajatotal = D.getElementById("totalVentas").content;

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
            //$template.getElementById("eliminar_venta").dataset.codigo_venta = venta.codigo_venta;
            let $clone = D.importNode($template, true);
            $fragmento.appendChild($clone);
            //$subtotal = venta.total_venta + $subtotal;
        }); 
        $tabla.querySelector("tbody").appendChild($fragmento);
        //$cajatotal.appendChild($subtotal);
    } catch (error) {
        let mensaje=err.statusText("Ocurrio un error");
    }
}
D.addEventListener("DOMContentLoaded",listaV);

// Metodo GET by Id
D.addEventListener("submit", async (e) =>{
    if (e.target==$buscar){
        $tabla.querySelector("tbody").textContent="";
        e.preventDefault();
        try {
            let res = await fetch(`http://localhost:8080/ventas/buscar/${e.target.codigocliente.value}`),
            json = await res.json(); 
            if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
            console.log(json);
            
                $template.getElementById("cedulaV").textContent = json.cedula_cliente.cedula_cliente;
                $template.getElementById("nombreV").textContent = json.cedula_cliente.nombre_cliente;
                $template.getElementById("valorTotalV").textContent = json.total_venta;
                    let $clone = D.importNode($template, true);
                    $fragmento.appendChild($clone);
            
            $tabla.querySelector("tbody").appendChild($fragmento);
        } catch (error) {
            let mensaje=err.statusText("Ocurrio un error");
        }
    }
    D.getElementById("codigocliente").value = "";
})

// Cargar listado
D.addEventListener("click", async e =>{
    if (e.target.matches("#vertodos")){
        $tabla.querySelector("tbody").textContent="";
        listaV();
    }
})

// totales 
/*async function totalizar(){

    total = $template.getElementById("valorTotalV").dataset.total_venta + total;
    $cajatotal.appendChild(acumulado)  
}
D.addEventListener("DOMContentLoaded",totalizar);*/