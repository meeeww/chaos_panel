import axios from "axios";
import api from "../../variables.json";

import { returnSession } from "./sessions";

async function checkToken(nick, contra, resolve, reject) {
    if (nick && contra) {
        axios.post(api.directorio + "auth", { type: "main", nick: nick, contra: contra }).then((check) => {
            if (check.data["status"] == 200) {
                localStorage.setItem("token", check.data["token"]);
                returnSession(check.data["token"])
                window.location.replace("/perfil");
                resolve();
            } else {
                reject();
            }
        });
    }
}

async function createToken(data, contrasenaEncriptada, resolve, reject){
    axios.post(api.directorio + "auth", {type: "registro", datos: data, contra: contrasenaEncriptada}).then((response) => {
        if(response.data.status == 200){
            axios.post(api.directorio + "auth", { type: "main", nick: data.usuario, contra: contrasenaEncriptada }).then((check) => {
                if (check.data["status"] == 200) {
                    localStorage.setItem("token", check.data["token"]);
                    returnSession(check.data["token"])
                    window.location.replace("/perfil");
                    resolve();
                } else {
                    reject();
                }
            });
        } else {
            reject()
        }
    })
}

export {checkToken, createToken};
