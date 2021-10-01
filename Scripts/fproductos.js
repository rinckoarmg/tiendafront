const D = document,
$formulario = D.getElementById("datos_producto");

D.addEventListener("submit", async e =>{
    if (e.target === $formulario){
        e.preventDefault();
        if(!e.target.id.value){
            //metodo POST - Guardar
            try {
                let datosPr = {
                    method:"POST",
                    headers:{
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(
                        {
                            codigo_producto:e.target.InputCodigo.value,
                            ivacompra:e.target.InputIva.value,
                            nitproveedor:e.target.InputProveedor.value,
                            nombre_producto:e.target.InputNombre.value,
                            precio_compra:e.target.pCompra.value,
                            precio_venta:e.target.pVenta.value
                        }
                    )
                },
                res = await fetch("http://localhost:8080/productos/guardar", datosPr),
                json = await res.json();
                
                if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
                location.reload();
            } catch (error) {
                let mensaje=err.statusText("Ocurrio un error");
            }
        } else {
            //metodo PUT - actualizar
            try {
                let datosPr = {
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
                res=await fetch(`http://localhost:8080/productos/actualizar/${e.target.InputCodigo.value}`,datosPr),
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