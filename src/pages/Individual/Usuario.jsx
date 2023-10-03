import { useState, useEffect } from "react"

import checkSession from "../../utils/checkSession";
import returnSession from "../../utils/returnSession";

import Layout from "../../components/Layout/Layout.jsx"
import InfoUsuario from "../../components/Jugadores/Jugadores.jsx"

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
    <Layout info={usuario} >
      <InfoUsuario></InfoUsuario>
    </Layout>
  )
}

export default Inicio
