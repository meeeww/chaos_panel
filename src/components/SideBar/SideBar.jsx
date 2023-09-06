import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import Logo from "../../assets/logos/LogoSinTexto.png"

export default function SideBar() {
    return (
        <div className="flex h-screen overflow-hidden">
            <aside className="absolute bg-[--color-sidebar] left-0 top-0 z-9999 flex h-screen w-[18rem] flex-col overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0 -translate-x-full text-[--color-texto-sidebar]">
                <div className="flex items-center justify-between gap-2 px-6 py-6 lg:py-6.5">
                    <a href="/" className="w-full flex justify-center items-center gap-4">
                        <img src={Logo} className="w-10 h-11" alt="Chaos Logo"></img>
                        <p>Panel Chaos</p>
                    </a>
                </div>
                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">

                </div>
            </aside>
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <header className="sticky top-0 z-999 flex w-full bg-[--color-sidebar] drop-shadow-1">
                    <div className="flex flex-grow items-center justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                        <div className="flex items-center gap-12">
                            <Dropdown>
                                <DropdownTrigger>
                                    <div className="relative flex items-center justify-center">
                                        <Avatar
                                            color="secondary"
                                            isBordered
                                            as="button"
                                            className="transition-transform"
                                            icon={<FontAwesomeIcon icon={faEnvelope} size="2x" className="text-white" />}
                                        />
                                        <span className="absolute -top-0.5 -right-[0.5rem] z-99999 h-2 w-2 rounded-full bg-red-500 inline">
                                            <span className="absolute -z-9999 inline-flex h-full w-full animate-ping rounded-full bg-red-500 left-0 opacity-75"></span>
                                        </span>
                                    </div>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Notificaciones" variant="flat" className="text-[var(--color-principal-light)]">
                                    <DropdownItem key="sesion" className="h-14 gap-2" onClick={() => { window.location = "/dashboardadmin" }}>
                                        <p className="font-semibold">Sesión Iniciada</p>
                                        <p className="font-semibold">{"Zas"}</p>
                                    </DropdownItem>
                                    <DropdownItem key="perfil">Perfil</DropdownItem>
                                    <DropdownItem key="contactos">Contactos</DropdownItem>
                                    <DropdownItem key="ajustes">Ajustes</DropdownItem>
                                    <DropdownItem key="logout" color="danger">Cerrar Sesión</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <div className="flex justify-center items-center gap-6">
                                <div className="text-end">
                                    <p className="font-[500] text-[var(--color-texto-header)] text-sm">Zas</p>
                                    <p className="text-[var(--color-texto-header)] text-xs">Desarrollador</p>
                                </div>
                                <Dropdown placement="bottom-end">
                                    <DropdownTrigger>
                                        <Avatar
                                            isBordered
                                            as="button"
                                            className="transition-transform"
                                            src={"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/0.jpg"}
                                        />
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Usuario" variant="flat" className="text-[var(--color-principal-light)]">
                                        <DropdownItem key="sesion" className="h-14 gap-2" onClick={() => { window.location = "/dashboardadmin" }}>
                                            <p className="font-semibold">Sesión Iniciada</p>
                                            <p className="font-semibold">{"Zas"}</p>
                                        </DropdownItem>
                                        <DropdownItem key="perfil">Perfil</DropdownItem>
                                        <DropdownItem key="contactos">Contactos</DropdownItem>
                                        <DropdownItem key="ajustes">Ajustes</DropdownItem>
                                        <DropdownItem key="logout" color="danger">Cerrar Sesión</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">

                    </div>
                </main>
            </div>
        </div>
    )
}