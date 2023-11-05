import axios from "axios";
import api from "../../variables.json";

import { toast } from "sonner";

import sendLog from "../utils/sendLog";

async function crearEquipo(nombre, formdata, resolve, reject, cambioDatos) {
    axios.get(api.directorio + "equipos/nombre=" + nombre, { headers: { "x-auth-token": localStorage.getItem("token") } }).then(function (comprobacion) {
        if (comprobacion.data.result.length == 0) {
            axios
                .post(
                    api.directorio + "equipos", formdata,
                    { headers: { "x-auth-token": localStorage.getItem("token") } }
                )
                .then(function (respuesta) {
                    if (respuesta.data.status == 200) {
                        cambioDatos(true);
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(function () {
                    reject();
                });
        } else {
            toast.error("Este equipo ya existe.");
            reject();
        }
    });
}

async function eliminarEquipo(id, resolve, reject, cambioDatos) {
    axios
        .delete(api.directorio + "equipos", { data: { id: id }, headers: { "x-auth-token": localStorage.getItem("token") } })
        .then(function (respuesta) {
            if (respuesta.data.status == 200) {
                cambioDatos(true);
                resolve();
            } else {
                reject();
            }
            //sendLog(49, "Borrar Usuario", { id_usuario: equipo["equipo"].id_usuario, nombre_usuario: equipo["equipo"].nombre_usuario, apellido_usuario: equipo["equipo"].apellido_usuario, nick_usuario: equipo["equipo"].nick_usuario, rol_usuario: equipo["equipo"].rol })
        })
        .catch(function () {
            reject();
        });
}

async function conseguirEquipos(setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "equipos", { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(false);
        return respuesta.data;
    } catch (e) {
        console.log(e);
        throw e; // Debes relanzar el error para que pueda ser manejado en el código que llama a esta función
    }
}

export { crearEquipo, eliminarEquipo, conseguirEquipos };
