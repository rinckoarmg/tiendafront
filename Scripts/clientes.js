const D = document,
$tabla = D.getElementById("tabla_clientes"), 
$template = D.getElementById("listado_clientes").content,
$fragmento = D.createDocumentFragment(),
$buscar = D.getElementById("buscarCliente"),
$codigo = D.getElementById("cedulaCliente").nodeValue,
$formulario = D.getElementById("datos_cliente");

//metodo GET listar
const listaC = async() => {
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

            $template.getElementById("modificar_cliente").dataset.cedula_cliente = cliente.cedula_cliente;
            $template.getElementById("modificar_cliente").dataset.direccion_cliente = cliente.direccion_cliente;
            $template.getElementById("modificar_cliente").dataset.email_cliente = cliente.email_cliente;
            $template.getElementById("modificar_cliente").dataset.nombre_cliente = cliente.nombre_cliente;
            $template.getElementById("modificar_cliente").dataset.telefono_cliente = cliente.telefono_cliente;

            let $clone = D.importNode($template, true);
            $fragmento.appendChild($clone);
        }); 
        $tabla.querySelector("tbody").appendChild($fragmento);
    } catch (error) {
        let mensaje = err.statusText("Ocurrio un error");
    }
}
D.addEventListener("DOMContentLoaded",listaC);

// Metodo GET by Id
D.addEventListener("submit", async (e) => {
    if (e.target == $buscar){
        $tabla.querySelector("tbody").textContent = "";
        e.preventDefault();
        try {
            let res = await fetch(`http://localhost:8080/clientes/buscar/${e.target.cedulaCliente.value}`),
            json = await res.json();
            if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
            console.log(json);
                $template.getElementById("cedula_cliente").textContent = json.cedula_cliente;
                $template.getElementById("direccion_cliente").textContent = json.direccion_cliente;
                $template.getElementById("email_cliente").textContent = json.email_cliente;
                $template.getElementById("nombre_cliente").textContent = json.nombre_cliente;
                $template.getElementById("telefono_cliente").textContent = json.telefono_cliente;
                let $clone = D.importNode($template, true);
                $fragmento.appendChild($clone);
            $tabla.querySelector("tbody").appendChild($fragmento);
        } catch (error) {
            let mensaje = err.statusText("Ocurrio un error");
        }
    }
    D.getElementById("cedulaCliente").value = "";
});

// Cargar listado
D.addEventListener("click", async e => {
    if (e.target.matches("#ver_todos")){
        $tabla.querySelector("tbody").textContent = "";
        listaC();
    }
});

// Metodo DELETE 
D.addEventListener("click", async e => {
    if (e.target.matches("#eliminar_cliente")){
        let borrar = confirm(`Esta seguro de eliminar el cliente con cédula: ${e.target.dataset.cedula_cliente}?`);
        if (borrar){
            try {
                let datosC = {
                    method:"DELETE",
                    headers: {
                        "Accept": 'application/json',
                        'Content-Type': 'application/json',
                    }
                },
                res = await fetch(`http://localhost:8080/clientes/eliminar/${e.target.dataset.cedula_cliente}`,datosC),
                json = await res.text();
                if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
                location.reload();
            } catch (error) {
                let mensaje = err.statusText("Ocurrio un error");
            }
        }
    }
});

// Guardar y Actualizar
D.addEventListener("submit", async e => {
    if (e.target === $formulario){
        e.preventDefault();
        if(!e.target.id.value){

            //metodo POST guardar
            try {
                let datosC = {
                    method:"POST",
                    headers:{
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(
                        {
                            cedula_cliente:e.target.InputCedula.value,
                            direccion_cliente:e.target.InputDireccion.value,
                            email_cliente:e.target.InputEmail.value,
                            nombre_cliente:e.target.InputNombre.value,
                            telefono_cliente:e.target.InputTelefono.value
                        }
                    )
                },
                res = await fetch("http://localhost:8080/clientes/guardar", datosC),
                json = await res.json();
                console.log(res);
                if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
                location.reload();
            } catch (error) {
                let mensaje = err.statusText("Ocurrio un error");
            }
        } else {

            //metodo PUT actualizar
            try {
                let datosU = {
                    method:"PUT",
                    headers:{
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(
                        {
                            cedula_cliente:e.target.InputCedula.value,
                            direccion_cliente:e.target.InputDireccion.value,
                            email_cliente:e.target.InputEmail.value,
                            nombre_cliente:e.target.InputNombre.value,
                            telefono_cliente:e.target.InputTelefono.value
                        }
                    )
                },
                res = await fetch(`http://localhost:8080/clientes/actualizar/${e.target.InputCedula.value}`,datosC),
                json = await res.json();
                console.log(res);
                if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
                location.reload();
            } catch (error) {
                let mensaje = err.statusText("Ocurrio un error");
            }
        }     
    }
});

D.addEventListener("click",async (e) => {
    if(e.target.matches("#modificar_cliente")){
        console.log("verificado");
        $formulario.InputCedula.value = e.target.dataset.cedula_cliente;
        $formulario.InputDireccion.value = e.target.dataset.direccion_cliente;
        $formulario.InputEmail.value = e.target.dataset.email_cliente;
        $formulario.InputNombre.value = e.target.dataset.nombre_cliente;
        $formulario.InputTelefono.value = e.target.dataset.telefono_cliente;
    }
});