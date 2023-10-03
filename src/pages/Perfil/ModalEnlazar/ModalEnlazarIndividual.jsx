import { useState } from "react";

import axios from "axios"
import api from "../../../../variables.json";
import sendLog from "../../../utils/sendLog";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { Toaster, toast } from 'sonner'

export default function ModalEnlazarIndividual(info) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [valor, setValor] = useState()

    const handleUpload = () => {
        toast.promise(() => new Promise((resolve, reject) => {
            axios.put(api.directorio + "usuarios/enlaces", { id_usuario: info.usuario.usuario.informacion.id_usuario, columna: info.tipo, valor: valor }).then(function () {
                sendLog(info.usuario.usuario.informacion.id_usuario, "Añadir Enlaze", { "accion": "Añadido Enlace" })
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
                            <ModalHeader className="flex flex-col gap-1">{"Modificar Enlace"}</ModalHeader>
                            <ModalBody>
                                <Input type="text" placeholder={"Nombre de Cuenta"} className="w-full sm:max-w-[100%]" isRequired onChange={(e) => { setValor(e.target.value) }} />
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
