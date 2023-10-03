import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Chip } from "@nextui-org/react";

import axios from "axios";
import api from "../../../variables.json"

import ModalEquipos from "./Modals/ModalEditar";

import { columns } from "./data";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

export default function Equipo() {

    const [cambioDeDatos, setCambioDeDatos] = useState(false)
    const [equipo, setEquipo] = useState()
    const [cargando, setCargando] = useState(true)

    const [ligas, setLigas] = useState()
    const [temporadas, setTemporadas] = useState()

    useEffect(() => {
        setCambioDeDatos(false)
        axios.get(api.directorio + "equipos/id=" + urlParams.get('id')).then((equipo) => {
            setEquipo(equipo.data[0])
            setCargando(false)
        })
        axios.get(api.directorio + "ligas").then((liga) => {
            setLigas(liga.data)
        })
        axios.get(api.directorio + "temporadas").then((temporada) => {
            setTemporadas(temporada.data)
        })
    }, [cambioDeDatos])

    const renderChip = (activo) => {
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

    if (cargando) {
        return (<div>yo</div>)
    }

    return (
        <>
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
                        {renderChip(equipo.activa)}
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex flex-col gap-2">
                        {columns.map((columna) => (
                            <div key={columna.name} className="flex items-center justify-between">
                                <p className="text-sm w-[5rem]">{columna.name}</p>
                                <p className="text-md font-[500] text-center w-[9rem]">{equipo[columna.uid]}</p>
                                <ModalEquipos equipo={equipo} columna={columna} cambioDatos={setCambioDeDatos} ligas={ligas} temporadas={temporadas} />
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
                        Visitar Página del Equipo
                    </Link>
                </CardFooter>
            </Card>
        </>
    )
}