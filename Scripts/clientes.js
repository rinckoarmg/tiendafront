const D = document,
$tabla = D.getElementById("tabla_clientes"), 
$template = D.getElementById("listado_clientes").content,
$fragmento = D.createDocumentFragment();

//metodo GET -listar
const listaC = async()=>{
    try {
        let res = await fetch("http://localhost:8080/clientes/listar"),
        json = await res.json();
        if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
        console.log(json);
        json.forEach(cliente => {
            $template.getElementById("cedula_cliente").textContent = cliente.cedula_cliente;
            $template.getElementById("direccion_cliente").textContent = cliente.direccion_cliente;
            $template.getElementById("email_cliente").textContent = cliente.email_cliente;
            $template.getElementById("nombre_cliente").textContent = cliente.nombre_cliente;
            $template.getElementById("telefono_cliente").textContent = cliente.telefono_cliente;
            $template.getElementById("eliminar_cliente").dataset.cedula_cliente = cliente.cedula_cliente;
            let $clone = D.importNode($template, true);
            $fragmento.appendChild($clone);
        }); 
        $tabla.querySelector("tbody").appendChild($fragmento);
    } catch (error) {
        let mensaje = err.statusText("Ocurrio un error");
    }
}
D.addEventListener("DOMContentLoaded",listaC);

// Metodo GET - Buscar 

// Metodo DELETE 
D.addEventListener("click", async e =>{
    if (e.target.matches("#eliminar_cliente")){
        let borrar = confirm(`Esta seguro de eliminar el cliente con cédula: ${e.target.dataset.cedula_cliente}?`);
        if (borrar){
            try {
                let datosC={
                    method:"DELETE",
                    headers:{
                        "Accept": 'application/json',
                        'Content-Type': 'application/json',
                    }
                },
                res=await fetch(`http://localhost:8080/clientes/eliminar/${e.target.dataset.cedula_cliente}`,datosC),
                json=await res.text();
                if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
                location.reload();
            } catch (error) {
                let mensaje=err.statusText("Ocurrio un error");
            }
        }
    }
})