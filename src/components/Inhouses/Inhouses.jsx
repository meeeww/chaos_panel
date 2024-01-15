/* eslint-disable react/prop-types */
import { useState } from "react";
import TablaUsuarios from "./Components/TablaUsuarios";

export default function Inhouse({ inhouse, setCambioDatos, cambioDatos }) {

    const [jugadoresBlue, setJugadoresBlue] = useState(JSON.parse(inhouse.jugadores_blue))
    const [jugadoresRed, setJugadoresRed] = useState(JSON.parse(inhouse.jugadores_red))

    if (Object.keys(jugadoresBlue).length) {
        return (
            <TablaUsuarios inhouse={inhouse} jugadoresBlue={jugadoresBlue} jugadoresRed={jugadoresRed} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos} />
        )
    }
}