/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Chip } from "@nextui-org/react";

import api from "../../../variables.json"

import ModalJugadores from "./Modals/ModalEditar";

import Cuentas from "../../pages/Perfil/Cuentas";

import { columns } from "./data";
import { columnsEquipo } from "../Equipos/data";

import getEdad from "../../utils/getEdad";
import getPerms from "../../utils/getPerms"
import Enlazar from "../../pages/Perfil/Enlazamientos";

export default function Jugador({ usuario, cambioDatos }) {

    console.log(usuario)

    console.log(cambioDatos)

    const [jugador] = useState(usuario.info)
    const [equipo] = useState(usuario.equipo)
    const [cuentas] = useState(usuario.cuentas)

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
        if (equipo.length != 0) {
            return (
                <Card className="max-w-[300px] w-full">
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
                            {columnsEquipo.map((columna) => (
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

    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="flex gap-16">
                    <Card className="max-w-[300px] w-full">
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
                                <p className="text-md">{jugador.nombre_equipo}</p>
                                {renderChip()}
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <div className="flex flex-col gap-2">
                                {columns.map((columna) => {
                                    if (columna.name == "Edad") {
                                        return (
                                            <div key={columna.name} className="flex items-center justify-between">
                                                <p className="text-sm w-[5rem]">{columna.name}</p>
                                                <p className="text-md font-[500] text-center w-[9rem]">{getEdad(jugador[columna.uid])}</p>
                                                {/* <ModalJugadores jugador={jugador} columna={columna} cambioDatos={cambioDatos} equipos={listaEquipos} /> */}
                                            </div>
                                        )
                                    } else if (columna.name == "Contraseña") {
                                        return (
                                            <div key={columna.name} className="flex items-center justify-between">
                                                <p className="text-sm w-[5rem]">{columna.name}</p>
                                                <p className="text-md font-[500] text-center w-[9rem]">--</p>
                                                {/* <ModalJugadores jugador={jugador} columna={columna} cambioDatos={setCambioDeDatos} equipos={listaEquipos} /> */}
                                            </div>
                                        )
                                    } else if (equipo && columna.name == "Equipo") {
                                        return (
                                            <div key={columna.name} className="flex items-center justify-between">
                                                <p className="text-sm w-[5rem]">{columna.name}</p>
                                                <p className="text-md font-[500] text-center w-[9rem]">{equipo["nombre_equipo"]}</p>
                                                {/* <ModalJugadores jugador={jugador} columna={columna} cambioDatos={setCambioDeDatos} /> */}
                                            </div>
                                        )
                                    } else if (columna.name == "Rol") {
                                        return (
                                            <div key={columna.name} className="flex items-center justify-between">
                                                <p className="text-sm w-[5rem]">{columna.name}</p>
                                                <p className="text-md font-[500] text-center w-[9rem]">{getPerms(jugador[columna.uid])}</p>
                                                {/* <ModalJugadores jugador={jugador} columna={columna} cambioDatos={setCambioDeDatos} equipos={listaEquipos} /> */}
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={columna.name} className="flex items-center justify-between">
                                                <p className="text-sm w-[5rem]">{columna.name}</p>
                                                <p className="text-md font-[500] text-center w-[9rem]">{jugador[columna.uid]}</p>
                                                <ModalJugadores jugador={jugador} columna={columna} cambioDatos={cambioDatos} equipos={listaEquipos} />
                                            </div>
                                        )
                                    }
                                })}
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
                    <div className="flex w-[400px] gap-4">
                        {<Enlazar usuario={usuario} cambioDatos={cambioDatos} />}
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    {<Cuentas usuario={usuario} cambioDatos={cambioDatos} />}
                </div>
            </div>
        </>
    )
}