import { useState } from "react";

import axios from "axios"
import api from "../../../../variables.json";
import sendLog from "../../../utils/sendLog";

import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Checkbox } from "@nextui-org/react";
import { Toaster, toast } from 'sonner'

export default function ModalEquipos(equipo) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [confirmacion, setConfirmacion] = useState(false)

    const cambiarConfirmacion = () => {
        setConfirmacion(!confirmacion)
    }

    const confirmarBorracion = () => {
        toast.promise(() => new Promise((resolve, reject) => {
            axios.delete(api.directorio + "borrarusuario", { data: {id: equipo["equipo"].id_usuario}}).then(function () {
                equipo.cambioDatos(true)
                sendLog(49, "Borrar Usuario", {id_usuario: equipo["equipo"].id_usuario, nombre_usuario: equipo["equipo"].nombre_usuario, apellido_usuario: equipo["equipo"].apellido_usuario, nick_usuario: equipo["equipo"].nick_usuario, rol_usuario: equipo["equipo"].rol})
                resolve()
            }).catch(function () {
                reject()
            })
        }), {
            loading: 'Borrando equipo',
            success: 'Equipo borrado',
            error: 'Error',
        });
    }

    return (
        <>
            <Toaster richColors closeButton />
            <Button onClick={onOpen} onPress={() => {setConfirmacion(false)}} size="sm" isIconOnly aria-label="Borrar" color="danger"><i className="fa-solid fa-trash"></i></Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Eliminar Usuario</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col justify-center gap-2 mb-8">
                                    <Checkbox onChange={cambiarConfirmacion} id="checkBoxConfirmacion">¿Estás seguro de que quieres eliminar el usuario?</Checkbox>
                                </div>
                                <div className="flex justify-evenly">
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Cerrar
                                    </Button>
                                    <Button color="primary" onPress={onClose} onClick={() => {
                                        if (confirmacion) {
                                            confirmarBorracion()
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
