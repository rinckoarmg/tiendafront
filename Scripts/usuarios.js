const D = document,
$tabla = D.getElementById("tabla_usuarios"), 
$template = D.getElementById("listado_usuarios").content,
$fragmento = D.createDocumentFragment();

//metodo GET - listar
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
// Metodo GET - Buscar 


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
