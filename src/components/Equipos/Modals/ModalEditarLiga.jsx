import { useState } from "react";
import { Toaster, toast } from 'sonner'

import axios from "axios";
import api from "../../../../variables.json"


import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";

export default function ModalEquipos() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    //http://localhost:8888/.netlify/functions/api/crearequipo
    const [file, setFile] = useState()
    const [nombre, setNombre] = useState("")
    const [acronimo, setAcronimo] = useState("")

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpload = () => {
        const formdata = new FormData()
        formdata.append("imagenEquipo", file)
        formdata.append("nombre", nombre);
        formdata.append("acronimo", acronimo);
        toast.promise(() => new Promise((resolve, reject) => {
            axios.post(api.directorio + "crearequipo", formdata).then(function () {
                resolve()
            }).catch(function () {
                reject()
            })
        }), {
            loading: 'Creando equipo',
            success: 'Equipo creado',
            error: 'Error',
        });
    }

    return (
        <>
            <Toaster richColors closeButton />
            <Button onClick={onOpen}>hey</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Crear Equipo</ModalHeader>
                            <ModalBody>
                                <Input type="text" variant={"flat"} label="Nombre" onChange={(e) => { setNombre(e.target.value) }} isRequired />
                                <Input type="text" variant={"flat"} label="Acronimo" onChange={(e) => { setAcronimo(e.target.value) }} isRequired />
                                <Input id="upload" type="file" variant={"flat"} onChange={handleFile} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => {
                                    if (file != undefined && nombre != "" && acronimo != "") {
                                        handleUpload()
                                    } else {
                                        toast.error('No has rellenado todos los campos.')
                                    }
                                }}>
                                    Crear
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
