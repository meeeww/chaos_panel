import { useState, useEffect } from "react"

//import checkSession from "../../utils/checkSession";
import { returnSession } from "../../utils/sessions.js";
import { conseguirInhousePorId } from "../../services/partidos.js";

import Layout from "../../components/Layout/Layout.jsx"
import InfoInhouse from "../../components/Inhouses/Inhouses.jsx"

import { CircularProgress } from "@nextui-org/react"

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function Inicio() {

  const [inhouse, setInhouse] = useState()
  const [cargando, setCargando] = useState(true)
  const [cambioDatos, setCambioDatos] = useState(false)

  if (urlParams.get('id') == null)
    window.location.replace("/usuarios")

  useEffect(() => {
    returnSession(window.localStorage.getItem("token"))
    conseguirInhousePorId(urlParams.get("id"), setCambioDatos).then((inhouseIndividual) => {
      setInhouse(inhouseIndividual.result)
      setCargando(false)
    })

  }, [cambioDatos])

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
      <InfoInhouse inhouse={inhouse[0]} cambioDatos={setCambioDatos}></InfoInhouse>
    </Layout>
  )
}

export default Inicio
