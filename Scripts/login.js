const D = document,
  $login = D.getElementById("formulario_login");

D.addEventListener("submit", async (e) => {
  if (e.target === $login) {
    e.preventDefault();
    try {
      let res = await fetch(`http://localhost:8080/usuarios/login/${e.target.input_usuario.value}/${e.target.input_password.value}`),
        json = await res.json();

      console.log(json);
      limpiar();
      window.location = "/vistas/inicio.html";

    } catch (error) {
      console.log("usuario no existe");
      limpiar();
      let borrar = confirm("Verifique el usuario y la contraseña ingresados y vuelva a intentarlo.");
    }
  }
});

//limpiar
function limpiar() {
  D.getElementById("usuario").value = "";
  D.getElementById("password").value = "";
}