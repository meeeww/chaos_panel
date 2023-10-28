import axios from "axios";
import api from "../../variables.json";

const checkSession = (setCargando = null) => {
    if (localStorage.getItem("token")) {
        axios.post(api.directorio + "auth", { type: "inicio", token: localStorage.getItem("token") }).then((check) => {
            if (check.data.status == 200) {
                localStorage.setItem("token", check.data["token"]);
                returnSession(check.data["token"])
                window.location.replace("/perfil");
                setCargando(false);
            }
        });
    }
};

const returnSession = async (setCargando = null, token) => {
    if (token) {
        const response = await axios.post(api.directorio + "auth", { type: "buscar", token });
        console.log(response.data)
        if (response.data.status === 200) {
            localStorage.setItem("usuario", JSON.stringify(response.data.result))
            setCargando(false);
            return response.data.result;
        }
    } else {
        window.location.replace("/iniciosesion");
    }
};

export { checkSession, returnSession };
