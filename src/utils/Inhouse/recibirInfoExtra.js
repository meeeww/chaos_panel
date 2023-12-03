import axios from "axios";
import api from "../../../variables.json";

async function obtenerInformacionAdicional(jugadores, token) {
    const jugadoresConId = Object.keys(jugadores).filter((key) => jugadores[key].id !== null);
    const apiUrl = api.directorio + "usuarios/id=";

    const peticiones = jugadoresConId.map((key) => {
        const jugador = jugadores[key];
        const jugadorId = jugador.id;
        const jugadorUrl = `${apiUrl}${jugadorId}`;

        return axios.get(jugadorUrl, { headers: { "x-auth-token": token } })
            .then((response) => ({ key, data: response.data.result.info }))
            .catch((error) => ({ key, error }));
    });

    const resultados = await Promise.all(peticiones);

    resultados.forEach(({ key, data }) => {
        if (!data.error) {
            jugadores[key] = { ...jugadores[key], ...data };
        }
    });

    return jugadores;
}

async function encontrarPrimeraPosicionConIdNull(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === null) {
            return i; // Devuelve la posición donde se encontró el primer id null
        }
    }
    return -1; // Devuelve -1 si no se encontró ningún id null
}

export {obtenerInformacionAdicional, encontrarPrimeraPosicionConIdNull}