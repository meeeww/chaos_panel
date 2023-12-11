import { useState, useEffect } from "react";

import { conseguirUsuarios } from "../../services/usuarios.js";
import { returnSessionAdmin } from "../../utils/sessions.js";

import Layout from "../../components/Layout/Layout.jsx";
import TablaUsuarios from "../../components/Jugadores/Tabla/Tabla.jsx";

import { CircularProgress } from "@nextui-org/react";

function Clasificacion() {
  const [usuarios, setUsuarios] = useState();
  const [cargando, setCargando] = useState(true);
  const [cambioDatos, setCambioDatos] = useState(false);

  useEffect(() => {
    returnSessionAdmin(window.localStorage.getItem("token"));
    conseguirUsuarios(setCambioDatos).then((listaUsuarios) => {
      setUsuarios(listaUsuarios.result);
      setCargando(false);
    });
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
      
    </Layout>
  );
}

export default Clasificacion;
