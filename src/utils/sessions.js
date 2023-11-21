import axios from "axios";
import api from "../../variables.json";

const checkSession = (setCargando) => {
    if (localStorage.getItem("token")) {
        axios.post(api.directorio + "auth", { type: "inicio", token: localStorage.getItem("token") }).then((check) => {
            if (check.data.status == 200) {
                localStorage.setItem("token", check.data["token"]);
                returnSession(check.data["token"]);
                window.location.replace("/perfil");
                if (setCargando != undefined) setCargando(false);
            }
        });
    }
};

const returnSession = async (token, setCargando) => {
    if (token) {
        const response = await axios.post(api.directorio + "auth", { type: "buscar", token: token });
        if (response.data.status === 200) {
            localStorage.setItem("usuario", JSON.stringify(response.data.result));
            if (setCargando != undefined) setCargando(false);
            return response.data.result;
        }
    } else {
        window.location.replace("/iniciosesion");
    }
};

const returnSessionInicio = async (token, setCargando) => {
    if (token) {
        const response = await axios.post(api.directorio + "auth", { type: "buscar", token: token });
        if (response.data.status === 200) {
            localStorage.setItem("usuario", JSON.stringify(response.data.result));
            if (setCargando != undefined) setCargando(false);
            window.location.replace("/perfil");
            return response.data.result;
        }
    } else {
        window.location.replace("/iniciosesion");
    }
};

export { checkSession, returnSession, returnSessionInicio };
