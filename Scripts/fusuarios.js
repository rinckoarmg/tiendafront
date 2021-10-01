const D = document,
$formulario = D.getElementById("datos_usuario");

D.addEventListener("submit", async e =>{
    if (e.target === $formulario){
        e.preventDefault();
        if(!e.target.id.value){
            //metodo POST - Guardar
            try {
                let datosU = {
                    method:"POST",
                    headers:{
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(
                        {
                            cedula_usuario:e.target.InputCedula.value,
                            email_usuario:e.target.InputEmail.value,
                            nombre_usuario:e.target.InputNombre.value,
                            password:e.target.InputPassword.value,
                            usuario:e.target.InputUsuario.value
                        }
                    )
                },
                res = await fetch("http://localhost:8080/usuarios/guardar", datosU),
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
                let datosU = {
                    method:"PUT",
                    headers:{
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(
                        {
                            cedula_usuario:e.target.InputCedula.value,
                            email_usuario:e.target.InputEmail.value,
                            nombre_usuario:e.target.InputNombre.value,
                            password:e.target.InputPassword.value,
                            usuario:e.target.InputUsuario.value
                        }
                    )
                },
                res=await fetch(`http://localhost:8080/usuarios/actualizar/${e.target.InputCedula.value}`,datosU),
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