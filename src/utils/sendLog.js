import axios from "axios"
import api from "../../variables.json"

export default function sendLog(s_id, s_accion, s_info){
    axios.post(api.directorio + "log", { id_usuario: s_id, fecha: Math.floor(new Date().getTime() / 1000.0), accion: s_accion, info: JSON.stringify(s_info) })
}