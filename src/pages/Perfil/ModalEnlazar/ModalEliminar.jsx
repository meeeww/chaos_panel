import { useState } from "react";

import axios from "axios"
import api from "../../../../variables.json";
import sendLog from "../../../utils/sendLog";

import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Checkbox } from "@nextui-org/react";
import { Toaster, toast } from 'sonner'

export default function ModalEliminar(info) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [confirmacion, setConfirmacion] = useState(false)

    const cambiarConfirmacion = () => {
        setConfirmacion(!confirmacion)
    }

    const handleUpload = () => {
        toast.promise(() => new Promise((resolve, reject) => {
            axios.delete(api.directorio + "usuarios/enlaces", {data: { id_usuario: info.usuario.usuario.informacion.id_usuario, columna: info.tipo }}).then(function () {
                sendLog(info.usuario.usuario.informacion.id_usuario, "Añadir Enlaze", { "accion": "Añadido Enlace" })
                info.cambioDatos(true)
                resolve()
            }).catch(function () {
                reject()
            })
        }), {
            loading: 'Eliminando enlace',
            success: 'Enlace eliminado',
            error: 'Error',
        });
    }

    return (
        <>
            <Toaster richColors closeButton />
            <Button onClick={onOpen} color="danger" radius="full" variant="bordered" size="sm" isIconOnly endContent={<i className="fa-solid fa-ban"></i>} />
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{"Eliminar Enlace"}</ModalHeader>
                            <ModalBody>
                            <div className="flex flex-col justify-center gap-2 mb-8">
                                    <Checkbox onChange={cambiarConfirmacion} id="checkBoxConfirmacion">¿Estás seguro de que quieres eliminar el enlace?</Checkbox>
                                </div>
                                <div className="flex justify-evenly">
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Cerrar
                                    </Button>
                                    <Button color="primary" onPress={onClose} onClick={() => {
                                        if (confirmacion) {
                                            handleUpload()
                                            setConfirmacion(false)
                                        } else {
                                            toast.error('No has confirmado.')
                                            setConfirmacion(false)
                                        }
                                    }}>
                                        Confirmar
                                    </Button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
