const D = document,
$tabla = D.getElementById("tabla_ventas"), 
$template = D.getElementById("listado_ventas").content,
$buscar = D.getElementById("buscarVenta"),
$fragmento = D.createDocumentFragment(),
$codigo = D.getElementById("codigocliente").nodeValue,
//$totales = 0,
$templateTotales=D.getElementById("totales");

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
            //const totales = venta.total_venta + totales;
            
        }); 
        $tabla.querySelector("tbody").appendChild($fragmento);

    } catch (error) {
        console.log(err.name); 
        console.log(err.message);
        console.log("error en listar");
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

// totales 
/*D.addEventListener("click", async e =>{
    if (e.target.matches("#vertodos")){
        try {
            //const resume_table = document.getElementById("tabla_ventas");
            const tableRows = document.querySelectorAll('#tabla_ventas tr.filas');

            for(let i=1; i<tableRows.length; i++) {
                const row = tableRows[i];
                const total = row.querySelector('.valor');
                console.log('Estado: ', total.innerText);
                alert('Estado: ', total.innerText);
                
                // Para modificar un estado:
                // status.innerText = 'offline';
            };
        } catch (err){
            console.log(err.name);
            console.log(err.message);
            console.log("Error en totales");
        }
    };
}); */  


/*D.addEventListener("click", async e =>{
    if (e.target.matches("#vertodos")){
        try {
            let tot = 0;

            let celdasPrecio = D.querySelectorAll('td + td');

            for(let i = 0; i<celdasPrecio.length; i++){
                total += parseFloat(celdasPrecio[i].firstChild.data);
            }

            let nuevaFila = D.createElement('tr');

            let celdaTotal = D.createElement('td');
            let textoCeldaTotal = D.createTextNode('Total: ');
            celdaTotal.appendChild(textoCeldaTotal);
            nuevaFila.appendChild(celdaTotal);

            let celdaValorTotal = D.createElement('td');
            let textoCeldaValorTotal  = D.createTextNode(tot);
            celdaValorTotal.appendChild(textoCeldaValorTotal);
            nuevaFila.appendChild(celdaValorTotal);
            D.getElementById('tabla_ventas').appendChild(nuevaFila);
        } catch (err){
            console.log(err.name);
            console.log(err.message);
            console.log("Error en totales");
        }
    };
});   

    let tot = 0;

    let celdasPrecio = D.querySelectorAll('td + td');

    for(let i = 0; i<celdasPrecio.length; i++){
        total += parseFloat(celdasPrecio[i].firstChild.data);
    }

    let nuevaFila = D.createElement('tr');

    let celdaTotal = D.createElement('td');
    let textoCeldaTotal = D.createTextNode('Total: ');
    celdaTotal.appendChild(textoCeldaTotal);
    nuevaFila.appendChild(celdaTotal);

    let celdaValorTotal = D.createElement('td');
    let textoCeldaValorTotal  = D.createTextNode(tot);
    celdaValorTotal.appendChild(textoCeldaValorTotal);
    nuevaFila.appendChild(celdaValorTotal);

    D.getElementById('tabla_ventas').appendChild(nuevaFila);*/

/*D.addEventListener("click", async e =>{
    if (e.target.matches("#vertodos")){
        
        const datos = D.querySelector(".valor").textContent;
        console.log(datos);

        $tabla.querySelector("tbody").find("tr").each(function (idx, row) {
            if (idx > 0) {
                
                var datos = {};
                datos.totalVenta = ("td:eq(2)", row).text();
                //$totales = datos.totalVenta + $totales
                //alert("Total ventas: " + datos.totalVenta);
                console.log(datos);
            }
            
        });
        //$formulario.totalVentas.value = $totales;
   } 
});*/


/*D.addEventListener("click", async e =>{
    if (e.target.matches("#vertodos")){
        //let valores ="";

        //let variable = D.getElementsByTagName("td")[2].innerHTML;

        var x = D.getElementsByTagName("td");
        dato1 = x[1].innerHTML;
        alert(dato1);

    };

});*/
