//inicio Aplicación

let miSistema = new Sistema();
miSistema.preCargarCensistas(); // Precarga Censistas - tiene que ir antes de los censos ya que se asignan a las precargas de personas
miSistema.preCargarCensosIngresados(); // Precarga Censos


function eventos() {
    document.querySelector("#btnIngresoInvitado").addEventListener("click", inciarCensoPersona);
    document.querySelector("#btnValidaCINuevoIngresoPersona").addEventListener("click",ingresoCedulaPersona);
    document.querySelector("#btnValidaNuevoIngreso").addEventListener("click",cargaCensoPersona);
    document.querySelector("#btnEditarCargaPersona").addEventListener("click",modificarCensoPersonaUI);
    document.querySelector("#btnModificaPrecargadoPersona").addEventListener("click",confirmarCensoPrecargadoPersonaUI);
    document.querySelector("#btnEliminarCargaPersona").addEventListener("click",eliminarCensoUI);
    document.querySelector("#btnEstadisticasInvitado").addEventListener("click",estadisticasInvitadoUI);
    
    document.querySelector("#btnVolverMenuInicial").addEventListener("click",menuInicial);
    
    document.querySelector("#btnRegistroCensista").addEventListener("click",ingresaRegistroCensista);
    document.querySelector("#btnGeneraCensista").addEventListener("click",registroCensista);
    document.querySelector("#btnLogCensista").addEventListener("click", inciarCensista);
    document.querySelector("#btnIngresaCensista").addEventListener("click", loginUIcensista);
    document.querySelector("#btnCerrarSesionCensista").addEventListener("click", cerrarCesionCensista);
    document.querySelector("#btnIngresarNuevoCenso").addEventListener("click", inciarCensoPersona);
    //botones menu censista
    document.querySelector("#btnMenuCensista").addEventListener("click", menuCensista);
    document.querySelector("#btnMostrarCensosPrecargados").addEventListener("click", mostrarTablaCensosPendientesUI);
    document.querySelector("#btnIngresaCIPrecargado").addEventListener("click", mostrarCensoPendienteSegunCI);
    document.querySelector("#btnModificaPrecargado").addEventListener("click", modificarCensoUI);
    document.querySelector("#btnValidaPrecargado1").addEventListener("click", validarCensoUI1);
    document.querySelector("#btnValidaPrecargado2").addEventListener("click", validarCensoUI2);
    document.querySelector("#btnReasignarPersona").addEventListener("click", mostrarReasignarCensistaUI);
    document.querySelector("#btnReasignaPrecargado").addEventListener("click", reasignarCensoEntreCensistas);
    document.querySelector("#btnInfoEstadistica").addEventListener("click", mostrarEstadisticasCensista);
    document.querySelector("#selectDeptoEstadisticaCensista").addEventListener("change", mostrarMenoresYMayoresPorDepto);
    
}
eventos();


// todo oculto menos menú incial al iniciar aplicación
function menuInicial(){ 
    document.querySelector("#divContenedor").style.display = "none"; 
    document.querySelector("#txtCIPersona").value = ""; //borra en Ingreso Censo como persona (valida cedula)
    document.querySelector("#pMensajeIngresoCensista").innerHTML = ""; //borra msj de error al iniciar sesion
    document.querySelector("#pMensajeValidacionIngreso").innerHTML = ""; //borra en Ingreso Censo como persona (valida cedula)
    document.querySelector("#txtNombreNuevoCenso").value = "" //borra en campos de ingresoNuevoCensoPersona
    document.querySelector("#txtApellidoNuevoCenso").value= "" //borra en campos de ingresoNuevoCensoPersona
    document.querySelector("#txtEdadNuevoCenso").value= "" //borra en campos de ingresoNuevoCensoPersona
    document.querySelector("#selectDptoNuevoIngreso").value = "error" //borra en campos de ingresoNuevoCensoPersona
    document.querySelector("#selectOcupacionNuevoIngreso").value=  "error" //borra en campos de ingresoNuevoCensoPersona
    document.querySelector("#txtNombreCensista").value=  "" //borra en campos de ingresoNuevoCensoPersona
    document.querySelector("#txtUsuarioCensista").value=  "" //borra en campos de ingresoNuevoCensoPersona
    document.querySelector("#txtPasswordCencista").value=  "" //borra en campos de ingresoNuevoCensoPersona
    document.querySelector("#txtIngresoUsuarioCensista").value=  "" //borra en campos de divLogCensista
    document.querySelector("#txtIngresoPasswordCencista").value=  "" //borra en campos de divLogCensista
    document.querySelector("#divMensajeIngresoCenso").innerHTML = "" //borra en campos de divMensajeIngresoCenso
    document.querySelector("#pMensajeEliminaCargaPersona").innerHTML = "" //borra en campos el eliminar
    document.querySelector("#pMensajeModificaPersona").innerHTML = "" //borra en campos al modificar
    document.querySelector("#pMensajeEliminaCargaPersona").innerHTML = "" ; //borra campo al eliminar censo persona    
    document.querySelector("#pModificaPersonaError").innerHTML = "" // borra si hay error al modificar persona
    mostrarDiv("divMenuInicial");
}
menuInicial(); // se ejecuta al inciar


function menuCensista(){    //Muestra Menu Censista una vez logueado (por login o registro)
    //ocultar los divs del interior
    ocultarTodosLosDivXclase(".claseCensista");
    ocultarTodosLosDivXclase(".clasePersona");
    
    ocultarDiv("divContenedor");
    mostrarDiv("divContenedor");
    mostrarDiv("divMenuCensista");
    //ocultarDiv("divRegistroCensista");
    
    mostrarDiv("divLogCensistaCerrarSesion");
    document.querySelector("#divMensajeIngresoCenso").innerHTML = "" ;//borra en campos de divMensajeIngresoCenso
    document.querySelector("#txtCIPersona").value = ""; //borra en Ingreso Censo como persona (valida cedula)
    document.querySelector("#divValidaCensoPrecargado").innerHTML = "";
    document.querySelector("#pMostrarDatosCensosPrecargado").innerHTML = "";
    document.querySelector("#pMostrarPersonaPrecargada").innerHTML = "";
    document.querySelector("#pMensajeValidacionIngreso").innerHTML = "";
}


console.log("Lista censados: ", miSistema.censados); 
console.log(miSistema.listaCensistas);
console.log("Censista logueado inicial " + miSistema.censistaLogueado); // censistal logueado






/* ------------------------------PERFIL PERSONA--------------------------------------------- */
/* ------------------------------------------------------------------------------------------ */

// Ingreso a un censo (Persona o Censista)
function inciarCensoPersona(){
    mostrarDiv("divContenedor");
    
    ocultarTodosLosDivXclase(".claseCensista");   //obtengo todos los objetos que son de censista para ocultarlos   
    ocultarDiv("divMenuInicial");
    
    ocultarTodosLosDivXclaseMenosUno(".clasePersona",divValidaCedulaInvitado);
    mostrarDiv("divInicioCensoPersona");
    
    ocultaOMuestraBotonMenuInicial();
}

// mantiene cédula grabada en sistema
let cedulaIngresadaPersona = "";

//Ingresa cédula para validar previo a la carga del censo
function ingresoCedulaPersona(){ 
    let mensaje = "";
    let cedula = document.querySelector("#txtCIPersona").value;
    let carCedula = cedula.trim().length;
    let cedulaNum = miSistema.transformaFormatoCedula(cedula);
    if(carCedula > 0){
        if(miSistema.validaDigitoCedula(cedula)){
            cedulaIngresadaPersona = miSistema.transformaFormatoCedula(cedula);
            console.log(`CI de persona: ${cedulaIngresadaPersona}`)
            //si esta pendiente de validar:
            if(miSistema.verificaCedulaYaIngresadaPendienteValidacion(cedulaNum)){
                mostrarDiv("divModificaOEliminaPersona");
                let posicion = miSistema.posicionEnListaPersonas(miSistema.censados,cedulaNum);
                mensaje = `El censo ya fue registrado y se encuentra pendiente de validación. <br> <br><br> 
                Los datos ingresados son: <br> <br>`;
                mensaje += miSistema.mostrarInformacionCensadoPendiente(posicion);  // la cédula tiene un censo ingresado pendiente de validar (puede eliminar o modificar)
                
                //si ya fue validado:
            }else if(miSistema.verificaCedulaYaIngresadaValidada(cedulaNum)){
                mensaje = "El censo ya fue registrado (cargado y validado)";
                
                //else, ingresar censo    
            }else{      
                ingresoNuevoCensoPersona();     //muestra formulario
            }
            
        }else{
            mensaje = "Cédula ingresada no es válida";
        }
    }else{
        mensaje = "Campo vacío, debe ingresar una cédula";
    }
    
    
    document.querySelector("#pMensajeValidacionIngreso").innerHTML = mensaje;
    
}

// Muestra formulario para ingresar a censo
function ingresoNuevoCensoPersona(){ 
    ocultarDiv("divContenedor");
    mostrarDiv("divContenedor");
    
    ocultarTodosLosDivXclase(".claseCensista");      //obtengo todos los objetos que son de censista para ocultarlos   
    
    // select departamentos para html
    let deptoSelect = `<option value="error"> Seleccione... </option>`;
    for (let i = 0; i < miSistema.listaDepartamentos.length; i++) {
        let deptoX = miSistema.listaDepartamentos[i]; 
        
        deptoSelect += `<option value="${deptoX}"> ${deptoX.toUpperCase()} </option>`; // lleva el nombre del depto
        
    }
    
    document.querySelector("#selectDptoNuevoIngreso").innerHTML = deptoSelect;
    
    
    ocultarDiv("btnConfirmarDatosModificaCensoPersona");
    
    ocultarTodosLosDivXclaseMenosUno(".clasePersona",divIngresoNuevoCenso)
    
    console.log("Lista censados: ", miSistema.censados); 
    
    ocultaOMuestraBotonMenuInicial();
    
    document.querySelector("#pNroCedulaIngresado").innerHTML = cedulaIngresadaPersona;
    
}


// Valida información cargada y graba la información en array "censados"
function cargaCensoPersona(){
    let nombre = document.querySelector("#txtNombreNuevoCenso").value.toLowerCase();
    let apellido = document.querySelector("#txtApellidoNuevoCenso").value.toLowerCase();
    let edad = document.querySelector("#txtEdadNuevoCenso").value;
    let departamento = document.querySelector("#selectDptoNuevoIngreso").value;
    let ocupacion = document.querySelector("#selectOcupacionNuevoIngreso").value;
    let cedula = cedulaIngresadaPersona;
    let mensaje = "";
    
    if(!miSistema.validaTexto(nombre) || !miSistema.validaTexto(apellido) ||  !miSistema.validaEdad(edad) || departamento === "error" || ocupacion === "error" ){
        if(ocupacion === "error"){
            mensaje = "Debe seleccionar una ocupación";
        }if(departamento === "error"){
            mensaje = "Debe seleccionar un departamento";
        }if(!miSistema.validaEdad(edad)){
            mensaje = "Debe ingresar una Edad entre 0 al 130";    
        }if(!miSistema.validaTexto(apellido)){
            mensaje = "Debe ingresar información en el Apellido";
        }if(!miSistema.validaTexto(nombre)){
            mensaje = "Debe ingresar información en el Nombre";
        }
        
    }else{console.log("entre al else");
    
    if(miSistema.censistaLogueado !== null){ // si está logueado el censista, se guarda validado (valido = true) y se asigna a el
        miSistema.guardaCensoValido(cedula,nombre,apellido,edad,departamento,ocupacion,miSistema.censistaLogueado.id);
        mensaje = `El censo de ${nombre.toUpperCase()} ${apellido.toUpperCase()} fue ingresado correctamente`;
        
    }else{ //si no está logueado el censista, es un ingreso de invitado (queda pendiente de validación)
        miSistema.guardaCensoIncial(cedula,nombre,apellido,edad,departamento,ocupacion);
        let personaX=miSistema.obtenerPersona(cedula);
        let censistaAsignado=personaX.Censista;
        mensaje = `Gracias <b>${nombre.toUpperCase()} ${apellido.toUpperCase()}</b>! Su censo fue ingresado correctamente`;
        mensaje+=`<br><br>Censista asignado para visita a domicilio: <b>${censistaAsignado.nombreCompleto.toUpperCase()}</b> con <b>ID ${censistaAsignado.id}</b>`;
    }
    
    console.log(miSistema.censados);
    ocultaOMuestraBotonMenuInicial();
    ocultarDiv('divIngresoNuevoCenso');
    }
    document.querySelector("#divMensajeIngresoCenso").innerHTML = mensaje;
}

//click al boton editar censo como PERSONA (INVITADO)
function modificarCensoPersonaUI(){
    ocultarDiv("divValidaCedulaInvitado");
    ocultarDiv("btnValidaNuevoIngreso");
    ocultarDiv("divIngresoNuevoCenso");
    mostrarDiv("divModificaCensoPrecargadoPersona");
    
    
    // select departamentos para html
    let deptoSelect = `<option value="error"> Seleccione... </option>`;
    for (let i = 0; i < miSistema.listaDepartamentos.length; i++) {
        let deptoX = miSistema.listaDepartamentos[i]; 
        
        deptoSelect += `<option value="${deptoX}"> ${deptoX.toUpperCase()} </option>`; // lleva el nombre del depto
        
    }
    
    document.querySelector("#selectModificaDptoPersona").innerHTML = deptoSelect;
    
    
    
    let cedula = document.querySelector("#txtCIPersona").value;
    let cedulaNum = miSistema.transformaFormatoCedula(cedula);
    
    let personaX=miSistema.obtenerPersona(cedulaNum); 

    
    
    if(!miSistema.existePersonaEnListaCensadosValidos(cedulaNum)){      //si esta pendiente de validar
        let nombre = personaX.nombre.toUpperCase();   
        let apellido=personaX.apellido.toUpperCase(); 
        let edad=personaX.edad;
        let departamento=personaX.departamento;
        let ocupacion=personaX.ocupacion;

    
        document.querySelector("#txtModificaNombrePrecargadoPersona").value = nombre;
        document.querySelector("#txtModificaApellidoPrecargadoPersona").value = apellido;
        document.querySelector("#txtModificaEdadPrecargadoPersona").value = edad;
        document.querySelector("#selectModificaDptoPersona").value = departamento;
        document.querySelector("#selectModificaOcupacionPersona").value = ocupacion;
    }
    document.querySelector("#divModificaCensoTitulo").innerHTML=`<b>Modificar censo CI: ${cedulaNum} </b><br><br>`;
    
}

//click al boton confirmar datos censo como PERSONA (INVITADO)
function confirmarCensoPrecargadoPersonaUI(){
    let cedula = document.querySelector("#txtCIPersona").value;
    let cedulaNum = miSistema.transformaFormatoCedula(cedula);
    let nombre = document.querySelector("#txtModificaNombrePrecargadoPersona").value;
    let apellido = document.querySelector("#txtModificaApellidoPrecargadoPersona").value;
    let edad = document.querySelector("#txtModificaEdadPrecargadoPersona").value;
    let departamento = document.querySelector("#selectModificaDptoPersona").value;
    let ocupacion = document.querySelector("#selectModificaOcupacionPersona").value;
    let mensajeError = "";
    
    //modifica datos, mantiene cédula, censista y pendiente de validar (false)

    if(!miSistema.validaTexto(nombre) || !miSistema.validaTexto(apellido) ||  !miSistema.validaEdad(edad) || departamento === "error" || ocupacion === "error" ){
        if(ocupacion === "error" || ocupacion ==""){
            mensajeError = "Debe seleccionar una ocupación";
        }if(departamento === "error" || departamento ==""){
            mensajeError = "Debe seleccionar un departamento";
        }if(!miSistema.validaEdad(edad)){
            mensajeError = "Debe ingresar una Edad entre 0 al 130";    
        }if(!miSistema.validaTexto(apellido)){
            mensajeError = "Debe ingresar información en el Apellido";
        }if(!miSistema.validaTexto(nombre)){
            mensajeError = "Debe ingresar información en el Nombre";
        }
        document.querySelector("#pModificaPersonaError").innerHTML = mensajeError;

    }else{
        miSistema.modificaCensoIncial(cedulaNum,nombre,apellido,edad,departamento,ocupacion);
    console.log(miSistema.censados);
    ocultaOMuestraBotonMenuInicial();
    let personaX=miSistema.obtenerPersona(cedula);
    let censistaAsignado=personaX.Censista;
    mensaje = `Gracias <b>${nombre.toUpperCase()} ${apellido.toUpperCase()}</b>! Su censo fue ingresado correctamente`;
    mensaje+=`<br><br>Censista asignado para visita a domicilio: <b>${censistaAsignado.nombreCompleto.toUpperCase()}</b> con <b>ID ${censistaAsignado.id}</b>`
   
    ocultarDiv('divIngresoNuevoCenso');
    ocultarDiv('divModificaCensoPrecargadoPersona');
    ocultarDiv('divModificaOEliminaPersona');
    mostrarDiv('pMensajeModificaPersona');
    ocultarDiv('divModificaCensoPrecargadoPersona');
    
    document.querySelector("#pMensajeModificaPersona").innerHTML = mensaje
    }

    
}

// eliminar censo por ingreso por persona
function eliminarCensoUI() {
    let mensaje = "";
    let cedula = miSistema.transformaFormatoCedula(cedulaIngresadaPersona);
    let personaX=miSistema.obtenerPersona(cedula);
    
    if (miSistema.eliminarCenso(cedula)) {
        ocultarDiv('divInicioCensoPersona');
        ocultarDiv('divModificaOEliminaPersona');
        mostrarDiv('pMensajeEliminaCargaPersona');
        mensaje = `Se eliminó correctamente el censo de <b>${personaX.nombre.toUpperCase()} ${personaX.apellido.toUpperCase()}</b>`;
        
    } else {
        mensaje = "Error al eliminar datos de persona";
    }
    document.querySelector("#pMensajeEliminaCargaPersona").innerHTML = mensaje;
    //mostrarTablasEliminarVentasUI(); no llego a ver el mensaje de respuesta.
}

// estadisticas para el invitado (persona)
function estadisticasInvitadoUI(){
    ocultarDiv("divMenuInicial");
    mostrarDiv("divContenedor");
    ocultarTodosLosDivXclase(".claseCensista");
    ocultarTodosLosDivXclaseMenosUno(".clasePersona",divMostrarTablaInvitado)
    
    if (miSistema.censados.length>0){
        mensaje = "Personas censadas hasta el momento (validadas y no validadas) <br> <br>";
        mensaje += miSistema.listaCensados();      //muestra tabla
    }else{
        mensaje=`No figuran censos en el sistema`;
    }
    
    document.querySelector("#divMostrarTablaInvitado").innerHTML = mensaje;
    ocultaOMuestraBotonMenuInicial();
}


/* ------------------------------PERFIL CENSISTA--------------------------------------------- */
/* ------------------------------------------------------------------------------------------ */

//click "Iniciar sesión como Censista"
function inciarCensista() {
    mostrarDiv("divContenedor");
    ocultarTodosLosDivXclase(".clasePersona");
    ocultarTodosLosDivXclaseMenosUno(".claseCensista",divLogCensista)
    ocultarDiv('divMenuInicial');
    ocultaOMuestraBotonMenuInicial();
}

// funcion para log in de Censista
function loginUIcensista() {
    let mensaje = "";
    let usuario = document.querySelector("#txtIngresoUsuarioCensista").value.toLowerCase();
    let pass = document.querySelector("#txtIngresoPasswordCencista").value;
    if (miSistema.validaTexto(usuario) && miSistema.validaTexto(pass)) {
        if (miSistema.login(usuario, pass)) {
            //muestro opciones del censista
            ocultarDiv("divLogCensista");
            mostrarDiv("divMenuCensista");
            ocultarDiv("divMenuInicial");
            ocultarDiv("divVolverAMenuInicial");
            mostrarDiv("divLogCensistaCerrarSesion");
            document.querySelector("#headerMenuCensista").innerHTML = `Hola, ${usuario.toUpperCase()}`;
            console.log("Censista logueado:" + miSistema.censistaLogueado.usuario); // censistal logueado
            
        } else {
            mensaje = `Verifique usuario y/o contrasena.`;
        }
    } else {
        mensaje = ` Debe ingresar usuario y contrasena.`;
    }
    document.querySelector("#pMensajeIngresoCensista").innerHTML = mensaje;
}

function ingresaRegistroCensista(){
    ocultarDiv("divContenedor");
    mostrarDiv("divContenedor");
    ocultarDiv("divMenuInicial");
    
    //ocultar los divs del interior
    ocultarTodosLosDivXclase(".claseCensista");
    ocultarTodosLosDivXclase(".clasePersona");
    
    mostrarDiv("divRegistroCensista");

    ocultaOMuestraBotonMenuInicial();
}

function registroCensista(){
    ocultarDiv("divMenuInicial");
    let nombreCompleto = document.querySelector("#txtNombreCensista").value.toLowerCase();
    let usuario = document.querySelector("#txtUsuarioCensista").value.toLowerCase();
    let pass = document.querySelector("#txtPasswordCencista").value;
    
    if(!miSistema.validaTexto(nombreCompleto) || !miSistema.validaTexto(usuario) || !miSistema.validaPassword(pass) || miSistema.existeUsuarioCensista(usuario)){
        if (!miSistema.validaPassword(pass)){
            mensaje=`Verifique contraseña`;
        }
        if(!miSistema.validaTexto(usuario)){
            mensaje=`Verifique usuario`;
        }
        if(!miSistema.validaTexto(nombreCompleto)){
            mensaje=`Verifique nombre`;
        }
        if(miSistema.existeUsuarioCensista(usuario)){ // valida que el censista no esté registrado previamente (sea único)
            mensaje = "El usuario ya se encuentra registrado";
        }
        document.querySelector("#pRegistroCensista").innerHTML = mensaje;
    }else{
        ocultarDiv("divRegistroCensista");
        mostrarDiv("divMenuCensista");
        mostrarDiv("divLogCensistaCerrarSesion");
        ocultarDiv("divVolverAMenuInicial");
        document.querySelector("#headerMenuCensista").innerHTML = `Hola, ${usuario.toUpperCase()}`;
        miSistema.guardarNuevoCencista(usuario, pass, nombreCompleto); 
        miSistema.login(usuario, pass);
        console.log("Censista logueado:" + miSistema.censistaLogueado.usuario); // censista logueado     
    }
}

function cerrarCesionCensista(){
    miSistema.logout();
    
    
    menuInicial();
    
    console.log("Censista logueado:" + miSistema.censistaLogueado)
}

//Botón 2 validar censos pre cargados Menú censista
function mostrarTablaCensosPendientesUI(){
    ocultarTodosLosDivXclaseMenosUno(".claseCensista",divCensosPreCompletados)
    mostrarDiv("divCensosPreCompletadosConsulta");
    
    let mensaje='';
    let idUsuario = miSistema.censistaLogueado.id;
    
    let cantidadPendientes= miSistema.censados.length - miSistema.cantidadPersonasValidadas(); //total censados - total validados (true)
    
    document.querySelector("#divCensosPreCompletadosConsultaTitulo").innerHTML =
    `<u>Usuario: ${miSistema.censistaLogueado.usuario}</u><br>Consulta de censos precompleados`;
    
    
    if (cantidadPendientes>0){
        mensaje = miSistema.mostrarTablaCensadosPendientes(idUsuario);      //muestra tabla
        mostrarDiv("divMostrarPersonaPrecargada");
        cargarCedulasPendientesValidacion();
    }else{
        mensaje=`No figuran censos pendientes para validar`;
    }
    
    document.querySelector("#pMostrarDatosCensosPrecargado").innerHTML = mensaje;
    
    ocultaOMuestraBotonMenuInicial();
}

// trae cédulas pendientes de validación (todas)
function cargarCedulasPendientesValidacion() {
    let cedulasPendientesValidacion = `<option value="-1"> Seleccione una CI </option>`;
    for (let i = 0; i < miSistema.censados.length; i++) {
        let censoX = miSistema.censados[i]; 
        
        if(!censoX.valido){ // solo pendientes de validar
            
            cedulasPendientesValidacion += `<option value="${censoX.nroCI}"> ${censoX.nroCI} - ${censoX.apellido.toUpperCase()},  ${censoX.nombre.toUpperCase()} </option>`; // lleva el nro cédula al value
            
        }
    }
    document.querySelector("#selCensosPrecagados").innerHTML = cedulasPendientesValidacion;
}

//trae cédulas pendientes de validación (solo para aen censista logueado)
function cargarCedulasPendientesValidacionParaCensista() {
    let cedulasPosiblesAsignar = `<option value="-1"> Seleccione una CI </option>`;
    for (let i = 0; i < miSistema.censados.length; i++) {
        let censoX = miSistema.censados[i]; 
        
        if(!censoX.valido && censoX.Censista.id == miSistema.censistaLogueado.id){ // solo posibles a asignar y para el censista Logueado
            
            cedulasPosiblesAsignar += `<option value="${censoX.nroCI}"> ${censoX.nroCI} - ${censoX.apellido.toUpperCase()},  ${censoX.nombre.toUpperCase()}  </option>`; // lleva el nro cédula al value
        }
    }
    document.querySelector("#selectCensosPendientesUsuario").innerHTML = cedulasPosiblesAsignar;
}


function mostrarCensoPendienteSegunCI(){ 
    document.querySelector("#divValidaCensoPrecargado ").innerHTML = ""; //borra la confirmacion de la validacion anterior
    document.querySelector("#pMostrarResultadoConfirmarCenso").innerHTML ="";//borra el mensaje de confirmacion de la validacion anterior
    
    let cedula=document.querySelector("#selCensosPrecagados").value;
    let mensaje='';
    let infoPersona = miSistema.mostrarCensadoPendiente(cedula);
    
    if (cedula==-1){
        mensaje='Debe ingresar una CI';
        ocultarDiv("divBotonesModificaOValidaCensoPrecargado");
    }else{
        mensaje=infoPersona;
        mostrarDiv("divBotonesModificaOValidaCensoPrecargado");
    }
    document.querySelector("#pMostrarPersonaPrecargada").innerHTML=mensaje;
}


//click al boton modificar censo (por censista)
function modificarCensoUI(){
    ocultarDiv("divCensosPreCompletadosConsulta");
    ocultarDiv("divMostrarPersonaPrecargada");
    ocultarDiv("divBotonesModificaOValidaCensoPrecargado");
    mostrarDiv("divModificaCensoPrecargado");
    ocultarDiv("divValidaCensoPrecargado");
    
    
    let mensaje='';
    let cedula=document.querySelector("#selCensosPrecagados").value; // CI de combo seleccionado para modificar
    let cedulaNum=miSistema.transformaFormatoCedula(cedula);
    let personaX=miSistema.obtenerPersona(cedulaNum); 
    
    let nombreX = personaX.nombre.toUpperCase();   
    let apellidoX=personaX.apellido.toUpperCase(); 
    let edadX=personaX.edad;
    let departamentoX=personaX.departamento;
    let ocupacionX=personaX.ocupacion;
    
    if(!miSistema.existePersonaEnListaCensadosValidos(cedulaNum)){      //si esta pendiente de validar
        mensaje=`<b>CI: ${cedulaNum} </b><br><br>`
        
        // select departamentos para html
        let deptoSelect = `<option value="error"> Seleccione... </option>`;
        for (let i = 0; i < miSistema.listaDepartamentos.length; i++) {
            let deptoX = miSistema.listaDepartamentos[i]; 
            
            deptoSelect += `<option value="${deptoX}"> ${deptoX.toUpperCase()} </option>`; // lleva el nombre del depto
            
        }
        document.querySelector("#selectModificaDpto").innerHTML = deptoSelect; 
        document.querySelector("#txtModificaNombrePrecargado").value = nombreX;
        document.querySelector("#txtModificaApellidoPrecargado").value = apellidoX;
        document.querySelector("#txtModificaEdadPrecargado").value = edadX;
        document.querySelector("#selectModificaDpto").value = departamentoX;
        document.querySelector("#selectModificaOcupacion").value = ocupacionX;
    }else{
        mensaje=`${nombreX} ${apellidoX} ya se encuentra validad@. No es posible modificar los datos`;
    }
    document.querySelector("#pModificaCensoPrecargado").innerHTML=mensaje;
}

//click al boton validar censo precargado SIN REALIZAR MODIFICACIONES
function validarCensoUI1(){
    let mensaje='';
    let cedula=document.querySelector("#selCensosPrecagados").value; // CI de combo seleccionado para modificar
    let cedulaNum=miSistema.transformaFormatoCedula(cedula);
    let personaX=miSistema.obtenerPersona(cedulaNum); // obtiene persona con censo pendiente de validación

    if(!miSistema.existePersonaEnListaCensadosValidos(personaX.nroCI)){     //si esta pendiente de validar
        personaX.Censista = miSistema.censistaLogueado; // asigna censista logueado
        personaX.valido = true; // pasa a validado
        setTimeout(mostrarTablaCensosPendientesUI(), 2000); //ACTUALIZO TABLA 
        mostrarDiv("divCensosPreCompletados");
        mostrarDiv("pMostrarResultadoConfirmarCenso");
        
        mensaje = `Censo de <b>${personaX.nombre.toUpperCase()} ${personaX.apellido.toUpperCase()}</b> validado`;
    }else{
        mensaje=`${personaX.nombre} ${personaX.apellido} ya se encuentra validad@. No es posible validar nuevamente`;
    }
    
    document.querySelector("#pMostrarResultadoConfirmarCenso").innerHTML = mensaje;
    document.querySelector("#pMostrarPersonaPrecargada").innerHTML="";
    mostrarDiv("divCensosPreCompletados");
    mostrarDiv("pMostrarResultadoConfirmarCenso");
}

//click al boton DE REALIZAR MODIFICACIONES AL CENSO PRECARGADO
function validarCensoUI2(){
    let mensaje='';
    let cedula=document.querySelector("#selCensosPrecagados").value; // CI de combo seleccionado para modificar
    
    let censista = miSistema.censistaLogueado.id;       
    //Los atributos:
    let nombre = document.querySelector("#txtModificaNombrePrecargado").value;
    let apellido = document.querySelector("#txtModificaApellidoPrecargado").value;
    let edad = document.querySelector("#txtModificaEdadPrecargado").value;
    let departamento = document.querySelector("#selectModificaDpto").value;
    let ocupacion = document.querySelector("#selectModificaOcupacion").value;
    
    mostrarDiv("divValidaCensoPrecargado");
    
    //Agregar a la lista de Validados
    if(!miSistema.validaTexto(nombre) || !miSistema.validaTexto(apellido) ||  !miSistema.validaEdad(edad) || departamento === "error" || ocupacion === "error" ){
        if(ocupacion === "error" || ocupacion ==""){
            mensaje = "Debe seleccionar una ocupación";
        }if(departamento === "error" || departamento ==""){
            mensaje = "Debe seleccionar un departamento";
        }if(!miSistema.validaEdad(edad)){
            mensaje = "Debe ingresar una Edad entre 0 al 130";    
        }if(!miSistema.validaTexto(apellido)){
            mensaje = "Debe ingresar información en el Apellido";
        }if(!miSistema.validaTexto(nombre)){
            mensaje = "Debe ingresar información en el Nombre";
        }
    }else{
        miSistema.modificaCensoYValida(cedula,nombre,apellido,edad,departamento,ocupacion,censista)
        
        /*
        //VALIDO CENSO*/
        mensaje = `Censo de <b>${nombre.toUpperCase()} ${apellido.toUpperCase()}</b> validado`;
        
        ocultarDiv("divModificaCensoPrecargado");
    }
    document.querySelector("#divValidaCensoPrecargado").innerHTML = mensaje;
    console.log("Censos actualizados",miSistema.censados)
}


//Boton 3 Reasignar persona a otro censista
function mostrarReasignarCensistaUI(){
    ocultarTodosLosDivXclaseMenosUno(".claseCensista",divReasignaCensosPreCompletados)
    
    let mensaje='';
    let mensaje2='';
    let idUsuario = miSistema.censistaLogueado.id;
    let qPendientes=miSistema.cantidadPersonasPendientesParaCensista(idUsuario);
    console.log(`Cantidad de pendientes para el ususario: ${qPendientes}`);
    
    if(qPendientes > 0  ){
        mensaje = miSistema.mostrarTablaCensadosPendientesParaCensista(idUsuario);      //muestra tabla
        cargarCedulasPendientesValidacionParaCensista();    //carga en un combo CI de personas asignadas a [el 
        mostrarListaCensistasMenosLogueado();               //carga en un combo todos los censistas menos el Logueado
        mostrarDiv("divReasignaCensista2");
    }else{
        mensaje2=`No figuran censos pendientes de validación para reasignar`;
        ocultarTodosLosDivXclaseMenosUno(".claseCensista",divReasignaCensista2);
    }
    
    document.querySelector("#pReasignaCensista").innerHTML = mensaje;
    document.querySelector("#divReasignaCensista2").innerHTML = mensaje2;
    
    ocultaOMuestraBotonMenuInicial();
}

//mostrar lista censistas menos el logueado para reasignar
function mostrarListaCensistasMenosLogueado(){
    let listaCensistasParaReasignar = "";
    let censistaLogueado = miSistema.censistaLogueado.id;
    
    for (let i = 0; i < miSistema.listaCensistas.length; i++) {
        let censistaX = miSistema.listaCensistas[i]; 
        
        if(censistaX.id !== censistaLogueado ){ // para traer todos menos el logueado
            
            listaCensistasParaReasignar += `<option value="${censistaX.id}"> ${censistaX.nombreCompleto.toUpperCase()} </option>`; // lleva el nro cédula al value
            
        }
        
        
    }
    document.querySelector("#selectCensistasAasignar").innerHTML = listaCensistasParaReasignar;
    
    
}

// reasigna censo a otro censista
function reasignarCensoEntreCensistas(){
    let cedula = document.querySelector("#selectCensosPendientesUsuario").value; // trae una cédula
    let IDcensistaAsignado = Number(document.querySelector("#selectCensistasAasignar").value); // trae un id de censista
    let mensaje='';
    
    if(cedula == -1){
        mensaje = "Debe seleccionar una cédula";
    }else{
        
        let personaX = miSistema.obtenerPersona(cedula);
        personaX.Censista = miSistema.obtenerCensistaporID(IDcensistaAsignado);        // asinga nuevo id de censista
        
        mensaje=`El censo de ${personaX.nombre.toUpperCase()} ${personaX.apellido.toUpperCase()} fue reasignado a ${personaX.Censista.nombreCompleto.toUpperCase()}  `;
        setTimeout(mostrarReasignarCensistaUI(), 2000); //ACTUALIZO TABLA
    }
    mostrarDiv("divReasignaCensista2");
    document.querySelector("#divReasignaCensista2").innerHTML = mensaje;
    
}


//Boton Información estadísitca Censista
function mostrarEstadisticasCensista(){
    ocultarDiv("divMenuCensista");
    mostrarDiv("divEstadisticasCensista");
    mostrarDiv("divMostrarMenuCensista");
    
    //cantidad de personas censadas
    let qPersonasValidadas = miSistema.cantidadPersonasValidadas();
    document.querySelector("#txtMostrarCantidadPersonasCensadasValidasCensista").innerHTML = qPersonasValidadas
    
    //tabla departamento
    let qPersonasPorDepto = miSistema.cantidadPersonasPorDeptoEnLista(miSistema.censados);
    document.querySelector("#pMostrarPersonasPorDeptoCensista").innerHTML = qPersonasPorDepto
    
    //personas pendientes sobre total censadas
    let qPersonasTotal = miSistema.censados.length; // cantidad de censos ingresados
    let qPersonasPendientes = qPersonasTotal - qPersonasValidadas
    let porcentajePendientes = parseFloat(qPersonasPendientes / qPersonasTotal * 100).toFixed(2);
    document.querySelector("#txtPendientesValidacionSobreTotalCensista").innerHTML = `${porcentajePendientes} %`
    
    //tabla mayores y menores según depto seleccionado 
    let deptoSelect = `<option value="error"> Seleccione... </option>`;
    for (let i = 0; i < miSistema.listaDepartamentos.length; i++) {
        let deptoX = miSistema.listaDepartamentos[i]; 
        
        deptoSelect += `<option value="${deptoX}"> ${deptoX.toUpperCase()} </option>`; // lleva el nombre del depto
        
    }
    
    document.querySelector("#selectDeptoEstadisticaCensista").innerHTML = deptoSelect;
    
    mostrarMenoresYMayoresPorDepto();
    
    
    
    
}

function mostrarMenoresYMayoresPorDepto(){
    // select deptos mayor y menor
    let deptoSeleccionado = document.querySelector("#selectDeptoEstadisticaCensista").value;
    let menoresYMayoresDepto = "";
    if(deptoSeleccionado !== "error"){
        menoresYMayoresDepto =  miSistema.cantidadPersonasEnDeptoMenorYMayor(deptoSeleccionado);
        
    }       
    
    document.querySelector("#pMostrarCensadosMenoresYMayoresPorDepto").innerHTML = menoresYMayoresDepto;
    
    
}




// muestra una clase de DIV
function mostrarDiv(pDiv) {
    document.querySelector(`#${pDiv}`).style.display = "block";
}


// oculta una clase de DIV
function ocultarDiv(pDiv) {
    document.querySelector(`#${pDiv}`).style.display = "none";
}

//oculta clases
function ocultarTodosLosDivXclase(pClase){
    let todosLosDivs = document.querySelectorAll(pClase); 
    for (elDiv of todosLosDivs) {
        elDiv.style.display = "none";
    }
}

// oculta todos los div de una clase menos uno
function ocultarTodosLosDivXclaseMenosUno(pClase,pDivMostrar){
    let todosLosDivs = document.querySelectorAll(pClase); 
    for (elDiv of todosLosDivs) {
        if(elDiv !== pDivMostrar){
            elDiv.style.display = "none";
        }if(elDiv === pDivMostrar){
            elDiv.style.display = "block";
        }
    }
}

// oculta divs dependiendio si el hay un censista logueado
function ocultaOMuestraBotonMenuInicial(){
    if(miSistema.censistaLogueado !== null){
        mostrarDiv("divMostrarMenuCensista")
        ocultarDiv("divVolverAMenuInicial")
    }else{
        mostrarDiv("divVolverAMenuInicial")
        ocultarDiv("divMostrarMenuCensista")
    }
}