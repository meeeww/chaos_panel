import axios from "axios";
import api from "../../variables.json";

import sendLog from "../utils/sendLog";
import { toast } from "sonner";

async function actualizarPerfil(usuario, columna, valor, cambioDatos, resolve, reject) {
    console.log(usuario);
    axios
        .put(
            api.directorio + "usuarios",
            { id_usuario: usuario.info.id_usuario, columna: columna, valor: valor },
            { headers: { "x-auth-token": localStorage.getItem("token") } }
        )
        .then(function () {
            cambioDatos(true);
            sendLog(usuario.info.id_usuario, "Actualizar Perfil", { id: usuario.info.id_usuario });
            resolve();
        })
        .catch(function () {
            reject();
        });
}

export { actualizarPerfil };
