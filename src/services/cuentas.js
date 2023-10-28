import axios from "axios";
import api from "../../variables.json";

import sendLog from "../utils/sendLog";
import { toast } from "sonner";

async function crearCuenta(valor, tag = "EUW", valorPrimaria, valorSecundaria, usuario, resolve, reject, cambioDatos) {
    let principal = "";
    let secundaria = "";

    axios
        .get(api.directorio + "cuentas/nombre=" + valor + "&tag=" + tag, { headers: { "x-auth-token": window.localStorage.getItem("token") } })
        .then((cuentaComprobacion) => {
            if (cuentaComprobacion.data.existe) {
                toast.error("Esta cuenta ya ha sido vinculada.");
            } else if (cuentaComprobacion.data.existe == false && cuentaComprobacion.data.success == false) {
                toast.error("Esta cuenta no existe.");
            } else {
                switch (valorPrimaria) {
                    case 1:
                        principal = "Toplane";
                        break;
                    case 2:
                        principal = "Jungla";
                        break;
                    case 3:
                        principal = "Midlane";
                        break;
                    case 4:
                        principal = "ADC";
                        break;
                    case 5:
                        principal = "Support";
                        break;
                }

                switch (valorSecundaria) {
                    case 1:
                        secundaria = "Toplane";
                        break;
                    case 2:
                        secundaria = "Jungla";
                        break;
                    case 3:
                        secundaria = "Midlane";
                        break;
                    case 4:
                        secundaria = "ADC";
                        break;
                    case 5:
                        secundaria = "Support";
                        break;
                }
                axios
                    .post(
                        api.directorio + "cuentas",
                        {
                            id_usuario: usuario.info["id_usuario"],
                            invocador: cuentaComprobacion.data.result.gameName,
                            tag: cuentaComprobacion.data.result.tagLine,
                            puuid: cuentaComprobacion.data.result.puuid,
                            linea_principal: principal,
                            linea_secundaria: secundaria,
                        },
                        { headers: { "x-auth-token": window.localStorage.getItem("token") } }
                    )
                    .then(function (responsePost) {
                        if (responsePost.data.status == 200) {
                            sendLog(usuario.info["id_usuario"], "Añadir Cuenta", {
                                accion: "Añadir Cuenta",
                                id_usuario: usuario.info["id_usuario"],
                                invocador: valor,
                                tag: tag,
                                puuid: cuentaComprobacion.data.result.puuid,
                                linea_principal: principal,
                                linea_secundaria: secundaria,
                            });
                            cambioDatos(true);
                            resolve();
                        } else if (responsePost.data.status == 500) {
                            toast.error("Error. Avisa a la administración.");
                            reject();
                        }
                    })
                    .catch(function () {
                        reject();
                    });
            }
        });
}

async function eliminarCuenta(data, resolve, reject, cambioDatos) {
    axios
        .delete(api.directorio + "cuentas", {
            data: { id_cuenta: data.cuenta["id_cuenta"], id_usuario: data.cuenta["id_usuario"] },
            headers: { "x-auth-token": window.localStorage.getItem("token") },
        })
        .then(function (responsePost) {
            if (responsePost.data.status == 200) {
                sendLog(data.cuenta["id_usuario"], "Eliminar Cuenta", {
                    accion: "Añadir Cuenta",
                    id_cuenta: data.cuenta["id_cuenta"],
                });
                cambioDatos(true);
                resolve();
            } else if (responsePost.data.status == 500) {
                toast.error("Error. Avisa a la administración.");
                reject();
            }
        })
        .catch(function () {
            reject();
        });
}

export { crearCuenta, eliminarCuenta };
