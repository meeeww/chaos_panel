import { useState, useMemo } from "react";

import axios from "axios"
import api from "../../../../variables.json";
import sendLog from "../../../utils/sendLog";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";
import { Toaster, toast } from 'sonner'

export default function ModalJugadores(info) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [valor, setValor] = useState()

    let equiposOrdenados = info.equipos && info.equipos.sort(function (a, b) {
        var textA = a.nombre_equipo.toUpperCase();
        var textB = b.nombre_equipo.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    const RenderInput = (columna) => {
        const [selectedKeys, setSelectedKeys] = useState(new Set(["Permisos"]));

        const selectedValu = useMemo(
            () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
            [selectedKeys]
        );

        switch (columna) {

            case "rol":
                return (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                className="capitalize"
                            >
                                {selectedValu}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Selection Rol"
                            className="h-[19.5rem] overflow-y-auto"
                            variant="solid"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeys}
                            onSelectionChange={setSelectedKeys}
                        >
                            <DropdownSection showDivider={true}>
                                <DropdownItem key={"Usuario"} value={0} onPress={(e) => { setValor(e.target.value) }}>Usuario</DropdownItem>
                                <DropdownItem key={"Jugador"} value={1} onPress={(e) => { setValor(e.target.value) }}>Jugador</DropdownItem>
                                <DropdownItem key={"Jugador Reserva"} value={2} onPress={(e) => { setValor(e.target.value) }}>Jugador Reserva</DropdownItem>
                            </DropdownSection>

                            <DropdownSection showDivider={true}>
                                <DropdownItem key={"Coach"} value={5} onPress={(e) => { setValor(e.target.value) }}>Coach</DropdownItem>
                                <DropdownItem key={"Manager"} value={6} onPress={(e) => { setValor(e.target.value) }}>Manager</DropdownItem>
                                <DropdownItem key={"Sub-Presidente"} value={7} onPress={(e) => { setValor(e.target.value) }}>Sub-Presidente</DropdownItem>
                                <DropdownItem key={"Presidente"} value={8} onPress={(e) => { setValor(e.target.value) }}>Presidente</DropdownItem>
                            </DropdownSection>

                            <DropdownSection showDivider={true}>
                                <DropdownItem key={"Caster"} value={10} onPress={(e) => { setValor(e.target.value) }}>Caster</DropdownItem>
                                <DropdownItem key={"Realizador"} value={11} onPress={(e) => { setValor(e.target.value) }}>Realizador</DropdownItem>
                                <DropdownItem key={"Community Manager"} value={12} onPress={(e) => { setValor(e.target.value) }}>Community Manager</DropdownItem>
                                <DropdownItem key={"Diseñador"} value={13} onPress={(e) => { setValor(e.target.value) }}>Diseñador</DropdownItem>
                            </DropdownSection>

                            <DropdownSection showDivider={true}>
                                <DropdownItem key={"Arbrito"} value={15} onPress={(e) => { setValor(e.target.value) }}>Arbrito</DropdownItem>
                                <DropdownItem key={"Arbitro Jefe"} value={16} onPress={(e) => { setValor(e.target.value) }}>Arbitro Jefe</DropdownItem>
                                <DropdownItem key={"Desarrollador"} value={17} onPress={(e) => { setValor(e.target.value) }}>Desarrollador</DropdownItem>
                            </DropdownSection>

                            <DropdownSection showDivider={true}>
                                <DropdownItem key={"CTO"} value={20} onPress={(e) => { setValor(e.target.value) }}>CTO</DropdownItem>
                                <DropdownItem key={"COO"} value={21} onPress={(e) => { setValor(e.target.value) }}>COO</DropdownItem>
                                <DropdownItem key={"CEO"} value={22} onPress={(e) => { setValor(e.target.value) }}>CEO</DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                )
            case "id_equipo":
                return (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                className="capitalize"
                            >
                                {selectedValu}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Selection Rol"
                            className="h-[19.5rem] overflow-y-auto"
                            variant="solid"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeys}
                            onSelectionChange={setSelectedKeys}
                        >
                            <DropdownSection>
                                {equiposOrdenados && equiposOrdenados.map((equipito) => (
                                    <DropdownItem key={equipito.id_equipo} value={equipito.id_equipo} onPress={(e) => { setValor(e.target.value) }}>{equipito.nombre_equipo}</DropdownItem>
                                ))}
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                )
            case "edad":
                return (
                    <Input type="date" placeholder={info.jugador[info.columna.uid]} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(e.target.value) }} />
                )
            default:
                return (
                    <Input type="text" placeholder={info.jugador[info.columna.uid]} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(e.target.value) }} />
                )
        }
    }

    const handleUpload = () => {
        toast.promise(() => new Promise((resolve, reject) => {
            if (info.columna.modificar == "edad") {
                axios.put(api.directorio + "modificarusuario", { id: info.jugador.id_usuario, columna: info.columna.modificar, valor: (Date.parse(valor) / 1000.0) }).then(function () {
                    sendLog(48, "Modificar Usuario", { nombre: info.jugador.nombre_usuario, apellido: info.jugador.apellido_usuario, nick: info.jugador.nick_usuario, edad: (Date.parse(info.jugador.edad) / 1000.0), rol: info.jugador.rol })
                    info.cambioDatos(true)
                    resolve()
                }).catch(function () {
                    reject()
                })
            } else {
                axios.put(api.directorio + "modificarusuario", { id: info.jugador.id_usuario, columna: info.columna.modificar, valor: valor }).then(function () {
                    sendLog(48, "Modificar Usuario", { nombre: info.jugador.nombre_usuario, apellido: info.jugador.apellido_usuario, nick: info.jugador.nick_usuario, edad: (Date.parse(info.jugador.edad) / 1000.0), rol: info.jugador.rol })
                    info.cambioDatos(true)
                    resolve()
                }).catch(function () {
                    reject()
                })
            }
        }), {
            loading: 'Modificando usuario',
            success: 'Usuario modificado',
            error: 'Error',
        });
    }

    return (
        <>
            <Toaster richColors closeButton />
            <Button onClick={onOpen} size="sm" isIconOnly aria-label="Modificar" color="warning"><i className="fa-solid fa-hammer text-white"></i></Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modificar {info.columna.name == "Edad" ? "Fecha de Nacimiento" : info.columna.name}</ModalHeader>
                            <ModalBody>
                                {RenderInput(info.columna.modificar)}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => {
                                    if (valor != null) {
                                        handleUpload()
                                    } else {
                                        toast.error('No has rellenado todos los campos.')
                                    }
                                }}>
                                    Modificar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
