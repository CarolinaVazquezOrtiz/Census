
//clase Censista
class Censista{
    static idCensista =0;
    constructor(){
        this.id = Censista.idCensista++;
        this.usuario;
        this.password;        
        this.nombreCompleto;        
    }
}

//clase Persona u Invitado
class Persona{
    static idPersona = 0;
    constructor(){
        this.id = Persona.idPersona++;
        this.nroCI;
        this.nombre;        
        this.apellido;        
        this.edad;        
        this.departamento;        
        this.ocupacion; 
        this.Censista = null; // asignacion al censista
        this.valido=false;  //Censo pendiente de validar       
    }
}