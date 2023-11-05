import { useState, useEffect } from "react";

import returnSession from "../utils/returnSession.js";
import { conseguirEquipos } from "../services/equipos.js";

import Layout from "../components/Layout/Layout.jsx"
import TablaEquipos from "../components/Equipos/Tabla/Tabla.jsx"

import { CircularProgress } from "@nextui-org/react"

function Inicio() {

  const [equipos, setEquipos] = useState()
  const [cargando, setCargando] = useState(true)
  const [cambioDatos, setCambioDatos] = useState(false)

  useEffect(() => {
    returnSession(window.localStorage.getItem("token"))
    conseguirEquipos(setCambioDatos).then((listaEquipos) => {
      setEquipos(listaEquipos.result)
      setCargando(false)
    })
  }, [cambioDatos]);

  if (cargando || localStorage.getItem("usuario") == null) {
    return (
      <Layout>
        <div className="w-full h-full flex justify-center items-center mt-16">
          <CircularProgress aria-label="Cargando..." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <TablaEquipos listaEquipos={equipos} setCambioDatos={setCambioDatos} cambioDatos={cambioDatos}></TablaEquipos>
    </Layout>
  )
}

export default Inicio
