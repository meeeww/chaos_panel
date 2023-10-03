import axios from "axios";
import api from "../../variables.json";

const validarEnlace = (datos) => {
  axios
    .get(api.directorio + "buscarsesion/token=" + localStorage.getItem("token"))
    .then((check) => {
      
    })
    .finally(() => {
      
    });
};

export default validarEnlace;
