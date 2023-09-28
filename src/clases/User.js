import getPerms from "../utils/getPerms.js";

export default class User {
  constructor() {
    this.informacion;
    this.nombrerol;
  }

  setInformacion(informacion) {
    if (informacion != undefined) {
      this.informacion = informacion;
      this.nombrerol = getPerms(informacion.rol);
    }
  }
}
