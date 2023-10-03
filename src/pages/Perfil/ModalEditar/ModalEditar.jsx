import { useState } from "react";

import axios from "axios"
import api from "../../../../variables.json";
import sendLog from "../../../utils/sendLog";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { Toaster, toast } from 'sonner'

export default function ModalPerfil(info) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [valor, setValor] = useState("")

    const RenderInput = (tipo) => {
        if (tipo == "date") {
            return (
                <Input type="date" placeholder={info.jugador.informacion["edad"]} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(Date.parse(e.target.value) / 1000) }} />
            )
        } else {
            return (
                <Input type="text" placeholder={info.jugador.informacion[info.columna.uid]} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(e.target.value) }} />
            )
        }
    }

    const handleUpload = () => {
        toast.promise(() => new Promise((resolve, reject) => {
            axios.put(api.directorio + "modificarusuario", { id: info.jugador.informacion.id_usuario, columna: info.columna.modificar, valor: valor }).then(function () {
                sendLog(16, "Modificar Perfil", { "accion": "Perfil Cambiado" })
                info.cambioDatos(true)
                resolve()
            }).catch(function () {
                reject()
            })
        }), {
            loading: 'Modificando perfil',
            success: 'Perfil modificado',
            error: 'Error',
        });
    }

    return (
        <>
            <Toaster richColors closeButton />
            <Button onClick={onOpen} color="warning" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-hammer"></i>} />
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
                                {RenderInput(info.columna.tipo)}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => {
                                    if (valor != "") {
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
