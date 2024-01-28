import axios from "axios";
import api from "../../variables.json";
import getPosition from "../utils/getPosition";
import sendLog from "../utils/sendLog";
import { toast } from "sonner";

async function actualizarEnlace(usuario, cuentaLoL, columna, valor, resolve, reject, cambioDatos, setCambioDatos, modificarCuenta = false) {
    const body = modificarCuenta ? {
        id_usuario: usuario.info.id_usuario,
        id: cuentaLoL.id_cuenta,
        invocador: valor,
        tag: modificarCuenta[0],
        puuid_lol: cuentaLoL.puuid_lol,
        linea_principal: getPosition(modificarCuenta[1]),
        linea_secundaria: getPosition(modificarCuenta[2])
    } : {
        columna: columna,
        id_usuario: usuario.info.id_usuario,
        valor: valor,
    };

    try {
        const response = await axios.put(api.directorio + (modificarCuenta ? "cuentas" : "usuarios/enlaces"), body, {
            headers: { "x-auth-token": window.localStorage.getItem("token") }
        });
        if (response.data.status == 200) {
            sendLog(usuario.info.id_usuario, modificarCuenta ? "Modificar Cuenta" : "Añadir Enlace", {
                accion: modificarCuenta ? "Modificar Cuenta" : "Añadir Enlace",
                id_usuario: usuario.info.id_usuario,
                body
            });
            setCambioDatos(!cambioDatos);
            resolve();
        } else if (response.data.status == 500) {
            toast.error("Error. Avisa a la administración.");
            reject();
        } else if (response.data.status == 409) {
            toast.error("La cuenta ya ha sido vinculada.");
            reject();
        }
    } catch (error) {
        console.log(error);
        reject();
    }
}

async function eliminarEnlace(data, columna, resolve, reject, cambioDatos, setCambioDatos) {
    try {
        const check = await axios.delete(api.directorio + "usuarios/enlaces", {
            data: { id_usuario: data.info.id_usuario, columna: columna },
            headers: { "x-auth-token": window.localStorage.getItem("token") },
        });

        if (check.data.status == 200) {
            sendLog(data.info.id_usuario, "Eliminar Enlaze", {
                accion: "Eliminar Enlace",
                columna: columna,
                token: window.localStorage.getItem("token"),
            });
            setCambioDatos(!cambioDatos);
            resolve();
        } else if (check.data.status == 409) {
            toast.error("La cuenta ya ha sido vinculada.");
            reject();
        } else if (check.data.status == 401) {
            toast.error("No tienes permisos para hacer esto.");
            reject();
        }
    } catch (error) {
        reject();
    }
}

export { actualizarEnlace, eliminarEnlace };
