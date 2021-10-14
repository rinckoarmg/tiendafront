const D = document,
$tabla = D.getElementById("tabla_productos"), 
$template = D.getElementById("listado_productos").content,
$fragmento = D.createDocumentFragment(),
$buscar = D.getElementById("buscarProducto"),
$codigo = D.getElementById("codigoProducto").nodeValue,
$formulario = D.getElementById("datos_producto");

// Metodo GET listar
const listaPr = async() => {
    try {
        let res = await fetch("http://localhost:8080/productos/listar"),
        json = await res.json();
        if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
        console.log(json);
        json.forEach(producto => {
            $template.getElementById("codigo_producto").textContent = producto.codigo_producto;
            $template.getElementById("iva_compra").textContent = producto.ivacompra;
            $template.getElementById("nit_proveedor").textContent = producto.nitproveedor.nitproveedor;
            $template.getElementById("nombre_producto").textContent = producto.nombre_producto;
            $template.getElementById("precio_compra").textContent = producto.precio_compra;
            $template.getElementById("precio_venta").textContent = producto.precio_venta;
            $template.getElementById("eliminar_producto").dataset.codigo_producto = producto.codigo_producto;

            $template.getElementById("modificar_producto").dataset.codigo_producto = producto.codigo_producto;
            $template.getElementById("modificar_producto").dataset.iva_compra = producto.ivacompra;
            $template.getElementById("modificar_producto").dataset.nit_proveedor = producto.nitproveedor.nitproveedor;
            $template.getElementById("modificar_producto").dataset.nombre_producto = producto.nombre_producto;
            $template.getElementById("modificar_producto").dataset.precio_compra = producto.precio_compra;
            $template.getElementById("modificar_producto").dataset.precio_venta = producto.precio_venta;

            let $clone = D.importNode($template, true);
            $fragmento.appendChild($clone);
        }); 
        $tabla.querySelector("tbody").appendChild($fragmento);
    } catch (err) {
        console.log(err.name); 
        console.log(err.message);
    }
}
D.addEventListener("DOMContentLoaded",listaPr);

// Metodo GET by Id
D.addEventListener("submit", async (e) => {
    if (e.target == $buscar){
        $tabla.querySelector("tbody").textContent = "";
        e.preventDefault();
        try {
            let res = await fetch(`http://localhost:8080/productos/buscar/${e.target.codigoProducto.value}`),
            json = await res.json(); 
            if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
            console.log(json);
                $template.getElementById("codigo_producto").textContent = json.codigo_producto;
                $template.getElementById("iva_compra").textContent = json.ivacompra;
                $template.getElementById("nit_proveedor").textContent = json.nitproveedor.nitproveedor;
                $template.getElementById("nombre_producto").textContent = json.nombre_producto;
                $template.getElementById("precio_compra").textContent = json.precio_compra;
                $template.getElementById("precio_venta").textContent = json.precio_venta;
                $template.getElementById("eliminar_producto").dataset.codigo_producto = json.codigo_producto;

                $template.getElementById("modificar_producto").dataset.codigo_producto = json.codigo_producto;
                $template.getElementById("modificar_producto").dataset.iva_compra = json.ivacompra;
                $template.getElementById("modificar_producto").dataset.nit_proveedor = json.nitproveedor.nitproveedor;
                $template.getElementById("modificar_producto").dataset.nombre_producto = json.nombre_producto;
                $template.getElementById("modificar_producto").dataset.precio_compra = json.precio_compra;
                $template.getElementById("modificar_producto").dataset.precio_venta = json.precio_venta;

                let $clone = D.importNode($template, true);
                $fragmento.appendChild($clone);
            $tabla.querySelector("tbody").appendChild($fragmento);
        } catch (err) {
            alert("Producto Inexistente");
            D.getElementById("codigoProducto").value = "";
            console.log(err.name); 
            console.log(err.message);
        }
    }
    D.getElementById("codigoProducto").value = "";
});

// Cargar listado
D.addEventListener("click", async e => {
    if (e.target.matches("#ver_todos")){
        $tabla.querySelector("tbody").textContent = "";
        listaPr();
    }
});

// Metodo DELETE
D.addEventListener("click", async e => {
    if (e.target.matches("#eliminar_producto")){
        let borrar = confirm(`Esta seguro de eliminar el producto con cédula: ${e.target.dataset.codigo_producto}?`);
        if (borrar){
            try {
                let datosPr = {
                    method:"DELETE",
                    headers:{
                        "Accept": 'application/json',
                        'Content-Type': 'application/json',
                    }
                },
                res = await fetch(`http://localhost:8080/productos/eliminar/${e.target.dataset.codigo_producto}`,datosPr),
                json = await res.text();
                if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
                location.reload();
            } catch (err) {
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
                            nitproveedor:{
                                nitproveedor:e.target.nitproveedor.value,
                                ciudad_proveedor:e.target.ciudad_proveedor,
                                direccion_proveedor:e.target.direccion_proveedor,
                                nombre_proveedor:e.target.nombre_proveedor,
                                telefono_proveedor:e.target.telefono_proveedor
                            },
                            nombre_producto:e.target.InputNombre.value,
                            precio_compra:e.target.pCompra.value,
                            precio_venta:e.target.pVenta.value
                        }
                    )
                },
                res = await fetch("http://localhost:8080/productos/guardar", datosPr),
                json = await res.json();
                console.log(res);
                if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
                location.reload();
                console.log("Producto CREADO");
                alert("Datos de producto guardados exitosamente");
            } catch (err) {
                console.log(err.name); 
                console.log(err.message);
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
                            codigo_producto:e.target.InputCodigo.value,
                            ivacompra:e.target.InputIva.value,
                            nitproveedor: {
                                nitproveedor:e.target.nitproveedor.value,
                                ciudad_proveedor:e.target.ciudad_proveedor,
                                direccion_proveedor:e.target.direccion_proveedor,
                                nombre_proveedor:e.target.nombre_proveedor,
                                telefono_proveedor:e.target.telefono_proveedor
                            },
                            nombre_producto:e.target.InputNombre.value,
                            precio_compra:e.target.pCompra.value,
                            precio_venta:e.target.pVenta.value
                        }
                    )
                },
                res = await fetch(`http://localhost:8080/productos/actualizar/${e.target.InputCodigo.value}`,datosPr),
                json = await res.json();
                console.log(res);
                if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
                location.reload();
            } catch (err) {
                console.log(err.name); 
                console.log(err.message);
            }
        }
    }
});

// Buscar proveedor
D.addEventListener("submit", async (e) => {
    if (e.target === $formulario){
        e.preventDefault();
        try {
            let res = await fetch(`http://localhost:8080/proveedores/buscar/${e.target.nitproveedor.value}`),
            json = await res.json(); 
            if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
            console.log(json);
        } catch (err) {
            let mensaje = err.statusText("Ocurrio un error");
        }
    }
    D.getElementById("nitproveedor").value = "";
});

//traer datos a formulario
D.addEventListener("click",async (e) => {
    if(e.target.matches("#modificar_producto")){
        console.log("Click en MODIFICAR");
        $formulario.InputCodigo.value = e.target.dataset.codigo_producto;
        $formulario.InputIva.value = e.target.dataset.iva_compra;
        $formulario.nitproveedor.value = e.target.dataset.nit_proveedor;
        $formulario.InputNombre.value = e.target.dataset.nombre_producto;
        $formulario.pCompra.value = e.target.dataset.precio_compra;
        $formulario.pVenta.value = e.target.dataset.precio_venta;
    }
});

// cargar csv
let area = document.getElementById('area');

area.addEventListener('dragover', e => e.preventDefault());
area.addEventListener('drop', readFile);

function readFile (e) {
  e.preventDefault();
  let file = e.dataTransfer.files[0];
  
  if (file.type == "application/vnd.ms-excel" || file.type == "text/plain" || file.type == "text/csv" || file.type == 'text/tsv') {
    let reader = new FileReader();
    reader.onloadend = () => printFileContents(reader.result);
    reader.readAsText(file, 'UTF-8');
    alert('Archivo Cargado Exitosamente');
  } else {
    alert('Archivo no válido, verifique tipo de archivo');
  }
}

function printFileContents (contents) {
    area.style.lineHeight = '30px';
    area.textContent = '';
    let lines = contents.split(/\r\n/);
    console.log(lines);
    lines.forEach(async line => {
        let elemento = line.split(",");
        console.log(elemento);
        let cod = elemento[0],
        iva = elemento[1],
        nit = elemento[2],
        nombre = elemento[3],
        precioc = elemento[4],
        preciov = elemento[5];

        // buscar datos del proveedor
        try {
            let res = await fetch(`http://localhost:8080/proveedores/buscar/${nit}`),
            json = await res.json();
            if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
            console.log(json);

            //guardar los datos 
            try {
                let datosProv = {
                    method: "POST",
                    headers: {
                        "Accept": 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            codigo_producto: cod,
                            ivacompra: iva,
                            nitproveedor: {
                                nitproveedor: nit,
                                ciudad_proveedor: json.ciudad_proveedor,
                                direccion_proveedor: json.direccion_proveedor,
                                nombre_proveedor: json.nombre_proveedor,
                                telefono_proveedor: json.telefono_proveedor
                            },
                            nombre_producto: nombre,
                            precio_compra: precioc,
                            precio_venta: preciov
                        }
                    )
                },
                res = await fetch("http://localhost:8080/productos/guardar", datosProv);
                console.log(res);
                if (!res.ok) throw{status:res.status,statusText:res.statusText}; 
                location.reload();
            } catch (err) {
                console.log(err.name); 
                console.log(err.message);
                alert("Error, verifique los datos del producto:"+" '"+nombre+"'");
            }
        } catch (err) {
            console.log(err.name); 
            console.log(err.message);
            console.log("error en busqueda proveedor");
            alert("Por favor verifique los datos proveedor del producto:"+" '"+nombre+"'");
        }
    });
}