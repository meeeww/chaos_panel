import { useState, useMemo } from "react";

import axios from "axios"
import api from "../../../../variables.json";
import sendLog from "../../../utils/sendLog";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Toaster, toast } from 'sonner'

export default function ModalCrearCuenta(info) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [valor, setValor] = useState("")
    const [valorPrimaria, setValorPrimaria] = useState("")
    const [valorSecundaria, setValorSecundaria] = useState("")

    const handleUpload = () => {
        toast.promise(() => new Promise((resolve, reject) => {
            let principal = ""
            let secundaria = ""

            switch (valorPrimaria) {
                case 1:
                    principal = "Toplane"
                    break;
                case 2:
                    principal = "Jungla"
                    break;
                case 3:
                    principal = "Midlane"
                    break;
                case 4:
                    principal = "ADC"
                    break;
                case 5:
                    principal = "Support"
                    break;
            }

            switch (valorSecundaria) {
                case 1:
                    secundaria = "Toplane"
                    break;
                case 2:
                    secundaria = "Jungla"
                    break;
                case 3:
                    secundaria = "Midlane"
                    break;
                case 4:
                    secundaria = "ADC"
                    break;
                case 5:
                    secundaria = "Support"
                    break;
            }
            axios.post(api.directorio + "crearcuenta", { id_usuario: info.info.usuario.informacion.id_usuario, invocador: valor, linea_principal: principal, linea_secundaria: secundaria }).then(function () {
                sendLog(info.info.usuario.informacion.id_usuario, "Añadir Cuenta", { "accion": "Perfil Cambiado" })
                info.cambioDatos(true)
                resolve()
            }).catch(function () {
                reject()
            })
        }), {
            loading: 'Añadiendo cuenta',
            success: 'Cuenta añadida',
            error: 'Error',
        });
    }

    const RenderInput = () => {
        const [selectedKeys, setSelectedKeys] = useState(new Set(["Linea Principal"]));
        const [selectedKeysSecundaria, setSelectedKeysSecundaria] = useState(new Set(["Linea Secundaria"]));

        const selectedValue = useMemo(
            () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
            [selectedKeys]
        );

        const selectedValueSecundaria = useMemo(
            () => Array.from(selectedKeysSecundaria).join(", ").replaceAll("_", " "),
            [selectedKeysSecundaria]
        );

        return (
            <div className="flex gap-2">
                <Dropdown >
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            className="capitalize w-full"
                        >
                            {selectedValue}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Selection Rol"
                        className="h-full overflow-y-auto"
                        variant="solid"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                    >
                        <DropdownItem key={"Toplane"} value={1} onPress={(e) => { setValorPrimaria(e.target.value) }}>{"Toplane"}</DropdownItem>
                        <DropdownItem key={"Jungla"} value={2} onPress={(e) => { setValorPrimaria(e.target.value) }}>{"Jungla"}</DropdownItem>
                        <DropdownItem key={"Midlane"} value={3} onPress={(e) => { setValorPrimaria(e.target.value) }}>{"Midlane"}</DropdownItem>
                        <DropdownItem key={"ADC"} value={4} onPress={(e) => { setValorPrimaria(e.target.value) }}>{"ADC"}</DropdownItem>
                        <DropdownItem key={"Support"} value={5} onPress={(e) => { setValorPrimaria(e.target.value) }}>{"Support "}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown >
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            className="capitalize w-full"
                        >
                            {selectedValueSecundaria}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Selection Rol"
                        className="h-full overflow-y-auto"
                        variant="solid"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeysSecundaria}
                        onSelectionChange={setSelectedKeysSecundaria}
                    >
                        <DropdownItem key={"Toplane"} value={1} onPress={(e) => { setValorSecundaria(e.target.value) }}>{"Toplane"}</DropdownItem>
                        <DropdownItem key={"Jungla"} value={2} onPress={(e) => { setValorSecundaria(e.target.value) }}>{"Jungla"}</DropdownItem>
                        <DropdownItem key={"Midlane"} value={3} onPress={(e) => { setValorSecundaria(e.target.value) }}>{"Midlane"}</DropdownItem>
                        <DropdownItem key={"ADC"} value={4} onPress={(e) => { setValorSecundaria(e.target.value) }}>{"ADC"}</DropdownItem>
                        <DropdownItem key={"Support"} value={5} onPress={(e) => { setValorSecundaria(e.target.value) }}>{"Support "}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }

    return (
        <>
            <Toaster richColors closeButton />
            <Button onClick={onOpen} color="primary" endContent={<i className="fa-solid fa-plus"></i>}>
                Nueva Cuenta
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{"Añadir cuenta de League of Legends"}</ModalHeader>
                            <ModalBody>
                                <Input type="text" placeholder={"Nombre de Invocador"} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(e.target.value) }} />
                                <div>
                                    {RenderInput()}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => {
                                    if (valor != "" && valorPrimaria != "" && valorSecundaria != "") {
                                        handleUpload()
                                    } else {
                                        toast.error('No has rellenado todos los campos.')
                                    }
                                }}>
                                    Añadir
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
