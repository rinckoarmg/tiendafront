const D = document,
$formulario = D.getElementById("datos_cliente");

D.addEventListener("submit", async e =>{
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
                let mensaje=err.statusText("Ocurrio un error");
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
                res=await fetch(`http://localhost:8080/clientes/actualizar/${e.target.InputCedula.value}`,datosC),
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