import { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import { NextUIProvider } from "@nextui-org/react";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, DropdownSection, Skeleton } from "@nextui-org/react";

import { Toaster } from "sonner";
import Logo from "../../assets/logos/LogoSinTexto.png";

import getPerms from "../../utils/getPerms";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario == null) {
    window.location.replace("/iniciosesion");
    return <></>;
  }

  const renderAdmin = () => {
    if (usuario) {
      if (usuario.info.rol >= 20) {
        return (
          <div>
            <h3 className="mb-2 ml-4 text-sm font-[700] text-bodydark2">Liga</h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to={"/equipos"}
                  className={
                    "group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[var(--color-gris-sidebar)]"
                  }
                >
                  <i className="fa-solid fa-people-group w-[20px] text-center"></i>
                  Equipos
                </NavLink>
                <NavLink
                  to={"/usuarios"}
                  className={
                    "group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[var(--color-gris-sidebar)]"
                  }
                >
                  <i className="fa-solid fa-users w-[20px] text-center"></i>
                  Usuarios
                </NavLink>
              </li>
            </ul>
          </div>
        );
      }
    }
  };

  const renderJugador = () => {
    if (usuario) {
      if (usuario.info.rol >= 20) {
        return (
          <div>
            <h3 className="mb-2 ml-4 text-sm font-[700] text-bodydark2">Partidos</h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to={"/partidos"}
                  className={
                    "group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[var(--color-gris-sidebar)]"
                  }
                >
                  <i className="fa-solid fa-camera-retro w-[20px] text-center"></i>
                  Partidos
                </NavLink>
                <NavLink
                  to={"/inhouses"}
                  className={
                    "group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[var(--color-gris-sidebar)]"
                  }
                >
                  <i className="fa-solid fa-handshake w-[20px] text-center"></i>
                  Inhouses
                </NavLink>
                <NavLink
                  to={"/clasificacion"}
                  className={
                    "group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[var(--color-gris-sidebar)]"
                  }
                >
                  <i className="fa-solid fa-table w-[20px] text-center"></i>
                  Clasificacion
                </NavLink>
              </li>
            </ul>
          </div>
        );
      }
    }
  };

    const renderUser = () => {
        if (usuario) {
            return (
                <>
                    <p className="font-[500] text-[var(--color-texto-header)] text-sm">{usuario.info.nick_usuario}</p>
                    <p className="text-[var(--color-texto-header)] text-xs">{getPerms(usuario.info.rol)}</p>
                </>
            )
        } else {
            return (
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
            )
        }
    }
  };

  const renderAvatar = () => {
    if (usuario) {
      return (
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${usuario.info.icono}.jpg`}
        />
      );
    } else {
      return <Skeleton className="flex rounded-full h-10 w-10" />;
    }
  };

  const renderNick = () => {
    if (usuario) {
      return <p className="font-semibold">{usuario.info.nick_usuario}</p>;
    } else {
      return <Skeleton className="flex rounded-full" />;
    }
  };

  return (
    <NextUIProvider>
      <Toaster richColors closeButton />
      <div className="flex h-screen overflow-hidden">
        <aside className="h-screen p-1">
          <div
            className={`rounded-md absolute bg-[--color-sidebar] left-0 top-0 z-[9999] flex w-[19rem] flex-col h-full overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0 text-[--color-texto-sidebar] ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
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
                }}
                className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm lg:hidden"
              >
                <i className="fa-solid fa-bars text-[var(--color-gris-header)]"></i>
              </button>
            </div>
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
              <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                {renderAdmin()}
                {renderJugador()}
                <div>
                  <h3 className="mb-2 ml-4 text-sm font-[700] text-bodydark2">Usuario</h3>
                  <ul className="mb-6 flex flex-col gap-1.5">
                    <li>
                      <NavLink
                        to={"/perfil"}
                        className={
                          "group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[var(--color-gris-sidebar)]"
                        }
                      >
                        <i className="fa-solid fa-user w-[20px] text-center"></i>
                        Perfil
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </aside>
        <div className="pr-1 relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <header className="mt-1 rounded-md sticky top-0 z-999 flex w-full bg-[--color-sidebar] drop-shadow-1">
            <div className="flex flex-grow items-center justify-between lg:justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
              <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                <button
                  aria-controls="sidebar"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSidebarOpen(!sidebarOpen);
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
                        <DropdownItem key="notificacion1" description="Se recuerda a todo usuario que para aparecer en la página de draft se requiere modificar su nombre y apellido.">
                          Aviso Importante
                        </DropdownItem>
                      </DropdownSection>
                    </DropdownMenu>
                  </Dropdown>
                  {/* <Dropdown placement="bottom-end">
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
                        <DropdownItem key="notificacion1" description="Notificacion numero 1, probandoooooooooo XDdddddddddddddddddddddddd dddddddddd">
                          Notificacion 1
                        </DropdownItem>
                        <DropdownItem key="notificacion2" description="Notificacion numero 2, probando">
                          Notificacion 2
                        </DropdownItem>
                      </DropdownSection>
                    </DropdownMenu>
                  </Dropdown> */}
                </div>
                <div className="flex justify-center items-center gap-6">
                  <div className="text-end">{renderUser()}</div>
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>{renderAvatar()}</DropdownTrigger>
                    <DropdownMenu aria-label="Usuario" variant="flat" className="text-[var(--color-principal-light)]">
                      <DropdownSection title="Sesión Iniciada" showDivider>
                        <DropdownItem
                          key="sesion"
                          textValue="sesion"
                          className="h-4"
                          onClick={() => {
                            window.location = "/perfil";
                          }}
                        >
                          {renderNick()}
                        </DropdownItem>
                      </DropdownSection>
                      <DropdownSection title="Usuario" showDivider>
                        <DropdownItem
                          textValue="perfil"
                          key="perfil"
                          description="Ver información de tu perfil"
                          startContent={<i className="fa-solid fa-user mr-[2px]"></i>}
                          onPress={() => {
                            window.location.replace("/perfil");
                          }}
                        >
                          Perfil
                        </DropdownItem>
                      </DropdownSection>
                      <DropdownSection title="Cerrar Sesión">
                        <DropdownItem
                          key="logout"
                          textValue="cerrarsesion"
                          className="text-danger"
                          color="danger"
                          description="Cerrar la sesión actual"
                          startContent={<i className="fa-solid fa-right-from-bracket"></i>}
                          onClick={() => {
                            window.localStorage.removeItem("token");
                            window.localStorage.removeItem("usuario");
                            window.location.replace("/iniciosesion");
                          }}
                        >
                          Cerrar Sesión
                        </DropdownItem>
                      </DropdownSection>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">{children}</div>
          </main>
        </div>
      </div>
    </NextUIProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
