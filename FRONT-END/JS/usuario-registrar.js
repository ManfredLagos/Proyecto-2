

const inputNombre = document.getElementById("txtNombre");
const inputApellidos = document.getElementById("txtApellidos");
const inputCorreo = document.getElementById("txtCorreo");
const inputUsuario = document.getElementById("txtUsuario");
const inputContrasenia = document.getElementById("txtContrasenia");
const inputRol = document.getElementById("txtRol");
const btnGuardar = document.getElementById("btnGuardar");

//Validar los campos requeridos

const inputsRequeridos = document.querySelectorAll("input[required]")

function validar(){
    console.log("Este es un mensaje de confirmación");
    let error = false;
    for(let i = 0; i < inputsRequeridos.length; i++){
        if(inputsRequeridos[i].value == ""){
            error = true;
        } 
    }
    if(error == false){
        registrarUsuario();
    }
}

function registrarUsuario(){
    const datosUsuario_mep = {
        nombre : inputNombre.value,
        apellidos : inputApellidos.value,
        correo : inputCorreo.value,
        usuario : inputUsuario.value,
        contrasenia : inputContrasenia.value,
        rol : "padre"
    }

    fetch("http://localhost:3000/usuario_mep", {
        method: "POST",
        headers:{
            "Content-Type":"Application/json"
        },
        body: JSON.stringify(datosUsuario_mep)
    }).then(response => {
        if(!response.ok){
            console.log("No se puede registrar el usuario");
        }else{
            console.log("Usuario registrado");
        }
    }).catch(error => {
        console.log(error);
    });
}

btnGuardar.addEventListener("click", validar);