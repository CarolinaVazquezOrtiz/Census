class Sistema {
    //static censistaLogueado = null;
    constructor() {
        this.censistaLogueado = null; // valida si usuario está logueado o no
        //las listas
        this.listaCensistas = new Array(); // carga de usuarios Censistas
        this.censados = new Array(); // carga de censos de personas 
        this.listaDepartamentos = new Array("artigas","canelones","cerro largo","colonia","durazno","flores","florida","lavalleja","maldonado","montevideo","paysandu","rio negro","rivera","rocha","salto","san jose","soriano","tacuarembo","treinta y tres");
    }
    
    // login censista
    login(pCensista, pContra) {
        let logExitoso = false;
        let censista = this.obtenerCensista(pCensista);
        if (censista !== null) {
            if (censista.password === pContra) {
                logExitoso = true;
                //una vez que me loguee correctamente, cargo el censista logueado.
                this.censistaLogueado = censista;
            }
        }
        return logExitoso;
    }
    //logout censista
    logout() {
        let cierraLog = false;
        if (this.censistaLogueado !== null) {
            this.censistaLogueado = null;
            cierraLog = true;
        }
        return cierraLog;
    }
    
    //busco censista en lista censistas por usuario
    obtenerCensista(pCensista) {    
        let censista = null;
        let i = 0
        while (i < this.listaCensistas.length && censista === null) {
            let censistaX = this.listaCensistas[i];
            if (censistaX.usuario === pCensista) {
                censista = censistaX; // guardo todo el objeto usuario con sus propiedades.
            }
            i++;
        }
        return censista;
    }
    
    //busco censista en lista censistas por ID
    obtenerCensistaporID(IDcensista) {    
        let censista = null;
        let i = 0
        while (i < this.listaCensistas.length && censista === null) {
            let censistaX = this.listaCensistas[i];
            if (censistaX.id === IDcensista) {
                censista = censistaX; // guardo todo el objeto usuario con sus propiedades.
            }
            i++;
        }
        return censista;
    }
    
    //valido si el nombre de usuario censista ya existe
    existeUsuarioCensista(pUsuarioCensista) {   
        let existeUsuario = false;
        let i = 0
        while (i < this.listaCensistas.length && existeUsuario === false) {
            let censistaX = this.listaCensistas[i];
            if (censistaX.usuario === pUsuarioCensista) {
                existeUsuario = true; 
            }
            i++;
        }
        return existeUsuario;
    }
    
    // valida condicions password
    validaPassword(pPass){
        let carPass = pPass.length;
        let mayus = false;
        let minus = false;
        let numero = false;
        let largo = false;
        
        for(let i = 0; i < carPass; i++){
            if(pPass.charAt(i).charCodeAt()>=97 && pPass.charAt(i).charCodeAt()<=122){
                minus = true;
            }
            if(pPass.charAt(i).charCodeAt()>=65 && pPass.charAt(i).charCodeAt()<=90){
                mayus = true;
            }
            if(pPass.charAt(i).charCodeAt()>=48 && pPass.charAt(i).charCodeAt()<=57){
                numero = true;
            }
        }
        if(carPass >= 5){
            largo = true;
        }
        
        return mayus && minus && numero && largo;
    }
    
    
    
    //valida digito verificador
    validaDigitoCedula(pCedula){
        let digitoCedulaValida = false;
        let numerosCedula = this.transformaFormatoCedula(pCedula); // cédula solo con números
        
        let ultimoDigitoCedulaIngresada = Number(pCedula.charAt(pCedula.length -1));  //obtengo el digito verificador que ingresa el usuario
        
        
        let multiplicadores = "987634";  //patron de multiplicacion para cedulas anteriores a 1 millon
        
        //pregunto si la CI es nueva (mas de 1 millon), en ese caso, le pongo el 2 adelante al patron.
        if (numerosCedula.length === 8){ //tomamos largo solo de números (sin caracteres)
            multiplicadores = "2" + multiplicadores;
        }
        
        let sumaMultiplicacionesCedula = 0;
        //multiplico cada termino y los sumo a la variable sumaMultiplicacionesCedula
        for (let i = 0; i < numerosCedula.length -1; i++) {
            let caracterRecorridoCedula = numerosCedula.charAt(i); 
            let caracterRecorridoPatron = multiplicadores.charAt(i);
            
            let resultadoMultiplicacion = Number(caracterRecorridoCedula) * Number(caracterRecorridoPatron);
            sumaMultiplicacionesCedula += resultadoMultiplicacion;
        }
        
        
        let verificadorObtenido = 0;
        let siguienteNumeroMayorEnCero = sumaMultiplicacionesCedula;
        
        //pregunto si el valor obtenido en sumaMultiplicacionesCedula es 0. si no es cero entonces tengo que buscar
        if(sumaMultiplicacionesCedula % 10 > 0) {
            let encontrado = false;
            while(!encontrado){
                if(siguienteNumeroMayorEnCero % 10 === 0) {
                    encontrado = true;
                }
                else {
                    siguienteNumeroMayorEnCero++;
                }
            }
            verificadorObtenido = siguienteNumeroMayorEnCero - sumaMultiplicacionesCedula;
        }
        
        //valido que el numero que obtuve  verificadorObtenido = siguienteNumeroMayorEnCero - 
        //sumaMultiplicacionesCedula sea igual al digito verificador que ingreso el usuario.;
        if(verificadorObtenido === ultimoDigitoCedulaIngresada) {
            digitoCedulaValida = true;
        } 
        
        
        return digitoCedulaValida;
        
    }
    
    //tranforma cédula solo a número
    transformaFormatoCedula(pCedula){       //pCedula es un string, y devuelve un String
        let numerosCedula = "";   
        for (let i = 0; i < pCedula.length; i++) {  //hago la recorrida para quedarme solo con los numeros
            let caracterRecorrido = pCedula.charAt(i);
            if(!isNaN(caracterRecorrido)) {
                numerosCedula += caracterRecorrido;
            }
        }
        return numerosCedula;
    }
    
    //valida si al cédula ya se encuentra cargada en "censados" (pendientes de validación)
    verificaCedulaYaIngresadaPendienteValidacion(pCedula){
        let cedulaYaCargada = false;
        let numerosCedula = miSistema.transformaFormatoCedula(pCedula);
        
        let i = 0
        
        while(i < this.censados.length && !cedulaYaCargada){
            let censadoX = this.censados[i];
            if (!censadoX.valido){      //si el censo esta pendiente de validar (.valido=false)
                if(censadoX.nroCI===numerosCedula){
                    cedulaYaCargada = true;
                }
            }
            i++;
        }
        return cedulaYaCargada;
    }
    
    // valida si la cédula se encuentra cargada en censadosValidos (ya validados por censista)
    verificaCedulaYaIngresadaValidada(pCedula){
        let cedulaYaCargada = false;
        let numerosCedula = miSistema.transformaFormatoCedula(pCedula);
        
        let i = 0
        while(i < this.censados.length && !cedulaYaCargada){
            let censadoX = this.censados[i];
            if (censadoX.valido){
                if(censadoX.nroCI===numerosCedula){
                    cedulaYaCargada = true;
                }
            }
            i++;
        }
        return cedulaYaCargada;
    }
    
    // identifica la posición de una cédula en una lista 
    posicionEnListaPersonas(pLista,pCedula){
        let pos = -1;
        let numerosCedula = miSistema.transformaFormatoCedula(pCedula);
        let i = 0
        while(i < pLista.length){
            let cedula = pLista[i];
            if(cedula.nroCI===numerosCedula){
                pos = i;
            }
            i++;
        }
        return pos;
    }
    
    
    //muestra información cargada en censados (previo a validar)
    mostrarInformacionCensadoPendiente(pPos) {
        let lista = "";
        let personaX = this.censados[pPos];
        lista = `Nombre: ${personaX.nombre.toUpperCase()} <br> Apellido: ${personaX.apellido.toUpperCase()} <br> Edad: ${personaX.edad}  <br> Departamento: ${personaX.departamento.toUpperCase()} <br>  Ocupación: ${personaX.ocupacion.toUpperCase()}`;
        
        return lista;
    }
    
    
    //muestra información cargada en censados a partir de una cedula (pendiente de validacion)
    mostrarCensadoPendiente(pCedula){
        let lista = null;
        let numerosCedula = miSistema.transformaFormatoCedula(pCedula);
        let i = 0
        while(i < this.censados.length){
            let personaX = this.censados[i];
            if (!personaX.valido){      //censos pendientes de validar
                if(personaX.nroCI===numerosCedula){
                    lista = `Nombre: ${personaX.nombre.toUpperCase()} <br> 
                    Apellido: ${personaX.apellido.toUpperCase()} <br> 
                    Edad: ${personaX.edad}  <br> 
                    Departamento: ${personaX.departamento.toUpperCase()} <br>  
                    Ocupación: ${personaX.ocupacion.toUpperCase()}`;
                }
            }
            i++;
        }
        return lista;
    }
    
    // genera tabla de censados pendiente según ID censista logueado (muestra todos)
    mostrarTablaCensadosPendientes(pIDUsuario) {
        let tabla = " <table> <tr> <th> CI </th> <th> Nombre </th> <th> Apellido </th> <th> Censista asignado </th>  </tr> ";
        let filasUsuario = ""; // Filas para pIDUsuario
        let filasOtroCensista = ""; // Filas para "Censo bajo otro Censista"
    
        for (let i = 0; i < this.censados.length; i++) {
            let censadoX = this.censados[i];
    
            if (!censadoX.valido) { // censos pendientes
                if (censadoX.Censista.id === pIDUsuario) { // para ese censista en particular
                    filasUsuario += `<tr> <td> ${censadoX.nroCI} </td>  
                        <td>${censadoX.nombre.toUpperCase()} </td> 
                        <td>${censadoX.apellido.toUpperCase()} </td> 
                        <td> ${this.censistaLogueado.usuario} </td> </tr> `;
                } else { // para otros censistas
                    filasOtroCensista += `<tr> <td> ${censadoX.nroCI} </td>  
                        <td>${censadoX.nombre.toUpperCase()} </td> 
                        <td>${censadoX.apellido.toUpperCase()} </td> 
                        <td> Censo bajo otro Censista </td> </tr> `;
                }
            }
        }
    
        tabla += filasUsuario; // Agregar las filas de pIDUsuario al principio de la tabla
        tabla += filasOtroCensista; // Agregar las filas de "Censo bajo otro Censista" al final de la tabla
        tabla += " </table>";
    
        return tabla;
    }
    
    
    // genera tabla de censados pendientes para un solo censista según ID Censista
    mostrarTablaCensadosPendientesParaCensista(pIDUsuario) {
        let tabla = " <table> <tr> <th> CI </th> <th> Nombre </th> <th> Apellido </th>  </tr> ";
        
        for(let i = 0; i < this.censados.length; i ++){ 
            let censadoX = this.censados[i]
            if (!censadoX.valido){      //censos pendientes
                
                if(censadoX.Censista.id === pIDUsuario){   //para ese censista en particular
                    tabla+= `<tr> <td> ${censadoX.nroCI} </td>  
                    <td>${censadoX.nombre.toUpperCase()} </td> 
                    <td>${censadoX.apellido.toUpperCase()} </td> </tr> `;
                }
            }
        }
        tabla += " </table>"
        
        return tabla;
    }
    
    // cuenta censos pendientes para un censista (id usuario)    
    contarCensosPendientesParaCensista(pIDUsuario){
        let contador=0;
        for(let i = 0; i < this.censados.length; i ++){ 
            let censadoX = this.censados[i]
            if (!censadoX.valido && censadoX.Censista === pIDUsuario){ 
                contador++;
            }
        }
        return contador;
    }
    
    //obtengo todos los atributos del censado en lista censados  
    obtenerPersona(pCedula) {    
        let persona = null;
        let numerosCedula = this.transformaFormatoCedula(pCedula);
        
        let i = 0
        while (i < this.censados.length && persona === null) {
            let personaX = this.censados[i];
            if (personaX.nroCI===numerosCedula) {
                persona = personaX; // guardo todo el objeto usuario con sus propiedades 
            }
            i++;
        }
        return persona;
    }
    
    //valido si la cédula ya fue ingresada y está validada
    existePersonaEnListaCensadosValidos(pCedula) {    
        let existePersona = false;
        let i = 0
        while (i < this.censados.length && existePersona === false) {
            let personaX = this.censados[i];
            if (personaX.valido){
                if (personaX.nroCI === pCedula) {
                    existePersona = true; 
                }
            }
            i++;
        }
        return existePersona;
    }
    
    // hace un update de valido a true en la personas (por cédula)
    validarCenso(pCedula){
        let persona = null;
        let numerosCedula = this.transformaFormatoCedula(pCedula);
        
        let i = 0
        while (i < this.censados.length && persona === null) {
            let personaX = this.censados[i];
            if (personaX.nroCI===numerosCedula) {
                persona = personaX;         // guardo todo el objeto usuario con sus propiedades 
                personaX.valido=true;       //VALIDO CENSO
            }
            i++;
        }
    }
    
    // cuenta solo censos validados
    cantidadPersonasValidadas(){        
        let cantidad = 0;
        for(let i = 0; i < this.censados.length; i ++){
            let censadoX = this.censados[i]
            
            if (censadoX.valido){
                cantidad++;
                
            }
            
        }
        
        
        
        return cantidad;
        
    }
    //cuenta cantidad de censos pendientes para censista
    cantidadPersonasPendientesParaCensista(pIDCensista){        
        let cantidad = 0;
        for(let i = 0; i < this.censados.length; i ++){
            let censadoX = this.censados[i]
            
            if (!censadoX.valido && censadoX.Censista.id === pIDCensista){
                cantidad++;
                
            }
            
        }
        
        
        
        return cantidad;
        
    }
    
    //genera tabla de personas censadas (validas) por depto
    cantidadPersonasPorDeptoEnLista(pLista){
        let tablaDeptos = " <table> <tr> <th> Departamento </th> <th> Personas </th> ";
        
        for(let d=0; d < this.listaDepartamentos.length; d++){
            let depto = this.listaDepartamentos[d];
            let qPersonasDepto = 0;
            for(let i = 0; i < pLista.length; i ++){
                let censadoX = pLista[i]
                let deptoCensado = censadoX.departamento;
                let statusCensado = censadoX.valido;
                
                if(statusCensado){ // se es válido
                    if(deptoCensado === depto){
                        qPersonasDepto++; // si hay coincidencia suma al depto
                        
                    }
                    
                }
                
            }
            
            tablaDeptos+= `<tr> <td> ${depto.toLocaleUpperCase()} </td>  <td>${qPersonasDepto} </td>  </tr> `;
            
            
            
        }
        
        tablaDeptos += " </table>"
        
        
        return tablaDeptos;
        
    }
    
    // cuenta cantidad de personas mayores y menores por depto para tabla
    cantidadPersonasEnDeptoMenorYMayor(pDepto){
        let tablaInfo = " <table> <tr> <th> Menores </th> <th> Mayores </th> <th> Total </th> </tr>"
        let depto = pDepto;
        let qMenores = 0;
        let qMayores = 0;
        
        for(let i = 0; i < this.censados.length; i ++){
            let censadoX = this.censados[i]
            let deptoCensado = censadoX.departamento;
            let edadCensado = Number(censadoX.edad);
            
            if (censadoX.valido){
                if(deptoCensado === depto){
                    if(edadCensado >= 18){
                        qMayores++; // mayores de 18
                        
                    }else{
                        qMenores++; //menores 18
                    }
                }
            }
            
        }
        let total = qMenores + qMayores;
        let porMenores = 0;
        let porMayores = 0;
        let cienPor = 0;
        if(total > 0){
            porMenores = qMenores / total;
            porMayores = qMayores / total;
            cienPor = 100;
        }        
        
        tablaInfo += `<tr> <td> ${parseFloat(porMenores* 100).toFixed(2)} % </td>  <td>${parseFloat(porMayores * 100).toFixed(2)} %  </td> <td> ${parseFloat(cienPor).toFixed(2)} % </td> </tr> `;
        tablaInfo += " </table>"
        
        return tablaInfo;
    }
    
    //tabla de estaditicas para personas: se toman en cuenta censos pendientes y validados
    listaCensados(){    
        let tablaCensados = ' <table> <tr> <th> Departamento </th> <th> No estudian </th> <th> Trabajan </th> <th> Dependientes o independientes </th> <th> Porcentaje del total de censados </th> </tr> ';
        
        for(let d=0; d < this.listaDepartamentos.length; d++){
            let depto = this.listaDepartamentos[d];
            let qPersonasDepto = 0;
            let qEstudiantes=0;
            let qNoTrabajan=0;
            let qTrabajan=0;    //dependientes + independientes
            
            for(let i = 0; i < this.censados.length; i ++){
                let censadoX = this.censados[i];
                if(censadoX.departamento === depto){
                    qPersonasDepto++; // si hay coincidencia suma al depto
                    if(censadoX.ocupacion==="estudiante"){
                        qEstudiantes++;
                    }
                    if(censadoX.ocupacion==="no trabaja"){
                        qNoTrabajan++;
                    }
                    if(censadoX.ocupacion==="dependiente" || censadoX.ocupacion==="independiente"){
                        qTrabajan++;
                    }
                }
            }
            
            let porcentajeDelTotal = 0;
            if(this.censados.length>0){
                porcentajeDelTotal = parseFloat(qPersonasDepto*100/this.censados.length).toFixed(2);
            }
            
            //Departamento
            tablaCensados+= `<tr> <td> ${depto.toLocaleUpperCase()} </td>`;
            //Estudian
            tablaCensados+= `<td>${qEstudiantes} </td>  `;
            //NO Trabajan
            tablaCensados+= `<td>${qNoTrabajan} </td> `;
            //Dependientes o independientes
            tablaCensados+= `<td>${qTrabajan} </td>  `;
            //%del total
            tablaCensados+= `<td>${porcentajeDelTotal}% </td>  </tr> `;
            
        }
        
        tablaCensados += " </table>"
        
        return tablaCensados;
    }
    
    
    //valida que el usuario ingrese un texto
    validaTexto(pTexto){
        let textoValido = false;
        let carTexto = pTexto.trim().length;
        if(carTexto > 0){
            textoValido = true;
        }
        
        return textoValido;
        
    }
    
    //valida que la edad sea un número positivo entre 0 y 130
    validaEdad(pEdad){
        let edadValida = false;
        let carEdad = pEdad.trim().length;
        let numEdad = Number(pEdad);
        if(carEdad > 0 && !isNaN(numEdad) && numEdad >= 0 && numEdad <= 130){
            edadValida = true;
        }
        
        return edadValida;
    }    
    
    //guarda el censo en "censados", son censos sin validar (valido = false)
    guardaCensoIncial(pCedula, pNombre, pApellido, pEdad, pDepto, pOcupacion) { 
        let censoX = new Persona();
        //id queda a nivel de objeto      
        censoX.nroCI = pCedula ;
        censoX.nombre = pNombre;        
        censoX.apellido = pApellido;        
        censoX.edad = pEdad;        
        censoX.departamento = pDepto;        
        censoX.ocupacion = pOcupacion;
        censoX.Censista = this.asignarCensista();
        censoX.valido=false;        
        this.censados.push(censoX);
    }
    
    // Modifica censo personas (Invitado)
    modificaCensoIncial(pCedula, pNombre, pApellido, pEdad, pDepto, pOcupacion) { 
        let posPersona = this. posicionEnListaPersonas(this.censados,pCedula)
        let persona = this.censados[posPersona];
        
        persona.nombre = pNombre;        
        persona.apellido = pApellido;        
        persona.edad = pEdad;        
        persona.departamento = pDepto;        
        persona.ocupacion = pOcupacion;
    }
    
    // guarda censo cuando es ingresado por el censista (ya queda validado)
    guardaCensoValido(pCedula, pNombre, pApellido, pEdad, pDepto, pOcupacion,pIDCensista) { 
        let censoX = new Persona();
        //id queda a nivel de objeto      
        censoX.nroCI = pCedula ;
        censoX.nombre = pNombre;        
        censoX.apellido = pApellido;        
        censoX.edad = pEdad;        
        censoX.departamento = pDepto;        
        censoX.ocupacion = pOcupacion;
        censoX.Censista = this.obtenerCensistaporID(pIDCensista);
        censoX.valido=true;           //valido pasa a TRUE
        this.censados.push(censoX);
    }
    
    // modificacion del censo por parte del censista
    modificaCensoYValida(pCedula, pNombre, pApellido, pEdad, pDepto, pOcupacion,pIDCensista) { 
        let posPersona = this. posicionEnListaPersonas(this.censados,pCedula)
        let persona = this.censados[posPersona];
        
        persona.nombre = pNombre.toLowerCase();        
        persona.apellido = pApellido.toLowerCase();        
        persona.edad = pEdad;        
        persona.departamento = pDepto.toLowerCase();        
        persona.ocupacion = pOcupacion.toLowerCase();
        persona.Censista = this.obtenerCensistaporID(pIDCensista);
        persona.valido=true;           //valido pasa a TRUE
    }
    
    // elimina censo a nivel persona
    eliminarCenso(pCedula) {
        let eliminadaOk = false;
        let personaX = this.obtenerPersona(pCedula);
        let posPersonaX = this.posicionEnListaPersonas(this.censados,pCedula);
        if(!personaX.valido){    //chequeo censo pendiente
            //Chequeo mayor a 0, porque splice con posicion inicial negativa trae el primero (pos 0)
            if(posPersonaX >=0){
                //"eliminados" es un nuevo array con los datos eliminados, a splice le paso la posicion inicial y la cantidad que quiero eliminar (1)
                let eliminados = this.censados.splice(posPersonaX, 1);     
                if (eliminados.length > 0) {
                    console.log(`se eliminó persona con ID: ${eliminados[0].id}.`);
                    if (eliminados[0].id == personaX.id) {
                        eliminadaOk = true;
                    }
                }
            }
        }
        return eliminadaOk;
    }
    
    // genera un número aleatorio entero del largo de la lista de censistas para asignarle a los censos
    asignarCensista() { 
        let CensitaRandom = null;
        let indiceRandom = Math.floor(Math.random() * this.listaCensistas.length);
        CensitaRandom = this.listaCensistas[indiceRandom];
        return CensitaRandom;

    }    
    
    //guarda el censista en 'listaCensistas'
    guardarNuevoCencista(pUsuario, pPassword, pNombreCompleto) { 
        let censistaX = new Censista();
        //id queda a nivel de objeto      
        censistaX.usuario = pUsuario;
        censistaX.password = pPassword;        
        censistaX.nombreCompleto = pNombreCompleto;         
        this.listaCensistas.push(censistaX);
    }
    
    
    //----------------------------PRECARGAS------------------------------------------
    
    //--------------Precarga de censistas---------------
    preCargarCensistas() {
        let censista1 = new Censista();
        censista1.usuario = "mperez";
        censista1.password = "Bohemios5";        
        censista1.nombreCompleto = "matias perez";         
        this.listaCensistas.push(censista1);
        
        let censista2 = new Censista();
        censista2.usuario = "smartinez" ;
        censista2.password = "nacioNal2";        
        censista2.nombreCompleto = "sofia martinez";         
        this.listaCensistas.push(censista2);
        
        let censista3 = new Censista();
        censista3.usuario = "prodriguez" ;
        censista3.password = "Ort42";        
        censista3.nombreCompleto = "pedro rodriguez";         
        this.listaCensistas.push(censista3);
    }
    
    //-------------Precarga de personas -------------------
    preCargarCensosIngresados() {
        let censo1 = new Persona();
        censo1.nroCI = "44729591" ;
        censo1.nombre = "nicolas";        
        censo1.apellido = "kaufmann";        
        censo1.edad = "31";        
        censo1.departamento = "montevideo";        
        censo1.ocupacion = "dependiente";  
        censo1.Censista = this.listaCensistas[0] ;  
        censo1.valido = false;
        this.censados.push(censo1);
        
        let censo2 = new Persona();
        censo2.nroCI = "43825308" ;
        censo2.nombre = "carolina";        
        censo2.apellido = "vazquez";        
        censo2.edad = "31";        
        censo2.departamento = "canelones";        
        censo2.ocupacion = "dependiente";  
        censo2.Censista = this.listaCensistas[0];   
        censo2.valido = false;
        this.censados.push(censo2);
        
        let censo3 = new Persona();
        censo3.nroCI = "14114570" ;
        censo3.nombre = "dionisia";        
        censo3.apellido = "paganini";        
        censo3.edad = "57";        
        censo3.departamento = "rocha";        
        censo3.ocupacion = "dependiente";  
        censo3.Censista = this.listaCensistas[1];
        censo3.valido = true;
        this.censados.push(censo3);
        
        let censo4 = new Persona();
        censo4.nroCI = "12761761" ;
        censo4.nombre = "jose";        
        censo4.apellido = "martin";        
        censo4.edad = "70";        
        censo4.departamento = "maldonado";        
        censo4.ocupacion = "independiente";  
        censo4.Censista = this.listaCensistas[1];
        censo4.valido = true;
        this.censados.push(censo4);
        
        let censo5 = new Persona();
        censo5.nroCI = "64825537" ;
        censo5.nombre = "luciano";        
        censo5.apellido = "kaufmann";        
        censo5.edad = "2";        
        censo5.departamento = "montevideo";        
        censo5.ocupacion = "dependiente";  
        censo5.Censista = this.listaCensistas[0];
        censo5.valido = true;
        this.censados.push(censo5);
        
        let censo6 = new Persona();
        censo6.nroCI = "59055747" ;
        censo6.nombre = "carlos";        
        censo6.apellido = "rodriguez";        
        censo6.edad = "16";        
        censo6.departamento = "montevideo";        
        censo6.ocupacion = "dependiente";  
        censo6.Censista = this.listaCensistas[1];
        censo6.valido = false;
        this.censados.push(censo6);
        
        let censo7 = new Persona();
        censo7.nroCI = "66433542" ;
        censo7.nombre = "sergio";        
        censo7.apellido = "rochet";        
        censo7.edad = "30";        
        censo7.departamento = "artigas";        
        censo7.ocupacion = "dependiente";  
        censo7.Censista = this.listaCensistas[1];
        censo7.valido = false;
        this.censados.push(censo7);
        
        let censo8 = new Persona();
        censo8.nroCI = "82491629" ;
        censo8.nombre = "franco";        
        censo8.apellido = "israel";        
        censo8.edad = "16";        
        censo8.departamento = "cerro largo";        
        censo8.ocupacion = "no trabaja";  
        censo8.Censista = this.listaCensistas[0];
        censo8.valido = false;
        this.censados.push(censo8);
        
        let censo9 = new Persona();
        censo9.nroCI = "5742980" ;
        censo9.nombre = "martín";        
        censo9.apellido = "campaña";        
        censo9.edad = "66";        
        censo9.departamento = "rivera";        
        censo9.ocupacion = "independiente";  
        censo9.Censista = this.listaCensistas[1];
        censo9.valido = false;
        this.censados.push(censo9);
        
        let censo10 = new Persona();
        censo10.nroCI = "44411857" ;
        censo10.nombre = "santiago";        
        censo10.apellido = "mele";        
        censo10.edad = "22";        
        censo10.departamento = "treinta y tres";        
        censo10.ocupacion = "independiente";  
        censo10.Censista = this.listaCensistas[2];
        censo10.valido = false;
        this.censados.push(censo10);
        
        let censo11 = new Persona();
        censo11.nroCI = "81320609" ;
        censo11.nombre = "santiago";        
        censo11.apellido = "gonzález";        
        censo11.edad = "2";        
        censo11.departamento = "tacuarembo";        
        censo11.ocupacion = "no trabaja";  
        censo11.Censista = this.listaCensistas[1];
        censo11.valido = true;
        this.censados.push(censo11);
        
        let censo12 = new Persona();
        censo12.nroCI = "15567786" ;
        censo12.nombre = "sebastián";        
        censo12.apellido = "cáceres";        
        censo12.edad = "80";        
        censo12.departamento = "maldonado";        
        censo12.ocupacion = "dependiente";  
        censo12.Censista = this.listaCensistas[0];
        censo12.valido = false;
        this.censados.push(censo12);
        
        let censo13 = new Persona();
        censo13.nroCI = "35314286" ;
        censo13.nombre = "lucas";        
        censo13.apellido = "olaza";        
        censo13.edad = "16";        
        censo13.departamento = "maldonado";        
        censo13.ocupacion = "independiente";  
        censo13.Censista = this.listaCensistas[1];
        censo13.valido = true;
        this.censados.push(censo13);
        
        let censo14 = new Persona();
        censo14.nroCI = "33613587" ;
        censo14.nombre = "guillermo";        
        censo14.apellido = "varela";        
        censo14.edad = "22";        
        censo14.departamento = "montevideo";        
        censo14.ocupacion = "dependiente";  
        censo14.Censista = this.listaCensistas[2];
        censo14.valido = false;
        this.censados.push(censo14);
        
        let censo15 = new Persona();
        censo15.nroCI = "9300209" ;
        censo15.nombre = "josé luis";        
        censo15.apellido = "rodriguez";        
        censo15.edad = "59";        
        censo15.departamento = "montevideo";        
        censo15.ocupacion = "independiente";  
        censo15.Censista = this.listaCensistas[2];
        censo15.valido = true;
        this.censados.push(censo15);
        
        let censo16 = new Persona();
        censo16.nroCI = "68556453" ;
        censo16.nombre = "alexis";        
        censo16.apellido = "rolín";        
        censo16.edad = "120";        
        censo16.departamento = "paysandu";        
        censo16.ocupacion = "dependiente";  
        censo16.Censista = this.listaCensistas[2];
        censo16.valido = false;
        this.censados.push(censo16);
        
        let censo17 = new Persona();
        censo17.nroCI = "91443691" ;
        censo17.nombre = "diego";        
        censo17.apellido = "laxalt";        
        censo17.edad = "15";        
        censo17.departamento = "montevideo";        
        censo17.ocupacion = "dependiente";  
        censo17.Censista = this.listaCensistas[0];
        censo17.valido = false;
        this.censados.push(censo17);
        
        let censo18 = new Persona();
        censo18.nroCI = "90770405" ;
        censo18.nombre = "matías";        
        censo18.apellido = "viña";        
        censo18.edad = "35";        
        censo18.departamento = "montevideo";        
        censo18.ocupacion = "independiente";  
        censo18.Censista = this.listaCensistas[0];
        censo18.valido = true;
        this.censados.push(censo18);
        
        let censo19 = new Persona();
        censo19.nroCI = "83302073" ;
        censo19.nombre = "mauricio";        
        censo19.apellido = "lemos";        
        censo19.edad = "57";        
        censo19.departamento = "montevideo";        
        censo19.ocupacion = "estudiante";  
        censo19.Censista = this.listaCensistas[1];
        censo19.valido = false;
        this.censados.push(censo19);
        
        let censo20 = new Persona();
        censo20.nroCI = "67331082" ;
        censo20.nombre = "leandro";        
        censo20.apellido = "cabrera";        
        censo20.edad = "77";        
        censo20.departamento = "paysandu";        
        censo20.ocupacion = "estudiante";  
        censo20.Censista = this.listaCensistas[1];
        censo20.valido = false;
        this.censados.push(censo20);
        
        let censo21 = new Persona();
        censo21.nroCI = "94317207" ;
        censo21.nombre = "bruno";        
        censo21.apellido = "méndez";        
        censo21.edad = "25";        
        censo21.departamento = "montevideo";        
        censo21.ocupacion = "dependiente";  
        censo21.Censista = this.listaCensistas[2];
        censo21.valido = false;
        this.censados.push(censo21);
        
        let censo22 = new Persona();
        censo22.nroCI = "69856353" ;
        censo22.nombre = "fabricio";        
        censo22.apellido = "díaz";        
        censo22.edad = "67";        
        censo22.departamento = "montevideo";        
        censo22.ocupacion = "dependiente";  
        censo22.Censista = this.listaCensistas[2];
        censo22.valido = false;
        this.censados.push(censo22);
        
        let censo23 = new Persona();
        censo23.nroCI = "1220697" ;
        censo23.nombre = "matías";        
        censo23.apellido = "vecino";        
        censo23.edad = "2";        
        censo23.departamento = "montevideo";        
        censo23.ocupacion = "estudiante";  
        censo23.Censista = this.listaCensistas[2];
        censo23.valido = true;
        this.censados.push(censo23);
        
        let censo24 = new Persona();
        censo24.nroCI = "61330894" ;
        censo24.nombre = "emiliano";        
        censo24.apellido = "martínez";        
        censo24.edad = "4";        
        censo24.departamento = "montevideo";        
        censo24.ocupacion = "independiente";  
        censo24.Censista = this.listaCensistas[0];
        censo24.valido = false;
        this.censados.push(censo24);
        
        let censo25 = new Persona();
        censo25.nroCI = "34680509" ;
        censo25.nombre = "facundo";        
        censo25.apellido = "pellistri";        
        censo25.edad = "99";        
        censo25.departamento = "salto";        
        censo25.ocupacion = "independiente";  
        censo25.Censista = this.listaCensistas[0];
        censo25.valido = true;
        this.censados.push(censo25);
        
        let censo26 = new Persona();
        censo26.nroCI = "22242961" ;
        censo26.nombre = "diego";        
        censo26.apellido = "rossi";        
        censo26.edad = "90";        
        censo26.departamento = "paysandu";        
        censo26.ocupacion = "dependiente";  
        censo26.Censista = this.listaCensistas[1];
        censo26.valido = false;
        this.censados.push(censo26);
        
        let censo27 = new Persona();
        censo27.nroCI = "95296347" ;
        censo27.nombre = "brian";        
        censo27.apellido = "rodríguez";        
        censo27.edad = "25";        
        censo27.departamento = "montevideo";        
        censo27.ocupacion = "estudiante";  
        censo27.Censista = this.listaCensistas[1];
        censo27.valido = true;
        this.censados.push(censo27);
        
        let censo28 = new Persona();
        censo28.nroCI = "28057803" ;
        censo28.nombre = "marcelo";        
        censo28.apellido = "saracchi";        
        censo28.edad = "18";        
        censo28.departamento = "durazno";        
        censo28.ocupacion = "estudiante";  
        censo28.Censista = this.listaCensistas[2];
        censo28.valido = false;
        this.censados.push(censo28);
        
        let censo29 = new Persona();
        censo29.nroCI = "13950151" ;
        censo29.nombre = "agustín";        
        censo29.apellido = "canobbio";        
        censo29.edad = "22";        
        censo29.departamento = "montevideo";        
        censo29.ocupacion = "estudiante";  
        censo29.Censista = this.listaCensistas[2];
        censo29.valido = true;
        this.censados.push(censo29);
        
        let censo30 = new Persona();
        censo30.nroCI = "82797431" ;
        censo30.nombre = "maximiliano";        
        censo30.apellido = "araújo";        
        censo30.edad = "4";        
        censo30.departamento = "montevideo";        
        censo30.ocupacion = "independiente";  
        censo30.Censista = this.listaCensistas[1];
        censo30.valido = true;
        this.censados.push(censo30);
        
        let censo31 = new Persona();
        censo31.nroCI = "97474333" ;
        censo31.nombre = "gastón";        
        censo31.apellido = "pereiro";        
        censo31.edad = "14";        
        censo31.departamento = "montevideo";        
        censo31.ocupacion = "independiente";  
        censo31.Censista = this.listaCensistas[0];
        censo31.valido = false;
        this.censados.push(censo31);
        
        let censo32 = new Persona();
        censo32.nroCI = "25979959" ;
        censo32.nombre = "rodrigo";        
        censo32.apellido = "zalazar";        
        censo32.edad = "55";        
        censo32.departamento = "salto";        
        censo32.ocupacion = "no trabaja";  
        censo32.Censista = this.listaCensistas[0];
        censo32.valido = false;
        this.censados.push(censo32);
        
        let censo33 = new Persona();
        censo33.nroCI = "92137592" ;
        censo33.nombre = "luis";        
        censo33.apellido = "suarez";        
        censo33.edad = "37";        
        censo33.departamento = "salto";        
        censo33.ocupacion = "no trabaja";  
        censo33.Censista = this.listaCensistas[1];
        censo33.valido = false;
        this.censados.push(censo33);
        
        let censo34 = new Persona();
        censo34.nroCI = "66768133" ;
        censo34.nombre = "felipe";        
        censo34.apellido = "carballo";        
        censo34.edad = "24";        
        censo34.departamento = "montevideo";        
        censo34.ocupacion = "independiente";  
        censo34.Censista = this.listaCensistas[1];
        censo34.valido = true;
        this.censados.push(censo34);
        
    }
    
    
}