const D = document,
$form = D.getElementById("datos_usuario").content;

$form.getElementById("InputCedula").textContent = usuario.cedula_usuario;
$form.getElementById("InputEmail").textContent = usuario.email_usuario;
$form.getElementById("InputNombre").textContent = usuario.nombre_usuario;
$form.getElementById("InputPassword").textContent = usuario.password;
$form.getElementById("InputUsuario").textContent = usuario.usuario;

D.addEventListener("click", async e =>{

});