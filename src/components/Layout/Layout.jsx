import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import checkSession from "../../utils/checkSession";
import returnSession from "../../utils/returnSession"

import { NextUIProvider, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, DropdownSection } from "@nextui-org/react";

import Logo from "../../assets/logos/LogoSinTexto.png"

export default function Layout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [usuario, setUsuario] = useState()
    const [cargando, setCargando] = useState(true)
    const [seguridad, setSeguridad] = useState(false)

    useEffect(() => {
        checkSession(setUsuario, setCargando, setSeguridad)
        if (!cargando) {
            returnSession(usuario)
        }
    }, [cargando])

    if(usuario == undefined){
        if(seguridad){
            window.location.replace("/iniciosesion")
        }
        return <></>
    }

    return (
        <NextUIProvider>
            <div className="flex h-screen overflow-hidden">
                <aside className={`absolute bg-[--color-sidebar] left-0 top-0 z-[9999] flex h-screen w-[19rem] flex-col overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0 text-[--color-texto-sidebar] ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}>
                    <div className="flex items-center justify-between gap-2 px-12 py-6 lg:py-6.5">
                        <a href="/" className="w-full flex justify-left items-center gap-3">
                            <img src={Logo} className="w-10 h-11" alt="Chaos Logo"></img>
                            <p className="font-[700] text-2xl hidden lg:flex">PanelChaos</p>
                        </a>
                        <button
                            aria-controls="sidebar"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSidebarOpen(!sidebarOpen);
                                console.log(sidebarOpen)
                            }}
                            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm lg:hidden"
                        >
                            <i className="fa-solid fa-bars text-[var(--color-gris-header)]"></i>
                        </button>
                    </div>
                    <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                            <div>
                                <h3 className="mb-2 ml-4 text-sm font-[700] text-bodydark2">Liga</h3>
                                <ul className="mb-6 flex flex-col gap-1.5">
                                    <li>
                                        <NavLink
                                            to={"/equipos"}
                                            className={"group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[var(--color-gris-sidebar)]"}
                                        >
                                            <i className="fa-solid fa-people-group w-[20px] text-center"></i>
                                            Equipos
                                        </NavLink>
                                        <NavLink
                                            to={"/usuarios"}
                                            className={"group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[var(--color-gris-sidebar)]"}
                                        >
                                            <i className="fa-solid fa-users w-[20px] text-center"></i>
                                            Usuarios
                                        </NavLink>
                                        <NavLink
                                            to={"/calendario"}
                                            className={"group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[var(--color-gris-sidebar)]"}
                                        >
                                            <i className="fa-solid fa-calendar-days w-[20px] text-center"></i>
                                            Calendario
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-2 ml-4 text-sm font-[700] text-bodydark2">Liga</h3>
                                <ul className="mb-6 flex flex-col gap-1.5">
                                    <li>
                                        <NavLink
                                            to={"/equipos"}
                                            className={"group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[var(--color-gris-sidebar)]"}
                                        >
                                            <i className="fa-solid fa-people-group w-[20px] text-center"></i>
                                            Equipos
                                        </NavLink>
                                        <NavLink
                                            to={"/usuarios"}
                                            className={"group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[var(--color-gris-sidebar)]"}
                                        >
                                            <i className="fa-solid fa-users w-[20px] text-center"></i>
                                            Usuarios
                                        </NavLink>
                                        <NavLink
                                            to={"/calendario"}
                                            className={"group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[var(--color-gris-sidebar)]"}
                                        >
                                            <i className="fa-solid fa-calendar-days w-[20px] text-center"></i>
                                            Calendario
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </aside>
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <header className="sticky top-0 z-999 flex w-full bg-[--color-sidebar] drop-shadow-1">
                        <div className="flex flex-grow items-center justify-between lg:justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                            <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                                <button
                                    aria-controls="sidebar"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSidebarOpen(!sidebarOpen);
                                        console.log(sidebarOpen)
                                    }}
                                    className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
                                >
                                    <i className="fa-solid fa-bars text-[var(--color-gris-header)]"></i>
                                </button>
                                <img src={Logo} className="w-10 h-11 hidden lg:flex" alt="Chaos Logo"></img>
                            </div>
                            <div className="flex items-center gap-6 lg:gap-12">
                                <div className="flex gap-4">
                                    <Dropdown placement="bottom-end">
                                        <DropdownTrigger>
                                            <div className="relative flex items-center justify-center">
                                                <Avatar
                                                    as="button"
                                                    className="transition-transform w-8 h-8 bg-transparent border-1"
                                                    icon={<i className="fa-solid fa-envelope text-sm text-[var(--color-iconos-header)]"></i>}
                                                />
                                                <span className="absolute -top-0.5 -right-[0.4rem] z-99999 h-2 w-2 rounded-full bg-red-500 inline">
                                                    <span className="absolute -z-9999 inline-flex h-full w-full animate-ping rounded-full bg-red-500 left-0 opacity-75"></span>
                                                </span>
                                            </div>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Notificaciones" variant="flat" className="text-[var(--color-principal-light)]">
                                            <DropdownSection title="Notificaciones">
                                                <DropdownItem
                                                    key="notificacion1"
                                                    description="Notificacion numero 1, probandoooooooooo XDdddddddddddddddddddddddd dddddddddd"
                                                >
                                                    Notificacion 1
                                                </DropdownItem>
                                                <DropdownItem
                                                    key="notificacion2"
                                                    description="Notificacion numero 2, probando"
                                                >
                                                    Notificacion 2
                                                </DropdownItem>
                                            </DropdownSection>
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Dropdown placement="bottom-end">
                                        <DropdownTrigger>
                                            <div className="relative flex items-center justify-center">
                                                <Avatar
                                                    as="button"
                                                    className="transition-transform w-8 h-8 bg-transparent border-1"
                                                    icon={<i className="fa-solid fa-comment text-sm text-[var(--color-iconos-header)]"></i>}
                                                />
                                                <span className="absolute -top-0.5 -right-[0.4rem] z-99999 h-2 w-2 rounded-full bg-red-500 inline">
                                                    <span className="absolute -z-9999 inline-flex h-full w-full animate-ping rounded-full bg-red-500 left-0 opacity-75"></span>
                                                </span>
                                            </div>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Notificaciones" variant="flat" className="text-[var(--color-principal-light)]">
                                            <DropdownSection title="Notificaciones">
                                                <DropdownItem
                                                    key="notificacion1"
                                                    description="Notificacion numero 1, probandoooooooooo XDdddddddddddddddddddddddd dddddddddd"
                                                >
                                                    Notificacion 1
                                                </DropdownItem>
                                                <DropdownItem
                                                    key="notificacion2"
                                                    description="Notificacion numero 2, probando"
                                                >
                                                    Notificacion 2
                                                </DropdownItem>
                                            </DropdownSection>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                <div className="flex justify-center items-center gap-6">
                                    <div className="text-end">
                                        <p className="font-[500] text-[var(--color-texto-header)] text-sm">{usuario.informacion.nick_usuario}</p>
                                        <p className="text-[var(--color-texto-header)] text-xs">{usuario.nombrerol}</p>
                                    </div>
                                    <Dropdown placement="bottom-end">
                                        <DropdownTrigger>
                                            <Avatar
                                                isBordered
                                                as="button"
                                                className="transition-transform"
                                                src={"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/5555.jpg"}
                                            />
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Usuario" variant="flat" className="text-[var(--color-principal-light)]">
                                            <DropdownSection title="Sesión Iniciada" showDivider>
                                                <DropdownItem key="sesion" className="h-4" textValue="sesion">
                                                    <p className="font-semibold">{usuario.informacion.nick_usuario}</p>
                                                </DropdownItem>
                                            </DropdownSection>
                                            <DropdownSection title="Usuario" showDivider>
                                                <DropdownItem key="perfil" description="Ver información de tu perfil" startContent={<i className="fa-solid fa-user mr-[2px]"></i>} onPress={() => {window.location.replace("/perfil")}}>Perfil</DropdownItem>
                                                <DropdownItem key="contactos" description="Consultar tus contactos" startContent={<i className="fa-solid fa-address-book"></i>} variant="disabled">Contactos</DropdownItem>
                                                <DropdownItem key="ajustes" description="Modificar ajustes de tu cuenta" startContent={<i className="fa-solid fa-gear"></i>} variant="disabled">Ajustes</DropdownItem>
                                            </DropdownSection>
                                            <DropdownSection title="Cerrar Sesión">
                                                <DropdownItem key="logout" className="text-danger" color="danger" description="Cerrar la sesión actual" startContent={<i className="fa-solid fa-right-from-bracket"></i>} onClick={() => { window.localStorage.removeItem("token"); window.location.replace("/iniciosesion") }}>Cerrar Sesión</DropdownItem>
                                            </DropdownSection>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </header>
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div >
        </NextUIProvider>
    )
}