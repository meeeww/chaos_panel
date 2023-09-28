import React from 'react'
import ReactDOM from 'react-dom/client'

import Inicio from './pages/Inicio.jsx'

import InicioSesion from './pages/InicioSesion.jsx'
import Registro from './pages/Registro.jsx'

import Usuarios from "./pages/Usuarios.jsx"
import Equipos from "./pages/Equipos.jsx"

import Equipo from './pages/Individual/Equipo.jsx'
import Usuario from './pages/Individual/Usuario.jsx'

import Perfil from './pages/Perfil/Perfil.jsx'

import './styles/Index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <InicioSesion />,
  },
  {
    path: "/iniciosesion",
    element: <InicioSesion />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/usuarios",
    element: <Usuarios />,
  },
  {
    path: "/usuario",
    element: <Usuario />,
  },
  {
    path: "/equipos",
    element: <Equipos />,
  },
  {
    path: "/equipo",
    element: <Equipo />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)