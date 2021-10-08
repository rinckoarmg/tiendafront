const D = document,
$tabla = D.getElementById("tabla_ventas"), 
$template = D.getElementById("listado_ventas").content,
$buscar = D.getElementById("buscarVenta"),
$fragmento = D.createDocumentFragment(),
$codigo = D.getElementById("codigocliente").nodeValue,
$templateTotales=D.getElementById("totales"),
$cajatotal = D.getElementById("caja_total");
let totales = 0.0,
total =0.0;

//metodo GET 
const listaV = async()=>{
    try {
        let res = await fetch("http://localhost:8080/ventas/listar"),
        json = await res.json();
        if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
        console.log(json);
        totales = 0,0;  
        json.forEach(venta => {
            $template.getElementById("cedulaV").textContent = venta.cedula_cliente.cedula_cliente;
            $template.getElementById("nombreV").textContent = venta.cedula_cliente.nombre_cliente;
            $template.getElementById("valorTotalV").textContent = venta.total_venta;
            //$template.getElementById("eliminar_venta").dataset.codigo_venta = venta.codigo_venta;
            let $clone = D.importNode($template, true);
            $fragmento.appendChild($clone);
            
            totales = totales + parseInt(venta.total_venta, 10);
        }); 
        $tabla.querySelector("tbody").appendChild($fragmento);
        $cajatotal.value = "";
        $cajatotal.value = totales;
    } catch (err) {
        console.log(err.name); 
        console.log(err.message);
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
                total = total + parseInt(json.total_venta, 10);

            $tabla.querySelector("tbody").appendChild($fragmento);
            $cajatotal.value = "";
            $cajatotal.value = total;
        } catch (err) {
            console.log(err.name); 
            console.log(err.message);
            console.log("error en busqueda por id")
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
