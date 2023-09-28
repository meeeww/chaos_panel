import axios from "axios";
import api from "../../variables.json";

import User from "../clases/User";

const checkSessionInicio = (setUsuario, setCargando) => {
  axios
    .get(api.directorio + "buscarsesion/token=" + localStorage.getItem("token"))
    .then((check) => {
      let usuario = new User();
      usuario.setInformacion(check.data[0]);
      setUsuario(usuario);
      setCargando(false);
    })
};

export default checkSessionInicio;