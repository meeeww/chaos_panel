import axios from "axios";
import api from "../../variables.json";
import md5 from "md5";

import { toast } from "sonner";

import sendLog from "../utils/sendLog";

async function crearUsuario(nombre, apellido, nick, edad, rol, contra, resolve, reject, cambioDatos) {
    const encriptarPass = () => {
        return new Promise((resolve) => {
            resolve(md5(contra));
        });
    };

    encriptarPass().then(
        axios.get(api.directorio + "usuarios/nombre=" + nick, { headers: { "x-auth-token": localStorage.getItem("token") } }).then(function(comprobacion){
            if(comprobacion.data.result.length == 0){
                axios
                .post(
                    api.directorio + "usuarios",
                    { nombre: nombre, apellido: apellido, nick: nick, edad: edad, rol: rol, contra: contra },
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
                })
            } else {
                toast.error("Este usuario ya existe.")
                reject()
            }
        })
        
    );
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

async function conseguirUsuarios(setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "usuarios", { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(false);
        return respuesta.data;
    } catch (e) {
        console.log(e);
        throw e; // Debes relanzar el error para que pueda ser manejado en el código que llama a esta función
    }
}

async function conseguirUsuarioPorId(idUsuario, setCambioDatos) {
    try {
        const respuesta = await axios.get(api.directorio + "usuarios/id=" + idUsuario, { headers: { "x-auth-token": localStorage.getItem("token") } });
        setCambioDatos(false);
        return respuesta.data;
    } catch (e) {
        console.log(e);
        throw e; // Debes relanzar el error para que pueda ser manejado en el código que llama a esta función
    }
}

async function actualizarPerfil(usuario, columna, valor, cambioDatos, resolve, reject) {
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

async function actualizarUsuariosMasaRoles(usuarios, valor, cambioDatos, resolve, reject) {
    axios
        .put(
            api.directorio + "usuarios/masa/roles",
            { id_usuario: usuarios, valor: valor },
            { headers: { "x-auth-token": localStorage.getItem("token") } }
        )
        .then(function () {
            cambioDatos(true);
            //sendLog(usuario.jugador.id_usuario, "Actualizar Usuarios En Masa", { id: usuario.jugador.id_usuario });
            resolve();
        })
        .catch(function () {
            reject();
        });
}

async function actualizarUsuariosMasaEquipos(usuarios, valor, cambioDatos, resolve, reject) {
    axios
        .put(
            api.directorio + "usuarios/masa/equipos",
            { id_usuario: usuarios, valor: valor },
            { headers: { "x-auth-token": localStorage.getItem("token") } }
        )
        .then(function () {
            cambioDatos(true);
            //sendLog(usuario.jugador.id_usuario, "Actualizar Usuarios En Masa", { id: usuario.jugador.id_usuario });
            resolve();
        })
        .catch(function () {
            reject();
        });
}

export { crearUsuario, eliminarUsuario, conseguirUsuarios, conseguirUsuarioPorId, actualizarPerfil, actualizarUsuario, actualizarUsuariosMasaRoles, actualizarUsuariosMasaEquipos };
