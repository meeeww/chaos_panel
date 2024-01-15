import axios from "axios";
import api from "../../variables.json";

import sendLog from "../utils/sendLog";
import { toast } from "sonner";

async function actualizarEnlace(data, columna, valor, resolve, reject, cambioDatos) {
    axios
        .put(
            api.directorio + "usuarios/enlaces",
            { id_usuario: data.info.id_usuario, columna: columna, valor: valor },
            { headers: { "x-auth-token": window.localStorage.getItem("token") } }
        )
        .then(function (check) {
            if (check.data.status == 200) {
                sendLog(data.info.id_usuario, "Añadir Enlaze", {
                    accion: "Añadido Enlace",
                    columna: columna,
                    cuenta: valor,
                    token: window.localStorage.getItem("token"),
                });
                cambioDatos(true);
                resolve();
            } else if (check.data.status == 409) {
                toast.error("La cuenta ya ha sido vinculada.");
                reject();
            }
        })
        .catch(function () {
            reject();
        });
}

async function eliminarEnlace(data, columna, resolve, reject, cambioDatos) {
    axios
        .delete(api.directorio + "usuarios/enlaces", {
            data: { id_usuario: data.info.id_usuario, columna: columna },
            headers: { "x-auth-token": window.localStorage.getItem("token") },
        })
        .then(function (check) {
            if (check.data.status == 200) {
                sendLog(data.info.id_usuario, "Eliminar Enlaze", {
                    accion: "Eliminar Enlace",
                    columna: columna,
                    token: window.localStorage.getItem("token"),
                });
                cambioDatos(true);
                resolve();
            } else if (check.data.status == 409) {
                toast.error("La cuenta ya ha sido vinculada.");
                reject();
            } else if (check.data.status == 401) {
                toast.error("No tienes permisos para hacer esto.");
                reject();
            }
        })
        .catch(function () {
            reject();
        });
}

export { actualizarEnlace, eliminarEnlace };
