const D = document,
$tabla = D.getElementById("tabla_clientes"), 
$template = D.getElementById("clientes_template").content,
$fragmento = D.createDocumentFragment(),
$buscar=D.getElementById("buscar_cliente");


//metodo buscar cliente

D.addEventListener("submit", async (e) => {
    if (e.target === $buscar) {
      e.preventDefault();
  
      try {
        let res = await fetch(`http://localhost:8080/clientes/buscar/${e.target.numero_cedula.value}`),
          json = await res.json();
          console.log(e.target.numero_cedula.value);
  
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        console.log(json);
        
        
          $template.getElementById("cedula_cliente").textContent =json.cedula_cliente;
          $template.getElementById("nombre_cliente").textContent =
            json.nombre_cliente;
          $template.getElementById("correo_cliente").textContent =
            json.email_cliente;
          $template.getElementById("telefono_cliente").textContent =
            json.telefono_cliente;
          $template.getElementById("direccion_cliente").textContent =
            json.direccion_cliente;
  
          let $clone = D.importNode($template, true);
          $fragmento.appendChild($clone);
        
        $tabla.querySelector("tbody").appendChild($fragmento);
  
      } catch (error) {
        console.log(error);
      }
    }
  });
  