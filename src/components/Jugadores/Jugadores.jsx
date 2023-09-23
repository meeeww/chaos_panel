import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Chip } from "@nextui-org/react";

import axios from "axios";
import api from "../../../variables.json"

import ModalJugadores from "./Modals/ModalEditar";

import { columns } from "./data";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

export default function Jugador() {

    const [cambioDeDatos, setCambioDeDatos] = useState(false)
    const [jugador, setJugador] = useState()
    const [cargando, setCargando] = useState(true)

    const [equipo, setEquipo] = useState()
    const [equipoCargando, setEquipoCargando] = useState(true)

    const [cuentas, setCuentas] = useState()
    const [cuentaCargando, setCuentasCargando] = useState(true)

    useEffect(() => {
        setCambioDeDatos(false)
        axios.get(api.directorio + "usuarios/id=" + urlParams.get('id')).then((jugador) => {
            setJugador(jugador.data[0])
            axios.get(api.directorio + "usuarios/equipo/id=" + urlParams.get('id')).then((equipos) => {
                setEquipo(equipos.data[0])
                setEquipoCargando(false)
                axios.get(api.directorio + "usuarios/cuentas/id=" + urlParams.get('id')).then((cuentas) => {
                    setCuentas(cuentas.data)
                })
            })
            setCargando(false)
        })
    }, [cambioDeDatos])

    const renderChip = () => {
        if (jugador.id_discord != null) {
            return (
                <Chip
                    startContent={<i className="fa-brands fa-discord"></i>}
                    variant="flat"
                    color="primary"
                    className="pl-2"
                >
                    {jugador.id_discord}
                </Chip>
            )
        }
    }

    const renderChipEquipo = (activo) => {
        switch (activo) {
            case 0:
                return (
                    <Chip
                        startContent={<i className="fa-solid fa-xmark"></i>}
                        variant="flat"
                        color="danger"
                        className="pl-2"
                    >
                        Inactivo
                    </Chip>
                )
            case 1:
                return (
                    <Chip
                        startContent={<i className="fa-solid fa-check"></i>}
                        variant="flat"
                        color="success"
                        className="pl-2"
                    >
                        Activo
                    </Chip>
                )
        }
    }

    const renderEquipo = () => {
        if (!equipoCargando && equipo.length != 0) {
            return (
                <Card className="max-w-[400px]">
                    <CardHeader className="flex gap-3">
                        <Image
                            alt="Logo Equipo"
                            height={100}
                            radius="sm"
                            src={(api.directorio + "images/" + equipo.logo_equipo)}
                            width={100}
                        />
                        <div className="flex flex-col gap-2">
                            <p className="text-md">{equipo.nombre_equipo}</p>
                            {renderChipEquipo(equipo.activa)}
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="flex flex-col gap-2">
                            {columns.map((columna) => (
                                <div key={columna.name} className="flex items-center justify-between">
                                    <p className="text-sm w-[5rem]">{columna.name}</p>
                                    <p className="text-md font-[500] text-center w-[9rem]">{equipo[columna.uid]}</p>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Link
                            isExternal
                            showAnchorIcon
                            href={"/equipo?id=" + equipo.id_equipo}
                        >
                            Visitar Página del Equipo
                        </Link>
                    </CardFooter>
                </Card>
            )
        }
    }

    if (cargando) {
        return (<div>yo</div>)
    }

    return (
        <>
            <div className="flex gap-16">
                <Card className="max-w-[400px]">
                    <CardHeader className="flex gap-3">
                        <Image
                            alt="Logo Usuario"
                            height={100}
                            radius="sm"
                            src={("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/" + jugador.icono + ".jpg")}
                            width={100}
                        />
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-1">
                                <p className="text-md">{jugador.nombre_usuario}</p>
                                <p className="text-md">{jugador.apellido_usuario}</p>
                            </div>
                            <p className="text-md">{jugador.nick_usuario}</p>
                            {renderChip()}
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="flex flex-col gap-2">
                            {columns.map((columna) => (
                                <div key={columna.name} className="flex items-center justify-between">
                                    <p className="text-sm w-[5rem]">{columna.name}</p>
                                    <p className="text-md font-[500] text-center w-[9rem]">{jugador[columna.uid]}</p>
                                    <ModalJugadores jugador={jugador} columna={columna} cambioDatos={setCambioDeDatos} />
                                </div>
                            ))}
                        </div>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Link
                            isExternal
                            showAnchorIcon
                            href="#"
                        >
                            Visitar Página del Usuario
                        </Link>
                    </CardFooter>
                </Card>
                {renderEquipo()}
            </div>
        </>
    )
}