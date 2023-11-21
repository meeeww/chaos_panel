import axios from "axios";
import api from "../../variables.json";

import { toast } from "sonner";

import getEpoch from "../utils/getEpoch";

import sendLog from "../utils/sendLog";

async function crearInhouse(fecha, resolve, reject, cambioDatos) {
    axios
        .post(api.directorio + "partidos/inhouses", { fecha: getEpoch(fecha) }, { headers: { "x-auth-token": localStorage.getItem("token") } })
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
}

async function eliminarUsuario(id, resolve, reject, cambioDatos) {
    axios
        .delete(api.directorio + "usuarios", { data: { id: id }, headers: { "x-auth-token": localStorage.getItem("token") } })
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

async function conseguirInhouses(setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "partidos/inhouses", { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(false);
        return respuesta.data;
    } catch (e) {
        console.log(e);
        throw e; // Debes relanzar el error para que pueda ser manejado en el código que llama a esta función
    }
}

async function conseguirInhousePorId(idInhouse, setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "partidos/inhouses/id=" + idInhouse, { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(false);
        return respuesta.data;
    } catch (e) {
        console.log(e);
        throw e; // Debes relanzar el error para que pueda ser manejado en el código que llama a esta función
    }
}

async function inscribirseInhouse(inhouse, usuario, side, posicion, cambioDatos, resolve, reject) {
    axios
        .put(
            api.directorio + "partidos/inhouses",
            { id_inhouse: inhouse, id_usuario: usuario, side: side, posicion: posicion },
            { headers: { "x-auth-token": localStorage.getItem("token") } }
        )
        .then(function () {
            cambioDatos(true);
            sendLog(usuario, "Inscribirse", { id_inhouse: inhouse, id_usuario: usuario, side: side, posicion: posicion });
            resolve();
        })
        .catch(function () {
            reject();
        });
}

async function actualizarUsuario(usuario, columna, valor, cambioDatos, resolve, reject) {
    axios
        .put(
            api.directorio + "usuarios",
            { id_usuario: usuario.jugador.id_usuario, columna: columna, valor: valor },
            { headers: { "x-auth-token": localStorage.getItem("token") } }
        )
        .then(function () {
            cambioDatos(true);
            sendLog(usuario.jugador.id_usuario, "Actualizar Usuario", { id: usuario.jugador.id_usuario });
            resolve();
        })
        .catch(function () {
            reject();
        });
}

export { crearInhouse, eliminarUsuario, conseguirInhouses, conseguirInhousePorId, inscribirseInhouse, actualizarUsuario };
