const D = document,
$tabla = D.getElementById("tabla_usuarios"), 
$template = D.getElementById("listado_usuarios").content,
$fragmento = D.createDocumentFragment(),
$buscar = D.getElementById("buscarUsuario"),
$codigo = D.getElementById("cedulaUsuario").nodeValue,
$formulario = D.getElementById("datos_usuario");

// Metodo GET listar
const listaU = async()=>{
    try {
        let res = await fetch("http://localhost:8080/usuarios/listar"),
        json = await res.json();
        if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
        console.log(json);
        json.forEach(usuario => {
            $template.getElementById("cedula_usuario").textContent = usuario.cedula_usuario;
            $template.getElementById("mail_usuario").textContent = usuario.email_usuario;
            $template.getElementById("nombre_usuario").textContent = usuario.nombre_usuario;
            $template.getElementById("password_usuario").textContent = usuario.password;
            $template.getElementById("usuario_usuario").textContent = usuario.usuario;
            $template.getElementById("eliminar_usuario").dataset.cedula_usuario = usuario.cedula_usuario;
            let $clone = D.importNode($template, true);
            $fragmento.appendChild($clone);
        }); 
        $tabla.querySelector("tbody").appendChild($fragmento);
    } catch (error) {
        let mensaje=err.statusText("Ocurrio un error");
    }
}
D.addEventListener("DOMContentLoaded",listaU);

// Metodo GET by Id
D.addEventListener("submit", async (e) =>{
    if (e.target==$buscar){
        $tabla.querySelector("tbody").textContent="";
        e.preventDefault();
        try {
            let res = await fetch(`http://localhost:8080/usuarios/buscar/${e.target.cedulaUsuario.value}`),
            json = await res.json(); 
            if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
            console.log(json);
                $template.getElementById("cedula_usuario").textContent = json.cedula_usuario;
                $template.getElementById("mail_usuario").textContent = json.email_usuario;
                $template.getElementById("nombre_usuario").textContent = json.nombre_usuario;
                $template.getElementById("password_usuario").textContent = json.password;
                $template.getElementById("usuario_usuario").textContent = json.usuario;
                let $clone = D.importNode($template, true);
                $fragmento.appendChild($clone);
            $tabla.querySelector("tbody").appendChild($fragmento);
        } catch (error) {
            let mensaje=err.statusText("Ocurrio un error");
        }
    }
    D.getElementById("cedulaUsuario").value = "";
})

// Cargar listado
D.addEventListener("click", async e =>{
    if (e.target.matches("#ver_todos")){
        $tabla.querySelector("tbody").textContent="";
        listaU();
    }
})

// Metodo DELETE 
D.addEventListener("click", async e =>{
    if (e.target.matches("#eliminar_usuario")){
        let borrar = confirm(`Esta seguro de eliminar el usuario con cédula: ${e.target.dataset.cedula_usuario}?`);
        if (borrar){
            try {
                let datosU={
                    method:"DELETE",
                    headers:{
                        "Accept": 'application/json',
                        'Content-Type': 'application/json',
                    }
                },
                res=await fetch(`http://localhost:8080/usuarios/eliminar/${e.target.dataset.cedula_usuario}`,datosU),
                json=await res.text();
                if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
                location.reload();
            } catch (error) {
                let mensaje=err.statusText("Ocurrio un error");
            }
        }
    }
})

// Guardar y actualizar
D.addEventListener("submit", async e =>{
    if (e.target === $formulario){
        e.preventDefault();
        if(!e.target.id.value){

            //metodo POST guardar
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