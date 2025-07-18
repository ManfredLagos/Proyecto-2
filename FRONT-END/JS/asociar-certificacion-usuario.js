const listaUsuarios = document.getElementById("sltUsuario");
const listaCertificaciones = document.getElementById("sltCertificacion");
const btnAsociar = document.getElementById("btnAsociar");

async function mostrarUsuarios() {
    fetch("http://localhost:3000/usuarios", {
        method: "GET",
        headers: {
            "Content-Type": "Application/json"
        }
    }).then(response => response.json())
    .then(data => {
        listaUsuarios.innerHTML = "";

        data.forEach(usuario =>{
            const nuevaOpcion = document.createElement("option");
            nuevaOpcion.value = usuario.cedula; // Guardar el dato de la cédula del usuario
            nuevaOpcion.textContent = usuario.nombre; 
            listaUsuarios.appendChild(nuevaOpcion);
        })
    })
};

async function mostrarCertificaciones(){
    fetch("http://localhost:3000/certificaciones", {
        method: "GET",
        headers: {
            "Content-Type": "Application/json"
        }
    }).then(response => response.json())
    .then(data => {        
        listaCertificaciones.innerHTML = ""; //Instrucción que limpia el select antes de cargar los usuarios   
        data.forEach(certificacion => {
            const nuevaOpcion = document.createElement("option"); // Crear dinámicamente cada opción del select
            nuevaOpcion.value = certificacion._id; // Guardar el dato del object id de la certificación
            nuevaOpcion.textContent = certificacion.nombre; // Mostrar el nombre de la certificación    
            listaCertificaciones.appendChild(nuevaOpcion);      
        })
    });
}


async function asociarCertificacion(){
    const datosCertificacionUsuario = {
        cedula: listaUsuarios.value, certificacionId : listaCertificaciones.value
    };
    fetch("http://localhost:3000/usuarios/agregar-certificacion", {
        method: "PUT",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(datosCertificacionUsuario)
    }).then(response => {
        if (!response.ok){
            console.log("No se pudo asociar la certificación");
        }
        else{
            console.log("Certificación asociada con éxito");
        }
    }).catch(error => {
        console.log(error);
    });
};

mostrarUsuarios();
mostrarCertificaciones();

btnAsociar.addEventListener("click", asociarCertificacion);