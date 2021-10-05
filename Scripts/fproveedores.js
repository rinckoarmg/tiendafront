const D = document,
$formulario = D.getElementById("datos_proveedor");

D.addEventListener("submit", async e =>{
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
            } catch (error) {
                let mensaje=err.statusText("Ocurrio un error");
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
            } catch (error) {
                let mensaje=err.statusText("Ocurrio un error");
            }
        }
        
    }
});