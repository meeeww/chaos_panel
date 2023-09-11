import React from 'react'
import ReactDOM from 'react-dom/client'

import Inicio from './pages/Inicio.jsx'

import Usuarios from "./pages/Usuarios.jsx"
import Equipos from "./pages/Equipos.jsx"

import './styles/Index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/usuarios",
    element: <Usuarios />,
  },
  {
    path: "/equipos",
    element: <Equipos />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)