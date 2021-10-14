const D = document,
$tabla = D.getElementById("tabla_proveedores"), 
$template = D.getElementById("listado_proveedores").content,
$fragmento = D.createDocumentFragment(),
$buscar = D.getElementById("buscarProveedor"),
$codigo = D.getElementById("nitproveedor").nodeValue,
$formulario = D.getElementById("datos_proveedor");

//metodo GET listar
const listaP = async() => {
    try {
        let res = await fetch("http://localhost:8080/proveedores/listar"),
        json = await res.json();
        if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
        console.log(json);
        json.forEach(proveedor => {
            $template.getElementById("nitproveedor").textContent = proveedor.nitproveedor;
            $template.getElementById("ciudad_proveedor").textContent = proveedor.ciudad_proveedor;
            $template.getElementById("direccion_proveedor").textContent = proveedor.direccion_proveedor;
            $template.getElementById("nombre_proveedor").textContent = proveedor.nombre_proveedor;
            $template.getElementById("telefono_proveedor").textContent = proveedor.telefono_proveedor;
            $template.getElementById("eliminar_proveedor").dataset.nitproveedor = proveedor.nitproveedor;

            $template.getElementById("modificar_proveedor").dataset.nitproveedor = proveedor.nitproveedor; 
            $template.getElementById("modificar_proveedor").dataset.ciudad_proveedor = proveedor.ciudad_proveedor;
            $template.getElementById("modificar_proveedor").dataset.direccion_proveedor = proveedor.direccion_proveedor;
            $template.getElementById("modificar_proveedor").dataset.nombre_proveedor = proveedor.nombre_proveedor; 
            $template.getElementById("modificar_proveedor").dataset.telefono_proveedor = proveedor.telefono_proveedor;

            let $clone = D.importNode($template, true);
            $fragmento.appendChild($clone);
        }); 
        $tabla.querySelector("tbody").appendChild($fragmento);
    } catch (error) {
        console.log(err.name); 
        console.log(err.message);
    }
}
D.addEventListener("DOMContentLoaded",listaP);

// Metodo GET by Id
D.addEventListener("submit", async (e) => {
    if (e.target == $buscar){
        $tabla.querySelector("tbody").textContent = "";
        e.preventDefault();
        try {
            let res = await fetch(`http://localhost:8080/proveedores/buscar/${e.target.nitproveedor.value}`),
            json = await res.json(); 
            if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
            console.log(json);
                $template.getElementById("nitproveedor").textContent = json.nitproveedor;
                $template.getElementById("ciudad_proveedor").textContent = json.ciudad_proveedor;
                $template.getElementById("direccion_proveedor").textContent = json.direccion_proveedor;
                $template.getElementById("nombre_proveedor").textContent = json.nombre_proveedor;
                $template.getElementById("telefono_proveedor").textContent = json.telefono_proveedor;
                $template.getElementById("eliminar_proveedor").dataset.nitproveedor = json.nitproveedor;

                $template.getElementById("modificar_proveedor").dataset.nitproveedor = json.nitproveedor; 
                $template.getElementById("modificar_proveedor").dataset.ciudad_proveedor = json.ciudad_proveedor;
                $template.getElementById("modificar_proveedor").dataset.direccion_proveedor = json.direccion_proveedor;
                $template.getElementById("modificar_proveedor").dataset.nombre_proveedor = json.nombre_proveedor; 
                $template.getElementById("modificar_proveedor").dataset.telefono_proveedor = json.telefono_proveedor;

                let $clone = D.importNode($template, true);
                $fragmento.appendChild($clone);
            $tabla.querySelector("tbody").appendChild($fragmento);
        } catch (error) {
            alert("Proveedor Inexistente");
            D.getElementById("nitproveedor").value = "";
            console.log(err.name); 
            console.log(err.message);
        }
    }
    D.getElementById("nitproveedor").value = "";
});

// Cargar listado
D.addEventListener("click", async e => {
    if (e.target.matches("#ver_todos")){
        $tabla.querySelector("tbody").textContent = "";
        listaP();
    }
});

// Metodo DELETE 
D.addEventListener("click", async e => {
    if (e.target.matches("#eliminar_proveedor")){
        let borrar = confirm(`Esta seguro de eliminar el proveedor con Nit: ${e.target.dataset.nitproveedor}?`);
        if (borrar){
            try {
                let datosP = {
                    method:"DELETE",
                    headers:{
                        "Accept": 'application/json',
                        'Content-Type': 'application/json',
                    }
                },
                res = await fetch(`http://localhost:8080/proveedores/eliminar/${e.target.dataset.nitproveedor}`,datosP),
                json = await res.text();
                if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
                location.reload();
            } catch (error) {
                console.log(err.name); 
                console.log(err.message);
            }
        }
    }
});

// Guardar y actualizar 
D.addEventListener("submit", async e => {
    if (e.target === $formulario){
        e.preventDefault();
        if(!e.target.id.value){

            //metodo POST - Guardar
            try {
                let datosP = {
                    method:"POST",
                    headers:{
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(
                        {
                            nitproveedor:e.target.InputNit.value,
                            ciudad_proveedor:e.target.InputCiudad.value,
                            direccion_proveedor:e.target.InputDireccion.value,
                            nombre_proveedor:e.target.InputNombre.value,
                            telefono_proveedor:e.target.InputTelefono.value
                        }
                    )
                },
                res = await fetch("http://localhost:8080/proveedores/guardar", datosP),
                json = await res.json();
                console.log(res);
                if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
                location.reload();
                console.log("Proveedor CREADO");
                alert("Datos de proveedor guardados exitosamente");
            } catch (error) {
                console.log(err.name); 
                console.log(err.message);
            }
        } else {

            //metodo PUT - actualizar
            try {
                let datosP = {
                    method:"PUT",
                    headers:{
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(
                        {
                            nitproveedor:e.target.InputNit.value,
                            ciudad_proveedor:e.target.InputCiudad.value,
                            direccion_proveedor:e.target.InputDireccion.value,
                            nombre_proveedor:e.target.InputNombre.value,
                            telefono_proveedor:e.target.InputTelefono.value
                        }
                    )
                },
                res=await fetch(`http://localhost:8080/proveedores/actualizar/${e.target.InputNit.value}`,datosP),
                json = await res.json();
                console.log(res);
                if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
                location.reload();
                console.log("Proveedor MODIFICADO");
                alert("Datos de Proveedor Actualizados");
            } catch (error) {
                console.log(err.name); 
                console.log(err.message);
            }
        }
    }
});

D.addEventListener("click",async (e) => {
    if(e.target.matches("#modificar_proveedor")){
        console.log("Click en MODIFICAR");
        $formulario.InputNit.value = e.target.dataset.nitproveedor;
        $formulario.InputCiudad.value = e.target.dataset.ciudad_proveedor;
        $formulario.InputDireccion.value = e.target.dataset.direccion_proveedor;
        $formulario.InputNombre.value = e.target.dataset.nombre_proveedor;
        $formulario.InputTelefono.value = e.target.dataset.telefono_proveedor;
    }
});