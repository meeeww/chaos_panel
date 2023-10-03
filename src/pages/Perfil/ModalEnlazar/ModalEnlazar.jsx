import { useState, useMemo } from "react";

import axios from "axios"
import api from "../../../../variables.json";
import sendLog from "../../../utils/sendLog";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Toaster, toast } from 'sonner'

export default function ModalEnlazar(info) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [valor, setValor] = useState()
    const [cuenta, setCuenta] = useState("")

    const handleUpload = () => {
        let valorFinal
        switch (valor) {
            case 1:
                valorFinal = "circuitotormenta";
                break;
            case 2:
                valorFinal = "twitter";
                break;
            case 3:
                valorFinal = "discord";
                break;
        }
        toast.promise(() => new Promise((resolve, reject) => {
            axios.put(api.directorio + "usuarios/enlaces", { id_usuario: info.info.usuario.informacion.id_usuario, columna: valorFinal, valor: cuenta }).then(function () {
                sendLog(info.info.usuario.informacion.id_usuario, "Añadir Enlaze", { "accion": "Añadido Enlace" })
                info.cambioDatos(true)
                resolve()
            }).catch(function () {
                reject()
            })
        }), {
            loading: 'Añadiendo enlace',
            success: 'Enlace añadido',
            error: 'Error',
        });
    }

    const RenderInput = () => {
        const [selectedKeys, setSelectedKeys] = useState(new Set(["Circuito Tormenta"]));

        const selectedValue = useMemo(
            () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
            [selectedKeys]
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
                        <DropdownItem key={"Circuito Tormenta"} value={1} onPress={(e) => { setValor(e.target.value) }}>{"Circuito Tormenta"}</DropdownItem>
                        <DropdownItem key={"Twitter"} value={2} onPress={(e) => { setValor(e.target.value) }}>{"Twitter"}</DropdownItem>
                        <DropdownItem key={"Discord"} value={3} onPress={(e) => { setValor(e.target.value) }}>{"Discord"}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Input type="text" placeholder={"Nombre de Cuenta"} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setCuenta(e.target.value) }} />
            </div>
        )
    }

    return (
        <>
            <Toaster richColors closeButton />
            <Button onClick={onOpen} color="primary" endContent={<i className="fa-solid fa-plus"></i>}>
                Enlazar Cuenta
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{"Modificar Enlace"}</ModalHeader>
                            <ModalBody>
                                {RenderInput()}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => {
                                    if (valor != "" && cuenta != "") {
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
