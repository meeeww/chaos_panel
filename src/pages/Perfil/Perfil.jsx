import { useState, useEffect } from "react";

import Layout from "../../components/Layout/Layout.jsx"
import { Card, CardHeader, CardBody, Image, Divider, Button } from "@nextui-org/react";

import axios from "axios";
import api from "../../../variables.json"

import ModalPerfil from "./ModalEditar/ModalEditar.jsx";
import CuentasTabla from "./Cuentas.jsx";

import checkSession from "../../utils/checkSession.js";
import returnSession from "../../utils/returnSession";
import getPerms from "../../utils/getPerms.js";
import getEdad from "../../utils/getEdad.js";

import { columns } from "./ModalEditar/data";

export default function Perfil() {

  const [usuario, setUsuario] = useState()
  const [equipo, setEquipo] = useState()
  const [cargando, setCargando] = useState(true)
  const [extraData, setExtraData] = useState(false)
  const [seguridad, setSeguridad] = useState(false)
  const [cuentas, setCuentas] = useState()
  const [cambioDatos, setCambioDeDatos] = useState(false)

  useEffect(() => {
    setCambioDeDatos(false)
    checkSession(setUsuario, setCargando, setSeguridad)
    if (!cargando) {
      returnSession(usuario)
    }
    if (usuario != undefined) {
      if (Object.keys(usuario).length != 0) {
        axios.get(api.directorio + "usuarios/cuentas/id=" + usuario.informacion.id_usuario).then((cuenta) => {
          setCuentas(cuenta.data)
          axios.get(api.directorio + "usuarios/equipo/id=" + usuario.informacion.id_usuario).then((equipito) => {
            setEquipo(equipito.data[0])
            setExtraData(true)
          })
        })
      }
    }
  }, [cargando, cambioDatos])

  if (usuario == undefined) {
    if (seguridad) {
      window.location.replace("/iniciosesion")
    }
    return <></>
  } else {
    if (Object.keys(usuario).length == 0) {
      window.location.replace("/iniciosesion")
    }
  }

  return (
    <Layout info={usuario}>
      <div className="flex justify-between mr-16">
        <Card className="py-4 w-[45%] max-h-[713.69px]">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/5000.jpg"}
              width={270}
            />
          </CardHeader>
          <Divider className="my-8" />
          <CardBody className="py-2">
            <div className="flex mb-[3rem] justify-between items-center">
              <h4 className="font-[800] text-4xl">Mi Perfil</h4>
              <h6 className="font-[300] text-bs pr-6">{usuario.informacion.nombre_usuario + " " + usuario.informacion.apellido_usuario}</h6>
            </div>
            <div className="overflow-y-auto no-scrollbar pr-4">
              <div className="flex flex-col gap-2">
                {columns.map((columna) => {
                  switch (columna.name) {
                    case "Rol":
                      return (
                        <div key={columna.name}>
                          <div className="flex justify-between items-center">
                            <p>{columna.name}</p>
                            <div className="flex justify-center items-center gap-4">
                              <p className="font-[600] text-lg">{getPerms(usuario.informacion[columna.uid])}</p>
                              {extraData ? <ModalPerfil jugador={usuario} columna={columna} cambioDatos={setCambioDeDatos} equipo={equipo} /> : <></>}
                            </div>
                          </div>
                          <Divider className="my-2" />
                        </div>
                      )
                    case "Edad":
                      return (
                        <div key={columna.name}>
                          <div className="flex justify-between items-center">
                            <p>{columna.name}</p>
                            <div className="flex justify-center items-center gap-4">
                              {extraData ? <ModalPerfil jugador={usuario} columna={columna} cambioDatos={setCambioDeDatos} equipo={equipo} /> : <></>}
                            </div>
                          </div>
                          <Divider className="my-2" />
                        </div>
                      )
                    default:
                      return (
                        <div key={columna.name}>
                          <div className="flex justify-between items-center">
                            <p>{columna.name}</p>
                            <div className="flex justify-center items-center gap-4">
                              <p className="font-[600] text-lg">{usuario.informacion[columna.uid]}</p>
                              {extraData ? <ModalPerfil jugador={usuario} columna={columna} cambioDatos={setCambioDeDatos} equipo={equipo} /> : <></>}
                            </div>
                          </div>
                          <Divider className="my-2" />
                        </div>
                      )
                  }
                })}
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="flex flex-col w-[50%] gap-4">
          {cuentas == undefined ? <></> : <CuentasTabla cuentas={cuentas} />}
          <Card className="py-4 h-[425px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <div className="flex mb-[1rem] w-full justify-between items-center">
                <h4 className="font-[800] text-2xl">Mis Contactos</h4>
                <Button color="primary" endContent={<i className="fa-solid fa-plus"></i>}>
                  Añadir Contacto
                </Button>
              </div>
            </CardHeader>
            <Divider className="mt-2" />
            <CardBody className="overflow-y-scroll no-scrollbar flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h3 className="font-[600] text-lg">Circuito Tormenta</h3>
                  <h4 className="font-[300] text-sm">{usuario.informacion.circuitotormenta}</h4>
                </div>
                <div className="flex gap-2">
                  <Button color="primary" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-info"></i>} />
                  <Button color="danger" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-ban"></i>} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h3 className="font-[600] text-lg">Twitter</h3>
                  <h4 className="font-[300] text-sm">{usuario.informacion.twitter}</h4>
                </div>
                <div className="flex gap-2">
                  <Button color="primary" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-info"></i>} />
                  <Button color="danger" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-ban"></i>} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h3 className="font-[600] text-lg">Discord</h3>
                  <h4 className="font-[300] text-sm">{usuario.informacion.discord}</h4>
                </div>
                <div className="flex gap-2">
                  <Button color="primary" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-info"></i>} />
                  <Button color="danger" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-ban"></i>} />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
}