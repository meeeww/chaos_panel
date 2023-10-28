import { useState } from "react";

import axios from "axios"
import api from "../../variables.json"
import md5 from "md5";

import { checkSession } from "../utils/sessions";
import { createToken } from "../utils/tokens";
import getEdad from "../utils/getEdad";

import { Toaster, toast } from 'sonner'

import { useForm } from "react-hook-form"

import { Card, CardBody, Input, Button, Link } from "@nextui-org/react";

import Logo from "../assets/logos/LogoSinTexto.png";

export default function Registro() {

    checkSession()

    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = (data) => {
        const encriptarPass = () => {
            return new Promise((resolve) => {
                resolve(md5(data.contra))
            })
        }

        encriptarPass().then(
            (contrasenaEncriptada) => {
                toast.promise(() => new Promise((resolve, reject) => {
                    if (getEdad((Date.parse(data.fecha) / 1000.0)) >= 16) {
                        axios.get(api.directorio + "usuarios/nombre=" + data.usuario).then(response => {
                            if (response.data.result.length == 0) { //hay que crear el usuario y generar token
                                createToken(data, contrasenaEncriptada, resolve, reject)
                            } else {
                                toast.error("Ya existe el usuario")
                                reject()
                            }
                        })
                    } else {
                        toast.error("Tienes que ser mayor de 16 años")
                        reject()
                    }
                }), {
                    loading: 'Registrando',
                    success: 'Registro completado',
                    error: 'Error',
                });
            }
        )

    }

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        //añadir background image
        <div className="flex justify-center items-center h-[100vh] bg-[url(../assets/backgrounds/Fondo.jpg)] bg-center bg-[cover] bg-no-repeat">
            <Toaster richColors closeButton />
            <div className="flex justify-center items-center">
                <Card className="py-4 m-4 h-[35rem] lg:h-[46rem] glass max-w-[20rem] w-[30rem] md:max-w-[30rem] min-h-[70vh] flex flex-col items-center justify-center px-[5rem] rounded-md">
                    <CardBody className="w-[20rem]">
                        <div className="flex flex-col justify-center items-center h-full w-full mt-2">
                            <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                                <img src={Logo} className="w-[6.5rem] h-[9.25rem] hidden md:flex"></img>
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-2 justify-start h-full">
                                    <Input
                                        {...register("nombre", { required: true })}
                                        variant={"underlined"}
                                        label="Nombre"
                                        type={"text"}
                                        className="text-black"
                                    />
                                    <Input
                                        {...register("apellido", { required: true })}
                                        variant={"underlined"}
                                        label="Primer Apellido"
                                        type={"text"}
                                        className="text-black"
                                    />
                                    <Input
                                        {...register("usuario", { required: true })}
                                        variant={"underlined"}
                                        label="Nombre de Usuario"
                                        type={"text"}
                                        className="text-black"
                                    />
                                    <Input
                                        {...register("fecha", { required: true })}
                                        variant={"underlined"}
                                        label="Fecha de Nacimiento"
                                        placeholder="dd/mm/aaaa"
                                        type={"date"}
                                        className="text-black"
                                    />
                                    <Input
                                        {...register("contra", { required: true })}
                                        variant={"underlined"}
                                        label="Contraseña"
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                {isVisible ? (
                                                    <i className="fa-solid fa-eye-slash text-default-400 pointer-events-none"></i>
                                                ) : (
                                                    <i className="fa-solid fa-eye text-default-400 pointer-events-none"></i>
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? "text" : "password"}
                                        className="text-black"
                                    />
                                    <Button type="submit" color="primary" variant="ghost" className="h-[3rem] md:h-[3rem] w-full md:mt-4">
                                        Registrarse
                                    </Button>
                                </form>
                            </div>
                            <div className="flex justify-center w-full gap-12">
                                <Link href="https://discord.gg/nkgTkDxB8d" color="foreground" className="w-[100%] px-0 text-sm !text-center">¿Olvidaste la contraseña?</Link>
                                <Link href="/iniciosesion" color="foreground" className="w-[100%] px-0 text-sm !flex !justify-center">Iniciar sesión</Link>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div >
    );
}
