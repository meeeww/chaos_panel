import getPerms from "../utils/getPerms.js"

export default class User {
    constructor(){
        this.informacion
        this.nombrerol
    }
    
    setInformacion(informacion){
        this.informacion = informacion
        this.nombrerol = getPerms(informacion.rol)
    }
}