import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout.jsx"
import TablaEquipos from "../components/Equipos/Tabla/Tabla.jsx"

import checkSession from "../utils/checkSession.js";
import returnSession from "../utils/returnSession";

function Inicio() {

  const [usuario, setUsuario] = useState()
  const [cargando, setCargando] = useState(true)
  const [seguridad, setSeguridad] = useState(false)

  useEffect(() => {
    checkSession(setUsuario, setCargando, setSeguridad)
    if (!cargando) {
      returnSession(usuario)
    }
  }, [cargando])

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
      <TablaEquipos></TablaEquipos>
    </Layout>
  )
}

export default Inicio
